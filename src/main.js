import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import i18n from './i18n';

import { BootstrapVue } from 'bootstrap-vue';
Vue.use(BootstrapVue);

import ReadMore from 'vue-read-more';
Vue.use(ReadMore);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import VueToastr from "vue-toastr";
Vue.use(VueToastr);

import ImageUploader from 'vue-image-upload-resize';
Vue.use(ImageUploader);

import VueDraggable from 'vue-draggable';
Vue.use(VueDraggable);

import Chat from 'vue-beautiful-chat';
Vue.use(Chat);

import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';

Vue.use(Autocomplete);

Vue.config.silent = true;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
