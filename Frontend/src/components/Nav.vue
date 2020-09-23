<template>
  <nav id="nav">
    <figure>
      <a href="../"
        ><img
          src="../assets/icon-left-font-monochrome-white.svg"
          height="50px"
          alt="Logo Groupomania"
      /></a>
    </figure>
    <div class="nav-list">
      <router-link class="ul-items" v-if="loggedIn" to="/">Accueil</router-link>
      <router-link class="ul-items" to="/article/createarticle" v-if="loggedIn">Rédiger un article</router-link>
      <router-link class="ul-items" to="/admin/home" v-if="loggedIn && isAdmin === '1'" >Admin</router-link>
      <router-link class="ul-items" to="/MyProfil" v-if="loggedIn" >Mon Profil</router-link>
      <button class="ul-items" v-if="loggedIn" v-on:click="logoutUser()">Se déconnecter</button>
    </div>
  </nav>
</template>

<script>


export default {
  computed: {
    isAdmin(){
      return this.$store.state.isAdmin
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },

  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser");
      // 
      }
    },
}
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #192c4adc;
  font-size: 20px;
  width: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  figure {
    float: left;
  }
  .nav-list{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

}
button{
        background-color: #dd1d1dc4;
        font-size: 20px;
        padding: 1%;
        color: #FFF;
        border-radius: 10px;
        cursor: pointer;
    }
</style>
