<template>
  <div class="rating">
    <div class="stars">
      <i 
        v-for="star in 5" 
        :key="star" 
        :class="['fa-star', { 'fas': star <= userRating, 'far': star > userRating }]" 
        @click="rate(star)"
      ></i>
    </div>
    <p class="rating-feedback">Average Rating: {{ averageRating.toFixed(1) }} / 5</p>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'RatingComponent',
  props: {
    initialRating: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const userRating = ref(props.initialRating)
    const ratings = ref(JSON.parse(localStorage.getItem('ratings') || '[]'))

    // Compute average rating
    const averageRating = computed(() => {
      if (ratings.value.length === 0) return 0
      const total = ratings.value.reduce((sum, rating) => sum + rating, 0)
      return total / ratings.value.length
    })

    // Rate the item
    const rate = (star) => {
      userRating.value = star
      ratings.value.push(star)
      localStorage.setItem('ratings', JSON.stringify(ratings.value))
    }

    // Watch for changes and update local storage
    watch(userRating, (newRating) => {
      ratings.value.push(newRating)
      localStorage.setItem('ratings', JSON.stringify(ratings.value))
    })

    return {
      userRating,
      averageRating,
      rate
    }
  }
}
</script>

<style scoped>
.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stars {
  font-size: 2rem;
}

.fas {
  color: gold;
  cursor: pointer;
}

.far {
  color: lightgray;
}

.rating-feedback {
  margin-top: 0.5rem;
}
</style>
