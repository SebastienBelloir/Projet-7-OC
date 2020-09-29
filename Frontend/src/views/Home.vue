<template>
<div id="wrapper">
  <div id="home">
    <Jumbotron v-if="loggedIn" />
    <SignIn v-if="!loggedIn"/>
    </div>
    <div id="layout">
    <div>
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
        <div id="image-container">
          <img :src="eachArticle.imageUrl" alt="">
          </div>
        </div>
          <h3 class="title">{{ eachArticle.title }}</h3>
        <div class="description">
          {{ eachArticle.description }}
        </div>
        </router-link>
        </div>
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
  padding-top: 30px;
  padding-bottom: 30px;
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
  width: 90%;
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
    transform: scale(1.01);
  }
  #image-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
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

@media screen and (max-width: 1024px){
#articles{
   margin: 1% 10% 1% 10%;
.card{
  font-size: 24px;
  width: 650px;
}
}
}
@media screen and (max-width: 768px){
#articles {
  .card{
  padding: 1%;
  font-size: 18px;
  width: 450px;
img{
        max-width: 250px;
        max-height: 250px;
      }
    }
  }
}  
@media screen and (max-width: 375px){
 #articles {
    margin: 10px 10px 10px 10px;
    max-width: 350px;
    .card{
  padding: 2%;
  font-size: 16px;
  max-width: 250px;
  &:hover{
    transform: scale(1.0);
  }
      img{
        max-width: 200px;
        max-height: 250px;
      }
      
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
