<template>
  <div>
    <template  
      v-if="index === 0"
    >
      <li class="sidebar-header">
        {{ menuItem.meta.name }}
      </li>
    </template>
 
    <li class="sidebar-item">
      <router-link
        :to="{ name: menuItem.name}"
        class="sidebar-link"
      >
        <i
          class="align-middle"
          :data-feather="menuItem.data_feather"
        />
        <span class="align-middle">{{ menuItem.title }}</span>
      </router-link>
    </li>
  </div>
</template>
<script>
export default {
    props: {
      menuItem: {
        type: Object,
        default: function () {
          return { }
        }
      },
      index: {
        type: Number,
        default: 0
      },
    },
    data() {
        return {}
    }
}
</script>