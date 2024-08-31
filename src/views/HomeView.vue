<template>
  <div class="home">
    <!-- Main Content Section -->
    <div class="main-content container">
      <div class="image-container">
        <img src="../images/homepage1.png" alt="Mental Health Image">
        <div class="overlay-text">Your Mental Health Matters</div> <!-- Overlay Text -->
        <div class="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="button">Search</button>
        </div>
      </div>
    </div>

    <div class="domain-search-section">
      <h2>FIND YOUR MENTAL HEALTH RESOURCE</h2>
      <div class="domain-options">
        <div class="domain-card">
          <h3>Mentalhealth Library</h3>
          <p>Create a comprehensive resource for mental health information and support.</p>
          <router-link to="/mentalhealth-library" class="read-more-button">Read More</router-link> <!-- Router Link -->
        </div>
        <div class="domain-card">
          <h3>List of psychotherapists</h3>
          <p>Perfect for therapists, counselors, and mental health professionals offering services.</p>
          <router-link to="/psychotherapists-list" class="read-more-button">Read More</router-link> <!-- Router Link -->
        </div>
        <div class="domain-card">
          <h3>Community</h3>
          <p>Ideal for creating supportive communities and resources for mental well-being.</p>
          <router-link to="/community" class="read-more-button">Read More</router-link> <!-- Router Link -->
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <FooterComponent />
  </div>
</template>

<script setup>
import FooterComponent from '../components/FooterComponent.vue'
</script>

<style scoped>
/* General Styles */
.home {
  font-family: Arial, sans-serif;
}

/* Main Content */
.main-content {
  padding: 20; /* Remove padding to allow the image to reach the edges */
}

/* Image Container */
.image-container {
  position: relative;
  margin: 20px 0;
  text-align: center; /* Center align image */
}

.image-container img {
  width:100%;
  max-width: 1200px; /* Set a fixed width */
  height: 400px; /* Set a fixed height */
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
  width: 500px; /* Set a fixed width for the input */
  max-width: 100%; /* Ensure it doesn't exceed the container width */
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

/* Domain Search Section Styles */
.domain-search-section {
  padding: 40px 20px;
  text-align: center;
}

h2 {
  color: rgb(94, 147, 219);
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add a shadow for better readability */
}

.domain-options {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}

.domain-card {
  width: 30%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.domain-card h3 {
  color: rgb(94, 147, 219);
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(115, 169, 227, 0.5); /* Add a shadow for better readability */
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
</style>
