import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Main from '@/views/Main'
import Meetting from '@/views/Meetting'
import AddMeet from '@/views/AddMeet'
import SelectPerson from '@/components/SelectPerson'
import SelectTime from '@/components/SelectTime'
import DetailMeet from '@/views/DetailMeet'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/main',
    name: 'Main',
    component: Main
  }, {
    path: '/meetting',
    name: 'Meetting',
    component: Meetting
  },
  {
    path: '/addMeet',
    name: 'AddMeet',
    component: AddMeet
  }, {
    path: '/selectPerson',
    name: 'SelectPerson',
    component: SelectPerson
  }, {
    path: '/selectTime',
    name: 'SelectTime',
    component: SelectTime
  }, {
    path: '/detailMeet',
    name: 'DetailMeet',
    component: DetailMeet
  }
  ]
})
