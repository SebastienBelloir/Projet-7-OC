<template>
  <div id="home">
    <h1>Articles Récents</h1>
    <div id="articles">
    <div v-for="article in articles" :key="article.name">
    <router-link :to="{name: 'ArticlesRecents', params: {slug:article.slug}}"><h2>{{ article.name }}</h2> </router-link>
    <figure>
    <router-link :to="{name: 'ArticlesRecents', params: {slug:article.slug}}"><img :src="require(`@/assets/${article.image}`)" :alt="article.name"> </router-link>
    </figure>
    </div>
    </div>
  </div>
</template>

<script>

import store from '@/store.js';
export default {
  name: "Home",
  components: {},
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
}
</style>
