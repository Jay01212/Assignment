<template>
  <footer class="footer mt-auto py-3 border-top">
    <div class="container text-center">
      <nav class="mb-3" aria-label="Footer Navigation">
        <router-link to="/terms" class="text-muted text-decoration-none mx-2" aria-label="Terms of Use">Terms of
          Use</router-link> |
        <router-link to="/privacy" class="text-muted text-decoration-none mx-2" aria-label="Privacy Policy">Privacy
          Policy</router-link> |
        <router-link to="/support" class="text-muted text-decoration-none mx-2"
          aria-label="Support">Support</router-link> |
        <router-link to="/contact" class="text-muted text-decoration-none mx-2" aria-label="Contact Us">Contact
          Us</router-link>
      </nav>
      <p class="text-muted small mb-0">&copy; Copyright 2024 MindCare.com Group, Inc. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  color: #666;
}

.footer a {
  color: #666;
}

.footer a:hover {
  text-decoration: underline !important;
}

@media screen and (max-width: 768px) {
  .footer nav {
    display: flex;
    flex-direction: column;
  }

  .footer nav a {
    margin: 5px 0;
  }
}
</style>