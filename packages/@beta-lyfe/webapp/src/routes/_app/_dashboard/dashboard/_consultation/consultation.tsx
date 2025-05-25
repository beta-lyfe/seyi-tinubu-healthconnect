import { createFileRoute } from '@tanstack/react-router'
import { JitsiMeeting, JaaSMeeting } from '@jitsi/react-sdk'
import { z } from 'zod'
import { config } from '../../../../../lib/config'
import { Loader } from 'lucide-react'

const clientconsultationSchema = z.object({
  roomname: z.string(),
  token: z.string()
})

export const Route = createFileRoute(
  '/_app/_dashboard/dashboard/_consultation/consultation'
)({
  component: RouteComponent,
  validateSearch: clientconsultationSchema
})
const jitsi = import.meta.env.VITE_JITSI_APP_ID;

function RouteComponent() {
  const { roomname ,token} = Route.useSearch()
  return (
    <div className=''>
      <Loader size={70} className='absolute animate-spin'/>
      <JaaSMeeting
        appId={jitsi}
        roomName={roomname}
        jwt={
        token
        }

        configOverwrite={{
          disableLocalVideoFlip: true,
          backgroundAlpha: 0.5
        }}
        interfaceConfigOverwrite={{
          VIDEO_LAYOUT_FIT: 'nocrop',
          MOBILE_APP_PROMO: false,
          TILE_VIEW_MAX_COLUMNS: 4
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '100vh'
        }}
        // spinner = { <div>Custom Spinner</div> }
        //onApiReady = { (externalApi) => { ... } }
      />
    </div>
  )
}
