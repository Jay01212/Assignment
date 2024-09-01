<template>
    <div class="mental-health-services">
      <h2>Mental health services for:</h2>
      <div class="services-list">
        <div v-for="(service, index) in services" :key="index" class="service-item">
          <div class="service-header" @click="toggleService(index)">
            <h3>{{ service.name }}</h3>
            <span class="toggle-icon" :class="{ 'open': service.isOpen }">
              {{ service.isOpen ? '▲' : '▼' }}
            </span>
          </div>
          <div v-if="service.isOpen" class="service-content">
            <div v-for="(item, itemIndex) in service.content" :key="itemIndex">
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
              <p v-if="item.phone">Call: <a :href="`tel:${item.phone}`">{{ item.phone }}</a></p>
              <p v-if="item.website">
                <a :href="item.website" target="_blank" rel="noopener noreferrer">
                  {{ item.websiteText || item.website }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const services = ref([
    {
      name: 'Everyone',
      isOpen: false,
      content: [
        {
          title: 'General Services',
          description: 'Mental health services available to all members of the community.',
        }
      ]
    },
    {
      name: 'Families',
      isOpen: false,
      content: [
        {
          title: 'Family Support',
          description: 'Counseling and support services for families dealing with mental health challenges.',
        }
      ]
    },
    {
      name: 'Young people',
      isOpen: false,
      content: [
        {
          title: 'Kids Helpline',
          description: 'Free confidential 24-hour telephone and online counselling service for young people aged 5 to 25 years.',
          phone: '1800 55 1800',
          website: 'https://kidshelpline.com.au/teens',
          websiteText: 'kidshelpline.com.au/teens'
        },
        {
          title: 'headspace services',
          description: 'Providing mental health services for young people aged 12-25. Chat at a centre, online, by email, or speak on the phone with a qualified professional.',
          phone: '1800 650 890',
          website: 'https://headspace.org.au/eheadspace',
          websiteText: 'headspace.org.au/eheadspace'
        }
      ]
    },
    // Add more services here...
  ])
  
  const toggleService = (index) => {
    services.value[index].isOpen = !services.value[index].isOpen
  }
  </script>
  
  <style scoped>
  .mental-health-services {
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
  }
  
  h2 {
    color: #4a4a4a;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .service-item {
    border-bottom: 1px solid #e0e0e0;
  }
  
  .service-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    cursor: pointer;
  }
  
  .service-header h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
  }
  
  .toggle-icon {
    transition: transform 0.3s ease;
  }
  
  .toggle-icon.open {
    transform: rotate(180deg);
  }
  
  .service-content {
    padding: 15px 0;
    font-size: 1rem;
    color: #666;
  }
  
  .service-content h4 {
    color: #005595;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  
  .service-content p {
    margin-bottom: 10px;
  }
  
  .service-content a {
    color: #005595;
    text-decoration: none;
  }
  
  .service-content a:hover {
    text-decoration: underline;
  }
  </style>