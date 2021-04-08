<template>
  <div>
    <b-row>
      <b-col lg="2">
        <div
          v-if="getUserContacts"
          class="card contacts"
        >
          <div
            v-for="(contact, index) in getUserContacts"
            :key="index"
          >
            <div
              :class="{'active': activeItem === index }"
              class="contacts-item"
              @click="selectParticipant(contact.id, index)"
            >
              <img
                :src="contact.imageUrl"
                width="36"
                height="36"
                class="rounded-circle mr-2"
                alt=""
              />
              <span>{{ contact.name }}</span>
            </div>
          </div>
        </div>
      </b-col>
      <b-col lg="6">
        <div
          v-if="messagesLoaded"
          class="card"
        >
          <chat
            :get-contacts="getParticipants"
            :reload-chat="reloadChat"
          />
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Chat from './Chat';
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';

 export default {
    components: {
      Chat
    },
    data() {
      return {
        reloadChat: false,
        activeItem: 0
      }
    },
    computed: {
      ...mapGetters('messagesModule', ['getParticipants']),
      ...mapGetters('messagesModule', ['getUserContacts']),
      ...mapGetters('messagesModule', ['messagesLoaded'])
    },
    mounted () {
      this.vx_getContacts();
      this.vx_getMessages(1231);
    },
    methods: {
      ...mapActions('messagesModule', ['vx_getMessages']),
      ...mapActions('messagesModule', ['vx_clearParticipants']),
      ...mapActions('messagesModule', ['vx_getContacts']),

      /** TODO -> Optimize Requests on click **/
      selectParticipant: _.debounce(function(id, index) {
        this.vx_clearParticipants();
        this.vx_getMessages(id);

        this.activeItem = index;
      }, 300)
    }    
 }
</script>