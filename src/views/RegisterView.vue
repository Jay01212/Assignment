<template>
  <div class="register-page">
    <h2>Create Your Account</h2>
    <div class="register-container">
      <form @submit.prevent="handleSubmit" class="register-form">
        <input 
          v-model="username" 
          @blur="validateUsername" 
          @input="validateUsername" 
          type="text" 
          placeholder="Username*" 
          required
        >
        <div v-if="usernameError" class="error-message">{{ usernameError }}</div>

        <select v-model="gender" required>
          <option value="" disabled selected>Select Gender*</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input 
          v-model="password" 
          @input="validatePassword" 
          type="password" 
          placeholder="Password*" 
          required
        >
        <div v-if="passwordError" class="error-message">{{ passwordError }}</div>

        <input 
          v-model="confirmPassword" 
          @input="validateConfirmPassword" 
          type="password" 
          placeholder="Confirm Password*" 
          required
        >
        <div v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</div>

        <input 
          v-model="phoneNumber" 
          @input="validatePhoneNumber" 
          type="tel" 
          placeholder="Phone Number*" 
          required
        >
        <div v-if="phoneNumberError" class="error-message">{{ phoneNumberError }}</div>

        <textarea 
          v-model="reason" 
          placeholder="Reason for joining*" 
          required
        ></textarea>

        <button type="submit" class="register-button" :disabled="!isFormValid">Register</button>
      </form>
      <p class="login-link">
        Already have an account? <router-link to="/login">Log in here!</router-link>
      </p>
    </div>

    <!-- Footer Section -->
    <FooterComponent />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  name: 'RegisterPage',
  components: {
    FooterComponent
  },
  setup() {
    const router = useRouter()
    const username = ref('')
    const gender = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const phoneNumber = ref('')
    const reason = ref('')

    const usernameError = ref('')
    const passwordError = ref('')
    const confirmPasswordError = ref('')
    const phoneNumberError = ref('')

    const validateUsername = () => {
      if (username.value.length < 3) {
        usernameError.value = 'Username must be at least 3 characters long'
      } else {
        usernameError.value = ''
      }
    }

    const validatePassword = () => {
      if (password.value.length < 6) {
        passwordError.value = 'Password must be at least 6 characters long'
      } else {
        passwordError.value = ''
      }
    }

    const validateConfirmPassword = () => {
      if (password.value !== confirmPassword.value) {
        confirmPasswordError.value = 'Passwords do not match'
      } else {
        confirmPasswordError.value = ''
      }
    }

    const validatePhoneNumber = () => {
      const phoneRegex = /^\d{10}$/
      if (!phoneRegex.test(phoneNumber.value)) {
        phoneNumberError.value = 'Please enter a valid 10-digit phone number'
      } else {
        phoneNumberError.value = ''
      }
    }

    const isFormValid = computed(() => {
      return username.value.length >= 3 &&
             gender.value !== '' &&
             password.value.length >= 6 &&
             password.value === confirmPassword.value &&
             phoneNumber.value.length === 10 &&
             reason.value !== '' &&
             !usernameError.value &&
             !passwordError.value &&
             !confirmPasswordError.value &&
             !phoneNumberError.value
    })

    const handleSubmit = () => {
      if (isFormValid.value) {
        const newUser = {
          userId: username.value,
          gender: gender.value,
          password: password.value,
          phoneNumber: phoneNumber.value,
          reason: reason.value
        }

        // Get existing users or initialize an empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        
        // Add new user
        users.push(newUser)

        // Save updated users array
        localStorage.setItem('users', JSON.stringify(users))

        // Redirect to login page
        router.push('/login')
      }
    }

    return {
      username,
      gender,
      password,
      confirmPassword,
      phoneNumber,
      reason,
      usernameError,
      passwordError,
      confirmPasswordError,
      phoneNumberError,
      validateUsername,
      validatePassword,
      validateConfirmPassword,
      validatePhoneNumber,
      isFormValid,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 20px 0;
}

h2 {
  color: rgb(0, 0, 0);
  font-size: 2rem;
  padding: 10px;
  margin-top: 20px;
  text-align: center;
}

.register-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 700px;
  width: 100%;
  margin-top: 20px;
}

.register-form {
  display: flex;
  flex-direction: column;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  height: 100px;
  resize: vertical;
}

.register-button {
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

.register-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 30px;
  color: #888;
}

.login-link a {
  color: #f50057;
  text-decoration: none;
}

.error-message {
  color: #f44336;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  text-align: left;
}
</style>