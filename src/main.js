import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp } from 'vue'
import App from './App.vue'
import userRouter from './router/userindex'
import adminRouter from './router/adminindex'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpKSdbtfusLPEVubwZyPrTXDeI2oPGEy8",
  authDomain: "a3-jiayuan.firebaseapp.com",
  projectId: "a3-jiayuan",
  storageBucket: "a3-jiayuan.appspot.com",
  messagingSenderId: "48036248961",
  appId: "1:48036248961:web:13d2347787033b5e533c80"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const app = createApp(App);

// 使用 PrimeVue
app.use(PrimeVue, { theme: { preset: Aura } });

// 根据用户的角色选择正确的路由
onAuthStateChanged(auth, (user) => {
  if (user && user.email.endsWith('@admin.com')) {
    app.use(adminRouter);
  } else {
    app.use(userRouter);
  }

  // 只在认证状态改变后挂载应用
  if (!app._isMounted) {
    app.mount('#app');
    app._isMounted = true;
  }
});