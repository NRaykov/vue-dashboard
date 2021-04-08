<template>
  <div class="card thread-item">
    <div class="card-header">
      <div class="title mb-3">
        <div class="title-panel">
          <router-link 
            :to="{name: 'thread', params: {id: feedItem.id }}" 
            class="thread-item-link"
          >
            <h4>{{ feedItem.title }}</h4>
          </router-link>
          <div class="d-flex align-items-center">
            <div
              class="like-panel"
              @click="likeToggle(feedItem.id)"
            >
              <i
                :class="[feedItem.is_liked ? 'fas' : 'far']"
                class="fa-heart"
              ></i>
            </div>
            <b-dropdown
              :id="`dropdown_${feedItem.id}`"
              variant="primary"
            >
              <b-dropdown-item @click="openDeleteThread(id)">
                {{ $t('thread.deleteThread') }}
              </b-dropdown-item>
            </b-dropdown>
            <!-- Modal -->
            <!-- <b-modal :ref="`delete-thread-${feedItem.id}`">R U Sure U want to delete this thread?</b-modal> -->
          </div>
        </div>
      </div>
  
      <div
        v-if="feedItem.thumbnail"
        class="thumbnail-panel"
      >
        <img
          :src="feedItem.thumbnail"
          class="img-fluid"
          alt="Thumbnail"
        >
      </div>
      <div class="timestamp d-flex justify-content-between">
        <small>{{ feedItem.created }}</small>
        <small>{{ feedItem.author }}</small>
      </div>
    </div>
    <div class="card-body">
      <div class="card-bio mt-2">
        <read-more
          more-str="Read more"
          :text="feedItem.contnet"
          link="#"
          less-str="Read less"
          :max-chars="300"
        ></read-more>
      </div>
    </div>
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
     computed: {
        ...mapGetters('feedModule', ['getSearchString']),
     },
     methods: {
       ...mapActions('feedModule', ['vx_likeThread']),
       ...mapActions('feedModule', ['vx_deleteThread']),

       likeToggle(id) {
          this.vx_likeThread(id)
       },
       openDeleteThread(id) {
        this.$refs[`delete-thread-${id}`].show()
         // this.vx_deleteThread(id)
       }
     }
 }
</script>