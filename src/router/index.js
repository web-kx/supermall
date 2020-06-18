import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../views/home/home.vue")
const CateGory = () => import("../views/category/category.vue")
const Cart = () => import("../views/cart/cart.vue")
const Profile = () => import("../views/profile/profile.vue")
const Detail = () => import("../views/detail/detail.vue")

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/category",
    name: "CateGory",
    component: CateGory
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/detail/:iid",
    name: "Detail",
    component: Detail
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
  
});

export default router;
