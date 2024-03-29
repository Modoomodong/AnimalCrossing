import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "../views/Home.vue";
import Info from "../views/Info.vue";
import Community from "../views/Community.vue";
import NotFound from "../views/404Page.vue";
import Board from "../views/Board.vue";
import MooCalculator from "../views/MooCalculator.vue";
import MooCalculated from "../views/MooCalculated.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import searchBar from "../components/searchBar.vue";
import trade from "../views/trade.vue";
import Detail from "../views/Detail.vue";
import Mypage from "../views/Mypage.vue";
import team from "../views/team.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/test",
    name: "test",
    component: searchBar
  },
  {
    path: "/",
    name: "Board",
    component: Board,
    children: [
      {
        path: "/detail",
        name: "detail",
        component: Detail
      },
      {
        path: "/team",
        name: "team",
        component: team
      },
      {
        path: "/info",
        name: "Info",
        component: Info,
        children: [
          {
            path: "fish",
            component: () => import("../components/info/Fish.vue")
          },
          {
            path: "fossil",
            component: () => import("../components/info/Fossil.vue")
          },
          {
            path: "insect",
            component: () => import("../components/info/Insect.vue")
          },
          {
            path: "painting",
            component: () => import("../components/info/Painting.vue")
          },
          {
            path: "neighbor",
            component: () => import("../components/info/Neighbor.vue")
          }
        ]
      },
      {
        path: "/community",
        name: "Community",
        component: Community,
        children: [
          {
            path: "list",
            component: () => import("../components/community/CommunityPost.vue")
          },
          {
            path: "detail/:id",
            name: "cdetail",
            component: () =>
              import("../components/community/CommunityDetail.vue")
          },
          {
            path: "write",
            component: () =>
              import("../components/community/CommunityWrite.vue")
          }
        ]
      },
      {
        path: "/moocalculator",
        name: "Moocalculator",
        component: MooCalculator,
        props: true
      },
      {
        path: "/mooCalculated",
        name: "MooCalculated",
        component: MooCalculated,
        props: true
        // 이거를 해줘야해...? 좀 천재적인거 아냐?
      },
      {
        path: "/login",
        name: "Login",
        component: Login
      },
      {
        path: "/mypage",
        name: "Mypage",
        component: Mypage
      },
      {
        path: "/logout",
        name: "logout",
        beforeEnter(to, from, next) {
          store.commit("logout");
          alert("로그아웃 되었습니다.");
          next("/info/fish");
        }
      },
      {
        path: "/signup",
        name: "Signup",
        component: Signup
      },
      {
        path: "/trade",
        name: "trade",
        component: trade,
        children: [
          {
            path: "write",
            name: "trade_write",
            component: () => import("../components/trade/tradeWrite.vue")
          },
          {
            path: "neighbor",
            name: "trade_neighbor",
            component: () => import("../components/trade/neighbor.vue")
          },
          {
            path: "painting",
            name: "trade_painting",
            component: () => import("../components/trade/painting.vue")
          },
          {
            path: "fossil",
            name: "trade_fossil",
            component: () => import("../components/trade/fossil.vue")
          },
          {
            path: "etc",
            name: "trade_etc",
            component: () => import("../components/trade/Etc.vue")
          },
          {
            path: "list/:category/:id",
            name: "tlist",
            props: true,
            component: () => import("../components/trade/tradeList.vue")
          },
          {
            path: "tradedetail/:id",
            name: "tradedetail",
            props: true,
            component: () => import("../components/trade/TradeDetail.vue")
          },
          {
            path: "etcdetail/:id",
            name: "etcdetail",
            component: () => import("../components/trade/TradeEtcDetail.vue")
          }
        ]
      }
    ]
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

  // 404 page redirect
  {
    path: "/pageNotFound",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "*",
    redirect: { name: "NotFound" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
