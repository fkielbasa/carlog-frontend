<script setup lang="ts">

</script>

<template>
  <div class="bg-gray-100 p-4 flex justify-between items-center border-b border-gray-300">
    <div class="text-xl font-semibold">Dashboard</div>
    <div class="relative">
      <button class="focus:outline-none">
        <span class="text-gray-700">User</span>
        <svg class="w-5 h-5 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
        <ul>
          <li>
            <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-100">
              Profile
            </router-link>
          </li>
          <li>
            <router-link to="/settings" class="block px-4 py-2 hover:bg-gray-100">
              Settings
            </router-link>
          </li>
          <li>
            <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
