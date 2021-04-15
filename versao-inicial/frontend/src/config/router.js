import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/home'
import AdminPages from '../components/admin/adminPages'
import ArticlesByCategory from '../components/article/articlesByCategory'
import ArticlesById from '../components/article/articleById'
import Auth from '../components/auth/auth'
import UserReservation from '../components/reservation/userReservation'

import {userKey} from './global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticlesById
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, 
  {
    name: 'userReservation',
    path: '/reservations',
    component: UserReservation
}, 
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)){
        const user = JSON.parse(json)
        user && user.admin ? next() : next({path: '/'})
    }else {
        next()
    }
})

export default router

