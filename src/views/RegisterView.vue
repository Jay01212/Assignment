<template>
  <div class="register-page">
    <h2>Register Your Account</h2>
    <div class="register-container">
      <form @submit.prevent="submitForm" class="register-form">
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="username" class="form-label">Username*</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="formData.username"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
              required
            />
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>

          <div class="col-md-6">
            <label for="password" class="form-label">Password*</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="formData.password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
              required
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>

          <div class="col-md-6">
            <label for="confirm-password" class="form-label">Confirm Password*</label>
            <input
              type="password"
              class="form-control"
              id="confirm-password"
              v-model="formData.confirmPassword"
              @blur="() => validateConfirmPassword(true)"
              required
            />
            <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
          </div>

          <div class="col-md-6">
            <label for="gender" class="form-label">Gender*</label>
            <select class="form-select" id="gender" v-model="formData.gender" required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="col-md-6">
            <label for="reason" class="form-label">Reason for Joining*</label>
            <textarea
              class="form-control"
              id="reason"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
              rows="3"
              required
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            <div v-if="reasonhasfriend" style="color: green;">Great to have a friend</div>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary me-2">Register</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  gender: '',
  reason: '',
})

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  reason: null,
})

const reasonhasfriend = ref(false)

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateReason = (blur) => {
  if (formData.value.reason.length < 5) {
    if (blur) errors.value.reason = 'Reason must be at least 5 characters.'
  } else {
    errors.value.reason = null
  }
}

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateReason(true)

  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword && !errors.value.reason) {
    // Save to local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push({ ...formData.value })
    localStorage.setItem('users', JSON.stringify(users))

    alert('Registration successful!')
    clearForm()

    // Redirect to the login page
    router.push('/login')
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    reason: '',
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.register-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 700px;
  width: 100%;
}

h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.text-danger {
  color: #f44336;
}

textarea {
  resize: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

button.btn-secondary {
  background-color: #6c757d;
}
</style>