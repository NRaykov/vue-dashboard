<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title mb-0">
        {{ $t('main.skills') }}
      </h5>
    </div>
    <div class="card-body">
      <b-form
        data-vv-validate-on="none"
        @submit.prevent
      >
        <b-row v-if="isLoaded">
          <b-col
            lg="8"
            md="8"
          >
            <div class="drag">
              <div
                v-drag-and-drop:options="options"
                class="drag-container"
              >
                <ul class="drag-list">
                  <li
                    v-for="skill in skills"
                    :key="skill.id"
                    class="drag-column"
                  >
                    <span class="drag-column-header">
                      <h4 class="card-title">{{ skill.name }}</h4>
                    </span>
                    <vue-draggable-group
                      v-model="skill.items"
                      :groups="skills"
                      :data-id="skill.id"
                      @change="onGroupsChange"
                    >
                      <ul
                        class="drag-inner-list"
                        :data-id="skill.id"
                      >
                        <li
                          v-for="(item) in skill.items"
                          :key="item.id"
                          class="badge badge-primary mr-1 my-1 drag-item"
                          :data-id="item.id"
                        >
                          <div class="drag-item-text">
                            {{ item.name }}
                          </div>
                        </li>
                      </ul>
                    </vue-draggable-group>
                  </li>
                </ul>
              </div>
            </div>
          </b-col>
        </b-row>

        <button
          type="button"
          class="btn btn-primary"
          @click="editProfile()"
        >
          {{ $t('main.saveSkills') }}
        </button>
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { VueDraggableDirective } from 'vue-draggable';
import _ from 'lodash';
import RouteNames from '../../../enums/RouteNames';

    export default {
        directives: {
          dragAndDrop: VueDraggableDirective
        },
        data() {
            return {
                skills: [
                  {
                    id: 1,
                    name: "Your Skills",
                    items: [
                      { id: 1, name: "Item 1", groupId: 1 },
                    ]
                  },
                  {
                    id: 2,
                    name: "All Skills",
                    items: [
                      { id: 44, name: "CSS", groupId: 2 },
                      { id: 88, name: "React", groupId: 2 },
                      { id: 99, name: "Angular 10", groupId: 2 },
                      { id: 110, name: "Material UI", groupId: 2 },
                      { id: 111, name: "Ionic UI", groupId: 2 },
                      { id: 113, name: "Nuxt.js", groupId: 2 }
                    ]
                  }
                ],
                options: {
                  dropzoneSelector: ".drag-inner-list",
                  draggableSelector: ".drag-item"
                },
                RouteNames: RouteNames
            }
        },
        computed: {
            ...mapGetters('userModule', ['getLoggedUserData']),
            ...mapGetters('userModule', ['isLoaded']),
        },
        async mounted () {
          await this.loadSkillsData();
        },
        methods: {
            ...mapActions('userModule', ['vx_editProfile']),

            onGroupsChange(e) {
              /** Removes Duplicates in the array on GroupsChange **/
              this.skills[0].items = _.uniqBy(this.skills[0].items, 'name');
            },

            loadSkillsData() {

              //TODO Bug fix after refresh 
              
              if(this.getLoggedUserData) {
                const skillsCollection = [];
                this.skills[0].items = this.getLoggedUserData.skills;
                //TODO remove duplicate skills from second index of the array
              }
              return;
            },

            editProfile() {
                /** TODO Optimizie userData object (maybe some kind of interface or maybe calling 'userData' object from the store) **/
                const userData = {
                    first_name: this.getLoggedUserData.first_name,
                    last_name: this.getLoggedUserData.last_name,
                    bio: this.getLoggedUserData.bio,
                    profile_pic: this.getLoggedUserData.profile_pic,
                    skills: this.skills[0].items,
                    socials: this.getLoggedUserData.socials
                };
                this.vx_editProfile(userData);
                this.$toastr.i(this.$t('toastr.profileUpdated'), this.$t('toastr.updateProfile'));
                this.$router.push({name: this.RouteNames.PROFILE}).catch(() => {});
            }
        }
    }
</script>