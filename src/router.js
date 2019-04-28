import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Register from './views/register'
import Index from './views/index'
import Wrong from './views/wrong'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            name: 'index',
            component: Index,
            meta: {
                requireAuth: true
            }
        },

        {
            path: '*',
            name: 'wrong',
            component: Wrong
        }
    ]
})