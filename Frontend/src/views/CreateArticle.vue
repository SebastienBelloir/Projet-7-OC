<template>
    <div>
        <h2>Création de votre Article</h2>

        <form action="POST">
            <label for="title">Titre de votre article</label>
            <input type="text" id="title" required>
            <label for="description">Description de votre article</label>
            <input type="text" id="description" required>
            <label for="contenu">Contenu de votre article</label>
            <textarea name="text" id="contenu" cols="30" rows="20"></textarea>
            <label for="auteur">Auteur</label>
            <input type="text" id="auteur" required>
            <input @click="createArticle " type="button" value="Publier mon article"> 
        </form>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
form{
    label{
        text-align: center;
    }
    display: flex;
    flex-direction: column;
    textarea{
        margin: 2% 15% 2% 15%;
        font-size: 20px;
    }
    input{
        max-width: 80%;
        box-sizing: border-box;
        margin: 2% 20% 2% 20%;
        padding: 1%;
        font-size: 20px; 
    }
     #title{  
        text-align: center;
        border: none;
        outline: 0;
        border-bottom: 4px solid #17a2b8; 
     }
     #description{  
        text-align: center;
        border: none;
        outline: 0;
        border-bottom: 4px solid #17a2b8; 
     }
     #auteur{  
        text-align: center;
        border: none;
        outline: 0;
        border-bottom: 4px solid #17a2b8; 
     }
}
</style>