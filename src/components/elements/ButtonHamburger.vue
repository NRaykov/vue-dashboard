<template>
  <div>
    <span 
      class="sidebar-toggle d-flex"
      @click="vx_toggleSidebarMenu()" 
    >
      <i class="hamburger align-self-center" />
    </span>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    methods: {
      ...mapActions('navigationModule',['vx_toggleSidebarMenu'])
    }
}
</script>