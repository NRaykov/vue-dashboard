<template>
  <div class="card">
    <div class="card-body">
      <div class="card-info-title">
        {{ marketInfo.title }}
      </div>
      <div class="card-info-content">
        {{ marketInfo.total }}
      </div>
      <div class="card-info-footer">
        <span  
          v-if="marketInfo.weekly < 0"
          class="text-danger mr-2"
        >
          {{ marketInfo.weekly }} &#37;
        </span>
        <span  
          v-if="marketInfo.weekly >= 0"
          class="text-success mr-2"
        >
          {{ marketInfo.weekly }} &#37;
        </span>

        <span class="text-muted">
          {{ $t('cardInfo.sinceLastWeek') }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    props: {
      marketInfo: {
        type: Object,
        default: function () {
          return { }
        }
      },
    },
    data() {
        return {}
    },
}
</script>