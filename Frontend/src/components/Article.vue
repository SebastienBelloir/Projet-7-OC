<template>
<div>
    
            <div id="article" v-for="article in articles" :key="article.idArticle">
                <div id="card">
                    <div id="users" v-for="user in users" :key="user.idUser">
                        <div id="user" v-if="article.auteur_id === user.idUser">
                            <div class="author">{{ user.prenom }} {{ user.nom }}</div>
                            <span id="datetime">{{ article.datetime | formatDate }}</span>
                        </div>
                    </div>
                <router-link :to="{ name: 'Article', params: { id: article.idArticle } }">
                        <div id="image-container">
                            <img :src="article.imageUrl" alt="">
                        </div>
                        <h3 class="title">{{ article.title }}</h3>
                        <div class="description">{{ article.description }}</div>
                </router-link>
            </div> 
        </div>
    
</div>
</template>

<script>
import { mapState } from 'vuex';

    export default {
        computed: {
        ...mapState(["articles", "users", "sharedArticles"]), 
            allArticles() {
      return this.$store.state.allArticles;
    },
    },
}
</script>

<style lang="scss" scoped>
#article{
    background-color: #fff;
    border: 3px solid #2f70dadc;
    padding: 25px;
    margin-bottom: 5%;
    max-width: 90%;
    font-size: 25px;
    text-align: center;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    cursor: pointer;
    transition: 0.4s ease-out;
    &:hover{
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
    transform: scale(1.01);
    }
    a{
        text-decoration: none;
        color: black;
    }
}

img{
    margin-top: 15px;
    max-width: 600px;
    max-height: 600px;
}
#user{
    .author{
        float: left;
        color: #2f70dadc;
        padding-bottom: 15px;
    }
    #datetime{
        float: right;
        padding-bottom: 15px;
        color: #2f70dadc;
  }
}
  
@media screen and (max-width: 375px){
#article{
    font-size: 20px;
    
}
img{
    max-width: 200px;
    max-height: 200px;
}
}
</style>