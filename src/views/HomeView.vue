<template>
  <div class="home">
    <!-- Header Section -->
    <header class="header-section">
      <div class="container">
        <h1>My mental health</h1>
      </div>
    </header>

    <!-- Main Content Section -->
    <section class="main-content container">
      <h2>Local services directory and online support</h2>
      <p>
        The following service guide includes services available for
        <strong>everyone</strong> (regardless of age or circumstance) as well
        as for <a href="#">families</a>, <a href="#">young people</a>, <a href="#">men</a>, <a href="#">LGBTIQ+ people</a>, <a href="#">Aboriginal and Torres Strait Islander people</a>, <a href="#">people from migrant and refugee backgrounds and those seeking asylum</a>, and <a href="#">carers</a>.
      </p>
      <p>
        All services provide confidential support and are legally obliged to protect your privacy and handle your information with care. Many are free or low-cost. Please contact the service directly to find out if it is suitable for you.
      </p>
      <p>
        For more detail about specific services in your local area visit <a href="#">healthdirect.gov.au</a>. You can also find state-wide phone and online mental health services at <a href="#">health.vic.gov.au</a>.
      </p>
    </section>

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

/* Header Section */
.header-section {
  background-color: #e0f5ff;
  padding: 20px 0;
  text-align: center;
}

.header-section h1 {
  margin: 0;
  color: #005595;
  font-size: 2.5rem;
}

/* Breadcrumb */
.breadcrumb {
  background-color: transparent;
  padding-left: 0;
  justify-content: center;
}

.breadcrumb-item a {
  color: #005595;
  text-decoration: none;
}

.breadcrumb-item.active {
  color: #333;
}

/* Main Content */
.main-content {
  padding: 20px 0;
}

.main-content h2 {
  color: #333;
  font-size: 1.75rem;
  margin-bottom: 15px;
}

.main-content p {
  color: #555;
  line-height: 1.6;
}

.main-content a {
  color: #005595;
  text-decoration: none;
}

.main-content a:hover {
  text-decoration: underline;
}
</style>
