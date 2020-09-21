<template>
  <section class="article">
    <img :src="article.imageUrl" alt="" />
    <div>
      <h2>{{ article.title }}</h2>
      <div id="description">{{ article.description }}</div>
      <div id="content">{{ article.contenu }}</div>
      <router-link v-if="userId === article.auteur_id"
        class="router-link"
        :to="{ name: 'EditArticle', params: { id: article.idArticles } }"
        >Modifier</router-link
      >
      <button v-if="userId === article.auteur_id"  v-on:click="deleteArticle(article)">Supprimer</button>
    </div>
  </section>
</template>

<script>

export default {
    computed: {
        userId(){
            return this.$store.state.currentUser.userId
        },
        article(){
            return this.$store.state.articles.find(article => article.idArticles == this.$route.params.id) || {}
        },
    },
    methods: {
        deleteArticle(article) {
            let response = confirm(`Etes vous certains de vouloir supprimer l'article "${article.title}" ?`);
            if (response){
                this.$store.dispatch("deleteArticle", article);
                this.$router.push('/');
                window.location.reload();
            }
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
}
#description {
  margin: 5% 5% 5% 5%;
}
#content {
  margin: 5% 5% 5% 5%;
}
img {
  max-width: 500px;
}
button {
  margin: 4%;
  padding: 2%;
  font-size: 20px;
  border: 3px solid #192c4adc;
  border-radius: 10px;
  background-color: #192c4adc;
  color: #ffff;
  cursor: pointer;
  -webkit-transform: translate(0px, 0);
  -webkit-transition: -webkit-transform 0.8s ease;
  -moz-transform: translate(0px, 0);
  -moz-transition: -moz-transform 0.8s ease;
  transform: translate(0px, 0);
  transition: -webkit-transform 0.8s ease;
}
button:hover {
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  transform: scale(1.2);
  background-color: red;
}
.router-link {
  border: 3px solid #192c4adc;
  font-size: 20px;
  margin: 4%;
  padding: 2%;
  border-radius: 10px;
  background-color: #192c4adc;
  color: #ffff;
  cursor: pointer;
  -webkit-transform: translate(0px, 0);
  -webkit-transition: -webkit-transform 0.8s ease;
  -moz-transform: translate(0px, 0);
  -moz-transition: -moz-transform 0.8s ease;
  transform: translate(0px, 0);
  transition: -webkit-transform 0.8s ease;
}
.router-link:hover {
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  transform: scale(1.2);
}
a {
  text-decoration: none;
}
</style>
