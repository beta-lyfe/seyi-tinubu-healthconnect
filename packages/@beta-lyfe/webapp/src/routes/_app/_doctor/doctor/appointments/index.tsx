import { Avatar, Table, TableCell ,TableRow} from "flowbite-react";

import { createFileRoute } from '@tanstack/react-router'
import { ArrowDown, ArrowRight, FilterIcon, PlusCircle, User2Icon } from "lucide-react";
import { Typography } from "@beta-lyfe/ui/components/typography";
import { DropDownComponent } from "@beta-lyfe/ui/components/DropDown";
import { Button } from "@beta-lyfe/ui/components/button";
import { useState } from "react";
import { ModalComponent } from "@beta-lyfe/ui/components/Modal";

export const Route = createFileRoute('/_app/_doctor/doctor/appointments/')({
  component: () => Component()
})



export function Component() {
  const [loadMore,setLoadMore]=useState(5)
  const [openModal,setOpenModal]=useState(false)

  return (
    <>
    <div className="p-5 bg-white flex flex-col gap-3 md:flex-row justify-between md:items-center">
      <Typography.Heading className="text-black font-semibold text-sm">Total : {AppointmentData.length} Appointments</Typography.Heading>
      <div className="grid grid-cols-2 md:flex gap-2 md:gap-6 md:px-4">
        <DropDownComponent 
        showoptions
        icon={ArrowDown}
        defaultlabel="Sort By : " data={['Today','A-Z','Newest-Oldest','Oldest-Newset','Confirmed']}/>
        <DropDownComponent defaultlabel="Filter " 
        icon={FilterIcon}
        data={['Today','A-Z','Newest-Oldest','Oldest-Newset','Confirmed']}/>
        <div className="col-span-2 flex justify-end md:justify-center items-center cursor-pointer" onClick={()=>setOpenModal(true)}>
          <PlusCircle />
        </div>
      </div>
    </div>
    <div className="bg-white overflow-x-auto scrollbar-none  scrollbar-thumb-rounded  scrollbar-track-gray-100 p-4">
      <Table className="overflow-hidden border-b-2" striped>
        <Table.Head>
          <Table.HeadCell className="text-center"></Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Gender</Table.HeadCell>
          <Table.HeadCell>Reason</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            AppointmentData.slice(0,loadMore).map((data,index)=>(
              <Table.Row>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Avatar placeholderInitials={data.name.split(" ").map(n=>n[0]).join("")} rounded/>
            </Table.Cell>
                 <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {data.name}
            </Table.Cell>
            <Table.Cell className="text-xs whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {data.email}
            </Table.Cell>
            <Table.Cell className="text-xs  whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {data.gender}
            </Table.Cell>
            <Table.Cell className="text-xs whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {data.phone}
            </Table.Cell>
            <Table.Cell className="text-xs whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {data.reason}
            </Table.Cell>
            <Table.Cell className="text-xs whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {data.time}
            </Table.Cell>
            <Table.Cell className="text-xs font-medium text-gray-900 dark:text-white">
              {data.status}
            </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </div>
    <div className="flex justify-center items-center p-4 bg-white">
      <Button onClick={()=>setLoadMore(prev=>prev+7)}>Show more</Button>
    </div>
    <ModalComponent state={openModal} setState={setOpenModal}/>
    </>
  );
}


const AppointmentData = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    gender: "Male",
    reason: "Consultation",
    time: "10:00 AM",
    status: "Pending",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+0987654321",
    gender: "Female",
    reason: "Follow-up",
    time: "11:30 AM",
    status: "Confirmed",
  },
  {
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    phone: "+1122334455",
    gender: "Male",
    reason: "Routine Checkup",
    time: "01:00 PM",
    status: "Completed",
  },
  {
    name: "Alice Brown",
    email: "alicebrown@example.com",
    phone: "+2233445566",
    gender: "Female",
    reason: "Emergency",
    time: "02:45 PM",
    status: "Cancelled",
  },
  {
    name: "Charlie Davis",
    email: "charliedavis@example.com",
    phone: "+3344556677",
    gender: "Other",
    reason: "Consultation",
    time: "04:00 PM",
    status: "Pending",
  },
  {
    name: "Emily White",
    email: "emilywhite@example.com",
    phone: "+4455667788",
    gender: "Female",
    reason: "Consultation",
    time: "09:30 AM",
    status: "Confirmed",
  },
  {
    name: "George King",
    email: "georgeking@example.com",
    phone: "+5566778899",
    gender: "Male",
    reason: "Follow-up",
    time: "03:15 PM",
    status: "Pending",
  },
  {
    name: "Hannah Green",
    email: "hannahgreen@example.com",
    phone: "+6677889900",
    gender: "Female",
    reason: "Routine Checkup",
    time: "12:00 PM",
    status: "Completed",
  },
  {
    name: "Ian Black",
    email: "ianblack@example.com",
    phone: "+7788990011",
    gender: "Male",
    reason: "Emergency",
    time: "05:30 PM",
    status: "Cancelled",
  },
  {
    name: "Jessica Blue",
    email: "jessicablue@example.com",
    phone: "+8899001122",
    gender: "Female",
    reason: "Consultation",
    time: "08:45 AM",
    status: "Confirmed",
  },
  {
    name: "Kevin Red",
    email: "kevinred@example.com",
    phone: "+9900112233",
    gender: "Male",
    reason: "Follow-up",
    time: "10:30 AM",
    status: "Pending",
  },
  {
    name: "Lily Yellow",
    email: "lilyyellow@example.com",
    phone: "+0011223344",
    gender: "Female",
    reason: "Routine Checkup",
    time: "02:00 PM",
    status: "Completed",
  },
  {
    name: "Michael Orange",
    email: "michaelorange@example.com",
    phone: "+1122334455",
    gender: "Male",
    reason: "Emergency",
    time: "06:00 PM",
    status: "Cancelled",
  },
  {
    name: "Nina Purple",
    email: "ninapurple@example.com",
    phone: "+2233445566",
    gender: "Female",
    reason: "Consultation",
    time: "01:15 PM",
    status: "Confirmed",
  },
  {
    name: "Oscar Pink",
    email: "oscarpink@example.com",
    phone: "+3344556677",
    gender: "Male",
    reason: "Follow-up",
    time: "03:45 PM",
    status: "Pending",
  },
  {
    name: "Paula Gray",
    email: "paulagray@example.com",
    phone: "+4455667788",
    gender: "Female",
    reason: "Routine Checkup",
    time: "11:00 AM",
    status: "Completed",
  },
  {
    name: "Quentin Gold",
    email: "quentingold@example.com",
    phone: "+5566778899",
    gender: "Male",
    reason: "Emergency",
    time: "07:15 PM",
    status: "Cancelled",
  },
  {
    name: "Rachel Silver",
    email: "rachelsilver@example.com",
    phone: "+6677889900",
    gender: "Female",
    reason: "Consultation",
    time: "09:00 AM",
    status: "Confirmed",
  },
  {
    name: "Sam White",
    email: "samwhite@example.com",
    phone: "+7788990011",
    gender: "Male",
    reason: "Follow-up",
    time: "10:45 AM",
    status: "Pending",
  },
  {
    name: "Tina Black",
    email: "tinablack@example.com",
    phone: "+8899001122",
    gender: "Female",
    reason: "Routine Checkup",
    time: "02:30 PM",
    status: "Completed",
  }
];
