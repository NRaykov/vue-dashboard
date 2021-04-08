import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';

import Dashboard from '../components/pages/Dashboard';
import Profile from '../components/pages/Profile';

import SettingsContainer from '../components/pages/Settings/SettingsContainer';
import SettingsInner from '../components/pages/Settings/SettingsInner'

import DirectMessges from '../components/pages/DirectMessages/DirectMessages';
import Maps from '../components/pages/Maps';
import Charts from '../components/pages/Charts';
import Themes from '../components/pages/Themes';
import Feed from '../components/pages/Feed/Feed';
import ThreadDetailed from '../components/pages/Feed/ThreadDetailed';
import Forms from '../components/pages/Forms';
import Tables from '../components/pages/Tables';

import Login from '../components/LoginScreen';

import RouteNames from '../enums/RouteNames';

let BASE_URL = '';
process.env.NODE_ENV === 'production' ? BASE_URL = '/vue-dashboard' : '';

const _navGuardLogin = (to, from, next) => {
    if (!localStorage.getItem('jwt')) {
        return next({ path: BASE_URL+'/login' });
    }
    next();
}

const _navGuardProVes = (to, from, next) => {
    if (!localStorage.getItem('jwt') || !store.state.upgradeModule.orderStatus.status) {
        return next({ path: BASE_URL+'/login' });
    }
    next();
}


const routes = [
    {
        path: BASE_URL+'/login',
        component: Login,
        name: RouteNames.LOGIN,
        meta: { requiresAuth: false },
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt')) {
                return next({ name: RouteNames.DASHBOARD });
            }
            next();
        },
    },
    {
        path: BASE_URL+'/',
        name: RouteNames.DASHBOARD,
        component: Dashboard,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: BASE_URL+'/profile',
        name: RouteNames.PROFILE,
        component: Profile,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: BASE_URL+'/profile/:id',
        name: RouteNames.USER_PROFILE,
        component: Profile,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: BASE_URL+'/settings',
        component: SettingsContainer,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin,
        children: [
            {
              path: '',
              name: RouteNames.ACCOUNT,
              component: SettingsInner
            },
            {
              path: 'additional',
              name: RouteNames.ADDITIONAL,
              component: SettingsInner
            }
          ]
    },
    {
        path:BASE_URL+'/chat',
        name: RouteNames.CHAT,
        component: DirectMessges,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: BASE_URL+'/maps',
        name: RouteNames.MAPS,
        component: Maps,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: BASE_URL+'/charts',
        name: RouteNames.CHARTS,
        component: Charts,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: BASE_URL+'/themes',
        name: RouteNames.THEMES,
        component: Themes,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardProVes
    },
    {
        path: BASE_URL+'/feed',
        name: RouteNames.FEED,
        component: Feed,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardProVes
    },
    {
        path: BASE_URL+'/thread/:id',
        name: RouteNames.THREAD,
        component: ThreadDetailed,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardProVes
    },
    {
        path: BASE_URL+'/forms',
        name: RouteNames.FORMS,
        component: Forms,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardProVes
    },
    {
        path: BASE_URL+'/tables',
        name: RouteNames.TABLES,
        component: Tables,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardProVes
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.use(VueRouter);
export default router;