<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Update Vehicle</h2>
      <form @submit.prevent="submitUpdate">
        <div class="mb-4">
          <label class="block text-gray-700">Brand</label>
          <input v-model="form.brand" type="text" class="w-full border p-2 rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Model</label>
          <input v-model="form.model" type="text" class="w-full border p-2 rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Year</label>
          <input v-model="form.year" type="text" class="w-full border p-2 rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">VIN</label>
          <input v-model="form.vin" type="text" class="w-full border p-2 rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Horsepower</label>
          <input v-model="form.horsepower" type="text" class="w-full border p-2 rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Torque</label>
          <input v-model="form.torque" type="text" class="w-full border p-2 rounded" />
        </div>
        <div class="flex justify-end">
          <button type="button" @click="$emit('close')" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2">
            Cancel
          </button>
          <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { updateVehicleById } from '@/api/vehicle'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(['close', 'update']);

const form = ref({ ...props.vehicle });

const submitUpdate = async () => {
  try {
    const response = await updateVehicleById(form.value.id, form.value);
    emits('update', response);
    emits('close');
  } catch (error) {
    console.error('Error updating vehicle:', error);
  }
}
</script>

<style scoped>
</style>
