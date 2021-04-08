<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title mb-0">
        {{ $t('sidebar.addInfo') }}
      </h5>
    </div>
    <div class="card-body">
      <div class="card-title mb-5">
        <strong>
          {{ $t('main.showHideSocials') }}
        </strong>
      </div>
      <b-form
        data-vv-validate-on="none"
        @submit.prevent
      >
        <b-row>
          <b-col md="8">
            <b-form-group
              v-for="(media, index) in getLoggedUserData.socials"
              :key="index"
            >
              <b-form-checkbox
                :checked="media.visible"
                name="check-button"
                switch
                @change="toggleVisibitily(index)"
              >
                <span class="social-link">
                  {{ media.name }}
                </span>
              </b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <div class="text-center"></div>
          </b-col>
        </b-row>

        <button
          type="button"
          class="btn btn-primary"
          :disabled="errors.first('First Name') || errors.first('Last Name') || errors.first('Biography')"
          @click="editProfile"
        >
          {{ $t('buttons.update') }}
        </button>
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import RouteNames from '../../../enums/RouteNames';

    export default {
        data() {
            return {
              RouteNames: RouteNames
            }
        },
        computed: {
            ...mapGetters('userModule', ['getLoggedUserData']),
        },
        methods: {
            ...mapActions('userModule', ['vx_editProfile']),
            ...mapActions('userModule', ['vx_toggleSocialMedia']),

            toggleVisibitily(index) {
              if (!index) {
                return;
              }

              this.getLoggedUserData.socials.map((item, i) => {
                if(index === i) {
                  item.visible = !item.visible;
                  /** Mutating state -> changes state of single item  **/
                  this.vx_toggleSocialMedia(index);
                }
              });
            },

            editProfile() {
                /** TODO Optimizie userData object (maybe some kind of interface or maybe calling 'userData' object from the store) **/
                const userData = {
                    first_name: this.getLoggedUserData.first_name,
                    last_name: this.getLoggedUserData.last_name,
                    bio: this.getLoggedUserData.bio,
                    profile_pic: this.getLoggedUserData.profile_pic,
                    skills: this.getLoggedUserData.skills,
                    socials: this.getLoggedUserData.socials
                };
                this.$validator.validateAll().then(success => {
                    this.vx_editProfile(userData);
                    this.$toastr.i(this.$t('toastr.profileUpdated'), this.$t('toastr.updateProfile'));
                    this.$router.push({name: this.RouteNames.PROFILE}).catch(() => {});
                });
            }
        }
    }
</script>