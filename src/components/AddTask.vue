<template>
  <div class="add-task">
    <input v-model="newTask.name" placeholder="Todo name">
    <textarea v-model="newTask.description" placeholder="Todo description"></textarea>
    <button @click="addNewTask">Save</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

const newTaskInitial = {
  name: '',
  description: '',
  done: false
}

export default {
  data () {
    return {
      newTask: {
        ...newTaskInitial
      }
    }
  },
  methods: {
    ...mapMutations(['addTask']),
    resetNewTask () {
      this.newTask = {
        ...newTaskInitial
      }
    },
    addNewTask () {
      this.addTask(this.newTask)
      this.resetNewTask()
    }
  }
}
</script>
