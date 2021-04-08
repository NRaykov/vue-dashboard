import { cloneDeep } from 'lodash';
import endpoints from "../../endpoints/endpoints";
import { httpGET } from "../../http/http";

const THREAD_ITEM = {
    id: 0,
    title: 'placeholder',
    content: 'placehoder',
    thumbnail: 'placeholder',
    created: 'placehoder',
    author: 'placeholder'
}

const feedModule = {
    namespaced: true,
    state: {
        feed: [],
        search: '',
        loadedFeed: false
    },
    actions: {
      async  vx_getFeed({commit} ) {
            try {
                const res = await httpGET(endpoints.getFeed);
                const items = await res.json();

                if (items.feed) {
                    commit('loadedFeed', true);
                    commit('setFeed', items.feed);
                }

            } catch (err) {
                console.log(err)
            }
        },
        vx_searchThread({commit}, search) {
            commit('setSearchString', search)
        },
        vx_likeThread({commit}, id) {
            commit('likeThread', id)
        },
        vx_deleteThread({commit}, id) {
            commit('deleteThread', id)
        }
    },
    mutations: {
        loadedFeed(state, status) {
            return state.loadedFeed = status;
        },
        setFeed(state, data) {
            const feedArr = [];
            data.map((item) => {
                feedArr.push(item);
            });
            state.feed = feedArr;
        },
        likeThread(state, id) {
           const threadIndex = state.feed.findIndex(i => i.id === id);
           let thread = state.feed[threadIndex];

           thread.is_liked = !thread.is_liked
        },
        deleteThread(state, id) {
            const threadIndex = state.feed.findIndex(i => i.id === id);
            let thread = state.feed[threadIndex];
            state.feed.splice(threadIndex, 1)
        },
        setSearchString(state, search) {
            state.search = search
        }
    },
    getters: {
        isFeedLoaded: state => state.loadedFeed,
        getFeed: state => state.feed,
        getSearchString: state => state.search
    }
}

export default feedModule;