import { cloneDeep } from 'lodash';
import endpoints from "../../endpoints/endpoints";
import { httpGET } from "../../http/http";


const PROJECT = {
        id: 0,
        name: 'placeholder',
        start_date: 'placeholder',
        end_date: 'placeholder',
        status: 'placeholder',
        assaignee: 'placeholder'
}

const MARKET_INFO = {
    userId: 3424,
    market_info:  {
        sales: {
            id: 0,
            title: "Placeholder",
            total_sales: 0,
            weekly_sales: 0
        },
        earnings: {
            id: 0,
            title: "Placeholder",
            total_earnings: 0,
            weekly_earnings: 0
        },
        visitors: {
            id: 0,
            title: "Placeholder",
            total_visitors: 0,
            weekly_orders: 0
        },
        orders: {
            id: 0,
            title: "Placeholder",
            total_orders: 0,
            weekly_orders: 0
        }
    }       
};

const CHART_DATA = {
    chart_movement: {
        id: 0,
        chart_data: [],
        label: "Placeholder",
        labels: [],
        fill: false,
        border_color: "placeholder",
        background_color: "placeholder"
    },
    chart_browser_usage: {
        id: 0,
        chart_data: [],
        labels: [],
        border_width: 0,
        background_color: "placeholder"
    },
    chart_montly_sales: {
        
    }
};

const dashboardModule = {
    namespaced: true, 
    state: {
        marketInfo: cloneDeep(MARKET_INFO),
        chartData: cloneDeep(CHART_DATA),
        projects: cloneDeep(PROJECT),

        //TODO -> Refactor This (Use Global Loader)
        loadedMarketInfo: false,
        loadedChart: false,
    },
    actions: {
        async vx_getMarketInfo({commit}) {
            try {
                const res = await httpGET(endpoints.getMarketInfo);
                const data = await res.json();

                if(data.data) {
                     commit('loadedMarketStatus', true);
                     commit('setMarketInfo', data.data);  
                }

                return data.data;
                
            } catch (err) {
                 console.log(err)
            }
        },
        async vx_getChartData({commit}) {
            try {
                const res = await httpGET(endpoints.getCharts);
                const data = await res.json();

                if(data.data) {
                     commit('loadedChartStatus', true);
                     commit('setChartData', data.data);
                }

                return data.data;

            } catch (err) {
                 console.log(err)
            }
        },
        async vx_getProjects({commit}) {
            try {
                const res = await httpGET(endpoints.getProjects);
                const projects = await res.json();
                
                if(projects.data) {
                     commit('loadedChartStatus', true);
                     commit('setProjects', projects.data);
                }
                
                return projects.data;

            } catch (err) {
                 console.log(err)
            }
        }
    },
    mutations: {
        loadedMarketStatus(state, status) {
            return state.loadedMarketInfo = status;
        },
        loadedChartStatus(state, status) {
            return state.loadedChart = status;
        },

        setMarketInfo(state, marketInfoResponse) {
            state.marketInfo = marketInfoResponse;
        },
        setChartData(state, chartDataResponse) {
            state.chartData = chartDataResponse;
        },
        setProjects(state, projectsResponse) {
            state.projects = projectsResponse;
        }
    },
    getters: {
        isMarketLoaded: state => state.loadedMarketInfo,
        isChartLoaded: state => state.loadedChart,

        getMarketInfo: state => state.marketInfo,
        getChartData: state => state.chartData,
        getProjects: state => state.projects
    }
}

export default dashboardModule;