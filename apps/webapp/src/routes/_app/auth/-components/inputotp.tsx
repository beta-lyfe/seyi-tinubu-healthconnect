import {
  inputOtp,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@beta-lyfe/ui/components/shad/ui/input-otp'
import { Dispatch, SetStateAction } from 'react'

export const InputOTPPattern = ({
  otp,
  setOtp
}: { otp: string; setOtp: Dispatch<SetStateAction<string>> }) => {
  const inputOtpSlot = 'border-black border-[2px] rounded-lg ring-0'
  return (
    <InputOTP
      maxLength={6}
      pattern={inputOtp.REGEXP_ONLY_DIGITS}
      defaultValue={otp}
      onChange={(value) => {
        setOtp(value)
      }}
    >
      <InputOTPGroup className="select-none flex items-center justify-center gap-2 md:gap-5">
        <InputOTPSlot index={0} className={inputOtpSlot} />
        <InputOTPSlot index={1} className={inputOtpSlot} />
        <InputOTPSlot index={2} className={inputOtpSlot} />
        <InputOTPSlot index={3} className={inputOtpSlot} />
        <InputOTPSlot index={4} className={inputOtpSlot} />
        <InputOTPSlot index={5} className={inputOtpSlot} />
      </InputOTPGroup>
    </InputOTP>
  )
}
