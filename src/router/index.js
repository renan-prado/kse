import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Collaborator from '../views/Collaborator.vue';
import Campaign from '../views/Campaign.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Pagina Inicial',
    component: Home,
  },
  {
    path: '/collaborator/:id',
    name: 'Colaborador',
    component: Collaborator,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/campaign/:uuid/:campaign/:url',
    name: 'Campaign',
    component: Campaign,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
