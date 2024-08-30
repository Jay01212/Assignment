<template>
  <div class="container">
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="form.username" id="username">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="form.password" id="password">
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router/index'

const form = ref({
  username: '',
  password: ''
})

const registerUser = () => {
  // Add registration logic (e.g., save to state or backend)
  alert('Registration successful')
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
