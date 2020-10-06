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
        :to="{ name: 'EditArticle', params: { id: article.idArticle } }"
        >Modifier</router-link
      >
      <button v-on:click="showModal = true">Partager</button>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal" v-on:click="showModal = false"></div>
      </transition>
      <transition name="slide" appear>
        <div class="modal" v-if="showModal">
          <router-link id="profil" :to="{ name: 'MyProfil', params: { id: currentUser.userId } }">{{ currentUser.prenom }} {{ currentUser.nom }}</router-link><br>
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
      <button class="delete" v-if="article.shared && article.sharedBy === userId"  v-on:click="deleteSharedArticle(article)">Supprimer</button>
      <button class="delete" v-if="article.auteur_id === userId" v-on:click="deleteArticle(article)">Supprimer</button>
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
            return this.$store.state.allArticles.find(article => article.idArticle == this.$route.params.id) || {}
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
                // this.$router.push('/');
                // window.location.reload();
            }
        },
        deleteSharedArticle(article) {
            let response = confirm(`Etes vous certains de vouloir supprimer votre partage de l'article "${article.title}" ?`);
            if (response){
                this.$store.dispatch("deleteSharedArticle", article);
                this.$router.push('/');
                window.location.reload();
            }
        },
        shareArticle() {
      let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
      axios.post( 'http://localhost:3000/sharedarticles/sharearticle',
                {
                  sharedIdUser: currentUser.userId,
                  idArticle: this.article.idArticle,
                  commentaire: this.sharedArticle.commentaire
                },
                {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
              }
            ).then(() => {
              this.$router.push('/');
              window.location.reload();
         console.log('ARTICLE PARTAGE');
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
  margin: 10% 2% 0% 2%;
  font-size: 18px;
  
  h2 {
    margin: 2%;
    font-size: 35px;
  }
#description {
  margin: 5%;
  font-size: 28px;
}
#content {
  margin: 5%;
  font-size: 24px;
}
}

img {
  max-width: 500px;
  max-height: 500px;
}

.buttons{
  display: flex;
}

button {
  appearance: none;
  outline: none;
  margin: 4%;
  padding: 2%;
  display: inline-block;
  font-size: 30px;
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

.delete{
  appearance: none;
  outline: none;
  margin: 4%;
  padding: 2%;
  display: inline-block;
  font-size: 30px;
  border-radius: 10px;
  background-image:linear-gradient(to right,  #4a1925dc, #e90b0bdc);
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
  padding: 2%;
  display: inline-block;
  font-size: 30px;
  border: 2px solid black;
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
  max-width: 1000px;
  height: 100%;
  max-height: 600px;
  background-color: #FFF;
  border-radius: 16px;
  border: 2px solid black;
  padding: 1%;
}

#profil{
  padding: 2%;
  font-size: 25px;
  
}

.image-modal{
width: 100%;
max-width: 300px;
max-height: 200px;
}

.modal-button{
  float: right;
  margin: 30px 0px -20px -10px;
}

.modal-content{
  display: flex;
}
.shared-article{
  border: 1px solid black;
  padding: 5px;
}

.modal-text{
  padding: 2%;
}

textarea{
  margin: 20px 0px 20px 0px;
  font-size: 20px;
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
@media screen and (max-width: 1024px){
h2 {
    font-size: 40px;
  }
#description {
  font-size: 30px;
}
#content {
  font-size: 25px;
}
button, .delete, .routerlink{
  font-size: 25px;
}
.shared-article{
  margin: 15px;
  font-size: 25px;
}
textarea{
  margin: 20px;
  font-size: 20px;
}
.image-modal{
max-width: 300px;
}
.modal-button{
  margin: 0px 15px 50px 0px;
}
.modal{
  max-width: 800px;
  max-height: 600px;
  background-color: #FFF;
  border-radius: 16px;
  border: 2px solid black;
  padding: 1%;
  margin-top: 2%;
}
#profil{
  font-size: 25px;
}
} 
@media screen and (max-width: 768px){
.article {
  flex-direction: column;
  align-items: center;
  margin: 20% 5% 15% 5%;
    img {
    max-width: 350px;
    max-height: 350px;
    }
    .buttons{
    justify-content: center;
    align-items: center;
    } 
    button {
    font-size: 18px;
    }
h2 {
    font-size: 35px;
  }
#description {
  font-size: 30px;
}
#content {
  font-size: 25px;
}
    .routerlink{
    font-size: 18px;
  }
}
.modal{
  max-width: 680px;
  max-height: 600px;
}
.shared-article{
  margin: 10px;
}
textarea{
  margin: 5px;
}
.image-modal{
width: 200px;
}
.modal-button{
  margin: 20px 15px 0px 0px;
}
}
@media screen and (max-width: 425px){
.article {
  margin: 45% 5% 15% 5%;
    img {
    max-width: 250px;
    max-height: 250px;
    }
h2 {
    font-size: 20px;
  }
#description {
  font-size: 20px;
}
#content {
  font-size: 20px;
}
}
.modal{
  max-width: 380px;
  max-height: 450px;
}
#profil{
  font-size: 18px;
}
textarea{
  margin: 5px;
  font-size: 16px;
  width: 70%;
}
.shared-article{
  margin: 5px;
  font-size: 16px;
}
.image-modal{
width: 150px;
}
.modal-button{
  margin: 10px 15px 0px 0px;
}
}
@media screen and (max-width: 375px){
  .article {
  margin: 70% 5% 15% 5%;
    img {
    max-width: 250px;
    max-height: 250px;
    }
h2 {
    font-size: 25px;
  }
#description {
  font-size: 20px;
}
#content {
  font-size: 20px;
}
}
.modal{
  max-width: 300px;
  max-height: 500px;
}

#profil{
  font-size: 18px;
}
textarea{
  margin: 5px;
  font-size: 16px;
  width: 70%;
}
.shared-article{
  margin: 5px;
  font-size: 16px;
}
.image-modal{
width: 150px;
}
.modal-button{
  margin: 20px 15px 0px 0px;
}
}
</style>
