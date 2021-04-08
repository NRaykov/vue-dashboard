import { httpGET } from "../../http/http";
import endpoints from "../../endpoints/endpoints";
import {cloneDeep} from "lodash";

const SIDEBAR = {
    sidebar: [
        {
            name: 'dashboard',
            data_feater: 'sliders',
            title: 'Dashboard'
        }
    ]
}

const FOOTER = {
    footer: [
        {
            name: 'footer',
            anchor: '#',
            title: 'Support'
        }
    ]
}

const navigationModule = {
    namespaced: true,
    state: {
        sidebar: cloneDeep(SIDEBAR),
        footer: cloneDeep(FOOTER),
        loaded: false,
        isSidebarClosed: false,
    },
    actions: {
       async vx_getNavigations({commit}) {
           try {
               const res = await httpGET(endpoints.getNavigations);
               const data = await res.json();
               
               if(data.navigations.sidebar) {
                    commit('loadedStatus', true);
                    commit('setSidebarItems', data.navigations.sidebar);
               }
               if(data.navigations.footer) {
                    commit('loadedStatus', true);
                    commit('setFooterItems', data.navigations.footer);
               }

               return data.navigations;

           } catch (err) {
                console.log(err)
           }
        },
        vx_toggleSidebarMenu({commit}) {
                commit('toggleSidebar');
        },
    },
    mutations: {
        loadedStatus(state, status) {
            return state.loaded = status;
        },
        setSidebarItems(state, navigationSidebar) {
            const sidebarArr = [];
            navigationSidebar.map((item) => {
                sidebarArr.push(item);
            });
            state.sidebar = sidebarArr;
        },
        toggleSidebar(state) {
            state.isSidebarClosed = !state.isSidebarClosed;
        },
        setFooterItems(state, navigationFooter) {
            const footerArr = [];
            navigationFooter.map((item) => {
                footerArr.push(item);
            });
            state.footer = footerArr;
        },
    },
    getters: {
        isLoaded: state => state.loaded,
        getSidebarItems: state => state.sidebar,
        getFooterItems: state => state.footer,
        getSidebarStatus: state => state.isSidebarClosed
    }
}

export default navigationModule;