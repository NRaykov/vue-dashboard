<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title mb-0">
        {{ $t('main.publicInfo') }}
      </h5>
    </div>
    <div class="card-body">
      <b-form
        data-vv-validate-on="none"
        @submit.prevent
      >
        <b-row>
          <b-col md="8">
            <b-form-group>
              <span class="error">
                {{ errors.first('First Name') }}
              </span> 
              <b-form-input
                v-model="getLoggedUserData.first_name"
                v-validate="'min:3|required'"
                name="First Name"
                type="text"
                class="form-control"
                placeholder="First Name"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <span class="error">
                {{ errors.first('Last Name') }}
              </span>
              <b-form-input
                v-model="getLoggedUserData.last_name"
                v-validate="'min:3|required'"
                name="Last Name"
                type="text"
                class="form-control"
                placeholder="Last Name"
              ></b-form-input>
            </b-form-group>
            <b-form-group class="mt-3">
              <span class="error">
                {{ errors.first('Biography') }}
              </span>
              <b-form-textarea
                id="inputBio"
                v-model="getLoggedUserData.bio"
                v-validate="'max:1000'"
                name="Biography"
                rows="2"
                class="form-control"
                placeholder="Tell something about yourself"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <div class="text-center">
              <div class="mt-2">
                <img
                  v-if="!hasImage"
                  alt="Charles Hall"
                  :src="getLoggedUserData.profile_pic ? getLoggedUserData.profile_pic : $store.state.defaultProfilePic"
                  class="rounded-circle img-responsive mt-2"
                  width="128"
                  height="128"
                />
                <image-uploader
                  :preview="true"
                  :class-name="['fileinput', { 'fileinput--loaded': hasImage }]"
                  capture="environment"
                  :debug="1"
                  do-not-resize="gif"
                  :auto-rotate="true"
                  output-format="verbose"
                  class="upload-img-panel"
                  @input="setImage"
                >
                  <label
                    slot="upload-label"
                    for="fileInput"
                    class="img-input"
                  >
                    <span class="btn btn-primary"><i class="fas fa-upload"></i>{{
                      hasImage ? "Replace" : "Upload"
                    }}</span>
                  </label>
                </image-uploader>
              </div>
              <small>{{ $t('main.imgBestResult') }}</small>
            </div>
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
              msg: "",
              hasImage: false,
              image: null,
              imageUrl: null,
              RouteNames: RouteNames
            }
        },
        computed: {
            ...mapGetters('userModule', ['getLoggedUserData']),
        },
        methods: {
            ...mapActions('userModule', ['vx_editProfile']),

            setImage: function(output) {
              this.hasImage = true;
              this.image = output;
              this.imageUrl = output.dataUrl
            },

            editProfile() {
                /** TODO Optimizie userData object (maybe some kind of interface or maybe calling 'userData' object from the store) **/
                const userData = {
                    first_name: this.getLoggedUserData.first_name,
                    last_name: this.getLoggedUserData.last_name,
                    bio: this.getLoggedUserData.bio,
                    profile_pic: this.imageUrl ? this.imageUrl : this.getLoggedUserData.profile_pic,
                    skills: this.getLoggedUserData.socials,
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