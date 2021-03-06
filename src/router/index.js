import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import Users from "../components/user/Users.vue";
import Rights from "../components/pow/Rights.vue";
import Roles from "../components/pow/Roles.vue";
import Aategories from "../components/goods/Aategories.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: Welcome,
      },
      {
        path: "/users",
        component: Users,
      },
      {
        path: "/rights",
        component: Rights,
      },
      {
        path: "/roles",
        component: Roles,
      },
      {//商品分类路由
        path: "/categories",
        component: Aategories,
      },
    ],
  },
];
const router = new VueRouter({
  routes,
});

//!!!先生成路由实例，再挂载路由卫士
//挂载路由守卫
router.beforeEach((to, from, next) => {
  //路由守卫
  //to表示将要访问的路由
  //from表示从哪个路由而来
  //next表示放行  next("/login")表示强制跳转到login页面
  if (to.path === "/login") return next();

  //获取token值
  const token = window.sessionStorage.getItem("token");
  //判断token值是否为空，或者没拿到，则不允许访问home页面
  if (!token) return next("/login");
  next();
});

export default router;
