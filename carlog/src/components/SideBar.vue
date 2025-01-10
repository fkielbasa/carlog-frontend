<script setup lang="ts">
</script>

<template>
  <div class="w-64 bg-gray-800 text-white h-screen flex flex-col">
    <img class="mx-auto h-28 w-auto" src="@/assets/logo/logo.png" alt="main logo">
    <nav class="flex-grow">
      <ul class="space-y-2 p-4">
        <li>
          <router-link to="/" class="block px-4 py-2 rounded hover:bg-gray-700">
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/vehicles" class="block px-4 py-2 rounded hover:bg-gray-700">
            Vehicles
          </router-link>
        </li>
        <li>
          <router-link to="/services" class="block px-4 py-2 rounded hover:bg-gray-700">
            Service Entries
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>

</style>
