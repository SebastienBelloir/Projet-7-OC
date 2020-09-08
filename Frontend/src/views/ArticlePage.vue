<template>
    <section class="article">
        <h2>{{ article.title }}</h2>
        
        <div id="description">{{ article.description }}</div>
        <div id="content">{{ article.contenu }}</div>
    </section>
</template>

<script>

export default {
    computed: {
        article(){
            return this.$store.state.articles.find(article => article.idArticles == this.$route.params.id) || {}
        }
    }
    
}
</script>

<style lang="scss" scoped>
#description{
    margin: 5% 5% 5% 5%;
}
#content{
    margin: 5% 5% 5% 5%;
}
</style>