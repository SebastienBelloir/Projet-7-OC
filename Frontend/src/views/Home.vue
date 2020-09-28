<template>
<div id="wrapper">
  <div id="home">
    <Jumbotron v-if="loggedIn" />
    <SignIn v-if="!loggedIn"/>
    </div>
    <div id="layout">
    <h2 v-if="loggedIn">Fil d'actualité</h2>
    <div id="articles" v-if="loggedIn" >
      <div class="card" v-for="eachArticle in allArticles" :key="eachArticle.idArticle">
        <router-link
          :to="{ name: 'Article', params: { id: eachArticle.idArticle } }">
        <div class="image-container">
        <div v-for="user in users" :key="user.idUser">
          <div v-if="eachArticle.auteur_id === user.idUser">
            <router-link class="author" :to="{ name: 'MyProfil', params: { id: user.idUser } }">{{ user.prenom }} {{ user.nom }}</router-link>
          <span class="datetime">{{ eachArticle.datetime }}</span></div>
        </div>
          <img :src="eachArticle.imageUrl" alt="">
        </div>
          <h3 class="title">{{ eachArticle.title }}</h3>
        <div class="description">
          {{ eachArticle.description }}
        </div>
        </router-link>
      </div>
    </div>
    </div>
    <Footer v-if="loggedIn"/>
  
  </div>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
import Jumbotron from "@/components/Jumbotron.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from 'vuex';

export default {
  name: "Home",
  components: {
    Jumbotron,
    SignIn,
    Footer,
  },
  computed: {
    ...mapState(["articles", "sharedArticles", "currentUser", "users"]),    
    allArticles() {
      return this.$store.state.allArticles;
    },
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
}
#home {
  height: 100vh;
  border: 1px solid black;
  background-image: url('~@/assets/jumbotronback.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
#layout{
  background-color: rgba(235, 235, 235, 0.411);
}
  #articles {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 1% 20% 1% 20%;
    border: 1px solid black;
    background-color: white;
    .card{
  appearance: none;
  outline: none;
  margin: 4%;
  padding: 1%;
  display: inline-block;
  font-size: 20px;
  border-radius: 10px;
  border: 3px solid #192c4adc;
  background-color:#fff;
  color: #fff;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.4s ease-out;
  &:hover{
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
    transform: scale(1.02);
  }
      img{
        max-width: 500px;
        max-height: 500px;
      }
      
    }
    .author{
      color: #467edadc;
    }
    .datetime{
        float: right;
      }
    }
    .content{
      display: flex;
      flex-wrap: wrap;
    }
  h2 {
    margin-top: 5%;
    margin-block-start: 0%;
    margin-block-end: 0%;
    font-size: 40px;
    
  }
  h3 {
    font-size: 25px;
    text-align: center;
  }
  a {
    text-decoration: none;
    color: #192c4adc;
  }

  @media screen and (max-width: 320px){
 #articles {
    margin: 1% 5% 4% 5%;
    .card{
  padding: 2%;
  font-size: 16px;
  &:hover{
    transform: scale(1.0);
  }
      img{
        max-width: 250px;
        max-height: 250px;
      }
      
    }
    .author{
      color: #3c77d6;
    }
    
  h3 {
    font-size: 20px;
    text-align: center;
  }
}
  h2 {
    font-size: 30px;

  }
  }
</style>
