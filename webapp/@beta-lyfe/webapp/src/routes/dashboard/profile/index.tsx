import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@beta-lyfe/webapp/shad/ui/button";
import { Typography } from "@beta-lyfe/webapp/components/typography";
import IykeForm, { IykeFormField, IykeFormType } from "@beta-lyfe/webapp/components/IykeForm";
import { additionalInformationFields, availabilityFields, basicInformationFields, contactInformationFields, professionalInformationFields } from "@beta-lyfe/webapp/data/data";
import { BottomNav } from "@beta-lyfe/webapp/routes/-components/bottom-nav";

const route=['Personal Information',
    "Medical Information",
    'Emergency Contact',
    'Lifestyle Information',
    'Medical History'
]

const route2=['Personal Information',
    "Professional Information",
    'Contact Information',
    'Avaliablity',
    'Additional Information'
]

const EmergencyContactData:IykeFormType[]=[
    {name:'Contact Name',value:'Jane Doe',inputType:'text'},
    {name:'Relationship',value:'Spouse',inputType:'text'},
    {name:'Phone',value:'07031426383',inputType:'tel'},
    {name:'Email',value:'janedoe@example.com',inputType:'email'}
]

const PersonalInfoData:IykeFormType[]=[
    {name:'Full Name',value:'John Doe',inputType:'text'},
    {name:'Email',value:'johndoe@gmail.com',inputType:'email'},
    {name:'Phone',value:'09027326383',inputType:'tel'},
    {name:'Address',value:'No 3 obinna street',inputType:'text'},
    {name:'Bio',value:'',inputType:'text',placeholder:'Tell us more about urself'}
]

const MedicalInfoData:IykeFormType[]=[
    {name:'Height',value:"5'9",inputType:'text'},
    {name:'Weight',value:'120',inputType:'number'},
    {name:'Blood Type',value:'O+',inputType:'text'},
    {name:'Allergies',value:'Penicillin, Nuts',inputType:'text'},
    {name:'Chronic Condtions',value:'Asthma',inputType:'text'},
    {name:"Current Medications",value:'Albuterol, Lisinopril',inputType:'text'},
    {name:"Primary Care Physician",value:"Dr Emek Chika",inputType:'text'}
]

const LifeStyleInfoData:IykeFormType[]=[
    {name:'Smoking Status',value:'Non-smoker',inputType:'text'},
    {name:'Alcohol Consumption', value:'Occasionally',inputType:'text'},
    {name:'Exercise Frequency',value:'3 times per week',inputType:'text'},
    {name:'Diet',value:'Balanced diet',inputType:'text'}
]

const MedicalHistorydata:IykeFormType[]=[
    {value:'Fever Date - 2/3/2015 Treated by Dr. Emeka Chika at Salvation Hospital Owerri ',inputType:'text'},
    {value:'Fever Date - 2/3/2015 Treated by Dr. Emeka Chika at Salvation Hospital Owerri ',inputType:'text'},
    {value:'Fever Date - 2/3/2015 Treated by Dr. Emeka Chika at Salvation Hospital Owerri ',inputType:'text'},
    {value:'Fever Date - 2/3/2015 Treated by Dr. Emeka Chika at Salvation Hospital Owerri ',inputType:'text'},
    {value:'Fever Date - 2/3/2015 Treated by Dr. Emeka Chika at Salvation Hospital Owerri ',inputType:'text'},
    {value:'Fever Date - 2/3/2015 Treated by Dr. Emeka Chika at Salvation Hospital Owerri ',inputType:'text'}
]



export const Route = createFileRoute('/dashboard/profile/')({
    component:ProfilePage
})



export default function ProfilePage(){
    const [index,setIndex]=useState<number>(0)
    const [isDoctor,setDoctor]=useState(false)
    
    return(
        <>
        <div>
      <div className="p-5 bg-primary gap-5">
        <div>
          <Typography.PageHeading className="text-white">
            Profile
          </Typography.PageHeading>
        </div>
      </div>
      </div>
        <div className="flex items-center justify-center gap-4 flex-col p-4">
                <img 
                className="rounded-[50px] w-[100px] h-[100px]"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                <Typography.Info className="text-lg text-black">{
                !isDoctor ? PersonalInfoData[0].value : basicInformationFields[0].value}</Typography.Info>
                <div className="flex items-center justify-center flex-row gap-4">
                    <Button size='sm' className="flex gap-2"
                    onClick={()=>setDoctor(prev=>!prev)}
                    >
                        Edit profile
                        <EditIcon />
                        </Button>
                    <Button size='sm' className="bg-gray-400 flex gap-2">upload profile image
                        <UploadIcon />
                    </Button>
                </div>
            </div>
        <div className="flex p-2 align-center flex-row max-md:flex-col">
        <section className='flex flex-shrink-0 flex-col'>
            <div>
                <ProfileRoutes setIndex={setIndex} mainIndex={index} route={!isDoctor ? route : route2}/>
            </div>
        </section>
        <section className='flex-grow'>
            {!isDoctor ? <>{index==0 && <IykeForm data={PersonalInfoData}/>}
            {index==1 && <IykeForm data={MedicalInfoData} />}
            {index==2 && <IykeForm data={EmergencyContactData} />}
            {index==3 && <IykeForm data={LifeStyleInfoData} />}
            {index==4 && <IykeForm data={MedicalHistorydata} />}
            </> : <>
            {index==0 && <IykeForm data={basicInformationFields}/>}
            {index==1 && <IykeForm data={professionalInformationFields}/>}
            {index==2 && <IykeForm data={contactInformationFields}/>}
            {index==3 && <IykeForm data={availabilityFields}/>}
            {index==4 && <IykeForm data={additionalInformationFields}/>}</>}
        </section>
        </div>
        <BottomNav />
        </>

    )
}


function ProfileRoutes({setIndex,mainIndex,route}:{setIndex:Function,mainIndex:number,route:string[]}){
    return(
    <ul className='flex flex-col gap-4 p-6'>
       {route && route.map((item,index)=>(
        <ProfileRoute item={item} setIndex={setIndex} 
        active={route.indexOf(item)==mainIndex}
        index={index}/>
       ))}
    </ul>
    )

    function ProfileRoute({item,active,setIndex,index}:{item:string,active?:boolean
        setIndex:Function,index:number
    }){
        return (
            <Link to='/dashboard/profile' className="flex items-center"
            onClick={()=>setIndex(index)}
            >
            <li className={active ? 'border-l-4 pl-2 border-primary' : 'border-l-4 pl-2' }>{item}</li>
            </Link>
        )
    }
}


  function UploadIcon(){
    return(
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98887 7.64753L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
}


const EditIcon=()=><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
