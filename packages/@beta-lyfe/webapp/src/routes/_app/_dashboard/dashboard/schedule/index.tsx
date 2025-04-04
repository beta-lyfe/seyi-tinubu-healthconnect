import { Typography } from '@beta-lyfe/ui/components/typography'
import { createFileRoute } from '@tanstack/react-router'
import { Mail, Microscope, ShoppingCart, Wallet } from 'lucide-react'
import { Datepicker } from 'flowbite-react'

import { CalendarCheckIcon, PillIcon, StethoscopeIcon } from 'lucide-react'
import { BottomNav } from '../../../-components/bottom-nav'
import { useState } from 'react'
import { cn } from '@beta-lyfe/ui/components/shad/lib/utils'
import { DateTheme } from '@beta-lyfe/webapp/data/dateTheme'
import { LayoutWithBottomNav } from '../-components/layout'

import { MainLayout } from "../-components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@beta-lyfe/ui/components/shad/ui/card"
import { Button } from "@beta-lyfe/ui/components/button"
import { Badge } from "@beta-lyfe/ui/components/shad/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@beta-lyfe/ui/components/shad/ui/tabs"
import {  Clock, Video, MessageSquare } from "lucide-react"


export const Route = createFileRoute('/_app/_dashboard/dashboard/schedule/')({
  component: SchedulePage,
})


function SchedulePage() {
  return (
  
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">Your Appointments</h1>
              <p className="text-muted-foreground">Manage your telehealth consultations</p>
            </div>
            <Button>Book New Appointment</Button>
          </div>

          {/* Calendar view */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center p-6 border rounded-md">
                <p className="text-muted-foreground">Calendar view will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          {/* Appointments tabs */}
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="canceled">Canceled</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-sm md:text-md">Dr. Sarah Johnson</h3>
                          <p className="text-sm text-muted-foreground">Cardiologist</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 10:00 AM
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                        <p className="text-sm">Follow-up consultation for heart condition</p>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button size="sm">Join Call</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-sm md:text-md">Dr. Michael Chen</h3>
                          <p className="text-sm text-muted-foreground">Dermatologist</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 2:30 PM
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                        <p className="text-sm">Consultation for skin condition</p>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-muted p-3 rounded-md">
                      <Video className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                          <p className="text-sm text-muted-foreground">Cardiologist</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar /> 2 weeks ago
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                        <p className="text-sm">Initial consultation for heart condition</p>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <Button variant="outline" size="sm">
                            View Summary
                          </Button>
                          <Button size="sm">Book</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="canceled" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-muted-foreground">No canceled appointments</CardTitle>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
  
  )
}




export const quickNav = [
  {
    text: 'Doctor',
    icon: StethoscopeIcon,
    link: '/dashboard/doctors'
  },
  {
    text: 'Pharmacy',
    icon: PillIcon
  },
  {
    text: 'Appointment',
    icon: CalendarCheckIcon
  },
  {
    text: 'Labs',
    icon: Microscope
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
  },
  {
    Title: 'Afternoon Medication',
    Description: 'Take 1 tablet of Antibiotic',
    Time: '2:00pm'
  },
  {
    Title: 'Blood Test',
    Description: 'Go to the lab for a blood test',
    Time: '3:30pm'
  },
  {
    Title: 'Light Exercise',
    Description:
      'Engage in light exercises as prescribed by the physiotherapist',
    Time: '5:00pm'
  },
  {
    Title: 'Evening Medication',
    Description: 'Take 1 tablet of Vitamin Supplement',
    Time: '7:00pm'
  },
  {
    Title: 'Dinner',
    Description: 'Have a light and healthy dinner',
    Time: '7:30pm'
  },
  {
    Title: 'Night Medication',
    Description: 'Take 1 tablet of Sleeping Aid',
    Time: '9:00pm'
  },
  {
    Title: 'Bedtime',
    Description: 'Go to bed and ensure adequate rest',
    Time: '10:00pm'
  }
]

function IndexPage() {
  return (
    <LayoutWithBottomNav>
    <main className="p-6">
      <DateHeader />
      <Calendar />
      <Schedule schedules={scheduleData} />
    </main>
    </LayoutWithBottomNav>
  )
}

function DateHeader() {
  const date = new Date()
  //const formatedDate=date.toLocaleDateString('us-en',{year:'numeric',month:'short',day:"numeric"})

  return (
    <header className="py-4">
      <div className="flex justify-between">
        <Datepicker
          className="w-max md:w-max border-none outline-none"
          theme={DateTheme}
          weekStart={0}
          onInput={(e) => console.log(e)}
          onChange={(e) => console.log(e)}
        />
        <div className="flex items-center gap-4 md:gap-4">
          <div className="md:px-3 py-2 rounded-md">
            <Mail color="#f382ec" />
          </div>
          <div className="md:px-3 py-2 rounded-md">
            <ShoppingCart color="#f382ec" className="hover:text-white" />
          </div>
        </div>
      </div>
      <Typography.Info className="font-bold text-3xl text-black pt-1">
        Today
      </Typography.Info>
    </header>
  )
}

function Calendar() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const DayListItem = (props: { day: string; dayno: number }) => {
    const [highlighted, setHighlighted] = useState<boolean>(false)
    return (
      <div
        className="flex flex-col item-center"
        onFocus={() => setHighlighted(true)}
        onMouseLeave={() => setHighlighted(false)}
      >
        <p
          className={cn(
            'text-center opacity-75',
            highlighted && 'text-primary'
          )}
        >
          {props.day}
        </p>
        <div className="flex flex-col justify-center items-center">
          <p
            className={cn(
              'text-center font-bold',
              highlighted && 'text-primary'
            )}
          >
            {props.dayno}
          </p>
          <div
            className={cn('w-1 h-1 rounded-full', highlighted && 'bg-primary')}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <ul className="grid grid-cols-7 gap-4">
        {days.map((item, index) => (
          <li key={index}>
            <DayListItem day={item} dayno={index + 17} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Schedule({ schedules }: { schedules: typeof scheduleData }) {
  const [highlighted, setHighlighted] = useState<number>(0)
  return (
    <div className="py-4">
      {schedules.map((item, index) => (
        <ScheduleItem
          highlighted={highlighted === index}
          {...item}
          index={index}
          key={index}
          setHighlighted={() => setHighlighted(index)}
        />
      ))}
    </div>
  )
}

function ScheduleItem({
  highlighted,
  setHighlighted,
  index,
  Title: title,
  Time: time,
  Description: desc
}: {
  highlighted: boolean
  setHighlighted: () => void
  index: number
  Title: string
  Description: string
  Time: string
}) {
  return (
    <div
      className="h-fit grid grid-cols-10 gap-5 py-2"
      onMouseEnter={() => setHighlighted()}
    >
      <div className="flex flex-col gap-1 items-center ">
        <div
          className={cn(
            'rounded-full p-[2px] border-[2px] border-transparent',
            highlighted && 'border-primary'
          )}
        >
          <div
            className={cn(
              ' border-primary border-[2px] p-[3px] rounded-full',
              highlighted && 'bg-primary'
            )}
          />
        </div>
        <div className="w-[2px] h-full bg-primary" />
      </div>
      <div
        className={cn(
          'bg-gray-200 rounded-3xl p-4 px-6 col-span-9',
          highlighted && 'text-white bg-primary'
        )}
      >
        <div className="flex justify-between py-1 gap-4">
          <p className="text-md font-bold truncate select-none">{title}</p>
          <Typography.Info
            className={cn(
              'text-sm text-gray-600 select-none',
              highlighted && 'text-white'
            )}
          >
            {time}
          </Typography.Info>
        </div>
        <Typography.Info
          className={cn(
            'text-sm text-gray-600 select-none',
            highlighted && 'text-white'
          )}
        >
          {desc}
        </Typography.Info>
      </div>
    </div>
  )
}
