<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { Client, Mechanic } from '@/types/user'
import { getUserData } from '@/api/user'
import { getUserId } from '@/api/auth'
import { Icon } from "@iconify/vue"

const role = localStorage.getItem("role")
const userId = getUserId();
const toast = useToast();
const client = ref<Client>({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: ''
});
const mechanic = ref<Mechanic>({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  workshop: ''
});

onMounted(async () => {
  if (role === 'CLIENT') {
    try {
      client.value = await getUserData(userId);
    } catch {
      toast.error('Failed to fetch user data');
    }
  }
  else {
    try {
      mechanic.value = await getUserData(userId);
    } catch {
      toast.error('Failed to fetch user data');
    }
  }
});

</script>


<template>
  <div class="p-6 max-w-xl mx-auto">
    <div>
      <div v-if="role === 'CLIENT'" class="bg-gray-100 p-4 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-4">Account Information</h2>
        <p><strong>First Name:</strong> {{ client.firstName }}</p>
        <p><strong>Last Name:</strong> {{ client.lastName }}</p>
        <p><strong>Address:</strong> {{ client.address }}</p>
        <p><strong>Phone Number:</strong> {{ client.phoneNumber }}</p>
        <p><strong>Email:</strong> {{ client.email }}</p>
      </div>

      <div v-if="role === 'MECHANIC'" class="bg-gray-100 p-4 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-4">Account Information</h2>
        <div class="flex">
          <Icon
            icon="mdi:account-wrench"
            width="28"
            class="mr-0.5"
          />
          <p>{{ role }}</p>
        </div>
        <p><strong>First Name:</strong> {{ mechanic.firstName }}</p>
        <p><strong>Last Name:</strong> {{ mechanic.lastName }}</p>
        <p><strong>Address:</strong> {{ mechanic.address }}</p>
        <p><strong>Phone Number:</strong> {{ mechanic.phoneNumber }}</p>
        <p><strong>Email:</strong> {{ mechanic.email }}</p>
        <p><strong>Workshop:</strong> {{ mechanic.workshop }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
