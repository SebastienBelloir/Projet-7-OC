<template>
  <div>
    <h2>Création de votre Article</h2>
      <form action="">
      <label for="title">Titre de votre article</label>
      <input type="text" id="title" name="title" required />
      <label for="description">Description de votre article</label>
      <input type="text" id="description" required />
      <label for="myImage">Ajouter une image</label>
      <input type="file" id="myImage" name="myImage" accept="image/*" />
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
      />
      <input v-on:click="createArticle" type="submit" value="Publier mon article" />
   </form>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  data(){
    return {
      article: {}
    }
  },
  components: {
    Editor,
  },
  methods: {
    createArticle() {
      this.$store.dispatch('createArticle', this.article);
      
    },
  }
};
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
  #myImage{
    align-items: center;
    justify-content: center;
  }
}
</style>
