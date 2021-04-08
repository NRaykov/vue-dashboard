<template>
  <footer class="footer">
    <b-container fluid>
      <b-row class="text-muted">
        <b-col
          lg="6"
          class="text-left"
        >
          <p class="mb-0">
            <a
              href="index.html"
              class="text-muted"
            ><strong>AdminKit Demo</strong></a> &copy;
          </p>
        </b-col>
        <b-col
          lg="6"
          class="text-right"
        >
          <ul
            v-if="isLoaded"
            class="list-inline"
          >
            <li
              v-for="(item, index) in getFooterItems"
              :key="index"
              class="list-inline-item"
            >
              <a
                class="text-muted"
                :href="item.anchor"
              >{{ item.title }}</a>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters('navigationModule',[
            'getFooterItems'
        ]),
        ...mapGetters('navigationModule',[
            'isLoaded'
        ]),
    },
}
</script>