import endpoints from "../../endpoints/endpoints";
import { httpGET } from "../../http/http";

const messagesModule = {
    namespaced: true, 
    state: {
        participants: [],
        loaded: false,
        contacts: []
    },
    actions: { 
        async vx_getMessages({commit}, id) {
                try {
                    const res = await httpGET(endpoints.getMessages(id));
                    const messages = await res.json();

                    if(messages.participants) {
                        commit('loadedMessages', true);
                        commit('setParticipants', messages.participants);
                    }
    
                    return messages;

                } catch (err) {
                    console.log(err)
                }
        },
        async vx_getContacts({commit}) {
            try {
                const res = await httpGET(endpoints.getUserContacts);
                const data = await res.json();
                if(data.contacts) {
                    commit('setUserContacts', data.contacts);
                }

                return data;

            } catch (err) {
                 console.log(err)
            }
        },
        vx_clearParticipants({commit}) {
           commit('clearParticipants');
        }
    },
    mutations: {
        setParticipants(state, data) {
            state.participants = data
        },
        setUserContacts(state, contacts) {
            state.contacts = contacts
        },
        clearParticipants(state) {
            state.participants = []
        },
        loadedMessages(state, status) {
            state.loaded = status
        }
     },
    getters: {
        getParticipants: state => state.participants,
        getUserContacts: state => state.contacts,
        messagesLoaded: state => state.loaded
     }
}

export default messagesModule;