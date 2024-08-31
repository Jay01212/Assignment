<template>
    <div class="star-rating">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{ 'filled': star <= rating, 'clickable': !readonly }"
        @click="setRating(star)"
        @mouseover="hoverRating = star"
        @mouseleave="hoverRating = 0"
      >
        ★
      </span>
      <span v-if="showRating" class="rating-text">{{ displayRating }}</span>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    name: 'StarRating',
    props: {
      initialRating: {
        type: Number,
        default: 0
      },
      readonly: {
        type: Boolean,
        default: false
      },
      showRating: {
        type: Boolean,
        default: true
      }
    },
    emits: ['update:rating'],
    setup(props, { emit }) {
      const rating = ref(props.initialRating);
      const hoverRating = ref(0);
  
      const displayRating = computed(() => {
        return (hoverRating.value || rating.value).toFixed(1);
      });
  
      const setRating = (value) => {
        if (!props.readonly) {
          rating.value = value;
          emit('update:rating', value);
        }
      };
  
      return {
        rating,
        hoverRating,
        displayRating,
        setRating
      };
    }
  };
  </script>
  
  <style scoped>
  .star-rating {
    display: inline-flex;
    align-items: center;
  }
  
  .star {
    font-size: 24px;
    color: #ddd;
    transition: color 0.2s;
  }
  
  .star.filled {
    color: #ffd700;
  }
  
  .star.clickable {
    cursor: pointer;
  }
  
  .rating-text {
    margin-left: 10px;
    font-size: 18px;
  }
  </style>