<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="flex justify-center mb-4">
      <img
        v-if="vehicle.photoBase64"
        :src="'data:image/png;base64,' + vehicle.photoBase64"
        alt="Vehicle Photo"
        class="w-24 h-24 object-cover rounded-full"
      />
      <div v-else class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
        <span class="text-white text-xl">No Image</span>
      </div>
    </div>

    <div class="text-center">
      <h3 class="font-semibold text-xl">{{ vehicle.brand }} {{ vehicle.model }}</h3>
    </div>
    <div class="mt-4">
      <div
        @click="checkServiceEntry(vehicle.id)"
        class="py-2 px-4 mb-1 flex items-center justify-center cursor-pointer"
      >
        <Icon
          icon="material-symbols:car-crash-outline"
          width="28"
          class="mr-0.5"
        />
        <span>Check service</span>
      </div>
    </div>

    <div class="flex justify-between mt-4">
      <div
        @click="openDeleteModal"
        class="flex items-center cursor-pointer space-x-2 px-4 py-2"
      >
        <Icon
          icon="material-symbols:delete"
          width="28"
          class="mr-0.5"
        />
        Delete
      </div>

      <div
        @click="showUpdateModal"
        class="flex items-center rounded hover:bg-yellow-6002 cursor-pointer space-x-2 px-4 py-2"
      >
        <Icon
        icon="material-symbols:update"
        width="28"
        class="mr-0.5"
      />
        Update
      </div>
    </div>

    <UpdateVehicle
      v-if="isUpdateModalOpen"
      :vehicle="vehicle"
      @close="closeUpdateModal"
      @update="$emit('update', $event)"
    />
    <DeleteVehicle
      v-if="isDeleteModalOpen"
      :vehicle="vehicle"
      @close="closeDeleteModal"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import UpdateVehicle from '@/components/vehicle/UpdateVehicle.vue'
import { Icon } from "@iconify/vue"
import DeleteVehicle from '@/components/vehicle/DeleteVehicle.vue'
import router from '@/router'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
});
const isDeleteModalOpen = ref(false);
const isUpdateModalOpen = ref(false);

const openDeleteModal = () => {
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};


const checkServiceEntry = (id: number) => {
  router.push(`/vehicle/${id}/services`);
};

const showUpdateModal = () => {
  isUpdateModalOpen.value = true;
};

const closeUpdateModal = () => {
  isUpdateModalOpen.value = false;
};

</script>

<style scoped>

</style>
