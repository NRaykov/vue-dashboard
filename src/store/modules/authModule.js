import { httpGET } from "../../http/http";
import endpoints from '../../endpoints/endpoints';
import { cipher } from '../../utilities/utilities';

const authModule = { 
    namespaced: true,
    state: {
        token: localStorage.getItem('jwt') || '',
        encryptedPassword: '',
        isLoggedIn: false,
    },
    actions: {
        async vx_login({commit, state, dispatch}, user) {
            try {
                const credentials = await dispatch('vx_getCredentials');
                try {
                    const myCipher = await dispatch('vx_encryptPassword', {password: user.password});
                    if(user.email === credentials.user.email && state.encryptedPassword === myCipher) {
                        localStorage.setItem('jwt', credentials.user.token);
                      state.token = credentials.user.token;
                      commit('loggedUser', true);
                      
                    }
                } catch (err) {
                    console.log(err)
                }
            } catch (err) {
                console.log(err);
            }
        },
        vx_logout({state}) {
            try {

              state.token = '';
              localStorage.removeItem('jwt');
              commit('loggedUser', false);

            } catch (err) {
                 console.log(err)
            }
        },
        async vx_encryptPassword({commit}, {password}) {
            const myCipher = cipher(password);
            try {
                await commit('encryptPass', myCipher);

                return myCipher;
            } catch (err) {
                 console.log(err)
            }
        },
       async vx_getCredentials() {
            try {
                const res = await httpGET(endpoints.getCredentials);
                const credentials = await res.json();

                return credentials;
    
            } catch (err) {
                 console.log(err)
            }
        }
    },
    mutations: {
        encryptPass(state, encryptPass) {
            return state.encryptedPassword = encryptPass;
      },
      loggedUser(state, status) {
        return state.isLoggedIn = status;
      }
    },
    getters: {
      getLoggedStatus: state => state.isLoggedIn,
    }
    
}

export default authModule;