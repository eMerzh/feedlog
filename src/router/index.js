import Vue from "vue";
import Router from "vue-router";
import MainView from "@/components/MainView";
import SettingView from "@/components/SettingView";
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
    },
    {
      path: "/settings",
      name: "SettingView",
      component: SettingView
    }
  ]
});
