import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/LoginCtn'
import Register from '@/views/login/Register'
import Main from '@/views/Main'

import MeetingRouter from './meeting'
import WorkAreaRouter from './workarea'

Vue.use(Router)
const basic = [{
  path: '/',
  name: 'Login',
  component: Login
},
{
  path: '/register',
  name: 'Register',
  component: Register
},
{
  path: '/main',
  name: 'Main',
  component: Main
}
]

const routes = [...basic, ...MeetingRouter, ...WorkAreaRouter]

export default new Router({
  routes: routes
})
