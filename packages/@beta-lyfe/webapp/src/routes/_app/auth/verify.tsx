import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { z } from 'zod'
import { InputOTPPattern } from './sign-up'
import { Button } from '@beta-lyfe/ui/components/button'
import { Lock } from 'lucide-react'
import { AuthLayout } from './-components/layout'
import { toast } from 'sonner'
import { $api } from '../../../lib/backend'
import { useRef, useState } from 'react'

const verifyOTPPageSchema = z.object({
  email: z.string().email()
})

export const Route = createFileRoute('/_app/auth/verify')({
  component: VerifyOTP,
  validateSearch: verifyOTPPageSchema
})

function VerifyOTP() {
  const { email } = Route.useSearch()
  const navigate = useNavigate()

  const resender = $api.useMutation('post', '/api/auth/resend-verify-email', {
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (_data) => {
      toast.success('Please check your inbox for an OTP code')
    }
  })

  const { mutate } = $api.useMutation('post', '/api/auth/verify-email', {
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (_data) => {
      toast.success('Verification successful')
      navigate({
        to: '/auth/sign-in'
      })
    }
  })

  const [otp, setotp] = useState('')

  return (
    <AuthLayout.Container>
      <div className="w-full h-full flex items-center justify-center flex-col space-y-6">
        <h2 className="font-bold text-xl md:text-2xl">Verify your account</h2>
        <p className="text-center">
          Enter the 6 digit OTP code sent to{' '}
          <span className="text-sm font-bold text-primary">{email}</span>
        </p>
        <InputOTPPattern otp={otp} setOtp={setotp} />
        <div className="w-full p-6 flex justify-center items-center">
          <Button
            onClick={() => {
              mutate({ body: { otp: otp } })
            }}
            className="flex items-center gap-2 justify-center w-[400px]
              border-black border-2
              text-white p-4"
          >
            <Lock color="white" /> Verify
          </Button>
        </div>
        <div className="flex justify-center items-center flex-col md:flex-row gap-1">
          <p>Didn't receive the code?</p>
          <button
            type="button"
            className="text-primary font-semibold"
            onClick={() =>
              resender.mutate({
                body: { email }
              })
            }
          >
            Re-send OTP in 10s
          </button>
        </div>
      </div>
    </AuthLayout.Container>
  )
}
