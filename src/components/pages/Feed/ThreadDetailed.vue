<template>
  <div>
    <h3>Thread Detailed</h3>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
 export default {
     props: {
         feedItem: {
            type: Object,
            default: function () {
            return { }
            }
         }
     },
     data() {
         return {}
     },
     computed: {},
     methods: {}
 }
</script>