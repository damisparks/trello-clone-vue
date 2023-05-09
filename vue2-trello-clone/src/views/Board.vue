<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <board-column
        v-for="(column, $columnIndex) in board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
        />
      <!-- add new column starts  -->
      <div class="column flex">
        <input
          class="p-2 mr-2 flex-grow"
          type="text"
          v-model="newColumnName"
          placeholder="+ New Column Name"
          @keyup.enter="createColumn"
           />
      </div>
      <!-- add new column ends -->
    </div>
    <!-- modal starts -->
    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view />
    </div>
    <!-- modal ends -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn.vue'
export default {
  components: { BoardColumn },
  data () {
    return {
      newColumnName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    close () {
      this.$router.push({ name: 'board' })
    },

    createColumn () {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })
      this.newColumnName = ''
    }
  }
}
</script>

<style lang="postcss">
.board {
  @apply p-4 bg-indigo-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
