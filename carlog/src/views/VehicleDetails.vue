<template>
  <div class="container mx-auto p-6">
    <div v-if="vehicle" class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Vehicle</h2>
      <div class="mb-6">
        <p><strong>VIN:</strong> {{ vehicle.vin }}</p>
        <p><strong>Brand:</strong> {{ vehicle.brand }}</p>
        <p><strong>Model:</strong> {{ vehicle.model }}</p>
        <p><strong>Year:</strong> {{ vehicle.year }}</p>
        <p><strong>Horsepower:</strong> {{ vehicle.horsepower }}</p>
        <p><strong>Torque:</strong> {{ vehicle.torque }}</p>
        <p><strong>Mileage:</strong> {{ vehicle.mileage }} km</p>
      </div>

      <div class="mt-6">
        <h3 class="text-xl font-semibold mb-4">Add Service Entry</h3>
        <form @submit.prevent="addService">
          <div class="mb-2">
            <label for="serviceDate" class="block">Service Date</label>
            <input
              v-model="service.date"
              type="date"
              id="serviceDate"
              class="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div class="mb-2">
            <label for="servicePrice" class="block">Price</label>
            <input
              v-model="service.price"
              id="servicePrice"
              class="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
          </div>
          <div class="mb-2">
            <label for="serviceMileage" class="block">Mileage</label>
            <input
              v-model="service.mileage"
              id="serviceMileage"
              class="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
          </div>
          <div class="mb-2">
            <label for="serviceDescription" class="block">Description</label>
            <textarea
              v-model="service.description"
              id="serviceDescription"
              rows="4"
              class="w-full p-3 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>

          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Add Service Entry
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getVehicleById } from '@/api/vehicle'
import { Vehicle } from '@/types/vehicle'
import { addServiceEntry } from '@/api/service'
import { Service } from '@/types/service'
import { useToast } from 'vue-toastification'
import { decodeToken} from '@/api/auth'

const route = useRoute();
const vehicleId = route.params.id;
const toast = useToast();
const user = decodeToken();
const vehicle = ref<Vehicle>();
const service = ref<Service>({
  date: '',
  price: '',
  mileage: '',
  description: '',
  vehicleId: Number(vehicleId),
  mechanicId: Number(user.id)
});

onMounted(async () => {
  const response = await getVehicleById(vehicleId);
  vehicle.value = response;
});
const addService = async () => {
  try {
    await addServiceEntry(service.value);
    console.log(user.id)
    toast.success('Success!');
    service.value = {
      date: '',
      price: '',
      mileage: '',
      description: '',
    };
  } catch {
    toast.error('An error occurred. Please try again.');
  }
}
</script>
