import { createFileRoute } from '@tanstack/react-router'
import { JitsiMeeting, JaaSMeeting } from '@jitsi/react-sdk'
import { z } from 'zod'
import { env } from '../../../env'


const clientconsultationSchema = z.object({
  roomname: z.string(),
  token:z.string()
})

export const Route = createFileRoute(
  '/_app/testcall/call'
)({
  component: RouteComponent,
  validateSearch: clientconsultationSchema
})

function RouteComponent() {
  const { roomname ,token} = Route.useSearch()
  return (
    <div>
      <JaaSMeeting
        appId={env.VITE_JITSI_APP_ID}
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
