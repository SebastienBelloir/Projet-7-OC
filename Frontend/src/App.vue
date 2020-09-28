<template>
  <div id="app">
    <Nav/>
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";


export default {
  components: {
    Nav,
  },
   mounted() {
    this.$store.dispatch('loadArticles');
    this.$store.dispatch('loadSharedArticles');
    this.$store.dispatch('loadUsers');
    this.$store.dispatch('loadAllArticles');
  },
  
}
</script>

<style lang="scss">
body{
  margin: 0;
h1{
  text-align: center;
}

h2{
  text-align: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {

  a {
    font-weight: bold;
    color: #FFF;
    padding: 0 10px;
    text-decoration: none;
        &.router-link-exact-active {
        color: #dd1d1d;
      }
    }
  }
}
</style>
