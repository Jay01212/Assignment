import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard from '@/views/AdminDashboard.vue'
import EmailManagement from '@/components/EmailManagement.vue'
import { getAuth } from 'firebase/auth'

const routes = [
    {
        path: '/admin',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/email',
        name: 'EmailManagement',
        component: EmailManagement,
        meta: { requiresAuth: true, requiresAdmin: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const auth = getAuth()
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

    auth.onAuthStateChanged((user) => {
        if (requiresAdmin && (!user || !user.email.endsWith('@admin.com'))) {
            next('/')
        } else {
            next()
        }
    })
})

export default router