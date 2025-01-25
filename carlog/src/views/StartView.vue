<template>
  <div class="p-6 max-w-4xl ml-10">
    <h1 class="text-3xl font-bold mb-4">Welcome, {{ userName }}!</h1>
    <p class="mt-6 text-xl text-gray-600">
      We're so glad you're using our service. Whether you're looking to maintain your vehicle, track its performance, or schedule a service, we are here to help! Our platform gives you easy access to your vehicle's information, upcoming services, and much more.
    </p>

    <p class="mt-6 text-lg text-gray-600">
      Thank you for choosing us. We're committed to providing you with the best service and experience!
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { decodeToken } from '@/api/auth'

const userName = ref(decodeToken().Name);

</script>

<style scoped>
</style>
