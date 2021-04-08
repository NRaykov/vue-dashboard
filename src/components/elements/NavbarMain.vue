<template>
  <div>
    <b-navbar
      v-if="isLoaded"
      fixed
      toggleable="lg"
      class="navbar-main feather-panel"
    >
      <button-hamburger />
      
      <b-navbar-nav>
        <b-nav-form v-if="$route.name === RouteNames.FEED">
          <div class="search-panel">
            <b-form-input
              v-model="search"
              size="sm"
              class="mr-sm-2"
              placeholder="Search..."
              @keyup="vx_searchThread(search)"
            />
          </div>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav             
        right 
        class="ml-auto navbar-user"
      >
        <li class="nav-item dropdown">
          <a
            id="alertsDropdown"
            class="nav-icon dropdown-toggle"
            href="#"
            data-toggle="dropdown"
          >
            <div
              v-if="getLoggedUserData.notifications" 
              class="position-relative"
            >
              <i
                class="align-middle"
                data-feather="bell"
              />
              <span class="indicator">{{ getLoggedUserData.notifications.counter }}</span> 
            </div>
          </a>
        </li>

        <li class="nav-item dropdown">
          <a
            id="alertsDropdown"
            class="nav-icon dropdown-toggle"
            href="#"
            data-toggle="dropdown"
          >
            <div class="position-relative">
              <i
                class="align-middle"
                data-feather="message-square"
              />
            </div>
          </a>
        </li>

        <b-nav-form>
          <div class="avatar-panel">
            <img
              :src="getLoggedUserData.profile_pic ? getLoggedUserData.profile_pic : $store.state.defaultProfilePic"
              :alt="getLoggedUserData.first_name"
              class="avatar"
            >
          </div>
          <b-nav-item-dropdown class="dropdown-menu-right">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              {{ getLoggedUserData.first_name }}
              {{ getLoggedUserData.last_name }}
            </template>
            <router-link 
              :to="{name: 'profile'}" 
              class="dropdown-item"
            >
              {{ $t('buttons.profile') }}
            </router-link>
            <b-dropdown-item 
              @click="logout"
            >
              {{ $t('buttons.logout') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav-form> 
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import ButtonHamburger from '../elements/ButtonHamburger';
import { mapActions, mapGetters } from 'vuex';
import RouteNames from '../../enums/RouteNames';

export default {
    components: {
      ButtonHamburger
    },
    data() {
        return {
          RouteNames: RouteNames,
          search: '',
        }
    },
    computed: {
      ...mapGetters('userModule', ['getLoggedUserData']),
      ...mapGetters('userModule', ['isLoaded']),
      ...mapGetters('feedModule', ['getFeed']),
    },
    methods: {
      ...mapActions('authModule', ['vx_logout']),
      ...mapActions('feedModule', ['vx_searchThread']),
      
      logout() {
        this.vx_logout();
        this.$router.push({name: this.RouteNames.LOGIN}).catch(() => {});
      }
    }
}
</script>