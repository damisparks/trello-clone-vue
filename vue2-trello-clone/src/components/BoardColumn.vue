<template>
  <app-drop @drop="moveTaskOrColumn">
    <app-drag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>
      <div class="list-reset">
        <column-task
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
        />
        <!-- add new task starts -->
        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
        <!-- add new  task ends -->
      </div>
    </app-drag>
  </app-drop>
</template>

<script>
import ColumnTask from './ColumnTask.vue'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'
export default {
  mixins: [movingTasksAndColumnsMixin],
  components: { ColumnTask, AppDrag, AppDrop },
  methods: {
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK',
        { tasks, name: e.target.value }
      )
      e.target.value = ''
    }
  }
}
</script>

<style scoped lang="postcss">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
