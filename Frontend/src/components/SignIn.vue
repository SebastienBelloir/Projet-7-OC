<template>
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
            <button class="invert" id="signUp" @click="signUp = !signUp">Créer mon compte</button>
          </div>
        </div>
      </div>
      <form class="sign-up" action="#">
        <h2>Créer mon compte</h2>
        <div>Utiliser votre email comme identifiant</div>
        <input type="text" placeholder="Nom" required />
        <input type="text" placeholder="Prénom" required />
        <input type="email" placeholder="Email" required />
        <input type="email" placeholder="Département/secteur" />
        <input type="password" placeholder="Mot de passe" required />
        <button>Créer mon compte</button>
      </form>
      <form class="sign-in" action="#">
        <h2>Se connecter</h2>
        <div>Utiliser votre email et mot de passe</div>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Mot de passe oublié ?</a>
        <button>Valider</button>
      </form>
    </div>
  <button id="button-guests" type="button" class="btn btn-outline-info btn-md">Continuer en tant qu'invité</button>
  </article>
</template>

<script>
export default {
  data: () => {
    return {
      signUp: false,
    };
  },
};
</script>

<style lang="scss" scoped>
article {
  margin-top: 7%;
  display: flex;
  flex-direction:column;
}
  .container {
    position: relative;
    width: 768px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.5s ease-in-out;
      z-index: 100;
    }
    .overlay {
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      background:  #17a2b8;
      color: #fff;
      transform: translateX(0);
      transition: transform 0.5s ease-in-out;
    }
    @mixin overlays($property) {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      padding: 70px 40px;
      width: 50%;
      height: 100%;
      text-align: center;
      transform: translateX($property);
      transition: transform 0.5s ease-in-out;
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
    color: #17a2b8;
    text-decoration: none;
    margin: 15px 0;
    font-size: 1rem;
  }
  button {
    border-radius: 20px;
    border: 1px solid #fff;
    background-color: #17a2b8;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.1s ease-in;
    &:active {
      transform: scale(0.9);
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
    color: #17a2b8;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 90px 60px;
    width: 50%;
    height: 100%;
    text-align: center;
    background: #fff;
    transition: all 0.5s ease-in-out;
    div {
      font-size: 1rem;
    }
    input {
      background-color: #eee;
      border: none;
      padding: 15px 15px;
      margin: 6px 0;
      width: 100%;
      border-radius: 15px;
      border-bottom: 1px solid #ddd;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff,
        0 1px 0 #fff;
      overflow: hidden;
      &:focus {
        outline: none;
        background-color: #fff;

    }
  }
}
#button-guests{
margin: 5% 25% 0% 25%;
box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}
input::placeholder {
  font-size: 16px;
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
    animation: show 0.5s;
  }
  .overlay-container {
    transform: translateX(-100%);
  }
  .overlay {
    transform: translateX(50%);
  }
  .overlay-left {
    transform: translateX(0%);
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