<template>
  <div class="card card-profile">
    <div class="card-header">
      <h5 class="card-info-title">
        {{ $t('main.profileDetails') }}
      </h5>
    </div>
    <div class="card-body text-center">
      <div class="profile-pic-panel">
        <img
          :src="userData.profile_pic ? userData.profile_pic : $store.state.defaultProfilePic"
          :alt="userData.first_name"
          width="128"
          height="128"
        >
      </div>
      <h5 class="card-info-title mb-0 mt-3">
        {{ userData.first_name }} {{ userData.last_name }}
      </h5>
      <div class="text-muted mb-2">
        {{ userData.role }}
      </div>

      <template v-if="routeId">
        <profile-menu-item />
      </template>
    </div>
    <hr class="my-0">
    <div class="card-header">
      <h5 class="card-info-title">
        {{ $t('main.skills') }}
      </h5>
    </div>
    <div class="card-body">
      <span
        v-for="(skill, index) in userData.skills"
        :key="index"
        class="badge badge-primary mr-1 my-1"
      >
        {{ skill.name }}
      </span>
    </div>

    <template v-if="userData.bio">
      <hr class="my-0">
      <div class="card-header">
        <h5 class="card-info-title">
          {{ $t('main.biography') }}
        </h5>
      </div>
      <div class="card-body card-bio">
        <read-more
          more-str="Read more"
          :text="userData.bio"
          link="#"
          less-str="Read less"
          :max-chars="200"
        ></read-more>
      </div>
    </template>

    <hr class="my-0">
    <div class="card-header">
      <h5 class="card-info-title">
        {{ $t('main.about') }}
      </h5>
    </div>
    <div class="card-body card-about">
      <ul class="list-unstyled mb-0 feather-panel">
        <li class="mb-1">
          <span
            data-feather="home"
            class="feather-sm mr-1"
          ></span>{{ $t('main.livesIn') }} <span class="info">{{ userData.lives }}</span>
        </li>

        <li class="mb-1">
          <span
            data-feather="briefcase"
            class="feather-sm mr-1"
          ></span>{{ $t('main.worksAt') }} <span class="info">{{ userData.works }}</span>
        </li>
        <li class="mb-1">
          <span
            data-feather="map-pin"
            class="feather-sm mr-1"
          ></span>{{ $t('main.from') }} <span class="info">{{ userData.from }}</span>
        </li>
      </ul>
    </div>
    <hr class="my-0">
    <div class="card-header">
      <h5 class="card-info-title">
        {{ $t('main.elsewhere') }}
      </h5>
    </div>
    <div class="card-body card-about">
      <ul class="list-unstyled mb-0">
        <li
          v-for="item in userData.socials"
          :key="item.id"
          class="mb-1"
        >
          <template v-if="item.visible">
            <span :class="item.icon"></span> 
            <a
              :href="item.address"
              class="info"
            >{{ item.name }}</a>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ProfileMenuItem from '../elements/ProfileMenuItem';

const feather = require('feather-icons');

export default {
    components: {
      ProfileMenuItem
    },
    props: {
      userData: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    data() {
        return {
          routeId: this.$route.params.id
        }
    },
    watch:{
        $route (to, from){
          if(to !== from) {
              this.routeId = this.$route.params.id
          }
        }
    },
    mounted() {
      feather.replace();
    }
}
</script>