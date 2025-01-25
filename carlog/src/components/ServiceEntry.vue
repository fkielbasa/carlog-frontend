<script setup lang="ts">
import { defineProps } from 'vue';
import { Service} from '@/types/service';

const props = defineProps({
  entry: {
    type: Object as () => Service,
    required: true,
  },
});
</script>


<template>
  <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <div class="flex flex-wrap items-center justify-between text-sm text-gray-700 space-y-2">
      <p class="flex-1"><strong>Date:</strong> {{ entry.date }}</p>
      <p class="flex-1"><strong>Price:</strong> ${{ entry.price }}</p>
      <p class="flex-1"><strong>Description:</strong> {{ entry.description }}</p>
      <p class="flex-1"><strong>Workshop:</strong> {{ entry.workshop }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
