<template>
  <div id="home">
    <h2>Panel Admin</h2>
    <div id="article">
      <div v-for="article in articles" :key="article.title">
        <h3>{{ article.title }}</h3>
        <img :src="article.imageUrl" alt="">
        <div class="actions">
          <router-link class="router-link" :to=" {name: 'Article', params: {id: article.idArticle}} ">Voir</router-link>
          <router-link class="router-link" :to=" {name: 'EditArticle', params: {id: article.idArticle}} ">Modifier</router-link>
          <button v-on:click="deleteArticle(article)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['articles'])
  },
  methods: {
    deleteArticle(article) {
      let response = confirm(`Etes vous certains de vouloir supprimer l'article "${article.title}" ?`);
      if (response){
        this.$store.dispatch("deleteArticle", article);
        window.location.reload();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#home{
  margin-top: 10%;
}
#article {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 3%;
  .actions{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
  appearance: none;
  outline: none;
  margin: 4%;
  padding: 2%;
  display: inline-block;
  font-size: 25px;
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
  .router-link{
  appearance: none;
  outline: none;
  margin: 4%;
  padding: 2%;
  display: inline-block;
  font-size: 25px;
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
  a {
    text-decoration: none;
    color: black;
  }
  img{
   max-width: 500px;
   max-height: 300px;
  }
}
  h2{
    font-size: 35px;
  }
  h3{
    font-size: 30px;
    text-align: center;
  }
@media screen and (max-width: 1024px){
#home{
  margin-top: 20%;
}
#article{
  flex-direction: column;
  flex-wrap: nowrap;
  margin-bottom: 10%;
}
h2{
    font-size: 50px;
}

h3{
  font-size: 35px;
}

img{
  max-width: 600px;
  }
}
@media screen and (max-width: 768px){
#home{
  margin-top: 20%;
}
#article{
  flex-direction: column;
  flex-wrap: nowrap;
  margin-bottom: 10%;
}
}
@media screen and (max-width: 425px){
#home{
  margin-top: 40%;
}
img{
  width: 300px;
  }
h2{
    font-size: 25px;
}

h3{
  font-size: 20px;
}
#article{
.router-link{
  font-size: 20px;
}
button{
  font-size: 20px;
}
}
}
@media screen and (max-width: 375px){
#home{
  margin-top: 60%;
}
#article{
  flex-direction: column;
  flex-wrap: nowrap;
  margin-bottom: 10%;
.router-link{
  font-size: 20px;
}
button{
  font-size: 20px;
}
}
h2{
    font-size: 30px;
}

h3{
  font-size: 25px;
}

img{
  width: 250px;
  }
}
</style>
