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
    CREATE_ARTICLE(state, article) {
      let articles = state.articles.concat(article);
      state.articles = articles;
    },
    DELETE_ARTICLE(state, idArticles) {
      let articles = state.articles.filter(a => a.id != idArticles)
      state.articles = articles;
    },
    EDIT_ARTICLE(state, article) {
      state.articles.forEach(art => {
        if(art.id == article.idArticles) {
          art = article;
        }
      })
    },
  },
  actions: {
    async loadArticles({commit}){
      let response = await ApiArticle().get("/articles");
      commit('SET_ARTICLES', response.data);
    },
    async createArticle({commit}, article) {
      let response = await ApiArticle().post('/articles/createArticle', article);
      let savedArticle = response.data.attributes;
      commit('CREATE_ARTICLE', savedArticle);
      return savedArticle;
    },
    async deleteArticle({commit}, article){
      let response = await ApiArticle().delete(`/articles/delete/${article.idArticles}`);
      if(response.status == 200 || response.status == 204){
      commit('DELETE_ARTICLE', article.idArticles)
      } 
    },
    async editArticle({commit}, article){
      let response = await ApiArticle().put(`/articles/modify/${article.idArticles}`, article);
      let newArticle = response.data.attributes;
      commit('EDIT_ARTICLE', newArticle);
      return newArticle;
    }
  },
  modules: {}
});
