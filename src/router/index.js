import { createRouter, createWebHistory } from "vue-router";
import routes from './routes.js'
// import Home from "../views/Home.vue";


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
