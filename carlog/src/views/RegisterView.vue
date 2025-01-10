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
  <h1>Here will be register</h1>
</template>

<style scoped>

</style>
