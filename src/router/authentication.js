import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isAuthentication = ref(JSON.parse(localStorage.getItem('isAuthenticated') || 'false'))

export function useAuthentication() {
  const router = useRouter()

  const setAuthentication = (value) => {
    isAuthentication.value = value
    localStorage.setItem('isAuthenticated', JSON.stringify(value))
  }

  const logout = () => {
    isAuthentication.value = false
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser') // Clear any other related data
    // Add any additional logout logic here (e.g., redirecting to login)
    router.push('/login') // Redirect to login page after logout
  }

  return {
    isAuthentication,
    setAuthentication,
    logout
  }
}
