<template>
    <div id="wrapper">
        <div id="home">
            <Jumbotron v-if="loggedIn" />
            <SignIn v-if="!loggedIn" />
        </div>
        <div id="background">
            <div id="layout" v-if="loggedIn">
                <h2 v-if="loggedIn">Fil d'actualité</h2>
                <div
                    id="article"
                    v-for="article in allArticles"
                    :key="article.idArticle"
                >
                    <Article :content="article" />
                </div>
            </div>
        </div>
        <Footer v-if="loggedIn" />
    </div>
</template>

<script> // importation des composants nécéssaires.
import SignIn from "@/components/SignIn.vue";
import Jumbotron from "@/components/Jumbotron.vue";
import Article from "@/components/Article.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";

export default {
    name: "Home",
    components: {
        Jumbotron,
        SignIn,
        Article,
        Footer
    },
    computed: {
        ...mapState(["articles", "sharedArticles", "currentUser", "users"]),
        allArticles() {
            return this.$store.state.allArticles;
        },
        articles() {
            return this.$store.state.articles;
        },
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    }
};
</script>

<style lang="scss" scoped>
body {
    margin: 0;
    padding: 0;
}
#home {
    height: 100vh;
    border: 1px solid black;
    background-image: url("~@/assets/jumbotronback.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}
#article {
    background-color: #fff;
    border: 3px solid #2f70dadc;
    padding: 15px;
    margin: 30px;
    max-width: 90%;
    font-size: 25px;
    text-align: center;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    cursor: pointer;
    transition: 0.4s ease-out;
    &:hover {
        box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
        transform: scale(1.01);
    }
    a {
        text-decoration: none;
        color: black;
    }
}
#background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(240, 240, 240, 0.76);
}
#layout {
    background-color: #fff;
    border: 1px solid black;
    margin-top: 4%;
    margin-bottom: 10%;
    padding: 0% 5% 5% 5%;
}
#user {
    .author {
        float: left;
        color: #2f70dadc;
        padding-bottom: 15px;
    }
    #datetime {
        float: right;
        padding-bottom: 15px;
        color: #2f70dadc;
    }
}
img {
    margin-top: 15px;
    max-width: 600px;
    max-height: 600px;
}

h2 {
    font-size: 40px;
    margin-top: 5%;
}
@media screen and (max-width: 1024px) {
    #articles {
        margin: 1% 10% 1% 10%;
        .card {
            font-size: 24px;
            width: 650px;
        }
    }
}
@media screen and (max-width: 768px) {
    #articles {
        .card {
            padding: 1%;
            font-size: 18px;
            width: 450px;
            img {
                max-width: 250px;
                max-height: 250px;
            }
        }
    }
}
@media screen and (max-width: 425px) {
    #article {
        font-size: 20px;
        max-width: 300px;
    }
    #layout {
    padding: 0%;
}
}
@media screen and (max-width: 375px) {
    #article {
        font-size: 20px;
        width: 210px;
    }
    img {
        max-width: 200px;
        max-height: 200px;
    }
}
</style>
