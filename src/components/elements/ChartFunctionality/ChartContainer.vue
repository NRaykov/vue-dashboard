<template>
  <div class="card chart-panel">
    <div class="card-header">
      <span
        v-if="chartType === ChartTypes.LINE_CHART"
        class="title"
      >{{ $t('charts.recentMovement') }}</span>
      <span
        v-if="chartType === ChartTypes.PIE_CHART"
        class="title"
      >{{ $t('charts.browserUsage') }}</span>
      <span
        v-if="chartType === ChartTypes.BAR_CHART"
        class="title"
      >{{ $t('charts.montlySales') }}</span>
    </div>
    <div class="card-body">
      <template v-if="chartType === ChartTypes.LINE_CHART">
        <line-chart 
          :chart-data="datacollection.movement"
          :options="lineChartOptions"
          :height="208" 
        />
      </template>
      <template v-if="chartType === ChartTypes.PIE_CHART">
        <pie-chart 
          :chart-data="datacollection.browser"
          :options="pieChartOptions"
          :width="333"
          :height="180" 
        />
        <table class="table mb-0 mt-3">
          <tbody>
            <tr
              v-for="(label, index) in chartData.chart_browser_usage.labels"
              :key="index"
            >
              <td>{{ label.name }}</td>
              <td class="text-right">
                {{ label.data }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-if="chartType === ChartTypes.BAR_CHART">
        <bar-chart 
          :chart-data="datacollection.sales"
          :options="barChartOptions"
          :height="390" 
        />
      </template>
    </div>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import PieChart from './PieChart.js'
  import BarChart from './BarChart.js'
  import { chartOptions } from './chartOptions.js'
  import ChartTypes from '../../../enums/ChartTypes';

  export default {
    components: {
      LineChart,
      PieChart,
      BarChart
    },
    props: {
        chartData: {
            type: Object,
            default: function () {
              return {}
            }
        },
        chartType: {
            type: String,
            default: ''
        },
        dashboardData: {
            type: Object,
            default: function () {
              return {}
            }
        }
    },
    data () {
      return {
        datacollection: {
          movement: {},
          browser: {},
          sales: {}
        },
        pieChartOptions: chartOptions.pie,
        lineChartOptions: chartOptions.line,
        barChartOptions: chartOptions.bar,
        ChartTypes: ChartTypes,
      }
    },
    watch: {
      dashboardData: {
          immediate: true,
          handler() {
            this.fillData()
          }
      }
    },
    methods: {
      fillData() {
        if(this.chartType === this.ChartTypes.LINE_CHART) {
          this.datacollection.movement = {
            labels: this.chartData.chart_movement.labels,
            datasets: [{
              label: this.chartData.chart_movement.label,
              fill: this.chartData.chart_movement.fill,
              borderColor: this.chartData.chart_movement.border_color,
              backgroundColor: this.chartData.chart_movement.background_color,
              data: this.chartData.chart_movement.chart_data
            }]
          }
        }

        if(this.chartType === this.ChartTypes.PIE_CHART) {
          let labels = this.chartData.chart_browser_usage.labels;
          if(labels) {
            labels = labels.map(label => label.name);
          }
          
          this.datacollection.browser = {
            labels: labels,
            datasets: [{
              data: this.chartData.chart_browser_usage.chart_data,
              backgroundColor: this.chartData.chart_browser_usage.background_color,
              borderWidth: this.chartData.chart_browser_usage.border_width
            }]
          }
        }

        if(this.chartType === this.ChartTypes.BAR_CHART) {
          this.datacollection.sales = {
            labels: this.chartData.chart_montly_sales.labels,
            datasets: [{
              label: this.chartData.chart_montly_sales.label,
              data: this.chartData.chart_montly_sales.chart_data,
              backgroundColor: this.chartData.chart_montly_sales.background_color,
              borderColor: this.chartData.chart_montly_sales.border_color,
              hoverBackgroundColor: this.chartData.chart_montly_sales.hover_background_color,
              hoverBorderColor: this.chartData.chart_montly_sales.hover_border_color,
              barPercentage: this.chartData.chart_montly_sales.bar_percentage,
              categoryPercentage: this.chartData.chart_montly_sales.category_percentage,
            }]
          }
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .card-header {
    background: white;
    border: none;
    margin: 0.5rem 0;
    .title {
      font-size: .875rem;
    }
  }
</style>