<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">登录</div>
                    <div class="card-body">
                        <form @submit.prevent="handleLogin">
                            <div class="mb-3">
                                <label for="email" class="form-label">邮箱</label>
                                <input v-model="email" type="email" class="form-control" id="email" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">密码</label>
                                <input v-model="password" type="password" class="form-control" id="password" required>
                            </div>
                            <button type="submit" class="btn btn-primary">登录</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
    name: 'FirebaseLogin',
    setup() {
        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const handleLogin = async () => {
            try {
                const auth = getAuth()
                await signInWithEmailAndPassword(auth, email.value, password.value)

                if (email.value === 'admin@gmail.com' && password.value === 'Moguyufangkuai09') {
                    router.push('/admin/dashboard')
                } else {
                    router.push('/')
                }
            } catch (error) {
                console.error('登录失败:', error)
                alert('登录失败，请检查您的邮箱和密码')
            }
        }

        return {
            email,
            password,
            handleLogin
        }
    }
}
</script>