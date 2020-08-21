<template>
    <section class="article">
        <h2>{{ article.name }}</h2>
        <div class="article-details">
            <img :src="require(`@/assets/${article.image}`)" :alt="article.name">
           <p>{{ article.description }}</p> 
        </div>
    </section>
</template>

<script>
import store from "@/store.js";
export default {
    data(){
        return {
            articleSlug:this.$route.params.slug
        }
    },
    computed:{
      article(){
          return store.articles.find(
              article => article.slug === this.articleSlug
          )
      }  
    }
}
</script>

<style lang="scss" scoped>
img{
    max-width: 600px;
    height: auto;
    width: 100%;
    max-height: 400px;
    margin-left: 20px;
}
.article-details{
    display: flex;
    justify-content: space-between;
}
p{
    margin: 0 80px;
    font-size: 20px;
    text-align: left;
}
</style>