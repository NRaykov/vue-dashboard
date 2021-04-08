<template>
  <div class="card card-activities">
    <div class="card-header">
      <h5 class="card-info-title">
        {{ $t('main.activities') }}
      </h5>
    </div>
    <div class="card-body">
      <activity-item :activities-data="getActivities" />
      <button
        v-if="hidePagination === false && !routeId"
        class="btn btn-primary btn-block"
        @click="paginateActivities()"
      >
        {{ $t('buttons.loadMore') }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ActivityItem from '../elements/ActivityItem';

export default {
    components: {
      ActivityItem
    },
    data() {
        return {
          routeId: this.$route.params.id,
          pagination: {
            current_page: 0,
            next_page: 0,
            last_page: 2
          },
          hidePagination: false
        }
    },
    computed: {
      ...mapGetters('activitiesModule', ['getActivities'])
    },
    watch: {
        $route (to, from){
            if(to !== from) {
                this.fetchActivities();
            }
        }
    },
    mounted () {
        this.fetchActivities();
    },
    methods: {
      ...mapActions('activitiesModule', ['vx_getActivitiesLoggedUser']),
      ...mapActions('activitiesModule', ['vx_getActivitiesOtherUser']),
      ...mapActions('activitiesModule', ['vx_clearActivitiesData']),


      //TODO Bug fix on router change 
      fetchActivities() {
        this.routeId = this.$route.params.id;
        this.vx_clearActivitiesData();
            if(this.routeId) {
              this.vx_getActivitiesOtherUser(this.routeId);
            } else {
               this.pagination.current_page++;
               this.vx_getActivitiesLoggedUser(this.pagination.current_page);
            }
          return;
        },

        async paginateActivities() {
          this.pagination.current_page++;
          if(this.pagination.current_page <= this.pagination.last_page) {
            const activities = await this.vx_getActivitiesLoggedUser(this.pagination.current_page);
            if(activities) {
                this.pagination.last_page = activities.meta.last_page;
                if(this.pagination.current_page === this.pagination.last_page) {
                  this.hidePagination = true;
                }
            }
        } 
      }
    }
}
</script>