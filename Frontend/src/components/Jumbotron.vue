<template>
    <div id="jumbotron">
        <h1>Bienvenue sur le site GROUPOMANIA !</h1>
        <p>Ce site est réservé aux employées du groupe. Vous pourrez trouver les actualités sur l'entreprise et également poster des articles</p>
        <p>Nous espérons que cela vous plaira. Pour toutes suggestions en terme d'améliorations de l'interface, faites le nous savoir en cliquant sur le bouton dessous.</p>
        <button href="#">Vos suggestions</button>
    </div>
</template>


<style lang="scss" scoped>
#jumbotron{
    max-width: 100%;
    margin: 16% 10% 5% 10%;
    padding: 2% 5%;
    background-color: rgb(235, 235, 235);
    border: 2px solid #dd1d1dc4;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
    h1{
        text-align: left;
        font-size: 50px;
    }
    p{
        font-size: 20px;
    }
    button{
        background-color: #dd1d1dc4;
        font-size: 25px;
        padding: 2%;
        color: #FFF;
        border-radius: 10px;
        cursor: pointer;
    }
}
@media screen and (max-width: 320px){
    #jumbotron{
        margin: 80% 5% 2% 5%;
    h1{
        font-size: 30px;
    }
    p{
        font-size: 16px;
    }
    button{
        font-size: 20px;
        padding: 2%;
    }
    }

}
</style>