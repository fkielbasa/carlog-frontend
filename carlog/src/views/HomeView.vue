<script setup lang="ts">
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue'
import MainContent from '@/components/MainContent.vue'

</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex flex-col flex-grow">
      <Header />
      <MainContent class="flex-grow">
        <router-view />
      </MainContent>
      <Footer/>
    </div>
  </div>
</template>

