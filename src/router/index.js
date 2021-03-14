import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes.js";
import localForage from "localforage";
// import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const keys = await localForage.keys();

  //if route has groupId param
  if (to.params.GroupId) {

    //if groupId param in store
    if(keys.includes('group_' + to.params.GroupId)){
      console.log('group exists');

      // if route has moduleId param
      if(to.params.ModuleId){

        //if moduleId param in store
        if(keys.includes('module_' + to.params.ModuleId)) next();
        else next('/');
      }
      else{
        next();
      }
    }
    else{
      next('/');
    }
  }
  else next();
});

export default router;
