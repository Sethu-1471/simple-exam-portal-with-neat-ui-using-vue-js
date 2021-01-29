import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import('../views/firstPage.vue')
  },
  {
    path: '/teacher/assignment',
    name: 'TeacherAssignment',
    component: () => import('../views/teacher/assignment.vue')
  },{
    path: '/teacher/createassignment',
    name: 'TeacherCreateAssignment',
    component: () => import('../views/teacher/create.vue')
  },
  {
    path: '/stduent/assignment',
    name: 'Student',
    component: () => import('../views/student/assignment.vue')
  },
  {
    path: '/stduent/assignmentView/:id',
    name: 'StudentView',
    component: () => import('../views/student/assignmentView.vue')
  },
  {
    path: '/teacher/assignmentView/:id',
    name: 'TeacherView',
    component: () => import('../views/teacher/assignmentView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
