import { httpGET } from "../../http/http";
import endpoints from "../../endpoints/endpoints";
import {cloneDeep} from "lodash";

const USER = {
    id: 0,
    first_name: 'Placehodler',
    last_name: 'Placeholder',
    profile_pic: 'placeholder',
    notifications: {
        counter: 0
    },
    role: 'placeholder',
    skills: ['placeholder'],
    socials: ['placeholder'],
    lives: 'Placeholder',
    works: 'placeholder',
    from: 'placeholder',
    bio: 'Placeholder'
}

const userModule = {
    namespaced: true,
    state: {
        user: cloneDeep(USER),
        loggedUser: cloneDeep(USER),
        isProfileEdited: false,
        editedProfile: cloneDeep(USER),

        loaded: false,
        userId: 0
    },
    actions: {
        async vx_getDataFromLoggedUser({commit, state}) {
            try {
                const res = await httpGET(endpoints.getUserData);
                const user = await res.json();

                if(user.data) {
                    commit('loadedStatus', true);
                    /** Logged User **/
                    if(!state.isProfileEdited) {
                        commit('setLoggedUserData', user.data);
                    } 
                    if(state.isProfileEdited) {
                        const userData = {
                            notifications: {
                                counter: user.data.notifications.counter
                            }
                        };
                        userData.id = user.data.id;
                        if(state.editedProfile) {
                            userData.first_name = state.editedProfile.first_name;
                            userData.last_name = state.editedProfile.last_name;
                            userData.profile_pic = state.editedProfile.profile_pic;
                            userData.bio = state.editedProfile.bio;
                            userData.skills = state.editedProfile.skills;
                            userData.socials = state.editedProfile.socials;
                        }
                        userData.role = user.data.role;
                        userData.lives = user.data.lives;
                        userData.works = user.data.works;
                        userData.from = user.data.from;
                        commit('setLoggedUserData', userData);
                    };
                }

                return user.data;
    
            } catch (err) {
                 console.log(err)
            }
        },
        async vx_getDataFromOtherUser({commit}, id) {
            try {
                const res = await httpGET(endpoints.getOtherUserData(id), {
                    headers: {
                        'Bearer': localStorage.getItem('jwt')
                      },
                });
                const user = await res.json();

                if(user.data) {
                    commit('loadedStatus', true);
                    commit('setUserData', user.data);
                    commit('setUserId', id);
                }

                return user.data;
    
            } catch (err) {
                 console.log(err)
            }
        },
        vx_toggleSocialMedia({commit}, index) {
            if (typeof index === 'undefined') {
                return; 
            }
            return commit('toggleSocialMedia', index);
        },
        vx_clearUserData({commit}) {
            commit('clearUserData');
        },
        vx_editProfile({commit}, userData) {
            commit('profileIsEdited');
            commit('setEditedData', userData);
        }   
    },
    mutations: {
        loadedStatus(state, status) {
            state.loaded = status;
        },
        setUserData(state, user) {
            state.user = user;
        },
        setLoggedUserData(state, loggedUser) {
            state.loggedUser = loggedUser;
        },
        setUserId(state, id) {
            state.userId = id;
        },
        clearUserData(state) {
            state.user = {}
        },
        setEditedData(state, editedData) {
            state.editedProfile = editedData;
        },
        toggleSocialMedia(state, index) {
            if(typeof state.user.socials === 'undefined') {
                return;
            };
            return state.user.socials[index] = !state.user.socials[index];          
        },
        profileIsEdited(state) {
            state.isProfileEdited = true;
        },
    },
    getters: {
        isLoaded: state => state.loaded,
        getLoggedUserData: state => state.loggedUser,

        getUserData: state => state.user,
        getUserId: state => state.userId
    }

}

export default userModule;