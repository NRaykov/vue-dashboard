import endpoints from "../../endpoints/endpoints";
import { httpGET } from "../../http/http";

const activitiesModule = {
    namespaced: true,
    state: {
        activities: [],
        loaded: false,
    },
    actions: {
       async vx_getActivitiesLoggedUser({commit}, page) {
            try {
                const res = await httpGET(endpoints.getActivitiesLoggedUser(page));
                const activitites = await res.json();

                if(activitites.data) {
                    commit('loadedStatus', true);
                    commit('setActivities', activitites.data);
                } 
                
                return activitites.data;

            } catch (err) {
                console.log(err)
            };
        },
        async vx_getActivitiesOtherUser({commit}, id) {
            try {
                const res = await httpGET(endpoints.getActivitiesOtherUser(id));
                const activitites = await res.json();

                if(activitites.data) {
                    commit('loadedStatus', true);
                    commit('setActivities', activitites.data);
                }

                return activitites.data;
    
            } catch (err) {
                 console.log(err)
            }
        },
        vx_clearActivitiesData({commit}) {
            commit('clearActivitiesData');
        },   
    },
    mutations: {
        loadedStatus(state, status) {
            return state.loaded = status;
        },
        setActivities(state, activities) {
            state.activities = activities;
        },
        clearActivitiesData(state) {
            state.activities = {}
        }
    },
    getters: {
        getActivities: (state) => state.activities
    }

}

export default activitiesModule;