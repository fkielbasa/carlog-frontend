<script lang="ts">
export default {
  data() {
    return {
      showForgotPasswordForm: false,
      message: 'Sign in to your account',
      email: '',
      password: '',
      emailCheck: false,
      passwordCheck: false
    }
  },
  watch: {
    showForgotPasswordForm(newValue) {
      this.message = newValue ? "Recovery password" : "Sign in to your account";
    }
  },
  methods: {

  },
}
</script>

<template>
  <div class="flex flex-col justify-center min-h-screen bg-slate-200">
    <div class="max-w-md mx-auto px-6 py-6 lg:px-8 rounded-md bg-gray-300">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-28 w-auto" src="@/assets/logo/logo.png" alt="main logo">
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ message }}</h2>
      </div>
      <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form v-if="!showForgotPasswordForm" class="space-y-6" @submit.prevent="login" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" v-model="email" required
                     :class="[emailCheck ? 'border-input-error' : 'border-0 ',
                  'block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6']">
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <a href="#" @click="showForgotPasswordForm = true" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div class="mt-1">
              <input id="password" name="password" type="password" autocomplete="current-password" v-model="password" required
                     :class="[passwordCheck ? 'border-input-error' : 'border-0',
                   'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6']" >
            </div>
            <p v-if="emailCheck || passwordCheck" class="text-red-500">Incorrect login or email</p>
          </div>
          <div>
            <button type="submit" class="signInButton flex w-full justify-center rounded-md px-3 py-1.5  text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>
        <form v-else class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <button @click="showForgotPasswordForm = false" type="button" class="font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none">Back to login</button>
            </div>
          </div>
          <button type="submit" class=" buttonCustomStyle flex w-full justify-center rounded-md px-3 py-1.5 mb-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Recovery</button>
        </form>
        <p class="mt-5 text-center text-sm text-gray-500">
          Not a member?
          <RouterLink to="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register now!</RouterLink >
        </p>
        <p class="text-sm text-center mt-auto pt-5">2024 Carlog. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<style>
@import '@/assets/styles/signInButton.css';
</style>
