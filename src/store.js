import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  strict: true,
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    /**
     * this mutation handles creating the task
     */
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({ name, id: uuid(), description: '' })
    },

    /**
     * this mutation handles creating the new column
     */
    CREATE_COLUMN (state, { name }) {
      state.board.columns.push({
        name,
        id: uuid(),
        tasks: []
      })
    },

    /**
     * this mutation handles updating the task
     */
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
      // Vue.set(task, key, value)
    },

    /**
     * this mutation handles drag and drop the task
     */
    MOVE_TASK (state,
      { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },

    /**
     * this mutation handles drag and drop the columns
     */
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    }
  }
})
