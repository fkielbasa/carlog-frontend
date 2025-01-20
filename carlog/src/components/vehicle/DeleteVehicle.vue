<template>
  <div class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg w-96">
      <h3 class="text-xl font-semibold mb-4">Are you sure?</h3>
      <p class="text-gray-700 mb-6">
        Are you sure you want to delete the vehicle <strong>{{ vehicle.brand }} {{ vehicle.model }}</strong>?
      </p>

      <div class="flex justify-between items-center">
        <button @click="$emit('close')" type="button" class="bg-gray-300 text-white py-2 px-4 rounded hover:bg-gray-400">
          Cancel
        </button>
        <button @click="deleteVehicle" type="button" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { deleteVehicleById } from '@/api/vehicle'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'delete']);

const deleteVehicle = async () => {
  try {
    await deleteVehicleById(props.vehicle.id)
    emit('delete', props.vehicle.id);
    emit('close');
  } catch (error) {
    console.error("Error deleting vehicle,", error)
  }
};
</script>

<style scoped>
</style>
