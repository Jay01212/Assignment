import { createRouter, createWebHistory } from 'vue-router'
import { useAuthentication } from '../router/authentication'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import AdminConfig from '../views/AdminConfig.vue'
import ArticleDetail from '../views/ArticleDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/admin',
    name: 'AdminConfig',
    component: AdminConfig,
    beforeEnter: (to, from, next) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser.role === 'admin') {
        next();
      } else {
        next({ name: 'Home' });
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('../views/LibraryView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    props: true
  }
  // {
  //   path: '/resources',
  //   name: 'Resources',
  //   component: () => import('../views/Resources.vue'),
  //   meta: { requiresAuth: true }
  // },
  // {
  //   path: '/community',
  //   name: 'Community',
  //   component: () => import('../views/Community.vue'),
  //   meta: { requiresAuth: true }
  // },
  // {
  //   path: '/emergency',
  //   name: 'Emergency',
  //   component: () => import('../views/Emergency.vue'),
  //   meta: { requiresAuth: true }
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuthentication()
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    alert('Your request has been denied because the user is not logged in')
    next('/login')
  } else {
    next()
  }
})

export default router
