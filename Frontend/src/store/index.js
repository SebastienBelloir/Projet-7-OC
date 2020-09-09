import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import API from "@/Services/API.services";


Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: { 
    token: localStorage.getItem('access_token') || null,
    articles: [],
    users: [],
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    isAdmin: localStorage.getItem('isAdmin') || null,
    },

  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    isAdmin(state, member) {
      return state.isAdmin !== member;
    }
  }, 
  
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    CREATE_ARTICLE(state, article, file) {
      let articles = state.articles.concat(article);
      state.articles = articles;
      state.file = file;
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
    SET_USERS(state, users) {
      state.users = users;
    },
    RETRIEVE_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT_USER(state) {
      state.currentUser = state;
      
    },
    // SET_CURRENT_USER(state, user) {
    //   state.currentUser = user;
    //   window.localStorage.currentUser = JSON.stringify(user);
    // },
  },
  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
       API().post('/users/login', {
        email: credentials.email,
        password: credentials.password,
      })
        .then(response => {
          const isAdmin = response.data.privilege;
          const token = response.data.token;
          localStorage.setItem('isAdmin', isAdmin)
          localStorage.setItem('access_token', token);
          localStorage.setItem('currentUser', JSON.stringify(response.data))
          context.commit('RETRIEVE_TOKEN', token);
          console.log(response)
          resolve(response)
      })
        .catch(error => {
          console.log(error);
          reject(error);
      })
    })
    },
    async loadArticles({commit}){
      let response = await API().get("/articles");
      commit('SET_ARTICLES', response.data);
    },
    async deleteArticle({commit}, article){
      let response = await API().delete(`/articles/delete/${article.idArticles}`);
      if(response.status == 200 || response.status == 204){
      commit('DELETE_ARTICLE', article.idArticles)
      } 
    },
    async editArticle({commit}, article){
      let response = await API().put(`/articles/modify/${article.idArticles}`, article);
      let newArticle = response.data;
      commit('EDIT_ARTICLE', newArticle);
      return newArticle;
    },
    async loadUsers({commit}) {
      let response = await API().get("/users");
      let users = response.data;
      commit('SET_USERS', users);
      let user = JSON.parse(window.localStorage.currentUser);
      commit('SET_CURRENT_USER', user)
    },
    logoutUser({commit}) {
      commit('LOGOUT_USER');
    },
    async loginUser({commit}, userInfo) {
      try{
        let response = await API().post('/users/login', userInfo);
        let user = response.data;
        commit('SET_CURRENT_USER', user);
        return user;
      }catch {
        return{ error: "Mot de passe ou email incorrect"}
      }
    },
    async registerUser({commit}, signupInfo) {
      try{
        let response = await API().post('/users/signup', signupInfo);
        let user = response.data;
        commit('SET_CURRENT_USER', user);
        return user;
      }catch {
        return{ error: "Erreur lors de la création de votre compte"}
      }
    }
  },
  modules: {}
});
