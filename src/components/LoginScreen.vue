<template>
  <section class="login-screen">
    <div class="login-panel">
      <b-card>
        <div class="login-title-panel">
          <span class="login-title">{{ $t('main.login') }}</span>
          <div
            v-if="invalidCredentials" 
            class="error"
          >
            <span>{{ $t('errors.invalidCredentials') }}</span>
          </div>
        </div>
        <b-form
          action="/"
          @submit="onSubmit"
        >
          <b-form-group>
            <b-form-input 
              :id="`type-email`"
              v-model="user.email"
              :type="'email'"
              @click="invalidCredentials = false" 
            />
          </b-form-group>   
          <b-form-group>
            <b-form-input 
              :id="`type-password`"
              v-model="user.password" 
              :type="'password'"
              @click="invalidCredentials = false"
            />
          </b-form-group>
          <button
            type="submit"
            class="btn-main w-100"
          >
            {{ $t('buttons.login') }}
          </button>
        </b-form>
      </b-card>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import RouteNames from '../enums/RouteNames'

export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            invalidCredentials: false,
            RouteNames: RouteNames
        }
    },
    computed: {
      ...mapState("authModule", ["token"]),
    },
    methods: {
      ...mapActions('authModule',[
          'vx_login'
      ]),
      ...mapActions('userModule',[
          'vx_getDataFromLoggedUser'
      ]),
      onSubmit(e) {
          e.preventDefault();

          this.vx_login(this.user).then(() => {

              if(!this.token) {
                return this.invalidCredentials = true;
              };

              this.$router.push({name: RouteNames.DASHBOARD}).then(() => {
                  this.vx_getDataFromLoggedUser();
              }).catch(() => {});
          });
      },
    }
}
</script>