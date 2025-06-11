import { createFileRoute } from '@tanstack/react-router'
import { JitsiMeeting } from '@jitsi/react-sdk'
import { z } from 'zod'

const clientconsultationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  roomname: z.string()
})

export const Route = createFileRoute(
  '/_app/_dashboard/dashboard/_consultation/clientconsultation'
)({
  component: RouteComponent,
  validateSearch: clientconsultationSchema
})

function RouteComponent() {
  const { username, email, roomname } = Route.useSearch()

  return (
    <div>
      <JitsiMeeting
        roomName={roomname}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
        }}
        userInfo={{
          displayName: username,
          email: email
        }}
        onApiReady={(externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '100vh'
        }}
      />
    </div>
  )
}
