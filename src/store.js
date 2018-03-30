import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'
import shortid from 'shortid'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'tasks_vuex'
})

export const store = new Vuex.Store({
  state: {
    tasks: []
  },
  getters: {
    tasks: state => state.tasks,
    areThereAnyTask: state => state.tasks.length > 0,
    taskExists (state) {
      return taskId => {
        return state.tasks.findIndex(task => task.id === taskId) >= 0
      }
    }
  },
  mutations: {
    addTask (state, newTask) {
      state.tasks.push({ ...newTask, id: shortid.generate() })
    },
    deleteTask (state, id) {
      const indexToDelete = state.tasks.findIndex(task => task.id === id)
      state.tasks.splice(indexToDelete, 1)
    },
    toggleTask (state, id) {
      const indexToToggle = state.tasks.findIndex(task => task.id === id)

      if (indexToToggle >= 0) {
        state.tasks[indexToToggle].done = true
      }
    }
  },
  plugins: [vuexLocal.plugin]
})
