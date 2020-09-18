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
      <textarea type="text" id="description" cols="87" rows="5" v-model="article.description" required /><br>
      <label for="myImage">Nouvelle Image</label><br>
      <input type="file" id="myImage" name="myImage" ref="file" v-on:change="handleFileUpload()" accept="image/*" /><br>
      <label for="contenu">Nouveau Contenu</label><br>
      <editor
        api-key="no-api-key"
        :init="{
          forced_root_block : '',
          force_br_newlines : true,
          force_p_newlines : false,
          height: 500,
          menubar: false,
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
      <input v-on:click="editArticle" type="submit" id="button" value="Publier mon article" />
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
        (article) => article.idArticles == this.$route.params.id
      );
    },
  },
  methods: {
     editArticle(){
      let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('title', this.article.title);
      formData.append('description', this.article.description);
      formData.append('contenu', this.article.contenu);
      formData.append('auteur', currentUser.userId);
      axios.put( `http://localhost:3000/articles/modify/${this.$route.params.id}`,
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(() => {
              // this.$router.push('/');
              // window.location.reload();
         console.log('ARTICLE MODIFIED');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
        console.log(this.file)
      },
  }
}
</script>

<style lang="scss" scoped>
.grid-container {
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
}

.Modified-article { 
    grid-area: Modified-article;
    margin: 2%; 
    label{
        padding: 1%;
    }
    textarea{
        margin: 1%;
        font-size: 18px;
    }
    input{
        height: 3%;
        width: 50%;
        margin: 1%;
        font-size: 18px;
    }
    #button{
        margin: 5% 25% 5% 25%;
    }
    
}
img{
        max-width: 500px;
      }
</style>
