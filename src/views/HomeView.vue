<template>
  <div class="home">
    <!-- Main Content Section -->
    <div class="main-content container">
      <div class="image-container">
        <img src="../images/homepage1.png" alt="Mental Health Image">
        <div class="overlay-text">Your Mental Health Matters</div>
        <div class="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="button">Search</button>
        </div>
      </div>
    </div>

    <!-- News Section -->
    <div class="news-section">
      <h2>LATEST NEWS</h2>
      <div class="news-box">
        <div class="news-card">
          <h3>Mentalhealth Library</h3>
          <p>Create a comprehensive resource for mental health information and support.</p>
          <a @click="handleReadMore('/mentalhealth-library')" class="read-more-button">Read More</a>
        </div>
        <div class="news-card">
          <h3>List of psychotherapists</h3>
          <p>Perfect for therapists, counselors, and mental health professionals offering services.</p>
          <a @click="handleReadMore('/psychotherapists-list')" class="read-more-button">Read More</a>
        </div>
        <div class="news-card">
          <h3>Community</h3>
          <p>Ideal for creating supportive communities and resources for mental well-being.</p>
          <a @click="handleReadMore('/community')" class="read-more-button">Read More</a>
        </div>
      </div>
    </div>

    <!-- Mentalhealth library Section -->
    <div class="library-section">
      <h2>MENTALHEALTH LIBRARY</h2>
      <div class="library-content">
        <div class="library-image">
          <img src="../images/library.png" alt="Mental Health Library">
        </div>
        <div class="library-text">
          <h3>Comprehensive Resources at Your Fingertips</h3>
          <p>Explore our extensive collection of articles, research papers, and self-help guides. Our mental health library is designed to provide you with reliable information on various mental health topics.</p>
          <router-link to="/library" class="explore-button">Explore Library</router-link>
        </div>
      </div>
    </div>

    <!-- List of psychotherapists -->
    <div class="therapists-section">
      <h2>FIND A PSYCHOTHERAPIST</h2>
      <div class="therapists-content">
        <div class="therapists-image">
          <img src="../images/therapists.png" alt="Our Psychotherapists">
        </div>
        <div class="therapists-text">
          <h3>Expert Support for Your Mental Health Journey</h3>
          <p>Connect with our network of qualified psychotherapists specializing in various areas of mental health. Our professionals are here to provide personalized care and support to help you on your path to wellbeing.</p>
          <router-link to="/all-therapists" class="explore-button">View All Therapists</router-link>
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
/* General Styles */
.home {
  font-family: Arial, sans-serif;
}

/* Main Content */
.main-content {
  padding: 20;
}

/* Image Container */
.image-container {
  position: relative;
  margin: 20px 0;
  text-align: center; /* Center align image */
}

.image-container img {
  width:100%;
  max-width: 1200px;
  height: 400px;
  border-radius: 8px;
}

/* Overlay Text */
.overlay-text {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center the text */
  color: white;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add a shadow for better readability */
}

/* Search Bar */
.search-bar {
  position: absolute;
  top: 60%; /* Adjust the position of the search bar */
  left: 50%;
  transform: translate(-50%, -50%); /* Center the search bar horizontally */
  display: flex;
  gap: 10px; /* Space between input and button */
}

.search-bar input {
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 500px;
  max-width: 100%;
}

.search-bar button {
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #005595;
  color: white;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #004080;
}

/* News Section Style */
.news-section {
  padding: 40px 20px;
  text-align: center;
}

h2 {
  color: rgb(94, 147, 219);
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.news-box {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}

.news-card {
  width: 30%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.news-card h3 {
  color: rgb(94, 147, 219);
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(115, 169, 227, 0.5);
}

.read-more-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #005595;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
}

.read-more-button:hover {
  background-color: #004080;
}

/* Mentalhealth library Section */
.library-section {
  padding: 40px 20px;
  background-color: #f5f5f5;
}

.library-content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.library-image {
  flex: 1;
}

.library-image img {
  width: 100%;
  border-radius: 8px;
}

.library-text {
  flex: 1;
  padding: 0 40px;
}

.library-text h3 {
  color: rgb(94, 147, 219);
  font-size: 2rem;
  margin-bottom: 20px;
}

.explore-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #005595;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 20px;
}

/* List of psychotherapists */
.therapists-section {
  padding: 40px 20px;
  background-color: #bcbcbc;
}

.therapists-content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.therapists-image {
  flex: 1;
}

.therapists-image img {
  width: 100%;
  border-radius: 8px;
}

.therapists-text {
  flex: 1;
  padding: 0 40px;
}

.therapists-text h3 {
  color: rgb(94, 147, 219);
  font-size: 2rem;
  margin-bottom: 20px;
}
</style>