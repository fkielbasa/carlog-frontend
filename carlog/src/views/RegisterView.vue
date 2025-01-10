<script lang="ts">
import {  ref } from 'vue';
import { RegisterParams } from '@/types/register';
import { register } from '@/api/auth';
import router from '@/router';

export default {
  setup() {
    const currentStep = ref(1);
    const message = ref('Create your account');

    const personalData = ref({
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      phoneNumber: '',
    });

    const loginData = ref({
      login: '',
      password: '',
      confirmPassword: '',
    });

    const errors = ref({
      general: '',
      personal: '',
      login: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    });

    const validatePersonalData = () => {
      let isValid = true;
      errors.value.personal = '';
      errors.value.phoneNumber = '';

      if (!personalData.value.firstName || !personalData.value.lastName || !personalData.value.address || !personalData.value.email) {
        errors.value.personal = 'All fields are required.';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(personalData.value.email)) {
        errors.value.personal = 'Email is invalid.';
        isValid = false;
      }

      if (!/^\d{9}$/.test(personalData.value.phoneNumber)) {
        errors.value.phoneNumber = 'Phone number must contain exactly 9 digits.';
        isValid = false;
      }

      return isValid;
    };

    const validateLoginData = () => {
      let isValid = true;
      errors.value.login = '';
      errors.value.password = '';
      errors.value.confirmPassword = '';

      if (!loginData.value.login) {
        errors.value.login = 'Login is required';
        isValid = false;
      }

      if (!loginData.value.password) {
        errors.value.password = 'Password is required';
        isValid = false;
      } else if (loginData.value.password.length < 8) {
        errors.value.password = 'Password must be at least 8 characters long';
        isValid = false;
      } else if (!/[A-Z]/.test(loginData.value.password)) {
        errors.value.password = 'Password must contain at least one uppercase letter';
        isValid = false;
      } else if (!/[a-z]/.test(loginData.value.password)) {
        errors.value.password = 'Password must contain at least one lowercase letter';
        isValid = false;
      } else if (!/[0-9]/.test(loginData.value.password)) {
        errors.value.password = 'Password must contain at least one number';
        isValid = false;
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(loginData.value.password)) {
        errors.value.password = 'Password must contain at least one special character';
        isValid = false;
      }

      if (loginData.value.password !== loginData.value.confirmPassword) {
        errors.value.confirmPassword = 'Passwords do not match';
        isValid = false;
      }

      return isValid;
    };

    const handleNextStep = () => {
      if (validatePersonalData()) {
        currentStep.value = 2;
        message.value = 'Set up your login and password';
      }
    };

    const registerUser = async () => {
      if (!validateLoginData()) {
        return;
      }

      const credentials: RegisterParams = {
        ...personalData.value,
        ...loginData.value,
      };

      try {
        const response = await register(credentials);
        localStorage.setItem('token', response.token);
        await router.push('/login');
      } catch (error) {
        errors.value.general = 'Registration failed. Please try again later.';
        console.error('Registration failed:', error);
      }
    };

    return {
      currentStep,
      message,
      personalData,
      loginData,
      errors,
      handleNextStep,
      registerUser,
    };
  },
};
</script>

<template>
  <div class="flex flex-col justify-center min-h-screen bg-slate-200">
    <div class="max-w-md mx-auto px-6 py-6 lg:px-8 rounded-md bg-gray-300">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-28 w-auto" src="@/assets/logo/logo.png" alt="main logo">
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ message }}</h2>
      </div>
      <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form v-if="currentStep === 1" @submit.prevent="handleNextStep" class="space-y-6" method="POST">
          <div>
            <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
            <input id="firstName" v-model="personalData.firstName" required class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
            <input id="lastName" v-model="personalData.lastName" required class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
          </div>
          <div>
            <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
            <input id="address" v-model="personalData.address" required class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <input id="email" v-model="personalData.email" required class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
          </div>
          <div>
            <label for="phoneNumber" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
            <input id="phoneNumber" v-model="personalData.phoneNumber" required class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
          </div>
          <p v-if="errors.personal" class="text-red-500">{{ errors.personal }}</p>
          <p v-if="errors.phoneNumber" class="text-red-500">{{ errors.phoneNumber }}</p>
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-indigo-600 hover:bg-indigo-500">Next</button>
          </div>
        </form>

        <form v-else @submit.prevent="registerUser" class="space-y-6" method="POST">
          <div>
            <label for="login" class="block text-sm font-medium leading-6 text-gray-900">Login</label>
            <input id="login" v-model="loginData.login" required class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <input id="password" type="password" v-model="loginData.password" required class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
            <input id="confirmPassword" type="password" v-model="loginData.confirmPassword" required class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500">{{ errors.confirmPassword }}</p>
          <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
          <p v-if="errors.general" class="text-red-500">{{ errors.general }}</p>
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-indigo-600 hover:bg-indigo-500">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
