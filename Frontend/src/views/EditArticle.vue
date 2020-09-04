<template>
 <div class="grid-container">
  <div class="Actual-Article">
      <h2>Votre Article</h2>
      <label>Titre de votre article</label>
      <p>{{ article.title }} </p>
      <label for="description">Description de votre article</label>
        <p>{{ article.description }}</p>
      <label>Ajouter une image</label>
      <p>{{ article.image }}</p>
      <label>Contenu de votre article</label>
      <p>{{ article.contenu }} </p>
  </div>
  <div class="Modified-article">
      <h2>Modification de votre article</h2>
      <label for="title">Nouveau Titre</label><br>
      <input type="text" id="title" name="title" required /><br>
      <label for="description">Nouvelle Description</label><br>
      <textarea type="text" id="description" cols="87" rows="5" required /><br>
      <label for="myImage">Nouvelle Image</label><br>
      <input type="file" id="myImage" name="myImage" accept="image/*" /><br>
      <label for="contenu">Nouveau Contenu</label><br>
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
      <input v-on:click="editArticle" type="submit" id="button" value="Publier mon article" />
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";
import Editor from "@tinymce/tinymce-vue";

export default {
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
     async editArticle(){
           await this.$store.dispatch('editArticle', this.article)
      }
  }
};
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
</style>
