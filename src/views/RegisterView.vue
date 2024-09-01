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
        >
        <div v-if="errors.username" class="error-message">{{ errors.username }}</div>

        <select v-model="gender">
          <option value="" disabled selected>Select Gender*</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <div v-if="errors.gender" class="error-message">{{ errors.gender }}</div>

        <input 
          v-model="password" 
          @input="validatePassword" 
          type="password" 
          placeholder="Password*" 
        >
        <div v-if="errors.password" class="error-message">{{ errors.password }}</div>

        <input 
          v-model="confirmPassword" 
          @input="validateConfirmPassword" 
          type="password" 
          placeholder="Confirm Password*" 
        >
        <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>

        <input 
          v-model="phoneNumber" 
          @input="validatePhoneNumber" 
          type="tel" 
          placeholder="Phone Number*" 
        >
        <div v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</div>

        <textarea 
          v-model="reason" 
          placeholder="Reason for joining*" 
        ></textarea>
        <div v-if="errors.reason" class="error-message">{{ errors.reason }}</div>

        <div class="button-group">
          <button type="submit" class="register-button">Register</button>
          <button type="button" @click="clearForm" class="clear-button">Clear</button>
        </div>
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
import { ref, reactive } from 'vue'
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

    const errors = reactive({
      username: '',
      gender: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      reason: ''
    })

    const validateUsername = () => {
      if (username.value.length === 0) {
        errors.username = 'Username is required'
      } else if (username.value.length < 3) {
        errors.username = 'Username must be at least 3 characters long'
      } else {
        errors.username = ''
      }
    }

    const validatePassword = () => {
      if (password.value.length === 0) {
        errors.password = 'Password is required'
      } else if (password.value.length < 6) {
        errors.password = 'Password must be at least 6 characters long'
      } else {
        errors.password = ''
      }
    }

    const validateConfirmPassword = () => {
      if (confirmPassword.value.length === 0) {
        errors.confirmPassword = 'Please confirm your password'
      } else if (password.value !== confirmPassword.value) {
        errors.confirmPassword = 'Passwords do not match'
      } else {
        errors.confirmPassword = ''
      }
    }

    const validatePhoneNumber = () => {
      const phoneRegex = /^\d{10}$/
      if (phoneNumber.value.length === 0) {
        errors.phoneNumber = 'Phone number is required'
      } else if (!phoneRegex.test(phoneNumber.value)) {
        errors.phoneNumber = 'Please enter a valid 10-digit phone number'
      } else {
        errors.phoneNumber = ''
      }
    }

    const validateForm = () => {
      validateUsername()
      validatePassword()
      validateConfirmPassword()
      validatePhoneNumber()

      if (gender.value === '') {
        errors.gender = 'Please select a gender'
      } else {
        errors.gender = ''
      }

      if (reason.value === '') {
        errors.reason = 'Please provide a reason for joining'
      } else {
        errors.reason = ''
      }
    }

    const handleSubmit = () => {
      validateForm()

      if (Object.values(errors).every(error => error === '')) {
        const newUser = {
          userId: username.value,
          gender: gender.value,
          password: password.value,
          phoneNumber: phoneNumber.value,
          reason: reason.value
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]')
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))

        router.push('/login')
      }
    }

    const clearForm = () => {
      username.value = ''
      gender.value = ''
      password.value = ''
      confirmPassword.value = ''
      phoneNumber.value = ''
      reason.value = ''

      Object.keys(errors).forEach(key => {
        errors[key] = ''
      })
    }

    return {
      username,
      gender,
      password,
      confirmPassword,
      phoneNumber,
      reason,
      errors,
      handleSubmit,
      clearForm,
      validateUsername,
      validatePassword,
      validateConfirmPassword,
      validatePhoneNumber
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

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.register-button,
.clear-button {
  width: 48%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.register-button {
  background-color: #3367d6;
  color: white;
}

.clear-button {
  background-color: #f44336;
  color: white;
}

.error-message {
  color: #f44336;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  text-align: left;
}
</style>