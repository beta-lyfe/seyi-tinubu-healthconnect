import { createFileRoute, Link, useRouter } from '@tanstack/react-router'

import { useState, useEffect } from 'react'
import {
  Stethoscope,
  ArrowLeft,
  CheckCircle,
  Loader2,
  Mail
} from 'lucide-react'
import { motion } from 'framer-motion'

import { Button } from '@beta-lyfe/ui/components/shad/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@beta-lyfe/ui/components/shad/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@beta-lyfe/ui/components/shad/ui/input-otp'
import { z } from 'zod'
import { InputOTPPattern } from './-components/inputotp'
import { $api } from '../../../lib/backend'
import { toast } from 'sonner'
import { differenceInSeconds } from 'date-fns'
import Countdown from 'react-countdown'

export const Route = createFileRoute('/_app/auth/verify')({
  component: VerifyPage,
  validateSearch: z.object({
    email: z.string().email()
  })
})

export default function VerifyPage() {
  const searchParams = Route.useSearch()
  const router = useRouter()
  const email = searchParams.email || ''
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { mutate } = $api.useMutation(
    'post',
    '/api/auth/send-verification-email',
    {
      onSuccess: () => {
        setTimeLeft(1000 * 60 * 30)
        toast.success('OTP sent to email')
      },
      onError: (err) => {
        switch (err.code) {
          case 'VERIFICATION_MAIL_ALREADY_SENT_ERROR': {
            const dateDifference = differenceInSeconds(
              err.data.expires_at,
              Date.now()
            )
            setTimeLeft(dateDifference)
            console.log(dateDifference)
            toast('OTP already sent to email')
            break
          }
          case 'UNEXPECTED_ERROR': {
            toast.error('An error occured')
            break
          }
          default:
            toast.error('An error occured')
        }
      }
    }
  )

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    return (
      <span>
        {minutes}m:{seconds}s
      </span>
    )
  }

  const { mutate: sendMutate } = $api.useMutation(
    'post',
    '/api/auth/verify-email',
    {
      onSuccess: (data) => {
        toast.success('Email verified successfully')
        setIsVerified(true)
        setTimeout(() => {
          router.navigate({ to: '/auth/sign-in' })
        }, 2000)
      },
      onError: (err) => {
        toast.error(err.code)
      }
    }
  )

  useEffect(() => {
    if (email) {
      mutate({
        body: {
          email: email
        }
      })
    }
  }, [])
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
    }
  }, [timeLeft, canResend])

  // Reset error when OTP changes
  useEffect(() => {
    if (error) setError(null)
  }, [otp, error])

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      // Simulate API verification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, let's say "123456" is the correct code
      sendMutate({
        body: {
          email,
          otp
        }
      })
    } catch (error) {
      console.error('Verification error:', error)
      setError('An error occurred during verification. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendCode = async () => {
    setCanResend(false)
    setError(null)
    mutate({
      body: {
        email: email
      }
    })
  }

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, '$1•••$3')
    : 'your email'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary-50 to-background">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full">
              <img
                src="/images/betalyfe-icon.svg"
                className="w-14 h-14 rounded-full"
              />
            </div>
            <h1 className="text-xl font-bold ml-2">Beta-Lyfe</h1>
          </div>
          <Link to="/auth/sign-in">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
        </div>

        <Card className="border-none">
          {isVerified ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-green-100 p-3 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">
                  Verification Successful!
                </CardTitle>
                <CardDescription>
                  Your account has been verified. Redirecting you to the
                  dashboard...
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-6">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </CardContent>
            </motion.div>
          ) : (
            <>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Verify Your Email</CardTitle>
                <CardDescription>
                  We've sent a 6-digit verification code to {maskedEmail}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <InputOTPPattern setOtp={setOtp} otp={otp} />

                  {error && (
                    <p className="text-sm font-medium text-destructive">
                      {error}
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground">
                    {canResend ? (
                      <button
                        onClick={handleResendCode}
                        className="text-primary hover:underline focus:outline-none"
                      >
                        Resend code
                      </button>
                    ) : (
                      <>
                        Resend code in{' '}
                        <span className="font-medium">
                          <Countdown
                            date={Date.now() + 1000 * timeLeft}
                            renderer={renderer}
                          />
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  className="w-full"
                  onClick={handleVerify}
                  disabled={otp.length !== 6 || isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                      Verifying
                    </>
                  ) : (
                    'Verify Email'
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By verifying your email, you're confirming that you agree to
                  our{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </CardFooter>
            </>
          )}
        </Card>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Didn't receive the code?{' '}
          <a
            href="#"
            className="text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault()
              if (canResend) handleResendCode()
            }}
          >
            {canResend ? (
              'Click to resend'
            ) : (
              <>
                Wait{' '}
                <Countdown
                  date={Date.now() + 1000 * timeLeft}
                  renderer={renderer}
                />
              </>
            )}
          </a>
        </p>

        <p className="text-center text-sm mt-2 text-muted-foreground">
          Need help?{' '}
          <Link to="/help" className="text-primary hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
