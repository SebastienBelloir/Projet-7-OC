<template>
  <div id="heading">
    <h2>Création de votre Article</h2>
    <form>
      <label for="title">Titre de votre article</label>
      <input
        type="text"
        id="title"
        name="title"
        v-model="article.title"
        required
        autocomplete="off"
      />
      <label for="description">Description de votre article</label>
      <input
        type="text"
        id="description"
        v-model="article.description"
        required
        autocomplete="off"
      />
      <label for="myImage">Ajouter une image</label>
      <input type="file" id="myImage" ref="file" v-on:change="handleFileUpload()" accept="image/*" />
      <label for="contenu">Contenu de votre article</label>
      <editor
        api-key="no-api-key"
        :init="{
          forced_root_block : '',
          force_br_newlines : true,
          force_p_newlines : false,
          basicEntities: false,
          height: 600,
          menubar: false,
          selector: 'textarea',
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
      <input class="button"
        v-on:click="createArticle"
        type="button"
        value="Publier mon article"
      />
    </form>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue"; // importation de Editor qui nous permet d'avoir la fenêtre d'édition de l'article.
import axios from 'axios'; // importation d'axios qui nous permet de communiquer avec l'API.


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
  computed: {
  articles() {
      return this.$store.state.articles;
    },
  },
  methods: {
    createArticle() { // création de l'article
      // let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('title', this.article.title);
      formData.append('description', this.article.description);
      formData.append('contenu', this.article.contenu);
      console.log(formData)
      axios.post( 'http://localhost:3000/articles/createArticle',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
              }
            ).then(() => {
              this.$router.push('/');
              window.location.reload();
              console.log('ARTICLE CREATED');
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
    border-bottom: 4px solid #192c4adc;
  }
  #description {
    text-align: center;
    border: none;
    outline: 0;
    border-bottom: 4px solid #192c4adc;
  }
  #myImage {
    align-items: center;
    justify-content: center;
  }
}
  .button{
  appearance: none;
  outline: none;
  margin: 4%;
  padding: 1%;
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
  }
}
#heading{
    margin-top: 10%;
  }
@media screen and (max-width: 1024px){
#heading{
    margin-top: 20%;
    font-size: 20px;
  }
form{
  label {
    font-size: 30px;
  }
  }
.button{
  font-size: 24px;
}
}
@media screen and (max-width: 768px){
#heading{
    margin-top: 25%;
    font-size: 18px;
  }
}
@media screen and (max-width: 425px){
#heading{
    margin-top: 40%;
    font-size: 18px;
  }
  form{

  label {
    font-size: 18px;
  }
  }
}
@media screen and (max-width: 375px){
#heading{
    margin-top: 50%;
    font-size: 16px;
  }
  form{

  label {
    font-size: 20px;
  }
  }
  
}

</style>
