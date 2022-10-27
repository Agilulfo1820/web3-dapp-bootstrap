import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: 'Home',
        },
        component: () => import('../views/Home.vue'),
    },

]

const router = new VueRouter({
    routes,
})

export default router
