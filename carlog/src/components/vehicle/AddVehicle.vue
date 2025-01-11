<template>
  <div class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg w-96">
      <h3 class="text-xl font-semibold mb-4">Add vehicle</h3>

      <form @submit.prevent="addVehicle">
        <div class="mb-4">
          <label for="brand" class="block text-sm font-medium text-gray-700">Brand</label>
          <input v-model="newVehicle.brand" id="brand" type="text" class="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        <div class="mb-4">
          <label for="model" class="block text-sm font-medium text-gray-700">Model</label>
          <input v-model="newVehicle.model" id="model" type="text" class="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        <div class="mb-4">
          <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
          <input v-model="newVehicle.year" id="year" type="text" class="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        <div class="mb-4">
          <label for="vin" class="block text-sm font-medium text-gray-700">VIN</label>
          <input v-model="newVehicle.vin" id="vin" type="text" class="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
        </div>

        <div class="flex justify-between items-center mt-6">
          <button @click="$emit('close')" type="button" class="bg-gray-300 text-white py-2 px-4 rounded hover:bg-gray-400">Anuluj</button>
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Dodaj pojazd</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newVehicle = ref({
  brand: '',
  model: '',
  year: '',
  vin: '',
});

const addVehicle = () => {
  newVehicle.value = { brand: '', model: '', year: '', vin: '' };
};
</script>

<style scoped>

</style>
