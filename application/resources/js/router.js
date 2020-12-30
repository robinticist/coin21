import Vue from 'vue'
import Router from 'vue-router'
import MainComponent from './components/MainComponent'
import LoginComponent from './components/LoginComponent'
import PicturesComponent from './components/PicturesComponent'
import UserInfoComponent from './components/UserInfoComponent'
import MemoComponent from './components/MemoComponent'

Vue.use(Router)

export default new Router(
    {
        mode: 'history',
        routes: [
            {
                path: '/',
                component: MainComponent,
            },
            {
                path: '/pictures',
                component: PicturesComponent,
            },
            {
                path: '/memo',
                component: MemoComponent,
            },
            {
                path: '/login',
                component: LoginComponent,
            },
            {
                path: '/user-info',
                component: UserInfoComponent,
            },
        ],
    })
