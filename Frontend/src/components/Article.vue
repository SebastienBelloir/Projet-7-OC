<template>
    <div>
        <div id="card">
            <div id="first-case" v-for="user in users" :key="user.idUser">
                <div
                    id="user"
                    v-if="content.sharedBy === user.idUser && content.shared"
                >
                    <div class="author">
                        {{ user.prenom }} {{ user.nom }} a partagé
                    </div>
                    <div id="datetime">
                        {{ content.sharedDateTime | formatDate }}
                    </div>
                    <div id="comment">
                        <p><br />{{ content.commentaire }}</p>
                    </div>
                </div>
                <div id="second-case">
                    <div
                        v-if="
                            content.auteur_id === user.idUser && !content.shared
                        "
                    >
                        <div class="author">
                            {{ user.prenom }} {{ user.nom }}
                        </div>
                        <div id="datetime">
                            {{ content.datetime | formatDate }}
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
            <router-link
                :to="{ name: 'Article', params: { id: content.idArticle } }"
            >
                <div id="image-container">
                    <img :src="content.imageUrl" alt="" />
                </div>
                <h3 class="title">{{ content.title }}</h3>
                <div class="description">{{ content.description }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: {
        content: { type: Object, default: () => {} }
    },
    computed: {
        ...mapState(["users", "currentUser", "sharedArticles"]),
        allArticles() {
            return this.$store.state.allArticles;
        },
        allUsers() {
            return this.$store.state.users;
        }
    }
};
</script>

<style lang="scss" scoped>
#article {
    background-color: #fff;
    border: 3px solid #2f70dadc;
    padding: 25px;
    margin-bottom: 5%;
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

img {
    margin-top: 15px;
    max-width: 600px;
    max-height: 600px;
}
#first-case,
#second-case {
    .author,
    .shared-author {
        float: left;
        color: #2f70dadc;
        padding-bottom: 15px;
    }
    #datetime {
        float: right;
        padding-bottom: 15px;
        color: #2f70dadc;
    }
    #comment {
        width: 100%;
        float: left;
        text-align: left;
        border: 1px dotted black;
        border-radius: 10px;
        padding: 5px;
    }
}

@media screen and (max-width: 375px) {
    #article {
        font-size: 20px;
    }
    img {
        max-width: 200px;
        max-height: 200px;
    }
}
</style>
