<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getVehicles } from '@/api/vehicle'
import router from '@/router'

const vin = ref('');
const vehicles = ref<any[]>([]);
const filteredVehicles = ref<any[]>([]);

onMounted(async () => {
    const response = await getVehicles();
    vehicles.value = response.data;
    filteredVehicles.value = vehicles.value;
});


const searchVehicle = () => {
  filteredVehicles.value = vehicles.value.filter((vehicle: any) =>
    vehicle.vin.toLowerCase().startsWith(vin.value.toLowerCase())
  );
};
const goToVehicleDetails = (id: string) => {
  router.push(`/vehicle/${id}/details`);
};
</script>

<template>
  <div class="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
    <input
      v-model="vin"
      type="text"
      placeholder="Enter VIN"
      @input="searchVehicle"
      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div v-if="vehicles.length > 0 && vin.length > 0" class="mt-4">
      <ul class="space-y-2">
        <li
          @click="goToVehicleDetails(vehicle.id)"
          v-for="vehicle in filteredVehicles"
          :key="vehicle.id"
          class="p-3 border-b border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <strong class="text-gray-800">{{ vehicle.vin }}</strong> -
          <span class="text-gray-600">{{ vehicle.brand }} {{ vehicle.model }}</span>
        </li>
      </ul>
    </div>

    <div v-if="vin.length > 0 && filteredVehicles.length === 0" class="mt-4 text-gray-500">
      No vehicles found for VIN: "{{ vin }}"
    </div>
  </div>
</template>


<style scoped>

</style>
