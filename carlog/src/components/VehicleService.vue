<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getVehicleById } from '@/api/vehicle';
import { Vehicle } from '@/types/vehicle';
import { Service } from '@/types/service'
import { useRoute } from 'vue-router'
import { getServiceByVehicleId } from '@/api/service'
import ServiceEntry from '@/components/ServiceEntry.vue'

const route = useRoute();
const vehicleId = Number(route.params.id);

const vehicle = ref<Vehicle | null>(null);
const serviceEntries = ref<Service[]>([]);

onMounted(async () => {
  try {
    vehicle.value = await getVehicleById(vehicleId);

    serviceEntries.value = await getServiceByVehicleId(vehicleId);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
});
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div v-if="vehicle" class="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Vehicle Information</h2>
      <p><strong>Brand:</strong> {{ vehicle.brand }}</p>
      <p><strong>Model:</strong> {{ vehicle.model }}</p>
      <p><strong>Year:</strong> {{ vehicle.year }}</p>
      <p><strong>VIN:</strong> {{ vehicle.vin }}</p>
      <p><strong>Horsepower:</strong> {{ vehicle.horsepower }}</p>
      <p><strong>Torque:</strong> {{ vehicle.torque }}</p>
      <p><strong>Mileage:</strong> {{ vehicle.mileage }}</p>
    </div>

    <div v-if="serviceEntries.length > 0" class="mt-6">
      <h3 class="text-xl font-bold mb-4">Service Entries</h3>
      <div v-for="entry in serviceEntries" :key="entry.id" class="mb-6">
        <ServiceEntry :entry="entry" />
      </div>
    </div>

    <div v-else class="mt-6">
      <p>No service entries available for this vehicle.</p>
    </div>
  </div>
</template>

