<template>
  <div>
    <div id="card">
      <div id="users" v-for="user in users" :key="user.idUser">
        <div id="user" v-if="content.auteur_id === user.idUser">
          <div class="shared-author" v-if="content.shared">{{ user.prenom }} {{ user.nom }} a partagé</div>
          <div v-else class="author">{{ user.prenom }} {{ user.nom }}</div>
          <span id="datetime" v-if="content.shared">{{ content.sharedDateTime | formatDate }} </span>
          <span id="datetime" v-else>{{ content.datetime | formatDate }}</span>
        </div>
        <div>
        </div>
      </div>
      <router-link :to="{ name: 'Article', params: { id: content.idArticle } }">
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
    content: { type: Object, default: () => {} },
  },
  computed: {
    ...mapState(["users", "currentUser"]),
    allArticles() {
      return this.$store.state.allArticles;
    },
  },
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
#user {
  .author, .shared-author {
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
