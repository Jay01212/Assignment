<template>
  <header>
    <Navigation />
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f4f4f4; /* Optional: A lighter background color */
}

/* Form styles */
.form {
  text-align: center;
  margin-top: 50px;
}

/* Input and card styles */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}
</style>