import SuperMain from '@/views/SuperMain'
import meeting from '@/views/meeting/Meeting'
import AddMeet from '@/views/meeting/AddMeet'
import SelectPerson from '@/views/meeting/SelectPerson'
import SelectTime from '@/views/meeting/SelectTime'
import DetailMeet from '@/views/meeting/DetailMeet'

export default [{
  path: '/supermain',
  name: 'SuperMain',
  component: SuperMain
},
{
  path: '/meeting',
  name: 'meeting',
  component: meeting
},
{
  path: '/addMeet',
  name: 'AddMeet',
  component: AddMeet
},
{
  path: '/selectPerson',
  name: 'SelectPerson',
  component: SelectPerson
},
{
  path: '/selectTime',
  name: 'SelectTime',
  component: SelectTime
},
{
  path: '/detailMeet',
  name: 'DetailMeet',
  component: DetailMeet
}
]
