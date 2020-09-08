<template>
  <div>
    <h2>Création de votre Article</h2>
    <form>
      <label for="title">Titre de votre article</label>
      <input
        type="text"
        id="title"
        name="title"
        v-model="article.title"
        required
      />
      <label for="description">Description de votre article</label>
      <input
        type="text"
        id="description"
        v-model="article.description"
        required
      />
      <label for="myImage">Ajouter une image</label>
      <input type="file" id="myImage" ref="file" v-on:change="handleFileUpload()" accept="image/*" />
      <label for="contenu">Contenu de votre article</label>
      <editor
        api-key="no-api-key"
        :init="{
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
      <input
        v-on:click="createArticle"
        type="button"
        value="Publier mon article"
      />
    </form>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import axios from 'axios';


export default {
  data() {
    return {
      file:"",
      article:{
      title:"",
      description: "",
      contenu:"",
      auteur_id:""
      }
    };
  },
  components: {
    Editor,
  },
  methods: {
    createArticle() {
      let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('title', this.article.title);
      formData.append('description', this.article.description);
      formData.append('contenu', this.article.contenu);
      formData.append('auteur_id', currentUser.userId);
      axios.post( 'http://localhost:3000/articles/createArticle',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
        console.log(this.file)
      }
  }
}

</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    text-align: center;
    font-size: 25px;
  }
  display: flex;
  flex-direction: column;
  textarea {
    margin: 2% 15% 2% 15%;
    font-size: 20px;
  }
  input {
    max-width: 80%;
    box-sizing: border-box;
    margin: 2% 20% 2% 20%;
    padding: 1%;
    font-size: 20px;
  }
  #title {
    text-align: center;
    border: none;
    outline: 0;
    border-bottom: 4px solid #17a2b8;
  }
  #description {
    text-align: center;
    border: none;
    outline: 0;
    border-bottom: 4px solid #17a2b8;
  }
  #auteur {
    text-align: center;
    border: none;
    outline: 0;
    border-bottom: 4px solid #17a2b8;
  }
  #myImage {
    align-items: center;
    justify-content: center;
  }
}
</style>
