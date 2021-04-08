<template>
  <div class="card">
    <div class="card-header">
      {{ $t('dashboard.calendar') }}
    </div>
    <div class="card-body calendar-widget-panel">
      <b-calendar
        v-model="value"
        class="calendar-widget"
        locale="en-US"
        block
        @context="onContext"
      />
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        context: null
      }
    },
    methods: {
      onContext(ctx) {
        this.context = ctx
      },
    }
  }
</script>