import { createFileRoute } from '@tanstack/react-router'
import { useHuddle01 } from '@huddle01/react';
import { useLobby, useAudio, useVideo } from '@huddle01/react/hooks';
import { FunctionComponent, useEffect, useState } from 'react';
import { config } from '@beta-lyfe/webapp/lib/config';
import { consultation } from '@beta-lyfe/webapp/lib/consultation';
import { toast } from 'sonner';
import { Audio, Video } from '@huddle01/react/components';

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
  const { initialize, isInitialized, meId } = useHuddle01();
  const { joinLobby } = useLobby();
  const { stream: audioStream, fetchAudioStream, stopAudioStream, error: micError } = useAudio();
  const { stream: videoStream, fetchVideoStream, stopVideoStream, error: camError } = useVideo();

  useEffect(() => {
    initialize(config.huddle01.projectId);
  }, []);

  return (
    <div>{isInitialized ? 'Hello World!' : 'Please initialize'}
      <Video peerId={meId} stream={videoStream} />
      <Audio peerId={meId} stream={audioStream} />
      <button
        disabled={joinLobby.isCallable}
        onClick={() => joinLobby('YOUR_ROOM_ID')}
      >
        Join Lobby
      </button>

      {/* Mic */}
      <button disabled={!fetchAudioStream.isCallable} onClick={fetchAudioStream}>
        FETCH_AUDIO_STREAM
      </button>

      {/* Webcam */}
      <button disabled={!fetchVideoStream.isCallable} onClick={fetchVideoStream}>
        FETCH_VIDEO_STREAM
      </button>
    </div >

  )
}
