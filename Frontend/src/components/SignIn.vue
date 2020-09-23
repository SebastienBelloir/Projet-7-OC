<template>
<div>
  <article>
    <div class="container" :class="{'sign-up-active' : signUp}">
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-left">
            <h2>Bienvenue !</h2>
            <p>Utiliser vos informations de connexion</p>
            <button class="invert" id="signIn" @click="signUp = !signUp">Se connecter</button>
          </div>
          <div class="overlay-right">
            <h2>Bienvenue !</h2>
            <p>Groupomania, la distribution au plus près de chez vous</p>
            <button class="invert" id="signUp" v-on:click="signUp = !signUp">Créer mon compte</button>
          </div>
        </div>
      </div>
      <form class="sign-up">
        <h2>Créer mon compte</h2>
        <div>Utiliser votre email comme identifiant</div>
        <input type="text" placeholder="Nom*" v-model="signupInfo.nom" required />
        <input type="text" placeholder="Prénom*" v-model="signupInfo.prenom" required />
        <input type="email" placeholder="Email*" v-model="signupInfo.email" required />
        <input type="text" placeholder="Département/secteur" v-model="signupInfo.departement_entreprise" />
        <input type="password" placeholder="Mot de passe*" v-model="signupInfo.password" required />
        <button id="btn" v-on:click="registerUser" >Créer mon compte</button>
        <p class="mendatory">Les champs comportant une * sont obligatoires</p>
      </form>
      <form class="sign-in" @submit.prevent="login">
        <h2>Se connecter</h2>
        <div>Utiliser votre email et mot de passe</div>
        <input type="email" placeholder="Email" v-model="userInfo.email" required/>
        <input type="password" placeholder="Password" v-model="userInfo.password"  required/>
        <a href="#">Mot de passe oublié ?</a>
        <button v-on:click="login" >Valider</button>
      </form>
    </div>
  </article>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        signUp:false,
        userInfo: {
        email: '',
        password: ''
        },
        signupInfo:{
          nom: '',
          prenom: '',
          email: '',
          departement_entreprise: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        this.$store.dispatch('retrieveToken', {
          email: this.userInfo.email,
          password: this.userInfo.password
        })
        .then(() => {
          this.$router.push('/');
          window.location.reload();
        })
    },
      registerUser() {
        let user =  this.$store.dispatch('registerUser', this.signupInfo);
       if(user.error) {
         alert(user.error)
       }else {
         alert('Création de compte réussie ' + user.prenom);
        window.location.reload();
        this.$router.push('/');
       }
      },
    }
  }
</script>

<style lang="scss" scoped>
article{
    margin-top: 15%;
    display: flex;
    justify-content: center;
}
  .container {
    position: relative;
    width: 768px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 30px #FFFF,
                0 10px 10px #FFFF;
    background: linear-gradient(to bottom, #192c4ab4, #192c4ab4);
    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform .5s ease-in-out;
      z-index: 100;
    }
    .overlay {
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      background: #192c4ab4;
      color: #fff;
      transform: translateX(0);
      transition: transform .5s ease-in-out;
    }
    @mixin overlays($property) {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      padding: 70px 40px;
      width: calc(50% - 80px);
      height: calc(100% - 140px);
      text-align: center;
      transform: translateX($property);
      transition: transform .5s ease-in-out;
    }
    .overlay-left {
      @include overlays(-20%);
    }
    .overlay-right {
      @include overlays(0);
      right: 0;
    }
  }
  h2 {
    margin: 0;
  }
  p {
    margin: 20px 0 30px;
  }
  a {
    color: #222;
    text-decoration: none;
    margin: 15px 0;
    font-size: 1rem;
  }
  button {
    border-radius: 20px;
    border: 1px solid #192c4ab4;
    background-color: #192c4ab4;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .1s ease-in;
    &:active {
      transform: scale(.9);
    }
    &:focus {
      outline: none;
    }
  }
  button.invert {
    background-color: transparent;
    border-color: #fff;
  }
  form {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 90px 60px;
    width: calc(50% - 120px);
    height: calc(100% - 180px);
    text-align: center;
    background: linear-gradient(to bottom, #efefef, #ccc);
    transition: all .5s ease-in-out;
    div {
      font-size: 1rem;
    }
    input {
      background-color: #eee;
      border: none;
      padding: 15px 15px;
      margin: 6px 0;
      width: calc(100% - 30px);
      border-radius: 15px;
      border-bottom: 1px solid #ddd;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
                        0 -1px 1px #fff, 
                        0 1px 0 #fff;
      overflow: hidden;
      &:focus {
        outline: none;
        background-color: #fff;
      }
    }
  }
  .sign-in {
    left: 0;
    z-index: 2;
  }
  .sign-up {
    left: 0;
    z-index: 1;
    opacity: 0;
  }
  .sign-up-active {
    .sign-in {
      transform: translateX(100%);
    }
    .sign-up {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show .5s;
    }
    .overlay-container {
      transform: translateX(-100%);
    }
    .overlay {
      transform: translateX(50%);
    }
    .overlay-left {
      transform: translateX(0);
    }
    .overlay-right {
      transform: translateX(20%);
    }
  }
  @keyframes show {
    0% {
      opacity: 0;
      z-index: 1;
    }
    49% {
      opacity: 0;
      z-index: 1;
    }
    50% {
      opacity: 1;
      z-index: 10;
    }
  }
</style>