<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">
      </div>
      <div
        class="list-group list-group-flush sidebar-settings"
        role="tablist"
      >
        <router-link
          :to="{ name: 'account'}"
          class="list-group-item list-group-item-action"
        >
          {{ $t('sidebar.account') }}
        </router-link>
        <router-link
          :to="{ name: 'additional'}"
          class="list-group-item list-group-item-action"
        >
          {{ $t('sidebar.addInfo') }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>