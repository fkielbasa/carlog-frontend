<script setup lang="ts">
import { ref, onMounted } from 'vue';

const role = ref<string | null>(null);
const clientLinks = [
  { path: '/vehicles', label: 'Vehicles' },
  { path: '/services', label: 'Service Entries' }
];


onMounted(() => {
  role.value = localStorage.getItem('role');
});
</script>

<template>
  <div class="w-64 bg-gray-800 text-white h-screen flex flex-col">
    <img class="mx-auto h-28 w-auto" src="@/assets/logo/logo.png" alt="main logo">
    <nav class="flex-grow">
      <ul class="space-y-2 p-4">
        <li>
          <router-link to="/" class="block px-4 py-2 rounded hover:bg-gray-700">
            Start
          </router-link>
        </li>
        <template v-if="role === 'CLIENT'">
          <li>
            <router-link to="/vehicles" class="block px-4 py-2 rounded hover:bg-gray-700">
              Vehicles
            </router-link>
          </li>
          <li>
            <router-link to="/services" class="block px-4 py-2 rounded hover:bg-gray-700">
              Services
            </router-link>
          </li>
        </template>

        <template v-if="role === 'MECHANIC'">
          <li>
            <router-link to="/search-vehicle" class="block px-4 py-2 rounded hover:bg-gray-700">
              Search Vehicle
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<style scoped>

</style>
