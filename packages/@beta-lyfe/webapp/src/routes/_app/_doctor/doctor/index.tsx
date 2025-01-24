import { cn } from '@beta-lyfe/webapp/components/shad/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { Calendar, Megaphone, User, UserPlus, Users, Video } from 'lucide-react'
import { FunctionComponent } from 'react'
import { Schedule } from '../../dashboard/schedule'
import { Button } from '@beta-lyfe/webapp/components/shad/ui/button'
import {
  BarChart,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer
} from 'recharts'

export const Route = createFileRoute('/_app/_doctor/doctor/')({
  component: DoctorDashboardOverview
})

type DashBoardCardData = (typeof dashBoardCardData)[number]

const dashBoardCardData = [
  {
    icon: Calendar,
    value: 50,
    label: 'Appointments',
    bgColor: 'bg-[#a855f7]'
  },
  {
    icon: Video,
    value: 16,
    label: 'Consultancy',
    bgColor: 'bg-[#0ea5e9]'
  },
  {
    icon: Users,
    value: 10,
    label: 'Pending',
    bgColor: 'bg-[#8b5cf6]'
  },
  {
    icon: UserPlus,
    value: 30,
    label: 'Request',
    bgColor: 'bg-[#6366f1]'
  }
]

const scheduleData = [
  {
    Title: 'Morning Medication',
    Description: 'Take 1 tablet of Paracetamol',
    Time: '8:00am'
  },
  {
    Title: "Doctor's Appointment",
    Description: 'Visit Dr. Smith for a regular check-up',
    Time: '10:00am'
  },
  {
    Title: 'Physiotherapy Session',
    Description: 'Attend a physiotherapy session at the clinic',
    Time: '11:30am'
  },
  {
    Title: 'Lunch and Rest',
    Description: 'Have a nutritious lunch and rest',
    Time: '12:30pm'
  }
]

function DoctorDashboardOverview() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <WelcomeBanner />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dashBoardCardData.map((item) => (
              <DashboardCard item={item} />
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-7">
            <Schedule schedules={scheduleData} />
          </div>
          <div className="flex flex-col gap-6 p-4 md:col-span-5">
            <h2 className="border-b-2 border-gray-300 pb-2 font-semibold">
              Today's Appointment
            </h2>
            <PatientAppointmentCard />
            <PatientAppointmentCard />
            <PatientAppointmentCard />
          </div>
        </div>
        <div className="md:flex h-40">
          <DashboardBarChart />
          <DashboardPieChart />
        </div>
      </div>
    </div>
  )
}

function WelcomeBanner() {
  return (
    <div className="py-2">
      <h2 className="text-lg font-bold">Welcome Dr Adeola Adekoye</h2>
      <p className="text-sm">Have a nice day at great work</p>
    </div>
  )
}

function PatientAppointmentCard() {
  return (
    <div className="flex items-center gap-4 w-full bg-gray-200 p-6 rounded-md">
      <div className="flex items-center w-full gap-4">
        <div className="rounded-full bg-white p-2">
          <User />
        </div>
        <div className="grow">
          <p className="text-md font-bold">John doe</p>
          <p className="text-sm">Health checkup</p>
        </div>
      </div>
      <div>
        <Button>Ongoing</Button>
      </div>
    </div>
  )
}

const DashboardCard: FunctionComponent<{ item: DashBoardCardData }> = ({
  item
}) => {
  return (
    <div
      className={cn(
        'rounded-md px-4 py-6 md:py-10 flex flex-col md:flex-row md:items-center gap-4',
        item.bgColor
      )}
    >
      <div className="p-3 bg-white rounded-full w-min">
        <item.icon />
      </div>
      <div className="text-white">
        <h2 className="text-lg md:text-xl">{item.value}</h2>
        <p className="text-md opacity-80">{item.label}</p>
      </div>
    </div>
  )
}

const DashboardBarChart: FunctionComponent = () => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300
    }
  ]

  return (
    <ResponsiveContainer height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <CartesianGrid key="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" className="fill-primary" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

const DashboardPieChart: FunctionComponent = () => {
  const data01 = [
    {
      name: 'Group A',
      value: 400
    },
    {
      name: 'Group B',
      value: 300
    },
    {
      name: 'Group C',
      value: 300
    },
    {
      name: 'Group D',
      value: 200
    },
    {
      name: 'Group E',
      value: 278
    },
    {
      name: 'Group F',
      value: 189
    }
  ]

  return (
    <ResponsiveContainer height="100%">
      <PieChart width={730} height={250} className="w-full">
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          radius={100}
          className="fill-primary"
          label
        />
        {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
      </PieChart>
    </ResponsiveContainer>
  )
}
