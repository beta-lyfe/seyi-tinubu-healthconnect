import { createFileRoute } from '@tanstack/react-router'
import { useHuddle01 } from '@huddle01/react';
import { useLobby } from '@huddle01/react/hooks';
import { useEffect } from 'react';
import { config } from '@/lib/config';

export const Route = createFileRoute('/scaffold/consultation')({
  component: ConsulationScaffoldPage
})

function ConsulationScaffoldPage() {
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
          onClick={() => joinLobby('YOUR_ROOM_ID')}
        >
          Join Lobby
        </button>
      </div>
    </div>
  )
}
