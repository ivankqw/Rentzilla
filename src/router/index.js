import { createRouter, createWebHistory } from 'vue-router'
import {auth} from '../firebase.js'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/Login.vue")
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import("../views/Signup.vue")
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/my-rentals',
        name: 'MyRentals',
        component: () => import('../views/MyRentals.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/news',
        name: 'News',
        component: () => import('../views/News.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/my-expenses',
        name: 'MyExpenses',
        component: () => import('../views/MyExpenses.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login' && auth.currentUser) {
      next('/')
      return;
    }
  
    if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
      next('/login')
      return;
    }
  
    next();
  })

export default router