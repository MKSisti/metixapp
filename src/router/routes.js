import AddGroup from '../views/AddGroup';
import SingleGroup from '../views/SingleGroup';
import SingleModule from '../views/SingleModule';
import LandingPage from '../views/LandingPage';
import NotFound from '../views/404NotFound';
import EditGroup from '../views/EditGroup';
import Analytics from '../views/AnalyticsPage';
import ErrorPage from '../views/ErrorPage';

export default [
  {
    path: '/',
    name: 'home',
    component: LandingPage, // 👈 import and put home here
  },
  {
    path: '/add',
    name: 'addGroup',
    component: AddGroup,
  },
  {
    path: '/groups/:GroupId',
    name: 'group',
    component: SingleGroup,
    props: true,
  },
  {
    path: '/groups/:GroupId/edit',
    name: 'groupEdit',
    component: EditGroup,
    props: true,
  },
  {
    path: '/groups/:GroupId/Analytics',
    name: 'groupAnalytics',
    component: Analytics,
    props: true,
  },
  {
    path: '/groups/:GroupId/modules/:ModuleId',
    name: 'module',
    component: SingleModule,
    props: true,
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorPage,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];
