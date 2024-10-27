import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'; // Import components
import Contact from './views/Contact.vue';
import PostDetail from './views/PostDetail.vue';
import NotFound from './views/NotFound.vue';
import Login from './views/Login.vue';
const routes = [
    { path: '/', component: Home, name: 'Home'},
    { path: '/contact', component: Contact },
    { path: '/post/:id', component: PostDetail},
    { path: '/login', component: Login},
    { path: '/404', component: NotFound},
    { path: '/:catchAll(.*)', redirect: '/404' }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;