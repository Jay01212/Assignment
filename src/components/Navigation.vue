<template>
  <nav class="navigation">
    <a class="logo" href="/">MyMentalHealth.com</a>
    <button class="navbar-toggler" type="button" @click="toggleMenu" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div :class="['nav-items', { 'show': isMenuOpen }]">
      <ul class="nav-center">
        <li class="nav-item"><router-link to="/" class="nav-link" active-class="active">Home</router-link></li>
        <li class="nav-item"><a @click="handleNavClick('/about')" class="nav-link"
            :class="{ active: $route.path === '/about' }">About</a></li>
        <li class="nav-item"><a @click="handleNavClick('/resources')" class="nav-link"
            :class="{ active: $route.path === '/resources' }">Resources</a></li>
        <li class="nav-item"><a @click="handleNavClick('/community')" class="nav-link"
            :class="{ active: $route.path === '/community' }">Community</a></li>
        <li class="nav-item"><a @click="handleNavClick('/emergency')" class="nav-link"
            :class="{ active: $route.path === '/emergency' }">Emergency Help</a></li>
        <li class="nav-item"><router-link to="/Events" class="nav-link" active-class="active">Events</router-link>
        </li>
        <li class="nav-item"><router-link to="/Map" class="nav-link" active-class="active">Map</router-link></li>
        <li class="nav-item"><router-link to="/AdminDashboard" class="nav-link"
            active-class="active">Admin</router-link></li>
      </ul>

      <ul class="nav-right">
        <li v-if="!isAuthentication" class="nav-item"><router-link to="/login" class="nav-link"
            active-class="active">Login</router-link></li>
        <li v-else class="nav-item"><button @click="logout" class="nav-link btn btn-link">Logout</button></li>
        <li class="nav-item"><router-link to="/Firelogin" class="nav-link" active-class="active">Firebase
            Login</router-link></li>
        <li class="nav-item"><router-link to="/FireRegister" class="nav-link" active-class="active">Firebase
            Register</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { useAuthentication } from '../router/authentication'
import { useRouter } from 'vue-router'

export default {
  name: 'Navigation',
  setup() {
    const { isAuthentication, logout } = useAuthentication()
    const router = useRouter()
    const isMenuOpen = ref(false)

    const handleNavClick = (path) => {
      if (!isAuthentication.value && path !== '/') {
        alert('Your request has been denied because the user is not logged in')
        router.push('/login')
      } else {
        router.push(path)
      }
      isMenuOpen.value = false
    }

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    return {
      isAuthentication,
      logout,
      handleNavClick,
      isMenuOpen,
      toggleMenu
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
  text-decoration: none;
}

.nav-items {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.nav-center,
.nav-right {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-center {
  justify-content: center;
  flex-grow: 1;
}

.nav-right {
  justify-content: flex-end;
}

.nav-item {
  margin: 0 10px;
}

.nav-link {
  color: rgb(94, 147, 219);
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover,
.nav-link:focus,
.nav-link.active {
  color: rgb(66, 103, 178);
}

.nav-link:focus {
  outline: 2px solid rgb(94, 147, 219);
  outline-offset: 2px;
}

.navbar-toggler {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(94, 147, 219, 0.75)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

@media (max-width: 991px) {
  .navigation {
    flex-wrap: wrap;
  }

  .navbar-toggler {
    display: block;
  }

  .nav-items {
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-items.show {
    display: flex;
  }

  .nav-center,
  .nav-right {
    flex-direction: column;
    width: 100%;
  }

  .nav-item {
    margin: 10px 0;
    width: 100%;
  }

  .nav-link {
    display: block;
    padding: 5px 0;
  }
}
</style>