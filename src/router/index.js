import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthentication } from './authentication'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const { isAuthentication } = useAuthentication();
  if (to.name === 'About' && !isAuthentication.value) {
    alert("Your access has been denied because you are not logged in.");
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router