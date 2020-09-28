<template>
    <div id="wrapper">
        <div id="aboutme" v-if="loggedIn">
        <h2>Mes informations personnelles</h2>
        <p>Nom : {{currentUser.nom}} </p>
        <p>Prénom : {{currentUser.prenom}} </p>
        <p>Adresse Email : {{currentUser.email}} </p>
        <button v-on:click="deleteAccount">Supprimer mon compte</button>
        </div>  
        <div id="second-wrapper" v-if="loggedIn">
            <div id="shared-articles">
                <h3>Articles que vous avez partagé</h3>
                <div v-for="sharedarticle in sharedArticles" :key="sharedarticle.idArticle">
                    <div v-for="article in articles" :key="article.idArticle">
                    <div v-if="sharedarticle.sharedIdUser === currentUser.userId && sharedarticle.idArticle === article.idArticle">
                        <router-link class="solo-article"
          :to="{ name: 'Article', params: { id: article.idArticle } }">{{ article.title }}, {{ sharedarticle.datetime}}
          <img :src="article.imageUrl" alt="">
          </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div id="published-articles">
                <h3 >Articles que vous avez publié</h3>
                <div v-for="article in articles" :key="article.idArticle">
                    <div v-if="article.auteur_id === currentUser.userId"><router-link class="solo-article"
          :to="{ name: 'Article', params: { id: article.idArticle } }">{{ article.title }}, {{ article.datetime }}
          <img :src="article.imageUrl" alt="">
          </router-link>
                </div>
                </div>
            </div>
        </div>
        <div class="footer">
        <Footer />
        </div>
    </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    components: {
            Footer,
    },
    computed: {
        ...mapState(["currentUser", "articles", "sharedArticles"]),
        loggedIn() {
      return this.$store.getters.loggedIn
    }      
    },
    methods: {
    deleteAccount(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        let response = confirm(`Etes vous certains de vouloir supprimer votre compte ?`);
            if (response){
                axios.delete(`http://localhost:3000/users/delete/${currentUser.userId}`);
                localStorage.clear();
                this.$router.push('/');
                window.location.reload();
            }
        }
    },
}

</script>

<style lang="scss" scoped>
#wrapper{
    margin-top: 10%;
    background-color: rgba(235, 235, 235, 0.411);
    #aboutme{
        text-align: center;
        border: 2px solid black;
        margin: 1%;
        background-color: #FFF;
    }
}

button {
  appearance: none;
  outline: none;
  margin: 2%;
  padding: 2%;
  display: inline-block;
  font-size: 20px;
  border-radius: 10px;
  background-image:linear-gradient(to right, #4a1925dc, #e90b0bdc);
  color: #fff;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.4s ease-out;
  &:hover{
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
  }
}

img{
    max-width: 500px;
    max-height: 300px;
}

.solo-article{
    display: flex;
    flex-direction: column;
    margin: 3%;
    padding: 5%;
    border-bottom: 2px solid black;
    
}
#shared-articles{
    border: 2px solid black;
    padding: 2%;
    margin-bottom: 6%;
    background-color: #FFF;
}

#published-articles{
    border:2px solid black;
    padding: 2%;
    margin-bottom: 6%;
    background-color: #FFF;
}
#second-wrapper {
    display: flex;
    margin: 2%;
    justify-content: space-around;
}
.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
}
a {
    text-decoration: none;
    color: #192c4adc;
  }
h3{
    text-decoration: underline;
    text-align: center;
  }

@media screen and (max-width: 320px){
#wrapper{
    margin-top: 50%;
    margin-bottom: 40%;
}
button{
    font-size: 18px;
}
#second-wrapper {
    flex-direction: column;
}
img{
    width: 200px;
}
.solo-article{
    align-items: center;
}

}
</style>