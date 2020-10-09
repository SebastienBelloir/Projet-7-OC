<template>
  <header>
    <figure>
      <a href="../"
        ><img
          src="../assets/icon-left-font-monochrome-white.svg"
          height="50px"
          alt="Logo Groupomania"
      /></a>
    </figure>
    <div id="hamburger">
      <div id="hamburger-content">
        <nav>
          <ul>
            <li><router-link class="ul-items" to="/admin/home" v-if="loggedIn && isAdmin === '1'" >Admin</router-link></li>
            <li> <router-link class="ul-items" v-if="loggedIn" to="/">Accueil</router-link></li>
            <li><router-link class="ul-items" to="/article/createarticle" v-if="loggedIn">Rédiger un article</router-link></li>
            <li><router-link class="ul-items" to="/MyProfil" v-if="loggedIn" >Mon Profil</router-link></li>
            <button id="logoutButton" v-if="loggedIn" v-on:click="logoutUser">Se déconnecter</button>
          </ul>
        </nav>
      </div>
      <button id="hamburger-button" @click="hamburgerMenu">&#9776;</button>
      <div id="hamburger-sidebar">
        <div id="hamburger-sidebar-body">
        <nav>
          <ul>
            <li><router-link class="ul-items" to="/admin/home" v-if="loggedIn && isAdmin === '1'" >Admin</router-link></li>
            <li> <router-link class="ul-items" v-if="loggedIn" to="/">Accueil</router-link></li>
            <li><router-link class="ul-items" to="/article/createarticle" v-if="loggedIn">Rédiger un article</router-link></li>
            <li><router-link class="ul-items" to="/MyProfil" v-if="loggedIn" >Mon Profil</router-link></li>
            <button id="logoutButton" v-if="loggedIn" v-on:click="logoutUser">Se déconnecter</button>
          </ul>
        </nav>
        </div>
      </div>
      <div id="hamburger-overlay"></div>
    </div>
  </header>
</template>

<script>


export default {
  computed: {
    isAdmin(){ // nous permet de savoir si l'utilisateur est un admin grâce aux infos présente dans le store
      return this.$store.state.isAdmin
    },
    loggedIn() { // nous permet de savoir si l'utilisateur est connecté grâce au getter LoggedIn qui vient vérifier si l'utilisateur à bien un token
      return this.$store.getters.loggedIn
    }
  },

  methods: {
    logoutUser() { // méthode de deconnexion de l'utilisateur => fait appel à la méthode présente dans le store
      this.$store.dispatch("logoutUser");
      },
      hamburgerMenu() { // méthode qui nous permet d'afficher le menu mobile.
        let sidebarBody = document.querySelector('#hamburger-sidebar-body');
        let button = document.querySelector('#hamburger-button');
        let overlay = document.querySelector('#hamburger-overlay');
        let activatedClass = 'hamburger-activated';
        button.addEventListener('click', function(e) {
          e.preventDefault();
          this.parentNode.classList.add(activatedClass);
          sidebarBody.style.display = "block";
        })
        overlay.addEventListener('click', function(e){
          e.preventDefault();
          this.parentNode.classList.remove(activatedClass);
        })
      }
    },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #192c4adc;
  font-size: 20px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
}
  ul{
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    white-space: nowrap;
    li{
      margin-right: 20px;
      margin-left: 20px;
      a{
        text-decoration: none;
        color: white;
      }
    }
  }
#hamburger, #hamburger-content{
  display: inline;
}

#hamburger-button{
  display: none;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 35px;
  padding: 0;
  vertical-align: top;
  line-height: 47px;
  margin-right: 32px;
  // float: right;
}

#hamburger-overlay{
  display: none;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
}

#hamburger-sidebar{
  display: none;
  position: fixed;
  width: 80%;
  z-index: 20;
  height: 100%;
  top: 0;
  left: 0;
  background: #192c4adc;
  transform: translateX(-100%);
  transition: transform .2s ease-out;
}

#hamburger-sidebar li {
  display: block;
}

#hamburger-sidebar-body{
  padding: 16px 8px;
}

#hamburger-sidebar-body .button{
  display: block;
}
button{
        background-color: #dd1d1dc4;
        font-size: 20px;
        padding: 1%;
        margin-right: 10px;
        color: #FFF;
        border-radius: 10px;
        cursor: pointer;
    }
@media screen and (max-width: 1024px){
header{
  font-size: 30px;
} 

ul {
  display: none;
}
#hamburger-content{
  display: none;
}
#hamburger-button{
  font-size: 40px;
}
#hamburger-button, #hamburger-sidebar, .hamburger-activated #hamburger-overlay{
  display: block;
}
.hamburger-activated #hamburger-sidebar {
  transform: translateX(0);
}

.hamburger-activated #hamburger-sidebar ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 30px;
}

.hamburger-activated #hamburger-sidebar li{
  margin-top: 15px;
  margin-bottom: 15px;
}
figure {
    img{
      margin: auto;
      width: 270px;
    }
  }
button{
    font-size: 30px;   
    }
}
@media screen and (max-width: 768px){
header{
  font-size: 25px;
}
button{
    font-size: 25px;   
    }
}
@media screen and (max-width: 375px){
h1{
font-size: 42px;
line-height: 56px;
}
#hamburger-button{
  font-size: 30px;
}
figure {
    img{
      margin: auto;
      width: 180px;
    }
  }
  
  }
</style>
