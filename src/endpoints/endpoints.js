const endpoints = {
    getCredentials: `/api/HN4Y71Zj7g/IR3eHZW8Ga.json`,
    getNavigations: `/api/navigations.json`,
    getUserData: `/api/user.json`,
    getMarketInfo: `/api/market_info.json`,
    getCharts: `/api/charts.json`,
    getProjects: `/api/projects.json`,
    getMaps: `/api/maps.json`,
    getUserContacts: `/api/messages/contacts.json`,
    getFeed: `/api/feed/feed.json`,
    getOtherUserData: function(id) {
        return `/api/users/${id}.json`
    },
    getActivitiesLoggedUser: function(page) {
        return `/api/activities/user/user_${page}.json`
    },
    getActivitiesOtherUser: function(id) {
        return `/api/activities/${id}.json`
    },
    getMessages: function(id) {
        return `/api/messages/${id}.json`
    }
}

export default endpoints; 

