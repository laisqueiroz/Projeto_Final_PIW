import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import UserList from '../views/UserList.vue';
import UserForm from '../views/UserForm.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/users', name: 'UserList', component: UserList },
  { path: '/users/new', name: 'UserForm', component: UserForm },
  { path: '/users/edit/:id', name: 'EditUser', component: UserForm }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
