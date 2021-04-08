<template>
  <div id="app">
    <layout-container />
  </div>
</template>

<script>
import LayoutContainer from './components/LayoutContainer';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    LayoutContainer
  },
  created() {
    if(localStorage.getItem('jwt')) {
      this.vx_getDataFromLoggedUser();
    }
  },
  methods: {
    ...mapActions('userModule',[
        'vx_getDataFromLoggedUser'
    ]),
  },
}
</script>
