<template>
<div>
  <article>
    <form id="firstBox">
        <h2>Connexion</h2>
        <input type="email" placeholder="Email" v-model="userInfo.email" required/>
        <input type="password" placeholder="Votre mot de passe" v-model="userInfo.password"  required/>
        <a href="#">Mot de passe oublié ?</a><br><br>
        <a href="#" @click="showRegisterForm">Créer un compte</a>
        <button v-on:click="login" >Valider</button>
      </form>
      <form id="box">
        <h2>Créer mon compte</h2>
        <p>Merci d'utiliser votre email professionnel</p>
        <input type="text" placeholder="Nom*" v-model="signupInfo.nom" autocomplete="off" required />
        <input type="text" placeholder="Prénom*" v-model="signupInfo.prenom" autocomplete="off" required />
        <input type="email" placeholder="Email*" v-model="signupInfo.email" autocomplete="off" required />
        <input type="text" placeholder="Département/secteur" v-model="signupInfo.departement_entreprise" />
        <input type="password" placeholder="Mot de passe*" v-model="signupInfo.password" required />
        <button id="btn" v-on:click="registerUser" >Créer mon compte</button>
        <p class="mendatory">Les champs comportant une * sont obligatoires</p>
        <a href="#" @click="showLoginForm">Retour à la page de Connexion</a>
      </form>
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
         alert('Création de compte réussie, merci de vous reconnecter pour avoir accès à toutes les fonctions du site.');
        window.location.reload();
        this.$router.push('/');
       }
      },
      showRegisterForm() {
        const registerForm = document.getElementById('box');
        const loginForm = document.getElementById('firstBox');
        if (registerForm.style.display === "none") {
          registerForm.style.display = "block";
          loginForm.style.display = "none";
        } else {
          registerForm.style.display = "none";
        }
      },
      showLoginForm() {
        const registerForm = document.getElementById('box');
        const loginForm = document.getElementById('firstBox');
        if (loginForm.style.display === "none") {
          loginForm.style.display = "block";
          registerForm.style.display = "none";
        } else {
          loginForm.style.display = "none";
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
body{
  margin: 0;
  padding: 0;
}

#box{
  display: none;
  width: 50%;
  padding: 40px;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  background: #192c4ae3;
  border-radius: 10px;
  h2{
  color: white;
  text-transform: uppercase	;
  font-weight: 500;
}
a{
  text-decoration: none;
  color: white;
  font-size: 25px;
  &:hover{
    color: #dd1d1dc4;
  }
}
input[type = "text"]{  
  border: 0;
  background: none;
  display: block;
  width: 300px;
  margin: 20px auto;
  text-align: center;
  font-size: 25px;
  border: 2px solid #fff;
  padding: 14px 10px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
}
input[type = "password"]{
  border: 0;
  background: none;
  display: block;
  width: 300px;
  margin: 20px auto;
  text-align: center;
  font-size: 25px;
  border: 2px solid #fff;
  padding: 14px 10px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
}
input[type = "email"]{
  border: 0;
  background: none;
  display: block;
  width: 300px;
  margin: 20px auto;
  text-align: center;
  font-size: 25px;
  border: 2px solid #fff;
  padding: 14px 10px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
}
p {
  color: white;
  text-decoration: none;
  font-size: 20px;
}
}
#box input[type = "text"]:focus,#box input[type = "email"]:focus,#box input[type = "password"]:focus {
  width: 400px;
  border-color: #dd1d1dc4;
}

#box button{
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  font-size: 23px;
  font-weight: 700;
  border: 2px solid #dd1d1dc4;
  padding: 20px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
  &:hover{
    color: white;
    background: #dd1d1dc4;
  }
}

#firstBox{
  width: 50%;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  background: #192c4af5;
  border-radius: 10px;
}

#firstBox h2 {
  color: white;
  text-transform: uppercase	;
  font-weight: 500;
}

#firstBox input[type = "email"],#firstBox input[type = "password"] {
  border: 0;
  background: none;
  display: block;
  width: 300px;
  margin: 20px auto;
  text-align: center;
  font-size: 25px;
  border: 2px solid #fff;
  padding: 14px 10px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
}

#firstBox a {
  color: white;
  text-decoration: none;
  padding-top: 10px;
  font-size: 20px;
}

#firstBox p{
  font-size: 30px;
}

#firstBox input[type = "email"]:focus,#firstBox input[type = "password"]:focus {
  width: 400px;
  border-color: #dd1d1dc4;
}

#firstBox button{
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  font-size: 23px;
  font-weight: 700;
  border: 2px solid #dd1d1dc4;
  padding: 20px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
  &:hover{
    color: white;
    background: #dd1d1dc4;
  }
}


@media screen and (max-width: 320px){
#box{
  display: none;
  width: 70%;
  top: 55%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  background: #192c4ae3;
  border-radius: 10px;
a{
  font-size: 16px;
}
input[type = "text"]{  
  width: 150px;
  font-size: 16px;
}
input[type = "password"]{
  width: 150px;
  font-size: 16px;
}
input[type = "email"]{
  width: 150px;
  font-size: 16px;
}
p {
  color: white;
  text-decoration: none;
  font-size: 16px;
}
}

#box input[type = "text"]:focus,#box input[type = "email"]:focus,#box input[type = "password"]:focus {
  width: 200px;
}

#box button{
  font-size: 16px;
}

#firstBox{
  width: 70%;
  a {
  font-size: 16px;
  }
  button{
  font-size: 16px;
}
}

#firstBox input[type = "email"],#firstBox input[type = "password"] {
  width: 150px;
  font-size: 16px;
}

#firstBox input[type = "email"]:focus,#firstBox input[type = "password"]:focus {
  width: 170px;
}
}
</style>