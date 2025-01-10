<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { decodeToken } from '@/api/auth'
import { Icon } from "@iconify/vue"

const dropdownOpen = ref(false);
const router = useRouter();
const route = useRoute();
const user = ref(decodeToken());

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const logout = () => {
  localStorage.removeItem("token")
  router.push('/login');
};


</script>

<template>
  <div class="bg-gray-100 p-4 flex justify-between items-center border-b border-gray-300">
    <div class="text-xl font-semibold">{{ route.meta.title}}</div>
    <div class="relative">
        <button @click="toggleDropdown" class="focus:outline-none flex items-center">
          <Icon icon="mdi:user" width="30" class="mr-2" />
          <span class="text-gray-700">{{ user.Name }}</span>
          <svg class="w-5 h-5 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
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
            <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
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
