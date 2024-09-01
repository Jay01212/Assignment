<template>
  <nav class="navigation">
    <!-- Logo -->
    <div class="logo">MyMentalHealth.com</div>
    
    <!-- Nav-Center -->
    <div class="nav-center">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <a @click="handleNavClick('/about')" class="nav-link" :class="{ active: $route.path === '/about' }">About</a>
        </li>
        <li class="nav-item">
          <a @click="handleNavClick('/resources')" class="nav-link" :class="{ active: $route.path === '/resources' }">Resources</a>
        </li>
        <li class="nav-item">
          <a @click="handleNavClick('/community')" class="nav-link" :class="{ active: $route.path === '/community' }">Community</a>
        </li>
        <li class="nav-item">
          <a @click="handleNavClick('/emergency')" class="nav-link" :class="{ active: $route.path === '/emergency' }">Emergency Help</a>
        </li>
      </ul>
    </div>
    
    <!-- Right Login/Logout -->
    <div class="nav-right">
      <ul class="nav nav-pills">
        <li v-if="!isAuthentication" class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li v-else class="nav-item">
          <button @click="logout" class="nav-link btn btn-link">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAuthentication } from '../router/authentication'
import { useRouter } from 'vue-router'

export default {
  name: 'Navigation',
  setup() {
    const { isAuthentication, logout } = useAuthentication()
    const router = useRouter()

    const handleNavClick = (path) => {
      if (!isAuthentication.value && path !== '/') {
        alert('Your request has been denied because the user is not logged in')
        router.push('/login')
      } else {
        router.push(path)
      }
    }

    return {
      isAuthentication,
      logout,
      handleNavClick
    }
  }
}
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-weight: bold;
  font-size: 1.5em;
  color: rgb(94, 147, 219);
  flex: 1;
}

.nav-center {
  flex: 2;
  display: flex;
  justify-content: center;
}

.nav-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
</style>