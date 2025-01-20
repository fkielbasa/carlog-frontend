<template>
  <div class="p-4">
    <div class="mb-4 flex justify-end">
      <div
        @click="openAddVehicleModal"
        class="border-2 border-black py-2 px-4 rounded hover:bg-blue-600 flex items-center"
      >
        <Icon
          icon="material-symbols:add"
          width="24"
          class="mr-0-1"
        />
       New vehicle
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <SingleVehicle
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :vehicle="vehicle"
        @update="updateVehicleInList"
        @delete="removeVehicleFromList"
      />
    </div>

    <AddVehicle
      v-if="isAddVehicleModalOpen"
      @close="closeAddVehicleModal"
      @add-vehicle="addVehicleToList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SingleVehicle from '../components/vehicle/SingleVehicle.vue';
import AddVehicle from '../components/vehicle/AddVehicle.vue';
import { Icon } from '@iconify/vue';
import { getVehicleByUserId } from '../api/vehicle';
import { decodeToken } from '@/api/auth'

const vehicles = ref([]);
const isAddVehicleModalOpen = ref(false);
const user = ref(decodeToken());

const openAddVehicleModal = () => {
  isAddVehicleModalOpen.value = true;
};

const updateVehicleInList = (updatedVehicle) => {
  const index = vehicles.value.findIndex(vehicle => vehicle.id === updatedVehicle.id);
  if (index !== -1) {
    vehicles.value[index] = updatedVehicle;
  }
};
const addVehicleToList = (newVehicle) => {
  vehicles.value.push(newVehicle);
};
const removeVehicleFromList = (vehicleId) => {
  vehicles.value = vehicles.value.filter(vehicle => vehicle.id !== vehicleId);
};
const closeAddVehicleModal = () => {
  isAddVehicleModalOpen.value = false;
};

const fetchVehicles = async () => {
  try {
    const response = await getVehicleByUserId(user.value.id);
    vehicles.value = response;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
  }
};

onMounted(() => {
  fetchVehicles();
});
</script>
<style scoped>
/* Optional styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

button {
  cursor: pointer;
}

form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
