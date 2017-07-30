import Vue from "vue";
import Router from "vue-router";
import MainView from "@/components/MainView";
import FeedLists from "@/components/FeedLists";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "MainView",
      component: MainView
    },
    {
      path: "/history",
      name: "FeedList",
      component: FeedLists
    }
  ]
});
