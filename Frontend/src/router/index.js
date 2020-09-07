import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AdminHome from "../views/AdminHome.vue";
import CreateArticle from "../views/CreateArticle.vue";
import ArticlePage from "../views/ArticlePage.vue";
import EditArticle from "../views/EditArticle.vue";
import AdminUsers from "../views/AdminUsers.vue";
import SignIn from "../views/SignIn.vue";

Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin/users",
    name: "Admin-Users",
    component: AdminUsers
  },
  {
    path: '/admin/home',
    name: 'Admin-Home',
    component: AdminHome
  },
  {
    path: '/article/createarticle',
    name: 'CreateArticle',
    component: CreateArticle
  },
  {
    path: '/article/:id/edit',
    name: 'EditArticle',
    component: EditArticle
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: ArticlePage,
    params: true
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
    component: SignIn
  },
];

const router = new VueRouter({
  routes
});

export default router;
