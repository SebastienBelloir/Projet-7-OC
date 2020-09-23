<template>
  <div id="home">
    <Jumbotron v-if="loggedIn" />
    <SignIn v-if="!loggedIn"/>
    <h2 v-if="loggedIn">Articles Récents</h2>
    
    <div id="articles" v-if="loggedIn">
      <div class="card" v-for="article in articles" :key="article.idArticles">
        <router-link
          :to="{ name: 'Article', params: { id: article.idArticles } }">
        <div class="image-container">
          <img :src="article.imageUrl" alt="">
        </div>
          <h3 class="title">{{ article.title }}</h3>
        <div class="description">
          {{ article.description }}
        </div>
        <div>
          {{ article.datetime }}
        </div>
        </router-link>
      </div>
    </div>
    <Footer v-if="loggedIn"/>
  </div>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
import Jumbotron from "@/components/Jumbotron.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Jumbotron,
    SignIn,
    Footer,
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
};
</script>

<style lang="scss" scoped>
body{
  margin: 0;
  padding: 0;
  background-color: rgb(148, 148, 148);
}
#home {
  height: 100vh;
  border: 1px solid black;
  background-image: url('~@/assets/jumbotronback.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
  #articles {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 1% 20% 1% 20%;
    border: 2px solid red;
    background-color:rgba(235, 235, 235, 0.411);
    .card{
      background-color: #FFFF;
      position: relative;
      max-width: 500px;
      border: 1px solid red;
      border-radius: 10px;
      margin: 4%;
      padding: 15px;
      box-shadow: 0px 15px 20px;
      -webkit-transform: translate(0px, 0);
      -webkit-transition: -webkit-transform 0.8s ease;
      -moz-transform: translate(0px, 0);
      -moz-transition: -moz-transform 0.8s ease;
      transform: translate(0px, 0);
      transition: -webkit-transform 0.8s ease;
      &:hover{
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        transform: scale(1.2);
      }
      img{
        max-width: 500px;
        max-height: 500px;
      }
    }
    }
    .content{
      display: flex;
      flex-wrap: wrap;
    }
  h2 {
    margin-top: 20%;
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

</style>
