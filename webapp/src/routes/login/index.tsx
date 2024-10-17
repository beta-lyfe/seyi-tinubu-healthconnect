import { Typography } from '@beta-lyfe/webapp/components/typography'
import { Button } from '@beta-lyfe/webapp/components/shad/ui/button'
import { createFileRoute , useRouter } from '@tanstack/react-router'
import { useContext, createContext,useState } from 'react'

export const Route=createFileRoute('/login/')({
    component:LoginPage
})


const LoginPageContext=createContext<{isPatient:boolean,setPatient:Function}>({} as {isPatient:boolean,setPatient:Function})

function LoginPage(){
    const [isPatient,setPatient]=useState(true)

  return (
    <LoginPageContext.Provider value={{isPatient,setPatient}}>
        <main className='w-[100%] flex flex-1 justify-center items-center p-6'>
        <div className='sm:w-[300px] w-[310px] md:w-[360px] flex flex-col items-center gap-14 md:gap-6 '>
            <Header />
            <Choose />
            <Form />
            <Extra/>
        </div>
        </main>
    </LoginPageContext.Provider>
  )
}

function Header(){
    return(
        <div className='flex flex-col gap-3 justify-center'>
         <Typography.Title
            className='text-primary text-[30px] text-center'
          >
            Login
          </Typography.Title>
          <Typography.Info className='text-black'>Please Choose an account type</Typography.Info>
        </div>
         
    )
}


function Choose(){
    const context = useContext(LoginPageContext)
    return(
        <div className='flex w-[100%] flex-row rounded-2xl border-primary border-2 cursor-pointer'>
            <div className=
            {'flex flex-1 py-2  rounded-lg items-center justify-center rounded-r-none text-center '.
                concat(context?.isPatient ? 'bg-primary':'bg-transparent')}
            onClick={()=>context?.setPatient(true)}
            >
                <Typography.Info className={context?.isPatient ? 'text-white': 'text-primary'}>Patient</Typography.Info>
            </div>
            <div 
            
            className={'flex flex-1 py-2 rounded-lg justify-center items-center rounded-l-none '.
                concat(!context?.isPatient ? 'bg-primary':'bg-transparent')
            }
            onClick={()=>context?.setPatient(false)}
            >
            <Typography.Info className={!context?.isPatient ? 'text-white': 'text-primary'}>
                Doctor
            </Typography.Info>
            </div>
        </div>
    )
}

const Form=()=>{
    const {isPatient}=useContext(LoginPageContext)
    const navigate=useRouter()
    return(
    <form className='flex flex-col w-[100%] gap-6' onSubmit={()=>navigate.navigate({to:isPatient?'/dashboard': '/doctor'})}>
       <FormInput label='Email address' inputType='email'/>
       <div>
       <FormInput label='Password' inputType='password'/>
       <Typography.Info className='text-right text-black opacity-40 
       py-2
       text-sm'>Forgot password?</Typography.Info>
       </div>
       <Button className='rounded-lg'>Login</Button>
    </form>
    )
}

function FormInput({label,inputType}:{label:string,inputType:string}){

    const [labelOpacity,setLabelOpacity]=useState(true)
    return(
    <fieldset className='flex flex-1 flex-col gap-2 w-[100%]'>
    <label className={'text-sm '.concat(!labelOpacity? 'opacity-40': '')}>{label}</label>
    <input
    onFocus={()=>setLabelOpacity(false)}
    onBlur={e=>setLabelOpacity(!(e.target.value.length>=1))}
    onChange={e=>setLabelOpacity(!(e.target.value.length>=1))}
    className='outline-0  border-primary bg-transparent border-0 border-b-2 focus:ring-0 focus:border-primary' type={inputType}/>
    </fieldset>
    )
}

function Extra(){
    const context = useContext(LoginPageContext)
    return(
        <div className='flex flex-col'>
            <Typography.Info className='text-black opacity-40 text-sm'>
                {!context?.isPatient ? `Yet to apply as a Listed Medical Doctor` :
                `Don't have an account yet`
                }</Typography.Info>
            <Button className='text-primary bg-transparent hover:bg-transparent'>
                {context?.isPatient ? `Click here to Begin` : "Create one here" }
                </Button>
        </div>
    )
}

export default LoginPage
