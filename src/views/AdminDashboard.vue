<template>
  <div class="admin-dashboard">
    <div class="container-fluid">
      <h1 class="mb-4">Admin Dashboard</h1>

      <div class="row">
        <!-- User Statistics -->
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Users</h5>
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="mb-0">{{ totalUsers }}</h2>
                <small class="text-success">+{{ newUsersPercentage }}% last month</small>
              </div>
              <div class="mt-3">
                <canvas ref="userChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Income -->
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Income</h5>
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="mb-0">${{ totalIncome.toLocaleString() }}</h2>
                <small class="text-success">+{{ incomeIncreasePercentage }}% last month</small>
              </div>
              <div class="mt-3">
                <canvas ref="incomeChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sales Profit Chart -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Sales Profit</h5>
              <canvas ref="salesChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular Products -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Popular Products</h5>
              <p class="card-subtitle mb-2 text-muted">Total 9k Visitors</p>
              <table class="table">
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in popularProducts" :key="product.id">
                    <td>
                      <div class="d-flex align-items-center">
                        <img :src="product.image" alt="Product" class="product-image mr-2">
                        <div>
                          <div>{{ product.name }}</div>
                          <small class="text-muted">{{ product.description }}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>${{ product.price }}</div>
                      <small class="text-muted">{{ product.paymentStatus }}</small>
                    </td>
                    <td>
                      <span :class="['badge', product.status === 'Confirmed' ? 'bg-success' : 'bg-warning']">
                        {{ product.status }}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-link">•••</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'AdminDashboard',
  setup() {
    const totalUsers = ref(4562);
    const newUsersPercentage = ref(23);
    const totalIncome = ref(6280);
    const incomeIncreasePercentage = ref(18);

    const userChart = ref(null);
    const incomeChart = ref(null);
    const salesChart = ref(null);

    const popularProducts = ref([
      {
        id: 1,
        name: 'iPhone 13 pro max-Pacific',
        description: 'Blue-128GB storage',
        image: 'path/to/iphone-image.jpg',
        price: 180,
        totalPrice: 499,
        paymentStatus: 'Partially paid',
        status: 'Confirmed'
      },
      {
        id: 2,
        name: 'Apple MacBook Pro 13 inch-',
        description: 'M1-8/256GB-space',
        image: 'path/to/macbook-image.jpg',
        price: 120,
        totalPrice: 499,
        paymentStatus: 'Full paid',
        status: 'Confirmed'
      }
    ]);

    onMounted(() => {
      // User Chart
      new Chart(userChart.value, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{
            label: 'New Users',
            data: [500, 1000, 1500, 2000],
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Income Chart
      new Chart(incomeChart.value, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{
            label: 'Income',
            data: [3000, 4500, 5500, 6280],
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Sales Profit Chart
      new Chart(salesChart.value, {
        type: 'line',
        data: {
          labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{
            label: 'Sales Profit',
            data: [30, 40, 20, 50, 60, 80, 70, 60, 50],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    return {
      totalUsers,
      newUsersPercentage,
      totalIncome,
      incomeIncreasePercentage,
      userChart,
      incomeChart,
      salesChart,
      popularProducts
    };
  }
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.card-title {
  font-weight: bold;
  color: #333;
}

.product-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.badge {
  padding: 5px 10px;
  border-radius: 20px;
}
</style>