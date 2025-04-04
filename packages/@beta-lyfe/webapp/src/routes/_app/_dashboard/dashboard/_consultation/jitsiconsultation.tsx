import { createFileRoute } from '@tanstack/react-router'
import {JitsiMeeting,JaaSMeeting} from '@jitsi/react-sdk'
import { z } from 'zod'


const clientconsultationSchema=z.object({
    roomname:z.string()
})

export const Route = createFileRoute(
  '/_app/_dashboard/dashboard/_consultation/jitsiconsultation',
)({
  component: RouteComponent,
  validateSearch:clientconsultationSchema
})

function RouteComponent() {
    const {roomname}=Route.useSearch()
  return <div>

    <JaaSMeeting
    
    appId = "vpaas-magic-cookie-85533b1747964218845f2cdfd2fb8fba"
    roomName = {roomname}
    jwt = { "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtODU1MzNiMTc0Nzk2NDIxODg0NWYyY2RmZDJmYjhmYmEvM2UzZGU3LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3NDIwODA5OTgsImV4cCI6MTc0MjA4ODE5OCwibmJmIjoxNzQyMDgwOTkzLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtODU1MzNiMTc0Nzk2NDIxODg0NWYyY2RmZDJmYjhmYmEiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImNoaWh1cnVtaWtlY2h1a3d1LmFld29ya3MiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTA1NzU2MTk1MjY3ODI4NzA3MDI1IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJjaGlodXJ1bWlrZWNodWt3dS5hZXdvcmtzQGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.BtRzXFdZeJSWcKy39ubv1bYJO96SEnjV5qOPn7Nh2k5m9xXqIw38jbAo2O_iy0Xb40K_6AHfG41-3pH7mLQOejODum_NE_FAbma_uJ3BgIOUVvXckYDcecl6Q47WCE4vb8phrAR7PPzcNV_MZXxnngyRJQFv4unDB6DgscUOosUW56ZYUHrWzoEiW2cpWGZLLkq04-L8Oewo3E1RZyqxojlhxt-oN2BEcYwEHfO-OQR7Pkt6A3nnEX3F4NWNMQ6FJVkZlV7VrbhNMVm2HOUGRytHwu3oT5oj006mcR_NXU1bVktr7Hsxtru2_lMdH5V54OHLrU3DXrsniPApj6Dm-g"}
    configOverwrite = {{
        disableLocalVideoFlip: true,
        backgroundAlpha: 0.5
    }}
    interfaceConfigOverwrite = {{
        VIDEO_LAYOUT_FIT: 'nocrop',
        MOBILE_APP_PROMO: false,
        TILE_VIEW_MAX_COLUMNS: 4,
        
    }}
    getIFrameRef = { (iframeRef) => { iframeRef.style.height = '100vh'; } }
   // spinner = { <div>Custom Spinner</div> }
    //onApiReady = { (externalApi) => { ... } }
/></div>
}
