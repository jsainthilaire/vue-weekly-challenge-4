import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import TaskList from '@/components/TaskList'
import Task from '@/components/Task'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/task-list',
      name: 'TaskList',
      component: TaskList,
      children: [
        {
          path: ':id',
          component: Task
        }
      ]
    }
  ]
})
