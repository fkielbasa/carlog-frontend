<script setup lang="ts">
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue'

</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex flex-col flex-grow">
      <Header />
      <div class="flex-grow overflow-auto">
        <router-view />
      </div>
      <Footer/>
    </div>
  </div>
</template>

