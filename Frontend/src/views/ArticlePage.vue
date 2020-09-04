<template>
    <section class="article">
        <h2>{{ article.title }}</h2>
        <div>{{ article.description }}</div>
        <div>{{ article.contenu }}</div>
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

</style>