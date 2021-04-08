<template>
  <div>
    <h3>Choose Your Theme</h3>
    <b-row>
      <b-col lg="3">
        <div class="card mt-5">
          <div class="themes-controls">
            <div
              class="btn-theme light-blue"
              @click="setTheme('theme-light-blue')"
            >
            </div>
            <div
              class="btn-theme blue"
              @click="setTheme('theme-blue')"
            >
            </div>
            <div
              class="btn-theme dark-blue"
              @click="setTheme('theme-dark-blue')"
            >
            </div>
            <div
              class="btn-theme green"
              @click="setTheme('theme-green')"
            >
            </div>
            <div
              class="btn-theme purple"
              @click="setTheme('theme-purple')"
            >
            </div>
            <div
              class="btn-theme dark-gray"
              @click="setTheme('theme-dark-gray')"
            >
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

 export default {
     data() {
         return {}
     },
     methods: {
         ...mapActions('themesModule', ['vx_setTheme']),

        setTheme(theme) {
            this.vx_setTheme(theme)
        }
     }
 }
</script>