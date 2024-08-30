<template>
    <footer class="site-footer">
      <nav>
        <a href="/terms">Terms of Use</a> |
        <a href="/privacy">Privacy Policy</a> |
        <a href="/support">Support</a> |
        <a href="/contact">Contact Us</a>
      </nav>
      <p>&copy; Copyright 2024 MindCare.com Group, Inc. All rights reserved.</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent'
  }
  </script>
  
  <style scoped>
  .site-footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
    text-align: center;
    font-size: 0.9em;
    color: #666;
  }
  
  .site-footer nav {
    margin-bottom: 10px;
  }
  
  .site-footer a {
    color: #666;
    text-decoration: none;
    margin: 0 10px;
  }
  
  .site-footer a:hover {
    text-decoration: underline;
  }
  </style>