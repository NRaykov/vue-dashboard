<template>
  <div>
    <div
      v-for="(activity, index) in activitiesData.activities" 
      :key="index"
      class="media mb-2"
    >
      <img
        :src="activitiesData.profile_pic ? activitiesData.profile_pic : $store.state.defaultProfilePic" 
        width="36"
        height="36"
        class="rounded-circle mr-2"
        :alt="activitiesData.first_name + ' ' + activitiesData.last_name"
      >

      <div class="media-body">
        <!-- Install and config moment.js -->
        
        <small class="float-right text-navy">{{ activity.timestamp }}</small>

        <strong v-if="$route.params.id">{{ activitiesData.first_name }} {{ activitiesData.last_name }}</strong>
        <strong v-else>{{ $t('activities.you') }}</strong>

        <template v-if="activity.status === ActivityTypes.FOLLOWED_USER">
          {{ $t('activities.staredFollowing') }}
        </template>
        <template v-if="activity.status === ActivityTypes.PHOTOS">
          {{ $t('activities.postedPhotos', {count: activity.photos_count }) }} 
        </template>

        <router-link 
          :to="{name: 'user-profile', params: {id: activity.user.id } }"
        >
          <strong>
            {{ activity.user.first_name }} {{ activity.user.last_name }}
          </strong>
        </router-link>
        
        <template v-if="activity.status === ActivityTypes.PHOTOS">
          {{ $t('activities.onTimeline') }}
        </template>

        <br />
        <small class="text-muted">{{ activity.date }}</small><br />

        <template v-if="activity.status === ActivityTypes.PHOTOS">
          <b-row class="no-gutters mt-1">
            <b-col
              v-for="(photo, i) in activity.photos"
              :key="i"
              md="4"
              lg="3"
            >
              <img
                :src="photo"
                alt="Placeholder"
                class="img-fluid pr-2"
              >
            </b-col>
          </b-row>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import ActivityTypes from '../../enums/ActivityTypes';

export default {
    props: {
      activitiesData: {
        type: Object,
        default: function () {
          return { }
        }
      },
    },
    data() {
        return {
          ActivityTypes: ActivityTypes,
        }
    }
}
</script>