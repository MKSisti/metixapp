import AddGroup from "../views/AddGroup";
import SingleGroup from "../views/SingleGroup";
import SingleModule from "../views/SingleModule";
import LandingPage from "../views/LandingPage"
import NotFound from "../views/404NotFound"

export default [
  {
    path: "/",
    name: "home",
    component: LandingPage, // 👈 import and put home here
  },
  {
    path: "/add",
    name: "addGroup",
    component: AddGroup,
  },
  {
    path: "/groups/:GroupId",
    name: "group",
    component: SingleGroup,
    props: true,
  },
  {
    path: "/groups/:GroupId/modules/:ModuleId",
    name: "module",
    component: SingleModule,
    props: true,
  },
  {
    path: "/404",
    name: "404",
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];
