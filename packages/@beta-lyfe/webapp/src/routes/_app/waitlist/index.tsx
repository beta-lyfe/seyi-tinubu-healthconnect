import { Input } from '@beta-lyfe/webapp/components/input'
import { Typography } from '@beta-lyfe/webapp/components/typography'
import { createFileRoute } from '@tanstack/react-router'
import { Instagram, SeparatorVerticalIcon, X } from 'lucide-react'
import { SocialIcon } from 'react-social-icons'

export const Route = createFileRoute('/_app/waitlist/')({
  component: WaitlistPage,
})


function WaitlistPage(){
    return(
        <div className='relative w-full h-full overflow-hidden flex flex-col justify-center p-2 items-center'>
              <CircleInWaitList position='top-left'/>
              <CircleInWaitList position='bottom-right'/>
            <div>
                <p className='text-center text-md font-bold'>— Coming soon —</p>
                <Typography.Info className='text-center text-2xl pt-3 md:text-3xl text-black font-extrabold'>
                Get Notified When we Launch
                </Typography.Info>
                <label className="flex items-center gap-2 mx-2 lg:mx-10 my-5 border-[1px] p-1 border-black rounded-xl">
                    <input type="email" className="grow focus:shadow-none border-none focus:border-none outline-black bg-[#F3F4F6] active:outline-none focus:outline-none" placeholder="Enter Your email address"/>
                    <button className="btn btn-active bg-primary p-2 rounded-lg border-black border-[1px]">Notify me</button>
                </label>
                <Typography.Info className='text-center mt-6 text-black text-sm pb-3'>
                    Don't worry, we won't spam you
                </Typography.Info>
                <div className='flex items-center justify-center space-x-4'>
                    <SocialIcon network='x' url='https://twitter.com' bgColor='transparent' fgColor='black' className='border-black border-[1px] rounded-full'/>
                    <SocialIcon network='instagram' url="https://instagram.com" bgColor='transparent' fgColor='black' className='border-black border-[1px] rounded-full'/>
                </div>
            </div>
        </div>
    )
}

function CircleInWaitList({position}:{
    position: "top-left" | "bottom-right"
}){
    return(
        <div className={`border-black -z-10 border-2 absolute w-52 h-52 lg:w-72 lg:h-72 rounded-full bg-primary ${position==="top-left"?
            "-top-14 -left-14": "-bottom-14 -right-14"}`}>
        </div>
    )
}


const XTwiiterIcon=()=>(
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
)