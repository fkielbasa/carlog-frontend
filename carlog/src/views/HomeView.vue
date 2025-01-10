<script setup lang="ts">
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';

</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex flex-col flex-grow">
      <Header />
      <div class="p-4 flex-grow">
        <router-view />
      </div>
    </div>
  </div>
</template>

