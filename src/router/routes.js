import AddGroup from "../views/AddGroup";
import SingleGroup from "../views/SingleGroup";
import SingleModule from "../views/SingleModule";

export default [
  {
    path: "/",
    name: "home",
    component: AddGroup,
  },
  {
    path: "/group/:GroupId",
    name: "group",
    component: SingleGroup,
    props: true,
  },
  {
    path: "/group/:GroupId/module/:ModuleId",
    name: "module",
    component: SingleModule,
    props: true,
  },
];
