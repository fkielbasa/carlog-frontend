<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Service } from '@/types/service';
import { getUserId } from '@/api/auth'
import { getServicesByUserId } from '@/api/service'
import { Icon } from '@iconify/vue'

const services = ref<Service[]>([]);
const sortOrder = ref<'asc' | 'desc'>('asc');
const sortKey = ref('date');
const userId = getUserId()
onMounted(async () => {
  try {
    const response = await getServicesByUserId(userId);
    services.value = response;
  } catch (error) {
    console.error('Failed to fetch services:', error);
  }
});

const sortedServices = computed(() => {
  return [...services.value].sort((a, b) => {
    const direction = sortOrder.value === 'asc' ? 1 : -1;
    if (a[sortKey.value] < b[sortKey.value]) return -1 * direction;
    if (a[sortKey.value] > b[sortKey.value]) return 1 * direction;
    return 0;
  });
});

const changeSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <table class="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-200 text-gray-700">
      <tr>
        <th class="p-4 text-left cursor-pointer flex items-center" @click="changeSort('date')">
          Date
          <span v-if="sortKey === 'date'" class="ml-2">
        <Icon
          v-if="sortOrder === 'asc'"
          icon="mdi:sort-ascending"
          width="20"
          class="mt-1"
        />
        <Icon
          v-if="sortOrder === 'desc'"
          icon="mdi:sort-descending"
          width="20"
          class="mt-1"
        />
      </span>
        </th>
        <th class="p-4 text-left">Mileage</th>
        <th class="p-4 text-left">Price</th>
        <th class="p-4 text-left">Vehicle</th>
        <th class="p-4 text-left">Workshop</th>
        <th class="p-4 text-left">Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="service in sortedServices" :key="service.id" class="hover:bg-gray-100">
        <td class="p-4">{{ service.date }}</td>
        <td class="p-4">{{ service.mileage }} km</td>
        <td class="p-4">{{ service.price }}</td>
        <td class="p-4">{{ service.vehicle}}</td>
        <td class="p-4">{{ service.workshop }}</td>
        <td class="p-4">{{ service.description }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
th {
  position: relative;
}
</style>
