<template>
    <div class="container-fluid py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <h2 class="card-title text-center">Admin Configuration</h2>
              <p class="card-text text-center">
                Welcome to the Admin Configuration page. Here, you can manage and configure the settings for your application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'AdminConfig'
  }
</script>
  
<style scoped>
  .container-fluid {
    min-height: 80vh;
  }
  
  .card {
    margin-top: 20px;
    border-radius: 0.5rem;
  }
</style>
  