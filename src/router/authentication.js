import { ref } from 'vue'

const isAuthentication = ref(false)

export function useAuthentication() {
  const setAuthentication = (value) => {
    isAuthentication.value = value
  }

  const logout = () => {
    isAuthentication.value = false
    // Add any additional logout logic here (e.g., clearing local storage, redirecting)
  }

  return {
    isAuthentication,
    setAuthentication,
    logout
  }
}