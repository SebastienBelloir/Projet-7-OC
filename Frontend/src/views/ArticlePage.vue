<template>
  <section class="article">
    <img :src="article.imageUrl" alt="" />
    <div>
      <h2>{{ article.title }}</h2>
      <div id="description">{{ article.description }}</div>
      <div id="content">{{ article.contenu }}</div>
      <div class="buttons">
      <router-link v-if="userId === article.auteur_id"
        class="routerlink"
        :to="{ name: 'EditArticle', params: { id: article.idArticles } }"
        >Modifier</router-link
      >
      <button v-on:click="showModal = true">Partager</button>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal" v-on:click="showModal = false"></div>
      </transition>
      <transition name="slide" appear>
        <div class="modal" v-if="showModal">
          <router-link :to="{ name: 'MyProfil', params: { id: currentUser.userId } }">{{ currentUser.prenom }} {{ currentUser.nom }}</router-link><br>
          <textarea name="comments" id="comments" cols="60" rows="5" placeholder="Votre commentaire" v-model="sharedArticle.commentaire"></textarea>
          <div class="shared-article">
          <h3 class="modal-title">{{ article.title }}</h3>
          <div class="modal-title">{{ article.description }}</div>
          <div class="modal-content">
          <img class="image-modal" :src="article.imageUrl" alt="">
          <p class="modal-text">{{ article.contenu }}</p>
          </div>
          </div>
          <button class="modal-button" v-on:click="showModal = false" @click="shareArticle">Partager</button>  
        </div>
      </transition>
      <button v-if="userId === article.auteur_id"  v-on:click="deleteArticle(article)">Supprimer</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    data(){
      return{
      showModal: false,
      sharedArticle:{
      sharedIdUser:"",
      idArticle: "",
      commentaire:""
        }
      } 
    },
    computed: {
      ...mapState(["currentUser"]),
        userId(){
            return this.$store.state.currentUser.userId
        },
        article(){
            return this.$store.state.articles.find(article => article.idArticles == this.$route.params.id) || {}
        },
    },
    // mounted() {
    //   this.$store.dispatch("loadUsers");
    // },
    methods: {
        deleteArticle(article) {
            let response = confirm(`Etes vous certains de vouloir supprimer l'article "${article.title}" ?`);
            if (response){
                this.$store.dispatch("deleteArticle", article);
                this.$router.push('/');
                window.location.reload();
            }
        },
        shareArticle() {
      let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
      axios.post( 'http://localhost:3000/sharedarticles/sharearticle',
                {
                  sharedIdUser: currentUser.userId,
                  idArticle: this.article.idArticles,
                  commentaire: this.sharedArticle.commentaire
                },
                {
                headers: {
                    'Content-Type': 'application/json'
                }
              }
            ).then(() => {
              // this.$router.push('/');
              // window.location.reload();
         console.log('ARTICLE CREATED');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },
    }
}
</script>

<style lang="scss" scoped>

.article {
  display: flex;
  margin: 15% 2% 15% 2%;
  h2 {
    margin: 2%;
  }
#description {
  margin: 5%;
}
#content {
  margin: 5%;
}
}

img {
  max-width: 500px;
}

.buttons{
  display: flex;
}

button {
  appearance: none;
  outline: none;
  margin: 4%;
  padding: 1%;
  display: inline-block;
  font-size: 20px;
  border-radius: 10px;
  background-image:linear-gradient(to right, #192c4adc, #467edadc);
  color: #fff;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.4s ease-out;
  &:hover{
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
  }
}

.routerlink{
  appearance: none;
  outline: none;
  margin: 4%;
  padding: 1%;
  display: inline-block;
  font-size: 20px;
  border-radius: 10px;
  background-image:linear-gradient(to right, #192c4adc, #467edadc);
  color: #fff;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.4s ease-out;
  &:hover{
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
  }
}

.modal-overlay{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal{
  position: fixed;
  top: 50%;
  left: 50%;
  transform:translate(-50%, -50%) ;
  z-index: 99;
  width: 100%;
  max-width: 800px;
  height: 100%;
  max-height: 430px;
  background-color: #FFF;
  border-radius: 16px;
  padding: 1%;
}

.image-modal{
width: 100%;
max-width: 300px;
}

.modal-button{
  float: right;
}

.modal-content{
  display: flex;
}

.modal-text{
  padding: 1%;
}

.modal-title{
  text-align: left;
}

.fade-enter-active,
.fade-leave-active{
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to{
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active{
  transition: opacity 1s;
}

.slide-enter,
.slide-leave-to{
  opacity: 0;
}

a {
  text-decoration: none;
}
</style>
