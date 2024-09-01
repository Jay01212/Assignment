<template>
  <div class="login-page">
    <h2>{{ isLoginView ? 'Log Into Your Account' : 'Enter Password' }}</h2>
    <div class="login-container">
      <form @submit.prevent="handleSubmit" class="login-form">
        <input v-model="userId" v-if="isLoginView" type="text" placeholder="User ID*" required>
        <input v-model="password" v-if="!isLoginView" type="password" placeholder="Password*" required>
        <p class="forgot-link" v-if="isLoginView">Forgot User ID?</p>
        <button type="submit" class="next-button">{{ isLoginView ? 'Next' : 'Login' }}</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div class="social-login" v-if="isLoginView">
        <button @click="loginWithGoogle" class="google-btn">
          <i class="fab fa-google"></i> Continue with Google
        </button>
        <button @click="loginWithFacebook" class="facebook-btn">
          <i class="fab fa-facebook"></i> Continue with Facebook
        </button>
      </div>
      <p class="register-link" v-if="isLoginView">
        Don't have an account? <router-link to="/register">Get started now!</router-link>
      </p>
    </div>

    <!-- Footer Section -->
    <FooterComponent />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthentication } from '../router/authentication'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  name: 'LoginPage',
  components: {
    FooterComponent
  },
  setup() {
    const router = useRouter()
    const { isAuthentication, setAuthentication } = useAuthentication()
    const isLoginView = ref(true)
    const userId = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const handleSubmit = () => {
      if (isLoginView.value) {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const existingUser = users.find(user => user.userId === userId.value)

        if (existingUser) {
          isLoginView.value = false
          errorMessage.value = ''
        } else {
          errorMessage.value = 'User ID not found. Please try again.'
        }
      } else {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const validUser = users.find(user => user.userId === userId.value && user.password === password.value)

        if (validUser) {
          alert('Login successful!')
          setAuthentication(true) // 更新认证状态
          router.push({ name: 'Home' }) // 重定向到首页
          errorMessage.value = ''
        } else {
          errorMessage.value = 'Invalid User ID or Password. Please try again.'
        }
      }
    }

    return {
      isLoginView,
      userId,
      password,
      errorMessage,
      handleSubmit
    }
  }
}
</script>

<style scoped>
h2 {
  color: rgb(0, 0, 0);
  font-size: 2rem;
  padding: 10px;
  margin-top: 20px;
  text-align: center;
}

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 20px 0;
}

.login-container {
  background-color: #fff;
  padding: 30px; 
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 700px; 
  width: 100%;
  margin-top: 20px; 
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.forgot-link {
  color: #888;
  text-align: right;
  font-size: 14px;
  margin-bottom: 20px;
}

.next-button {
  width: 100%;
  padding: 12px;
  background-color: #3367d6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.social-login button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.google-btn {
  background-color: white;
  color: #757575;
  border: 1px solid #ccc;
}

.facebook-btn {
  background-color: white;
  color: #4267B2;
  border: 1px solid #ccc;
}

.register-link {
  text-align: center;
  margin-top: 30px;
  color: #888;
}

.register-link a {
  color: #f50057;
  text-decoration: none;
}

.error-message {
  color: #f44336; /* Red color for error messages */
  margin-top: 10px;
}

footer-component {
  width: 100%;
  margin-top: auto; /* Pushes the footer to the bottom */
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;
}
</style>
