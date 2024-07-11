import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { consultation } from '@beta-lyfe/webapp/lib/consultation';
import { toast } from 'sonner';

export const Route = createFileRoute('/scaffold/_consultation/consultation/')({
  component: BeginConsultationPage
})

function BeginConsultationPage() {
  const { mutate, status } = consultation.hooks.useCreateRoom()
  const navigate = useNavigate()

  const isCreatingConsultation = status === 'pending'

  const createRoom = () =>
    mutate(undefined, {
      onSuccess: (data) => {
        navigate({
          to: '/scaffold/consultation/$id',
          params: {
            id: data.roomId,
          }
        })
      },
      onError: (err) => {
        toast(err.message)
      }
    })

  return (
    <div className="h-full grid place-content-center">
      <button
        onClick={createRoom}
        disabled={isCreatingConsultation}
      >
        Begin consultation
      </button>
    </div>
  )
}
