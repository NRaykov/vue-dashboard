<template>
  <div>
    <b-button
      id="follow"
      class="btn-primary btn-sm"
    >
      Follow
    </b-button>

    <b-button
      v-b-modal.message
      class="btn-primary btn-sm"
    >
      <span data-feather="message-square"></span> 
      Message
    </b-button>

    <b-modal
      :id="`message`"
      title="Send Message"
      class="card"
      centered
      hide-header
      hide-footer 
    >
      <h4 class="modal-title">{{ $t('main.sendMessage') }}</h4>
      <b-form-textarea
        :id="`textarea_${getUserId}`"
        placeholder="Enter message..."
      ></b-form-textarea>
      <b-button
        type="submit"
        class="btn btn-main mt-3 w-100"
      >
        {{ $t('buttons.send') }}
      </b-button>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
const feather = require('feather-icons');

export default {
    data() {
        return {}
    },
    computed: {
      ...mapGetters('userModule', ['getUserId']),
    },
    mounted() {
      feather.replace();
    }
}
</script>