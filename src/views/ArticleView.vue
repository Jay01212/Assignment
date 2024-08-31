<template>
    <div class="article-page">
      <Navbar />
      <div v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <StarRating 
            :initialRating="article.rating" 
            @update:rating="updateRating" 
            :showRating="true"
          />
          <span>{{ article.views }} views</span>
        </div>
        <div class="article-content" v-html="article.content"></div>
        <div class="article-actions">
          <button @click="likeArticle">Like ({{ article.likes }})</button>
          <button @click="shareArticle">Share ({{ article.shares }})</button>
        </div>
        <div class="user-rating">
          <h3>Rate this article:</h3>
          <StarRating 
            :initialRating="userRating" 
            @update:rating="setUserRating" 
            :showRating="false"
          />
        </div>
        <div class="comments-section">
          <h3>Comments</h3>
          <div v-for="comment in article.comments" :key="comment.id" class="comment">
            <p><strong>{{ comment.author }}</strong>: {{ comment.text }}</p>
          </div>
          <textarea v-model="newComment" placeholder="Add a comment"></textarea>
          <button @click="addComment">Post Comment</button>
        </div>
      </div>
      <div v-else>Article not found</div>
      <Footer />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Navbar from './Navbar.vue';
  import Footer from './Footer.vue';
  import StarRating from './StarRating.vue';
  
  export default {
    name: 'Article',
    components: { Navbar, Footer, StarRating },
    setup() {
      const route = useRoute();
      const article = ref(null);
      const newComment = ref('');
      const userRating = ref(0);
  
      onMounted(() => {
        // 从本地存储获取文章
        const articles = JSON.parse(localStorage.getItem('articles') || '[]');
        article.value = articles.find(a => a.id === parseInt(route.params.id));
      });
  
      const updateRating = (newRating) => {
        article.value.rating = newRating;
        saveArticle();
      };
  
      const setUserRating = (newRating) => {
        userRating.value = newRating;
        // 这里可以添加逻辑来保存用户的评分
        console.log(`User rated the article: ${newRating}`);
      };
  
      const likeArticle = () => {
        article.value.likes++;
        saveArticle();
      };
  
      const shareArticle = () => {
        article.value.shares++;
        saveArticle();
      };
  
      const addComment = () => {
        if (newComment.value.trim()) {
          article.value.comments.push({
            id: Date.now(),
            author: 'Current User', // 这里应该使用实际的用户名
            text: newComment.value
          });
          newComment.value = '';
          saveArticle();
        }
      };
  
      const saveArticle = () => {
        const articles = JSON.parse(localStorage.getItem('articles') || '[]');
        const index = articles.findIndex(a => a.id === article.value.id);
        if (index !== -1) {
          articles[index] = article.value;
          localStorage.setItem('articles', JSON.stringify(articles));
        }
      };
  
      return { 
        article, 
        newComment, 
        userRating, 
        updateRating, 
        setUserRating, 
        likeArticle, 
        shareArticle, 
        addComment 
      };
    }
  };
  </script>
  
  <style scoped>
  .article-page {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .article-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .article-content {
    line-height: 1.6;
    margin-bottom: 30px;
  }
  
  .article-actions button {
    margin-right: 10px;
  }
  
  .user-rating {
    margin: 20px 0;
  }
  
  .comments-section {
    margin-top: 40px;
  }
  
  .comment {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
  }
  
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  </style>