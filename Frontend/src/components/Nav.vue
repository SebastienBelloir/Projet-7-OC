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
      <router-link to="/">Accueil</router-link>
      <router-link to="/about">A propos</router-link>
      <router-link to="/article/createarticle" v-if="loggedIn">Rédiger un article</router-link>
      <router-link to="/admin/home" v-if="loggedIn && isAdmin" >Admin</router-link>
      <router-link to="/" v-if="loggedIn" v-on:click="logoutUser">Se déconnecter</router-link>
      <router-link to="/signin" v-if="!loggedIn">Connexion</router-link>
    </div>
  </nav>
</template>

<script>


export default {
  computed: {
    isAdmin(){
      return this.$store.getters.isAdmin
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },

  methods: {
    // getCurrentUser(){
    //   let currentUser = window.localStorage.getItem('currentUser');
    //   console.log(currentUser)
    //   return currentUser;
    // },
    logoutUser() {
      this.$store.dispatch("logoutUser");
    },
    // loginUser(user) {
    //   this.$store.dispatch("loginUser", user);
    // },
  },
};
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #192c4adc;
  font-size: 20px;
  height: 11vh;
  figure {
    margin-right: 30%;
  }
  .nav-list{
    display: flex;
    margin: 2%;
  }
  #userLoggedIn{
    display: flex;
    padding: 10px;
    #user{
      color: white;
      margin: 10px;
    }
  }
}
</style>
