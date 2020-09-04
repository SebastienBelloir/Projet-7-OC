<template>
    <nav id="nav">
        <figure>
           <a href="../"><img src="../assets/icon-left-font-monochrome-white.svg" height="50px" alt="Logo Groupomania"></a>
        </figure>
        <div class="nav-list">
        <router-link to="/">Accueil</router-link>
        <router-link to="/about">A propos</router-link>
        <router-link to="/signin">Connexion</router-link>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
#nav{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #17a2b8;
    font-size: 20px;
    figure{
        margin-right: 30%;
    }
}
</style>