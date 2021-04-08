<template>
  <div>
    <h2 v-if="routeName === RouteNames.ADDITIONAL">
      <div>
        <additional-info />
      </div>
    </h2>

    <template v-if="routeName === RouteNames.ACCOUNT">
      <div>
        <public-info-form />
      </div>
      <div class="mt-5">
        <skills-form />
      </div>
    </template>
  </div>
</template>
<script>
import PublicInfoForm from './PublicInfoForm';
import SkillsForm from './SkillsForm';
import AdditionalInfo from './AdditionalInfoForm';
import RouteNames from '../../../enums/RouteNames';

export default {
    components: { 
     PublicInfoForm,
     SkillsForm,
     AdditionalInfo
    },
    data() {
        return {
            routeName: this.$route.name,
            RouteNames: RouteNames
        }
    },
    watch:{
        $route (to, from){
            if(to !== from) {
                this.routeName = this.$route.name
            }
        }
    }
}
</script>