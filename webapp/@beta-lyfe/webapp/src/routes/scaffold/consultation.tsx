import { createFileRoute } from '@tanstack/react-router'
import { useHuddle01 } from '@huddle01/react';
import { useLobby } from '@huddle01/react/hooks';
import { FunctionComponent, useEffect, useState } from 'react';
import { config } from '@/lib/config';
import { consultation } from '@/lib/consultation';
import { toast } from 'sonner';

export const Route = createFileRoute('/scaffold/consultation')({
  component: ConsulationScaffoldPage
})

function ConsulationScaffoldPage() {
  const { mutate, status } = consultation.hooks.useCreateRoom()
  const [roomId, setRoomId] = useState()

  useEffect(() => {
    mutate(undefined, {
      onSuccess: (data) => {
        console.log(data)
        // setRoomId(data)
      },
      onError: (err) => {
        toast(err.message)
      }
    })
  }, [])

  if (status === 'success') return <ConsultationRoom roomId={roomId} />

  return null
}

const ConsultationRoom: FunctionComponent<{ roomId: string }> = ({ roomId }) => {
  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();

  useEffect(() => {
    initialize(config.huddle01.projectId);
  }, []);

  return (
    <div>
      <div>{isInitialized ? 'Hello World!' : 'Please initialize'}
        <button
          disabled={joinLobby.isCallable}
          onClick={() => joinLobby(roomId)}
        >
          Join Lobby
        </button>
      </div>
    </div>
  )
}
