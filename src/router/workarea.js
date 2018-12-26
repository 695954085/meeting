import DeskBook from '@/views/workarea/DeskBook'
import AddDesk from '@/views/workarea/AddDesk'
import SelectDesk from '@/views/workarea/SelectDesk'

export default [
  {
    path: '/deskBook',
    name: 'DeskBook',
    component: DeskBook,
    props: true
  },
  {
    path: '/addDesk',
    name: 'AddDesk',
    component: AddDesk
  },
  {
    path: '/selectDesk',
    name: 'SelectDesk',
    component: SelectDesk
  }
]
