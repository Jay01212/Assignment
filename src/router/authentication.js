import { ref } from 'vue'

const isAuthentication = ref(false)

export function useAuthentication() {
  const setAuthentication = (status) => {
    isAuthentication.value = status
  }

  return {
    isAuthentication,
    setAuthentication
  }
}
