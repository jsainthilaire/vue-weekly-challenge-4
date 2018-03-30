<template>
  <div class="task-list">
    <div class="title">Task List</div>
    <AddTask/>
      <div class="content">
        <transition-group name="list" tag="div">
          <div class="task" v-for="task in tasks" :class="{ completed: task.done }" v-bind:key="task.id">
            <span>{{ task.name }}</span>
            <button @click="showTask(task.id)" v-if="selectedId !== task.id">Show</button>
            <button @click="deleteTaskAndRedirect(task.id)">Delete</button>
          </div>
        </transition-group>
      </div>
    <router-view :task="selectedTask" v-if="areThereAnyTask"></router-view>
  </div>
</template>

<script>
import AddTask from './AddTask'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TaskList',
  created: function () {
    this.selectedId = this.$route && this.$route.params && this.$route.params.id

    if (this.selectedId && !this.areThereAnyTask) {
      this.$router.push({path: '/task-list/'})
      this.selectedId = ''
    }
  },
  data () {
    return {
      selectedId: ''
    }
  },
  methods: {
    showTask: function (id) {
      this.selectedId = id
      this.$router.push({ path: `/task-list/${id}` })
    },
    deleteTaskAndRedirect (id) {
      this.deleteTask(id)

      if (this.$route.params.id === id) {
        this.redirectToTasksList()
      }
    },
    redirectToTasksList () {
      this.$router.push({path: '/task-list/'})
    },
    ...mapMutations(['deleteTask'])
  },
  computed: {
    selectedTask: function () {
      if (!(this.areThereAnyTask && this.selectedId && this.taskExists(this.selectedId))) {
        this.redirectToTasksList()
        return
      }

      const { id, name, description, done } = this.tasks.find(task => task.id === this.selectedId)

      return {
        id,
        name,
        description,
        done
      }
    },
    ...mapGetters([
      'tasks',
      'areThereAnyTask',
      'taskExists'
    ])
  },
  components: {
    AddTask
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

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
