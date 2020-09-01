import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import HomeAdmin from "../views/HomeAdmin.vue";
import CreateArticle from "../views/CreateArticle.vue";

Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/Home/admin',
    name: 'Home-Admin',
    component: HomeAdmin
  },
  {
    path: '/user/createArticle',
    name: 'CreateArticle',
    component: CreateArticle
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () =>
      import(/* webpackChunkName: "signin" */"../views/SignIn.vue")
  },
  {
    path: '/articlesrecents/:slug',
    name: 'ArticlesRecents',
    component: () =>
      import(/* webpackChunkName: "articlesrecents" */"../views/ArticlesRecents")
  },
  {
    path: '/archives',
    name: 'Archives',
    component: () =>
    import(/* webpackChunkName: "archives" */"../views/Archives")
  }
];

const router = new VueRouter({
  routes
});

export default router;
