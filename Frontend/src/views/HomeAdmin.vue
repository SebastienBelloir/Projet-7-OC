<template>
  <div>
    <h2>Admin Home</h2>
    <div id="article">
      <div v-for="article in articles" :key="article.name">
        <p>{{ article.name }}</p>
        <img :src="require(`@/assets/${article.image}`)" :alt="article.name">
        <button>Voir l'article</button>
        <button>Modifier</button>
        <button @click="deleteArticle">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  data() {
    return {
      articles: store.articles,
    };
  },
  
};
</script>

<style lang="scss" scoped>
#article {
  margin: 2%;
  display: flex; 
  img{
      max-width: 400px;
  }
  button{
      margin: 2%;
      
  }
}
</style>
