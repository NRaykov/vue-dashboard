<template>
  <div>
    <b-row>
      <b-col lg="6">
        <h1 class="h3 mb-3">{{ $t('main.feed') }}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-if="isFeedLoaded"
        lg="12"
      >
        <b-row class="height-80vh scrollbar">
          <b-col
            v-for="item in filteredThreads"
            :key="item.id"
            md="3"
            lg="3"
          >
            <thread-item :feed-item="item" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div> 
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ThreadItem from "./ThreadItem";
 export default {
     components: {
        ThreadItem
     },
     data() {
         return {}
     },
     computed: {
        ...mapGetters('feedModule', ['isFeedLoaded']),
        ...mapGetters('feedModule', ['getFeed']),
        ...mapGetters('feedModule', ['getSearchString']),

        filteredThreads: function() {
          return this.getFeed.filter((thread) => {
              return thread.title.toLowerCase().match(this.getSearchString)
          })
        }
     },
     mounted() {
       this.vx_getFeed();
     },
     methods: {
        ...mapActions('feedModule', ['vx_getFeed']),
     }
 }
</script>