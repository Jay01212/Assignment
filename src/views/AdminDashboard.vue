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
                  <router-link class="nav-link" to="/admin">
                    <i class="fas fa-home"></i> 首页
                  </router-link>
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
                  <router-link class="nav-link" to="/admin/email">
                    <i class="fas fa-envelope"></i> 邮件管理
                  </router-link>
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
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter();
    const activeView = ref('dashboard');

    const setActiveView = (view) => {
      activeView.value = view;
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

    return {
      activeView,
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