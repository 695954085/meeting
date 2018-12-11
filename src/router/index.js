import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/views/Login'
import Login from '@/views/login/LoginCtn'
import Register from '@/views/login/Register'
import Main from '@/views/Main'
import meeting from '@/views/meeting'
import AddMeet from '@/views/AddMeet'
import SelectPerson from '@/views/SelectPerson'
import SelectTime from '@/views/SelectTime'
import DetailMeet from '@/views/DetailMeet'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
    }, {
      path: '/meeting',
      name: 'meeting',
      component: meeting
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
