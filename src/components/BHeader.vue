<script setup>
import { useAuthentication } from '../router/authentication'

const { isAuthentication, logout } = useAuthentication()
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <li v-if="!isAuthentication" class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li v-else class="nav-item">
          <button @click="logout" class="nav-link btn btn-link">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>