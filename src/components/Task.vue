<template>
  <div class="task-details">
    <div>
      Task details
    </div>
    <div>
      {{ task.name }} - {{ task.description }}
      <button v-if="!task.done" @click="toggleTask(task.id)">Set to done</button>
      <span v-else> Completed</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Task',
  props: ['task'],
  methods: {
    ...mapMutations(['toggleTask'])
  }
}
</script>

<style scoped>
  .task-details {
    background-color: #9E9E9E;
    color: #F5F5F5;
    width: 300px;
    margin: auto;
    margin-top: 10px;
    padding: 10px;
  }

  .task-details button {
    background-color: #4CAF50;
    border-radius: 10px;
  }
</style>
