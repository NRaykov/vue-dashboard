<template>
  <div class="card">
    <div class="card-header">
      {{ $t('dashboard.latestProjects') }}
    </div>
    <div class="card-body card-table">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">
              {{ $t('dashboard.name') }}
            </th>
            <th scope="col">
              {{ $t('dashboard.startDate') }}
            </th>
            <th scope="col">
              {{ $t('dashboard.endDate') }}
            </th>
            <th scope="col">
              {{ $t('dashboard.status') }}
            </th>
            <th scope="col">
              {{ $t('dashboard.assaignee') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="project in projects" 
            :key="project.id"
          >
            <td>{{ project.name }}</td>
            <td>{{ project.start_date }}</td>
            <td>{{ project.end_date }}</td>
            <td>
              <span
                v-if="project.status === 'In progress'" 
                class="tag-base tag--in-progress"
              >{{ project.status }}</span>

              <span
                v-if="project.status === 'Cancelled'" 
                class="tag-base tag--cancelled"
              >{{ project.status }}</span>

              <span
                v-if="project.status === 'Done'" 
                class="tag-base tag--done"
              >{{ project.status }}</span>
            </td>
            <td>{{ project.assaignee }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    props: {
      projects: {},
    },
    data() {
        return {}
    },
}
</script>