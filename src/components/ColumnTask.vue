<template>
  <app-drop @drop="moveTaskOrColumn">
    <app-drag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromtaskIndex: taskIndex,
      }"
      @click.native="goToTask(task)"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p
        v-if="task.description"
        class="w-full flex-no-shrink mt-1 text-sm"
      >
        {{ task.description }}
      </p>
    </app-drag>
  </app-drop>
</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
import AppDrop from './AppDrop.vue'
import AppDrag from './AppDrag.vue'
export default {
  components: { AppDrop, AppDrag },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    taskIndex: {
      type: Number,
      required: true
    },
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }
  }
}
</script>

<style scoped lang="postcss">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
