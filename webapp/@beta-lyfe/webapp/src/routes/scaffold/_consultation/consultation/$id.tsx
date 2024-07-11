import { consultation } from '@beta-lyfe/webapp/lib/consultation';
import { useRoom } from '@huddle01/react/hooks';
import { createFileRoute } from '@tanstack/react-router'
import { FunctionComponent, useState } from 'react';

export const Route = createFileRoute('/scaffold/_consultation/consultation/$id')({
  component: JoinConsultationPage,
})

function JoinConsultationPage() {
  const roomId = Route.useParams({ select: ({ id }) => id })
  const { data: accessToken, error, status } = consultation.hooks.useFetchApiToken(roomId)

  if (status === 'pending')
    return 'Loading...'

  if (status === 'error')
    return error.message

  return (
    <JoinConsultation
      roomId={roomId}
      accessToken={accessToken}
    />
  )
}

const JoinConsultation: FunctionComponent<{
  roomId: string,
  accessToken: string
}> = ({ roomId, accessToken }) => {
  const {
    joinRoom,
    leaveRoom
  } = useRoom({
    onJoin: () => {
      console.log('Joined the room');
    },
    onLeave: () => {
      console.log('Left the room');
    },
  });

  return (
    <div className="h-full grid place-items-center gap-4">
      <button onClick={() => {
        joinRoom({
          roomId,
          token: accessToken,
        });
      }}>
        Join Room
      </button>
      <button onClick={leaveRoom}>
        Leave Room
      </button>
    </div>
  );
};
