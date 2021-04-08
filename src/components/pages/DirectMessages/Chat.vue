<template>
  <div class="direct-msgs-panel">
    <div
      v-if="getContacts[0]"
      class="sc"
    >
      <beautiful-chat
        :participants="getContacts"
        :on-message-was-sent="onMessageWasSent"
        :message-list="getContacts[0].messages"
        :disable-user-list-toggle="true"
        :new-messages-count="0"
        :show-header="false"
        :is-open="true"
        :close="closeChat"
        :open="openChat"
        :show-emoji="true"
        :show-file="false"
        :show-deletion="true"
        :show-typing-indicator="''"
        :colors="colors"
        :always-scroll-to-bottom="false"
        :message-styling="true"
      />
    </div>
  </div>
</template>
<script>
import colors from './colors';

export default {
  props: {
    getContacts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      colors: colors,
    }
  },
  methods: {
    //TODO -> move methods in the store
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      if(this.getContacts[0].messages) {
        return this.getContacts[0].messages = [ ...this.getContacts[0].messages, message ]
      };
      return;
    },
    openChat () {
        return false;
    },
    closeChat () {
        return false;
    }
  }
}
</script>