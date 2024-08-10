import { Button } from "@beta-lyfe/webapp/shad/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumb, BreadcrumbItem, Card } from "flowbite-react";
import { ArrowLeft, ArrowLeftRight, ArrowRight, Bone, Calendar, CreditCard, FlaskConicalIcon, FormInput, HeartPulseIcon, Home, IconNode, LucidePhone, Mail, MoreHorizontal, PhoneIcon, Plus, SearchIcon, Skull, Stethoscope, TestTube, User2, UserCircle } from "lucide-react";
import { ReactNode } from "react";

export const Route=createFileRoute('/_doctor/doctor/patients/')({
    component:PatientsProfile
})

function PatientsProfile(){
    return(
        <div>
          <div className="flex gap-3 p-6 flex-col">
          <Breadcrumb>
                <BreadcrumbItem href="/doctor">Dashboard</BreadcrumbItem>
                <BreadcrumbItem href="/doctor/patients" className='font-bold'>
                Patients</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex gap-2 items-center">
            <ArrowLeft /><h2 className="text-lg font-bold">Patient Profile</h2>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row px-6 gap-8">
            <div className="flex flex-shrink flex-col md:flex-col gap-5 md:flex-[0.7]">
                <PatientContactCard />
                <LastestLabResultCard />
            </div>
            <div className="flex flex-1 flex-col gap-5">
                <OverviewCards />
                <Others />
            </div>
          </div>
        </div>
    )
}

function PatientContactCard(){
    const data=[
        {
            Icon:LucidePhone,
            label:"080 2638 3820"
        },
        {
        Icon:Mail,
        label:'johndoe@gmail.com'
    },
    {
        Icon:Home,
        label:"No 3 Nokoda Street Benue State"
    }
]

    return (
        <Card>
            <div className="flex justify-end">
                <MoreHorizontal />
            </div>
            <div className="flex items-center gap-4">
                <User2 />
                <p className="font-bold">Mr John Doe</p>
            </div>
            <div>
                <h2 className="font-bold">Contact Details : </h2>
                <div className="grid grid-rows-4 gap-2">
                    {data.map((item,index)=>(
                        <DetailsBar {...item} key={index}/>
                    ))}
                </div>
            </div>
        </Card>
    )
}

function DetailsBar(props:{Icon:any,label:string}){
    return(
        <div className="flex items-center gap-4 pt-4">
            <props.Icon size={19}/>
            <h2 className="text-sm">{props.label}</h2>
        </div>
    )
}

function LastestLabResultCard(){
    const data=[{
        Icon:FlaskConicalIcon,
        label:"XYZ Blood test"
    },
    {
        Icon:Stethoscope,
        label:"X-Ray test"
    },
    {
        Icon:TestTube,
        label:"Blood Test"
    }
]


    const Labresults=({Icon,label}:{Icon:any,label:string})=>
    <div className="flex gap-6 p-2 hover:bg-primary rounded-lg group">
        <Icon className="group-hover:stroke-white"/>
        <p className="font-medium  group-hover:text-white">{label}</p>
    </div>
    
    return (
        <Card>
             <div className="flex justify-end">
                <MoreHorizontal />
            </div>
            <h2 className="font-bold">Latest Lab Results : </h2>
            <div>
                {
                    data.map((item,index)=>(
                        <Labresults {...item} key-={index} /> 
                    ))
                }
            </div>
            <div className="flex items-center gap-4">
                <Button className="bg-primary ">Upload Files</Button>
                <Button className="bg-transparent text-primary hover:text-primary hover:bg-transparent">See All</Button>
            </div>
        </Card>
    )
}

function OverviewCards(){
    const data=[{
        main:"Gender",
        label:"Male"
    },
    {
        main:"Date of Birth",
        label:"10/03/1999"
    },
    {
        main:"Next of Kin",
        label:"John Mark"
    },
    {
        main:"Previous Visit",
        label:"25/11/2023"
    },
    {
        main:"Next Visit",
        label:"01/10/2024"
    },
    {
        main:"Allergies",
        label:"Peanut , CrayFish"
    }

]

    const OverViewComponent=(props:{main:string,label:string})=>(
        <div>
            <p className="text-sm py-2">{props.main}</p>
            <p className="text-md font-bold">{props.label}</p>
        </div>)

    return (
        <Card>
             <div className="flex justify-end">
                <MoreHorizontal />
            </div>
            <p className="font-bold">Overview :</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {
                    data.map((item,index)=><OverViewComponent {...item} key={index}/>)
                }
            </div>
        </Card>
    )
}

function Others(){

    const data=[{
        Icon:Calendar,
        label:"Appointments"
    },
    {
        Icon:Stethoscope,
        label:"Doctors"
    },
    {
        Icon:Plus,
        label:"Treatment"
    },
    {
        Icon:FlaskConicalIcon,
        label:"Lab & Test"
    }
    ,{
        Icon:HeartPulseIcon,
        label:"Vital Signs"
    },
    {
        Icon:UserCircle,
        label:"Profile"
    },
    {
        Icon:CreditCard,
        label:"Billings"
    },
    {
        Icon:FormInput,
        label:"Consent Forms"
    }
]


    const OthersComponent=({Icon,label}:{Icon:any,label:string})=>(
        <div className="flex flex-col md:flex-row flex-[0.5]
        hover:bg-primary
        group
        justify-between
         items-center gap-3 md:gap-6 border-2 p-6 md:p-3 rounded-xl border-primary">
                <div className="bg-primary flex items-center justify-center w-10 h-10 p-2 rounded-full">
                   <Icon color="white" />
                </div>
                <p className="font-semibold text-[13px] text-black group-[]:group-hover:text-white text-nowrap">{label}</p>
                <ArrowRight className="group-[]:group-hover:text-white hidden md:block"/>
        </div>
    )
    return (
        <Card>
            <div className="grid grid-cols-2 gap-6">
            {
                data.map((index,_)=><OthersComponent Icon={index.Icon} label={index.label} key={_}/>)
            }
            </div>
        </Card>
    )
}