<template>
  <div :class="getTheme">
    <nav
      id="sidebar"
      class="sidebar"
      :class="{ 'close-sidebar': getSidebarStatus}"
    >
      <div
        class="sidebar-content js-simplebar"
        data-simplebar="init"
      >
        <a
          class="sidebar-brand"
          href="#"
        >
          <span class="align-middle">{{ $t('main.adminkit') }}</span>
        </a>
        <ul
          v-if="isLoaded" 
          class="sidebar-nav feather-panel"
        >
          <!-- Category - Pages -->
          <div           
            v-for="(itemPages, indexPages) in getSidebarItems[0]['pages']" 
            :key="itemPages.id"
          >
            <sidebar-item
              :menu-item="itemPages"
              :index="indexPages"
            />
          </div>

          <!-- Category - Tools -->
          <template v-if="getProVersion === 'COMPLETED'">
            <div 
              v-for="(itemTools, indexTools) in getSidebarItems[1]['tools']" 
              :key="itemTools.id"
            >
              <sidebar-item
                :menu-item="itemTools"
                :index="indexTools"
              />
            </div>

            <!-- Category - Plugins -->
            <div 
              v-for="(itemPlugins, indexPlugins) in getSidebarItems[2]['plugins']" 
              :key="itemPlugins.id"
            >
              <sidebar-item
                :menu-item="itemPlugins"
                :index="indexPlugins"
              />
            </div>
          </template>
        </ul>

        <!-- Upgrade Widget -->
        <template v-if="(isLoggedIn || getLoggedStatus) && getProVersion !== 'COMPLETED'">
          <upgrade-widget />
        </template>
      </div>
    </nav>
  </div>
</template>
<script>
import UpgradeWidget from '../UpgradeWidget';
import SidebarItem from './SidebarItem';
import { mapActions, mapGetters } from 'vuex';

const feather = require('feather-icons');

export default {
    components: {
        UpgradeWidget,
        SidebarItem
    },
    data() {
      return {
        isLoggedIn: '',
      }
    },
    computed: {
        ...mapGetters('authModule',[
            'getLoggedStatus'
        ]),
        ...mapGetters('navigationModule',[
            'getSidebarItems'
        ]),
        ...mapGetters('navigationModule',[
            'getSidebarStatus'
        ]),
        ...mapGetters('navigationModule',[
            'isLoaded'
        ]),
        ...mapGetters('upgradeModule',[
            'getProVersion'
        ]),
        ...mapGetters('themesModule',[
            'getTheme'
        ]),
    },
    async created() {
       await this.vx_getNavigations();
       feather.replace();
    },
    mounted() {
      // Execude this method in dev env only
      this.vx_resetOrder();
      this.isLoggedIn = localStorage.getItem('jwt');
    },
    methods: {
        ...mapActions('navigationModule',[
            'vx_getNavigations'
        ]),
        ...mapActions('upgradeModule',[
            'vx_resetOrder'
        ]),
    }
}
</script>
