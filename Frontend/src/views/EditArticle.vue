<template>
 <div class="grid-container">
  <div class="Actual-Article">
      <h2>Votre Article</h2>
      <label>Titre de votre article</label>
      <p>{{ article.title }} </p>
      <label for="description">Description de votre article</label>
        <p>{{ article.description }}</p>
      <label>Image de l'article</label><br>
      <img :src="article.imageUrl" alt=""><br>
      <label>Contenu de votre article</label>
      <p>{{ article.contenu }} </p>
  </div>
  <div class="Modified-article">
      <h2>Modification de votre article</h2>
      <label for="title">Nouveau Titre</label><br>
      <input type="text" id="title" name="title" v-model="article.title"  required /><br>
      <label for="description">Nouvelle Description</label><br>
      <textarea type="text" id="description" cols="50" rows="5" v-model="article.description" required /><br>
      <label for="contenu">Nouveau Contenu</label><br>
      <editor
        api-key="no-api-key"
        :init="{
          forced_root_block : '',
          force_br_newlines : true,
          force_p_newlines : false,
          height: 500,
          menubar: false,
          mobile: {
            menubar: true,
            width: 318,
          },
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
        }"
        v-model="article.contenu"
      />
      <input class="button" v-on:click="editArticle" type="submit" id="button" value="Modifier mon article" />
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios';
import Editor from "@tinymce/tinymce-vue";

export default {
  data() {
    return {
      file:"",
      title:"",
      description: "",
      contenu:"",
      auteur:"",
    };
  },
    components:{
        Editor,
    },
    computed: {
    ...mapState(["articles"]),
    article() {
      return this.articles.find(
        (article) => article.idArticle == this.$route.params.id
      );
    },
  },
  methods: {
     editArticle(){
      let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
      let formData = new FormData();
      formData.append('title', this.article.title);
      formData.append('description', this.article.description);
      formData.append('contenu', this.article.contenu);
      formData.append('auteur', currentUser.userId);
      axios.put( `http://localhost:3000/articles/modify/${this.$route.params.id}`,
                formData,
                {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
              }
            ).then(() => {
              this.$router.push('/');
              window.location.reload();
         console.log('ARTICLE MODIFIED');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },
  }
}
</script>

<style lang="scss" scoped>
.grid-container {
  margin-top: 11%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 5px 5px;
  grid-template-areas:
    "Actual-Article Actual-Article Modified-article Modified-article"
    "Actual-Article Actual-Article Modified-article Modified-article"
    "Actual-Article Actual-Article Modified-article Modified-article";
}

.Actual-Article { 
    grid-area: Actual-Article;
    margin: 2%; 
    label{
        padding-bottom: 1%;
        font-weight: bold;
        font-size: 20px;
    } 
}

.Modified-article { 
    grid-area: Modified-article;
    margin: 2%; 
    label{
      margin: 1%;
      font-weight: bold;
      font-size: 20px;
    }
    textarea{
      margin: 1%;
      font-size: 18px;
    }
    input{
      margin: 1%;
      width: auto;
      font-size: 18px;
    }
}
.button{
  appearance: none;
  outline: none;
  margin: 6%;
  padding: 2%;
  display: inline-block;
  font-size: 18px;
  border-radius: 10px;
  background-image:linear-gradient(to right, #192c4adc, #467edadc);
  color: #fff;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.4s ease-out;
  &:hover{
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
    transform: scale(1.02);
  }
}
img{
        max-width: 500px;
      }
@media screen and (max-width: 1024px){
.grid-container {
  margin-top: 15%;
  display: flex;
  flex-direction: column;
}
.Actual-Article { 
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    label{
      font-size: 24px;
    }
}
.Modified-article { 
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    textarea{
      margin: 1%;
      width: 80%;
      font-size: 20px;
    }
    label{
      font-size: 24px;
    }
    input{
      width: auto;
      font-size: 22px;
    }
}
img{
  max-width: 550px;
  max-height: 550px;
}
}
@media screen and (max-width: 768px){
.Actual-Article { 
    font-size: 20px;
    label{
      font-size: 20px;
    }
}
.Modified-article { 
    font-size: 20px;
    textarea{
      font-size: 20px;
    }
    label{
      font-size: 20px;
    }
    input{
      font-size: 20px;
    }
}
img{
  max-width: 450px;
  max-height: 450px;
}
}
@media screen and (max-width: 425px){
.grid-container {
  margin-top: 25%;
}
img{
  max-width: 250px;
  max-height: 250px;
}
}
@media screen and (max-width: 375px){
  .grid-container {
  margin-top: 40%;
  display: flex;
  flex-direction: column;
}
.Actual-Article { 
    display: flex;
    flex-direction: column;
    align-items: center;
}
.Modified-article { 
    display: flex;
    flex-direction: column;
    align-items: center;
    textarea{
      margin: 1%;
      width: 80%;
      font-size: 18px;
    }
    input{
      margin: 1%;
      width: auto;
      font-size: 18px;
    }
}
img{
  max-width: 250px;
  max-height: 250px;
}
}
</style>
