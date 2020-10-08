//Store de notre application grâce à vuex.

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import API from "@/Services/API.services";


Vue.use(Vuex, axios);
Vue.config.silent = true;

export default new Vuex.Store({
  state: { // toutes nos données présente dans le state de l'application
    token: localStorage.getItem('access_token') || null,
    articles: [],
    sharedArticles: [],
    allArticles: [],
    users: [],
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    isAdmin: localStorage.getItem('isAdmin'),
    },

  getters: { // nos getters qui nous permettent de définir si un utilisateur est connecter et/ou admin
    loggedIn(state) {
      return state.token !== null;
    },
    isAdmin(state) {
      return state.isAdmin != 0;
    },
  }, 
  
  mutations: { // toutes les mutations qui nous permettent de modifier l'état de notre store
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    SET_SHAREDARTICLES(state, sharedArticles) {
      state.sharedArticles = sharedArticles;
    },
    SET_ALLARTICLES(state, allArticles) {
      state.allArticles = allArticles;
    },
    CREATE_ARTICLE(state, article, file) {
      let articles = state.articles.concat(article);
      state.articles = articles;
      state.file = file;
    },
    DELETE_SHAREDARTICLE(state, sharedIdArticles) {
      let articles = state.articles.filter(a => a.id != sharedIdArticles)
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
    SET_USERS(state, users) {
      state.users = users;
    },
    RETRIEVE_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT_USER(state) {
      state.currentUser = JSON.parse(window.localStorage.clear());
    },
    DELETE_ACCOUNT(state, userId) {
      let users = state.users.filter(a => a.id != userId)
      state.users = users;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
  },
  actions: { // toutes les méthodes utiles pour faire fonctionner notre application / communiquer avec notre API
   async retrieveToken(context, credentials) { // attribution du token lors de la connexion
      return await new Promise((resolve, reject) => {
        API().post('/users/login', {
        email: credentials.email,
        password: credentials.password,
      })
        .then(response => {
          const isAdmin = response.data.privilege;
          const token = response.data.token;
          const userId = response.data.userId;
          localStorage.setItem('userId', userId);
          localStorage.setItem('isAdmin', isAdmin)
          localStorage.setItem('access_token', token);
          localStorage.setItem('currentUser', JSON.stringify(response.data))
          context.commit('RETRIEVE_TOKEN', token);
          resolve(response)
      })
        .catch(error => {
          console.log(error);
          reject(error);
      })
    })
    },
    async registerUser({commit}, signupInfo) { // enregistrement d'un nouvel utilisateur
      try{
        let response = await API().post('/users/signup', signupInfo);
        const userId = response.data.id;
        const token = response.data.token;
        localStorage.setItem('userId', userId);
        localStorage.setItem('access_token', token);
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        commit('SET_CURRENT_USER');
        commit('RETRIEVE_TOKEN', token);
      }catch {
        return{ error: "Erreur lors de la création de votre compte"}
      }
    },

  async loadArticles({commit}){ // chargement des articles
    let response = await API().get("/articles");
    commit('SET_ARTICLES', response.data);
  },
  async loadSharedArticles({commit}){ // chargement des articles partagés
      let response = await API().get("/sharedarticles/");
      commit('SET_SHAREDARTICLES', response.data);
    },
    /*eslint-disable no-unused-vars*/
  async loadAllArticles({commit}){ // chargement de tous les articles
      let one = "http://localhost:3000/sharedarticles/";
      let two = "http://localhost:3000/articles";
      const requestOne = API().get(one);
      const requestTwo = API().get(two);
      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0].data;
        const responseTwo = responses[1].data;
        const sharedArticle = [];
        responseOne.forEach(article => {
          let realArticles = responseTwo.map(obj => ({...obj}));
          let realArticle = realArticles.find(el => el.idArticle === article.idArticle);
          let sharedBy = responseOne.map(obj => ({...obj}));
          let sharedUsers = sharedBy.find(el => el.sharedIdUser === article.sharedIdUser);
          let realComments = responseOne.map(obj => ({...obj}));
          let realComment = realComments.find(el => el.commentaire === article.commentaire);
          // realArticle.idArticle = `${article.idArticle}-${article.sharedIdUser}`;
          realArticle.shared = true;
          realArticle.sharedDateTime = article.datetime;
          realArticle.sharedBy = article.sharedIdUser;
          realArticle.commentaire = article.commentaire;
          sharedArticle.push(realArticle);
        })
        const joinArrays = responseTwo.concat(sharedArticle);
        joinArrays.sort(function(a,b) {
          return new Date(b.sharedDateTime || b.datetime) - new Date(a.sharedDateTime || a.datetime)
        })
        commit('SET_ALLARTICLES', joinArrays);
      }))
    },
    /*eslint-disable no-unused-vars*/
  async deleteArticle({commit}, article){ // suppression d'un article en particulier
      let response = await API().delete(`/articles/delete/${article.idArticle}`);
      if(response.status == 200 || response.status == 204){
      commit('DELETE_ARTICLE', article.idArticle)
      } 
    },
    async deleteSharedArticle({commit}, sharedArticle){ // suppression d'un article partagé
      let response = await API().delete(`/sharedarticles/delete/${sharedArticle.idArticle}`);
      if(response.status == 200 || response.status == 204){
      commit('DELETE_SHAREDARTICLE', sharedArticle.idArticle)
      } 
    },
    async editArticle({commit}, article){ // modification d'un article
      let response = await API().put(`/articles/modify/${article.idArticle}`, article);
      let newArticle = response.data;
      commit('EDIT_ARTICLE', newArticle);
      return newArticle;
    },
    async loadUsers({commit}) { // chargement de tous les utilisateurs
      let response = await API().get("/users");
      let users = response.data;
      commit('SET_USERS', users);
    },
    logoutUser({commit}) { // déconnexion d'un utilisateur
      window.location.replace("http://localhost:8080/#/");
      window.location.reload();
      commit('LOGOUT_USER');
    }, 
    async deleteAccount({commit}, user){ // suppression d'un compte utilisateur
      await API().delete(`/users/delete/${user.userId}`);
      commit('DELETE_ACCOUNT', user.userId)
      
    },
  },
  modules: {}
});
