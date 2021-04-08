import { cloneDeep } from 'lodash';
import endpoints from "../../endpoints/endpoints";
import { httpGET } from "../../http/http";


const MAP_DASHBOARD = {
        id: 789,
        markers: [{
            latLng: [31.230391, 121.473701],
            name: "Shanghai"
        }]
}

const dashboardModule = {
    namespaced: true, 
    state: {
        loadedMapDashboard: false,
        mapDashboard: cloneDeep(MAP_DASHBOARD),
    },
    actions: {
        async vx_getMaps({commit}) {
            try {
                const res = await httpGET(endpoints.getMaps);
                const data = await res.json();
                
                if(data.map_dashboard) {
                    commit('loadedMapDashboard', true);
                    //Map Dashboard
                    commit('setMapDashboardInfo', data.map_dashboard);
                }

            } catch (err) {
                 console.log(err)
            }
        }
    },
    mutations: {
        loadedMapDashboard(state, status) {
            return state.loadedMapDashboard = status;
        },
        setMapDashboardInfo(state, mapDashboardResponse) {
            state.mapDashboard = mapDashboardResponse;
        },
    },
    getters: {
        isMapdashboardLoaded: state => state.loadedMapDashboard,
        getMapDashboardInfo: state => state.mapDashboard
    }
}

export default dashboardModule;