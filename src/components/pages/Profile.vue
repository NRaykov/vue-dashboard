<template>
  <div>
    <div class="row mb-2 mb-xl-3">
      <div class="col-auto">
        <template v-if="routeId">
          <h3>{{ $t('main.userProfile') }}</h3>
        </template>
        <template v-else>
          <h3>{{ $t('main.myProfile') }}</h3>
        </template>
      </div>
    </div>
    <b-row>
      <b-col
        v-if="isLoaded"
        lg="3"
        md="4"
      >
        <profile-info :user-data="routeId ? getUserData : getLoggedUserData" />
      </b-col>
      <b-col
        lg="9"
        md="8"
      >
        <activities-component />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ProfileInfo from '../elements/ProfileInfo';
import ActivitiesComponent from '../elements/ActivitiesComponent';

 export default {
     components: {
         ProfileInfo,
         ActivitiesComponent
     },
     data() {
         return {
             routeId: this.$route.params.id
         }
     },
    computed: {
      ...mapGetters('userModule', ['getUserData']),
      ...mapGetters('userModule', ['getLoggedUserData']),
      ...mapGetters('userModule', ['isLoaded']),
    },
    watch:{
        $route (to, from){
            if(to !== from) {
                this.routeId = this.$route.params.id;
                this.fetchUserData();
            }
        }
    },
    mounted () {
        this.fetchUserData();
    },
    methods: {
      ...mapActions('userModule', ['vx_getDataFromLoggedUser']),
      ...mapActions('userModule', ['vx_getDataFromOtherUser']),
      ...mapActions('userModule', ['vx_clearUserData']),

      fetchUserData() {
        this.vx_clearUserData();
        if(this.routeId) {
            this.vx_getDataFromOtherUser(this.routeId)
        } else {
            this.vx_getDataFromLoggedUser();
        } 
      }
    }
 }
</script>