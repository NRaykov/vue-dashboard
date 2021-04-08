<template>
  <div>
    <div class="wrapper">
      <sidebar-left />

      <div class="main">
        <navbar-main v-if="$route.name !== 'login'" />
        <div class="content">
          <transition 
            name="fade" 
            mode="out-in"
            @beforeLeave="beforeLeave"
            @enter="enter"
            @afterEnter="afterEnter"
          >
            <router-view />
          </transition>
        </div>
        <footer-component />
      </div>
    </div>
  </div>
</template>
<script>
import LoginScreen from './LoginScreen';
import SidebarLeft from './elements/SidebarLeft/SidebarLeft';
import NavbarMain from '../components/elements/NavbarMain';
import FooterComponent from '../components/elements/FooterComponent';
import { mapGetters } from 'vuex';
export default {
    components: {
        SidebarLeft,
        NavbarMain,
        FooterComponent
    },
    data() {
        return {
            prevHeight: 0,
            isAuth: false,
        }
    },
    computed: {
      ...mapGetters('authModule',[
          'getLoggedStatus'
      ]),
    },
    methods: {
      beforeLeave(element) {
        this.prevHeight = getComputedStyle(element).height;
      },
      enter(element) {
        const { height } = getComputedStyle(element);

        element.style.height = this.prevHeight;

        this.$nextTick(() => {
          element.style.height = height;
        });
      },
      afterEnter(element) {
        element.style.height = 'auto';
      },
    },
}
</script>
