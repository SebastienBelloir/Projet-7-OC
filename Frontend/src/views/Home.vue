<template>
  <div id="home">
    <Jumbotron/>
    <h2>Articles Récents</h2>
    <div id="articles">
    <div v-for="article in articles" :key="article.name">
    <router-link :to="{name: 'ArticlesRecents', params: {slug:article.slug}}"><h3>{{ article.name }}</h3> </router-link>
    <figure>
    <router-link :to="{name: 'ArticlesRecents', params: {slug:article.slug}}"><img :src="require(`@/assets/${article.image}`)" :alt="article.name"> </router-link>
    </figure>
    </div>
    </div>
  </div>
</template>

<script>
import Jumbotron from '@/components/Jumbotron.vue';
import store from '@/store.js';
export default {
  name: "Home",
  components: {
    Jumbotron
  },
  data(){
    return {
      articles: store.articles
    };
  }
};
</script>

<style lang="scss" scoped>
#home{
  #articles{
    display: flex;
    justify-content: space-around;
  }
  img{
    max-width: 300px;
  }
  h2{
    font-size: 40px;
  }
  h3{
    font-size: 25px;
    text-align: center;
  }
  a{
    text-decoration: none;
    color: black;
  }
}
</style>
