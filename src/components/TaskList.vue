<template>
  <div class="task-list">
    <div class="title">Task List</div>
    <div class="add-task">
      <input v-model="newTask.name" placeholder="Todo name">
      <textarea v-model="newTask.description" placeholder="Todo description"></textarea>
      <button @click="addTask">Save</button>
    </div>
    <div class="content">
      <div class="task" v-for="(task, index) in tasks" :class="{ completed: task.done }" v-bind:key="index">
        <span>{{ task.name }}</span>
        <button @click="showTask(index)" v-if="selectedId !== index">Show</button>
        <button @click="deleteTask(index)">Delete</button>
      </div>
    </div>
    <router-view :task="selectedTask" v-if="tasks.length > 0"></router-view>
  </div>
</template>

<script>
import { EventBus, TOGGLE_TASK } from './EventBus'

export default {
  name: 'TaskList',
  mounted: function () {
    this.selectedId = parseInt(this.$route && this.$route.params && this.$route.params.id, 10) || -1;
    EventBus.$on(TOGGLE_TASK, id => {
      console.log(id)
      this.tasks[id].done = true
    })
  },
  data () {
    return {
      tasks: [{
        name: 'Task 1',
        description: 'Project A',
        done: false
      }, {
        name: 'Task 2',
        description: 'Project A',
        done: false
      }, {
        name: 'Task 3',
        description: 'Project A',
        done: false
      }, {
        name: 'Task 4',
        description: 'Project A',
        done: false
      }],
      selectedId: this.$route.params.id,
      newTask: {
        name: '',
        description: '',
        done: false
      }
    }
  },
  methods: {
    showTask: function (id) {
      this.selectedId = id
      this.$router.push({ path: `/task-list/${id}` })
    },
    addTask: function () {
      this.tasks.push({ ...this.newTask })
      this.resetNewTask()
    },
    resetNewTask: function () {
      this.newTask = {
        name: '',
        description: '',
        done: false
      }
    },
    deleteTask: function (index) {
      this.tasks.splice(index, 1)
      const routeId = this.$route.params.id;
      if (!(index > routeId) && index !== 0) {
        this.showTask(routeId - 1)
      }
    }
  },
  computed: {
    selectedTask: function () {
      const { name, description, done } = this.selectedId > 0 && this.tasks[this.selectedId]

      return {
        name,
        description,
        done
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task-list {
    margin-top: 30px;
    padding: 10px;
  }

  .task-list .title {
    margin-bottom: 10px;
  }

  .task-list .content {
    margin-top: 20px;
  }

  .task-list .task {
    padding: 5px;
  }

  .add-task {
    display: flex;
    width: 40%;
    margin: auto;
    flex-direction: column;
    background-color: #BDBDBD;
    padding: 10px;
    border-radius: 7px;
  }
</style>
