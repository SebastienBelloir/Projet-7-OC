<template>
  <div id="home">
    <h2>Admin Home</h2>
    <div id="article">
      <div v-for="article in articles" :key="article.title">
        <h2>{{ article.title }}</h2>
        <div>{{ article.description }}</div>
        <div class="actions">
          <router-link :to=" {name: 'Article', params: {id: article.idArticles}} ">Voir</router-link>
          <router-link :to=" {name: 'EditArticle', params: {id: article.idArticles}} ">Modifier</router-link>
          <button v-on:click="deleteArticle(article)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['articles'])
  },
  methods: {
    deleteArticle(article) {
      let response = confirm(`Etes vous certains de vouloir supprimer l'article "${article.title}" ?`);
      if (response){
        this.$store.dispatch("deleteArticle", article);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#article {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 5%;
  .actions{
    button{
      margin: 4%;
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
}
</style>
