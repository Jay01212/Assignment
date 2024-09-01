<template>
  <div class="home">
    <!-- Main Content Section -->
    <div class="container-fluid p-0">
      <div class="position-relative">
        <div class="image-container">
          <img src="../images/homepage1.png" alt="Mental Health Image" class="img-fluid w-100">
        </div>
        <div class="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 class="display-4 fw-bold">Your Mental Health Matters</h1>
          <div class="mt-4">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search...">
              <button class="btn btn-primary" type="button">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- News Section -->
    <div class="container my-5">
      <h2 class="text-center mb-4">LATEST NEWS</h2>
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title h4">Global Mental Health Report: Surge in Mental Health Issues Post-Pandemic</h3>
              <p class="card-text">The United Nations Mental Health Commission has released a report indicating a significant increase in mental health issues globally following the COVID-19 pandemic. The report highlights a notable rise in anxiety, depression, and stress symptoms across many countries. It calls on governments to invest more in mental health resources and improve the accessibility and quality of mental health services.</p>
              <router-link to="/mentalhealth-library" class="btn btn-primary mt-auto">Read More</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title h4">List of psychotherapists</h3>
              <p class="card-text">Perfect for therapists, counselors, and mental health professionals offering services.</p>
              <router-link to="/psychotherapists-list" class="btn btn-primary mt-auto">Read More</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title h4">Community</h3>
              <p class="card-text">Ideal for creating supportive communities and resources for mental well-being.</p>
              <router-link to="/community" class="btn btn-primary mt-auto">Read More</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mentalhealth library Section -->
    <div class="bg-light py-5">
      <div class="container">
        <h2 class="text-center mb-4">MENTALHEALTH LIBRARY</h2>
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 mb-md-0">
            <img src="../images/library.png" alt="Mental Health Library" class="img-fluid rounded">
          </div>
          <div class="col-md-6">
            <h3 class="h4 mb-3">Comprehensive Resources at Your Fingertips</h3>
            <p>Explore our extensive collection of articles, research papers, and self-help guides. Our mental health library is designed to provide you with reliable information on various mental health topics.</p>
            <router-link to="/library" class="btn btn-primary">Explore Library</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- List of psychotherapists -->
    <div class="bg-secondary py-5">
      <div class="container">
        <h2 class="text-center mb-4">FIND A PSYCHOTHERAPIST</h2>
        <div class="row align-items-center">
          <div class="col-md-6 order-md-2 mb-4 mb-md-0">
            <img src="../images/therapists.png" alt="Our Psychotherapists" class="img-fluid rounded">
          </div>
          <div class="col-md-6 order-md-1">
            <h3 class="h4 mb-3">Expert Support for Your Mental Health Journey</h3>
            <p>Connect with our network of qualified psychotherapists specializing in various areas of mental health. Our professionals are here to provide personalized care and support to help you on your path to wellbeing.</p>
            <router-link to="/all-therapists" class="btn btn-primary">View All Therapists</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mental Health Services -->
    <MentalHealthServices />

    <!-- Footer Section -->
    <FooterComponent />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthentication } from '../router/authentication'
import MentalHealthServices from '../views/MentalHealthServices.vue'
import FooterComponent from '../components/FooterComponent.vue'

const router = useRouter()
const { isAuthentication } = useAuthentication()

// Handle Read More button click
const handleReadMore = (path) => {
  if (!isAuthentication.value) {
    alert('Your request has been denied because the user is not logged in')
    router.push('/login')
  } else {
    router.push(path)
  }
}
</script>

<style scoped>
.home {
  font-family: Arial, sans-serif;
}

h2 {
  color: rgb(94, 147, 219);
  font-weight: bold;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
}

.image-container {
  height: 400px; /* Adjust this value to your preferred height */
  overflow: hidden;
}

.image-container img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}

.card-title {
  color: rgb(94, 147, 219);
  font-weight: bold;
  text-shadow: 0.125rem 0.125rem 0.25rem rgba(115, 169, 227, 0.5);
}

.btn-primary {
  background-color: #005595;
  border-color: #005595;
}

.btn-primary:hover {
  background-color: #004080;
  border-color: #004080;
}
</style>
