import { createFileRoute } from '@tanstack/react-router'
import { JitsiMeeting, JaaSMeeting } from '@jitsi/react-sdk'
import { z } from 'zod'

const clientconsultationSchema = z.object({
  roomname: z.string()
})

export const Route = createFileRoute(
  '/_app/_dashboard/dashboard/_consultation/jitsiconsultation'
)({
  component: RouteComponent,
  validateSearch: clientconsultationSchema
})

function RouteComponent() {
  const { roomname } = Route.useSearch()
  return (
    <div>
      <JaaSMeeting
        appId="vpaas-magic-cookie-85533b1747964218845f2cdfd2fb8fba"
        roomName={roomname}
        jwt={
          "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtYjhlMGFkNzUwNjhiNDg3ZDkxZjAzZGU0YmNhNTRiODEvMDVlMWE1LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3NDUzMDgxMTUsImV4cCI6MTc0NTMxNTMxNSwibmJmIjoxNzQ1MzA4MTEwLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtYjhlMGFkNzUwNjhiNDg3ZDkxZjAzZGU0YmNhNTRiODEiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImNoaWh1cnVtaWtlY2h1a3d1MDUiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTExNjE2Mzg3MTk1Nzg5NTc5MjU1IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJjaGlodXJ1bWlrZWNodWt3dTA1QGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.AQgQ92xRYnPWHJkjvNDkemFgTbAVL72Ij8Ly_A4wabcTp1wip7-gVLJ7EMd515M3kgQjNy7N94nF34tuSa-vleGXsmneVi-GazOKNB_RiVL1jXtw_yVFK76ZVxA-lq88Gxg000bq9gDpSOdrG8MdYdoBTFfxshrVo1Gj8T1HfkTrRBmLVwaBXc3SA_3YSqJ6e62PG-S12vBfHOtk3-GG_Q55-8M9OTjCXJ41pB7pfCOcxi0KV2ZgF4dfnUIteC2cw1vGS-rnn8flTc_G-3ASCEhhLKoYtFjjKX1Farj2mID2NwEn3dvh91VrXGLKk5Ru_W7HueQ58crqU1_yBkDifA"
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
