
<template>
  <div class="login-page">
    <h1 class="site-title">MindCare Hub</h1>
    <div class="login-container">
      <h2>Log Into Your Account</h2>
      <form @submit.prevent="login">
        <input v-model="userId" type="text" placeholder="User ID" required>
        <p class="forgot-link">FORGOT USER ID?</p>
        <button type="submit" class="next-button">NEXT</button>
      </form>
      <div class="social-login">
        <button @click="loginWithGoogle" class="google-btn">
          <i class="fab fa-google"></i> Continue with Google
        </button>
        <button @click="loginWithFacebook" class="facebook-btn">
          <i class="fab fa-facebook"></i> Continue with Facebook
        </button>
      </div>
      <p class="register-link">
        Don't have an Account? <a href="/register">Register now!</a>
      </p>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import { ref } from 'vue'
import router from '../router/index';
import { useAuthentication } from '../router/authentication'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  name: 'LoginPage',
  components: {
    FooterComponent
  },
  setup() {
    const userId = ref('')

    const login = () => {
      // Implement login logic here
      console.log('Logging in with User ID:', userId.value)
    }

    const loginWithGoogle = () => {
      // Implement Google login logic
      console.log('Logging in with Google')
    }

    const loginWithFacebook = () => {
      // Implement Facebook login logic
      console.log('Logging in with Facebook')
    }

    return {
      userId,
      login,
      loginWithGoogle,
      loginWithFacebook
    }
  }
}
</script>

<style scoped>
.login-page {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.site-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.forgot-link {
  color: red;
  text-align: right;
  font-size: 12px;
  margin-bottom: 10px;
}

.next-button {
  width: 100%;
  padding: 10px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.social-login button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.register-link {
  text-align: center;
  margin-top: 20px;
}
</style>