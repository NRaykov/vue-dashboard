<template>
  <div>
    <div class="row mb-2 mb-xl-3">
      <div class="col-auto">
        <h3><strong>{{ $t('main.analytics') }}</strong> {{ $t('main.dashboard') }}</h3>
      </div>
    </div>
    <b-row>
      <b-col  
        v-if="isMarketLoaded" 
        lg="5"
      >
        <b-row>
          <b-col lg="6">
            <card-info :market-info="getMarketInfo.market_info.sales" /> 
          </b-col>
          
          <b-col lg="6">
            <card-info :market-info="getMarketInfo.market_info.earnings" /> 
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col lg="6">
            <card-info :market-info="getMarketInfo.market_info.visitors" /> 
          </b-col>
          
          <b-col lg="6">
            <card-info :market-info="getMarketInfo.market_info.orders" /> 
          </b-col>
        </b-row>
      </b-col>
      <b-col  
        v-if="isChartLoaded" 
        lg="7"
      >
        <chart-container
          :chart-data="getChartData"
          :chart-type="ChartTypes.LINE_CHART"
        />
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col 
        md="6" 
        lg="3"
      >
        <calendar-widget />
      </b-col>
      <b-col 
        v-if="isMapdashboardLoaded" 
        md="6"
        lg="6"
      >
        <map-dashboard :map-dashboard="getMapDashboardInfo" />
      </b-col>
      <b-col
        v-if="isChartLoaded" 
        md="6"
        lg="3"
      >
        <chart-container
          :chart-data="getChartData"
          :chart-type="ChartTypes.PIE_CHART"
        />
      </b-col>  
    </b-row>
    <b-row class="mt-5">
      <b-col lg="9">
        <projects-list :projects="getProjects" />
      </b-col>
      <b-col
        v-if="isChartLoaded"
        lg="3"
      >
        <chart-container
          :chart-data="getChartData"
          :chart-type="ChartTypes.BAR_CHART"
        />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import CardInfo from '../elements/CardInfo'
import ChartContainer from '../elements/ChartFunctionality/ChartContainer'
import ProjectsList from '../elements/ProjectsList'
import CalendarWidget from '../elements/CalendarWidget'
import MapDashboard from '../elements/MapDashboard/MapDashboard'
import { mapActions, mapGetters } from 'vuex'
  import ChartTypes from '../../enums/ChartTypes';

 export default {
    components: {
      CardInfo,
      ChartContainer,
      ProjectsList,
      CalendarWidget,
      MapDashboard
    },
    data() {
        return {
          ChartTypes: ChartTypes
        }
    },
    computed: {
      ...mapGetters('dashboardModule', ['isMarketLoaded']),
      ...mapGetters('dashboardModule', ['isChartLoaded']),

      ...mapGetters('dashboardModule', ['getMarketInfo']),
      ...mapGetters('dashboardModule', ['getChartData']),
      ...mapGetters('dashboardModule', ['getProjects']),

      ...mapGetters('mapsModule', ['isMapdashboardLoaded']),
      ...mapGetters('mapsModule', ['getMapDashboardInfo']),
    },
    mounted () {
     this.vx_getMarketInfo();
     this.vx_getChartData();
     this.vx_getProjects();
     this.vx_getMaps();
    },
    methods: {
      ...mapActions('dashboardModule', ['vx_getMarketInfo']),
      ...mapActions('dashboardModule', ['vx_getChartData']),
      ...mapActions('dashboardModule', ['vx_getProjects']),

      ...mapActions('mapsModule', ['vx_getMaps']),
    },
 }
</script>