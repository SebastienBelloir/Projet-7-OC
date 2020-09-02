<template>
    <section class="article">
        <h2>{{ article.title}}</h2>
        <div class="article-details">
            
           <p>{{ article.description }}</p>
           <p>{{ article.contenu }}</p> 
        </div>
    </section>
</template>

<script>

export default {
    mounted() {
     this.$store.dispatch('loadArticles')
    },
    computed:{
      article(){
          return this.$store.state.articles.find(
              article => article.idArticles == this.idArticles || {}
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
a{
    text-decoration: none;
}
</style>