<template>
  <div class="sidebar-cta">
    <div class="sidebar-cta-content">
      <strong class="d-inline-block mb-2">{{ $t('main.upgradeToPro') }}</strong>
      <span class="upgrade-text">{{ $t('main.coolFeatures') }}</span>
      <!-- Paypal Integration -->
      <div ref="paypal"></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
const feather = require('feather-icons');

export default {
    data() {
        return {
          order: this.$store.state.upgradeModule.order
        }
    },
   computed: {

    },
    created() {
      feather.replace();
    },
    mounted() {
         //Dispatch Action from the store
         this.vx_payPalDepend(this.setLoaded);
    },
    methods: {
      //this.$refs.paypal
        ...mapActions('upgradeModule', ['vx_payPalDepend']),
        ...mapActions('upgradeModule', ['vx_renderButton']),

        setLoaded: function() {
          //Dispatch Action from the store
          this.vx_renderButton(this.$refs.paypal)
        }
      }
}
</script>