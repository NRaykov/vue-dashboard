<template>
  <div class="card">
    <div class="card-header">
      {{ $t('dashboard.realTime') }}
    </div>
    <div class="card-body">
      <div
        id="world_map"
        style="height:325px;"
      />
    </div>
  </div>
</template>
<script>
// Register jvectormap
window.jQuery = require('jquery');
import $ from 'jquery';
require('jvectormap-next')($);
require('./jquery-jvectormap-world-mill');
import { jvMapConfig } from './jvMapConfig';

export default {
    props: {
        mapDashboard: {
          type: Object,
          default: function() {
            return {}
          }
        }
    },
    data() {
        return {}
    },
    mounted() {
      this.drawMap();

      this.$nextTick(() => {
        $(window).trigger('resize');
      });
    },
    methods: {
      drawMap() {
        let mapConfig = jvMapConfig;
        mapConfig = jvMapConfig;
        mapConfig.markers = this.mapDashboard.markers;
        $("#world_map").vectorMap(mapConfig);
      }
    },
}
</script>