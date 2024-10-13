<template>
  <div class="admin-dashboard">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <!-- 侧边栏 -->
          <div class="sidebar">
            <h2 class="mb-4">心理健康慈善机构</h2>
            <nav>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="setActiveView('dashboard')">
                    <i class="fas fa-home"></i> 首页
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="setActiveView('activities')">
                    <i class="fas fa-calendar-alt"></i> 活动管理
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="setActiveView('users')">
                    <i class="fas fa-users"></i> 用户统计
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="setActiveView('treatments')">
                    <i class="fas fa-clipboard-list"></i> 治疗计划
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="setActiveView('emails')">
                    <i class="fas fa-envelope"></i> 邮件管理
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="setActiveView('analysis')">
                    <i class="fas fa-chart-bar"></i> 数据分析
                  </a>
                </li>
              </ul>
            </nav>
            <button class="btn btn-danger mt-4" @click="logout">登出</button>
          </div>
        </div>
        <div class="col-md-9">
          <!-- 主内容区 -->
          <component :is="currentViewComponent"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import TreatmentPlans from '@/components/TreatmentPlans.vue';
import EmailManagement from '@/components/EmailManagement.vue';

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter();
    const activeView = ref(localStorage.getItem('activeAdminView') || 'dashboard');

    const currentViewComponent = computed(() => {
      switch (activeView.value) {
        case 'dashboard': return DashboardOverview;
        case 'activities': return Activities;
        case 'users': return Users;
        case 'treatments': return TreatmentPlans;
        case 'emails': return EmailManagement;
        case 'analysis': return DataAnalysis;
        default: return DashboardOverview;
      }
    });

    const setActiveView = (view) => {
      activeView.value = view;
      localStorage.setItem('activeAdminView', view);
    };

    const logout = async () => {
      const auth = getAuth();
      try {
        await signOut(auth);
        router.push('/FireLogin');
      } catch (error) {
        console.error('登出失败:', error);
      }
    };

    onMounted(() => {
      // 检查用户认证状态
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push('/FireLogin');
        }
      });
    });

    return {
      activeView,
      currentViewComponent,
      setActiveView,
      logout
    };
  }
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.sidebar {
  background-color: #f8f9fa;
  padding: 20px;
  height: 100vh;
  position: fixed;
  width: 250px;
}

.col-md-9 {
  margin-left: 250px;
}

.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
}

.card-title {
  font-weight: bold;
  color: #333;
}

.badge {
  padding: 5px 10px;
  border-radius: 20px;
}
</style>