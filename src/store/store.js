import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import authModule from './modules/authModule';
import dashboardModule from './modules/dashboardModule';
import navigationModule from './modules/navigationModule';
import userModule from './modules/userModule';
import mapsModule from './modules/mapsModule';
import activitiesModule from './modules/activitiesModule';
import messagesModule from './modules/messagesModule';
import upgradeModule from './modules/upgradeModule';
import themesModule from './modules/themesModule';
import feedModule from './modules/feedModule';

const store = new Vuex.Store({
    state: {
        defaultProfilePic: '/img/no_image.jpg'
    },
    modules: {
        authModule,
        dashboardModule,
        navigationModule,
        userModule,
        mapsModule,
        activitiesModule,
        messagesModule,
        upgradeModule,
        themesModule,
        feedModule
    }
});

export default store;