import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import LoginPage from '../views/LoginView.vue'
import RegisterPage from '../views/RegisterView.vue'
import LibraryView from '../views/LibraryView.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import { useAuthentication } from '../router/authentication'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import EventsView from '@/views/EventsView.vue'
import MapView from '@/views/MapView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/Firelogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/Events',
    name: 'Events',
    component: EventsView
  },
  {
    path: '/Map',
    name: 'Map',
    component: MapView
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/library',
    name: 'Library',
    component: LibraryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Using local variables to store authentication status
const { isAuthentication } = useAuthentication()

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthentication.value) {
    next({ name: 'LoginPage' })
  } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAuthentication.value) {
    next({ name: 'LoginPage' }) // 或者直接重定向到错误页面
  } else {
    next()
  }
})

export default router
