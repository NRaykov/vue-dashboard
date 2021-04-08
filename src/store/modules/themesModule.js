const themesModule = {
    namespaced: true,
    state: {
        themes: ''
    },
    actions: {
        vx_setTheme({commit}, theme) {
            commit('setTheme', theme)
        }
    },
    mutations: {
        setTheme(state, theme) {
            state.themes = theme
        }
    },
    getters: {
        getTheme: state => state.themes
    }
}

export default themesModule;