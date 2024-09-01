import { ref } from 'vue'

const isAuthentication = ref(false)

export function useAuthentication() {
  const setAuthentication = (status) => {
    isAuthentication.value = status
  }

  const logout = () => {
    setAuthentication(false)
  }

  return {
    isAuthentication,
    setAuthentication,
    logout
  }
}