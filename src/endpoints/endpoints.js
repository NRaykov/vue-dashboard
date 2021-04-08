let BASE_URL = '';
process.env.NODE_ENV === 'production' ? BASE_URL = '/vue-dashboard' : '';

const endpoints = {
    getCredentials: `${ BASE_URL }/api/HN4Y71Zj7g/IR3eHZW8Ga.json`,
    getNavigations: `${ BASE_URL }/api/navigations.json`,
    getUserData: `${ BASE_URL }/api/user.json`,
    getMarketInfo: `${ BASE_URL }/api/market_info.json`,
    getCharts: `${ BASE_URL }/api/charts.json`,
    getProjects: `${ BASE_URL }/api/projects.json`,
    getMaps: `${ BASE_URL }/api/maps.json`,
    getUserContacts: `/api/messages/contacts.json`,
    getFeed: `${ BASE_URL }/api/feed/feed.json`,
    getOtherUserData: function(id) {
        return `${ BASE_URL }/api/users/${id}.json`
    },
    getActivitiesLoggedUser: function(page) {
        return `${ BASE_URL }/api/activities/user/user_${page}.json`
    },
    getActivitiesOtherUser: function(id) {
        return `${ BASE_URL }/api/activities/${id}.json`
    },
    getMessages: function(id) {
        return `${ BASE_URL }/api/messages/${id}.json`
    }
}

export default endpoints; 

