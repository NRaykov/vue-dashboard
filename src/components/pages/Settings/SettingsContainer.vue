<template>
  <div class="container-fluid">
    <h1 class="h3 mb-3">
      Settings
    </h1>
    <b-row>
      <b-col
        md="3"
        lg="2"
      >
        <sidebar-settings />
      </b-col>
      <b-col
        v-if="getLoggedUserData"
        md="9"
        lg="10"
      >
        <router-view></router-view>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import SidebarSettings from '../../../components/elements/SidebarSettings/SidebarSettings';
import { mapActions, mapGetters } from 'vuex';
 export default {
     components: {
         SidebarSettings
     },
     data() {
         return {
             
         }
     },
    computed: {
        ...mapGetters('userModule', ['getLoggedUserData']),
    },
    mounted () {
        this.vx_getDataFromLoggedUser()
    },
    methods: {
        ...mapActions('userModule', ['vx_getDataFromLoggedUser']),
    }
 }
</script>