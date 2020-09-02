<template>
  <div id="home">
    <Jumbotron />
    <h2>Articles Récents</h2>
    
    <div id="articles">
      <div v-for="article in articles" :key="article.title">
        <router-link
          :to="{ name: 'ArticlesRecents', params: { id: article.idArticles } }"
          ><h3>{{ article.title }}</h3>
        </router-link>
        <div class="image-container">
          <img :src="article.image" alt="">
        </div>
        <div class="content">
          {{ article.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Jumbotron from "@/components/Jumbotron.vue";

export default {
  name: "Home",
  components: {
    Jumbotron,
  },
  mounted() {
    this.$store.dispatch('loadArticles');
  },
  computed:{
    articles() {return this.$store.state.articles}
  },
};
</script>

<style lang="scss" scoped>
#home {
  #articles {
    display: flex;
    justify-content: space-around;
    .content{
      display: flex;
      flex-wrap: wrap;
    }
  }
  img {
    max-width: 300px;
  }
  h2 {
    font-size: 40px;
  }
  h3 {
    font-size: 25px;
    text-align: center;
  }
  a {
    text-decoration: none;
    color: black;
  }
}
</style>
