<template>
  <div id="home">
    <h2>Panel Admin</h2>
    <div id="article">
      <div v-for="article in articles" :key="article.title">
        <h3>{{ article.title }}</h3>
        <img :src="article.imageUrl" alt="">
        <div class="actions">
          <router-link class="router-link" :to=" {name: 'Article', params: {id: article.idArticles}} ">Voir</router-link>
          <router-link class="router-link" :to=" {name: 'EditArticle', params: {id: article.idArticles}} ">Modifier</router-link>
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
        window.location.reload();
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button{
      margin: 4%;
      padding: 2%;
      font-size: 20px;
      border: 3px solid #192c4adc;
      border-radius: 10px;
      background-color: #192c4adc;
      color: #FFFF;
      cursor: pointer;
      -webkit-transform: translate(0px, 0);
      -webkit-transition: -webkit-transform 0.8s ease;
      -moz-transform: translate(0px, 0);
      -moz-transition: -moz-transform 0.8s ease;
      transform: translate(0px, 0);
      transition: -webkit-transform 0.8s ease;
    } button:hover{
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        transform: scale(1.2);
        background-color: red;
    }
    .router-link{
      border: 3px solid #192c4adc;
      font-size: 20px;
      margin: 4%;
      padding: 2%;
      border-radius: 10px;
      background-color: #192c4adc;
      color: #FFFF;
      cursor: pointer;
      -webkit-transform: translate(0px, 0);
      -webkit-transition: -webkit-transform 0.8s ease;
      -moz-transform: translate(0px, 0);
      -moz-transition: -moz-transform 0.8s ease;
      transform: translate(0px, 0);
      transition: -webkit-transform 0.8s ease;
    } .router-link:hover{
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        transform: scale(1.2);
    }
  a {
    text-decoration: none;
    color: black;
  }
  img{
    max-width: 500px;
  }
}
  h2{
    font-size: 35px;
  }
  h3{
    font-size: 30px;
  }
</style>
