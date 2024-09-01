import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import LoginPage from '../views/LoginView.vue'
import RegisterPage from '../views/RegisterView.vue'
import LibraryView from '../views/LibraryView.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import { useAuthentication } from '../router/authentication'

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
  const { isAuthentication } = useAuthentication()
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  if (to.meta.requiresAuth && !isAuthentication.value) {
    alert('Your request has been denied because the user is not logged in')
    next('/login')
  } else if (to.meta.requiresAdmin && currentUser.userType !== 'admin') {
    alert('Your request has been denied because you are not an admin')
    next('/')
  } else {
    next()
  }
})


export default router
