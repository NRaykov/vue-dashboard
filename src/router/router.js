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

const _navGuardLogin = (to, from, next) => {
    if (!localStorage.getItem('jwt')) {
        return next({ path: '/login' });
    }
    next();
}

const _navGuardProVes = (to, from, next) => {
    if (!localStorage.getItem('jwt') || !store.state.upgradeModule.orderStatus.status) {
        return next({ path: '/login' });
    }
    next();
}


const routes = [
    {
        path: '/login',
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
        path: '/',
        name: RouteNames.DASHBOARD,
        component: Dashboard,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: '/profile',
        name: RouteNames.PROFILE,
        component: Profile,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: '/profile/:id',
        name: RouteNames.USER_PROFILE,
        component: Profile,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: '/settings',
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
        path: '/chat',
        name: RouteNames.CHAT,
        component: DirectMessges,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: '/maps',
        name: RouteNames.MAPS,
        component: Maps,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: '/charts',
        name: RouteNames.CHARTS,
        component: Charts,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardLogin
    },
    {
        path: '/themes',
        name: RouteNames.THEMES,
        component: Themes,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardProVes
    },
    {
        path: '/feed',
        name: RouteNames.FEED,
        component: Feed,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardProVes
    },
    {
        path: '/thread/:id',
        name: RouteNames.THREAD,
        component: ThreadDetailed,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardProVes
    },
    {
        path: '/forms',
        name: RouteNames.FORMS,
        component: Forms,
        meta: { requiresAuth: true },
        beforeEnter: _navGuardProVes
    },
    {
        path: '/tables',
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