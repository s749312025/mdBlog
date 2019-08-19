import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const chunkPath = (path, folder, meta, children) => {
    return {
        path,
        name: path,
        meta: meta ? meta : {},
        children: children ? children : [],
        component: () => import(/* webpackChunkName: "[request][index]" */ `./views/${folder}.vue`)
    }
}

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        chunkPath('/login', 'login'),
        chunkPath('/main', 'main', '', [
            chunkPath('/home', 'page/home'),
            chunkPath('/tag', 'page/tag'),
            chunkPath('/article', 'page/article'),
            chunkPath('/article/add', 'page/article/add'),
        ]),

    ]
})

// router.beforeEach((to, from, next) => {
//     if (to.path == '/' || to.path == '/home' || to.path == '/interface' || to.path == '/marking') {
//         next()
//         return
//     } else {
//         if (localStorage.phone) {
//             next()
//             return
//         } else {
//             store.dispatch('openLoginModal')
//             next(false)
//         }
//     }
// })

export default router
