import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import ApiArticle from "@/Services/article.services";


Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    articles: []
    },
  
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
  },
  actions: {
    async loadArticles({commit}){
      let response = await ApiArticle().get("/articles");
      commit('SET_ARTICLES', response.data);
    },
  },
  modules: {}
});
