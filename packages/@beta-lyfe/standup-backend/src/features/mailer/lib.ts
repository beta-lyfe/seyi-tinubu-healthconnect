import nodemailer from 'nodemailer'
import { config } from '../config'
import { Logger } from '../logger'
import { Result } from 'true-myth'
import type { ReactElement } from 'react'
import { render } from 'jsx-email'

export namespace Mailer {
  type Error = 'MAIL_NOT_SENT_ERROR'

  const logger = Logger.getSubLogger({ name: 'mailer' })

  const transporter = nodemailer.createTransport({
    url: config.mail.url
  })

  export type Payload = {
    recipients: string[]
    subject: string
    email: ReactElement
  }

  export const send = async (
    payload: Payload
  ): Promise<Result<null, Error>> => {
    const recipients = payload.recipients.join(', ')
    try {
      const plainText = await render(payload.email)
      const htmlText = await render(payload.email)

      // TODO: proper mail handling should be done here

      const info = await transporter.sendMail({
        from: `"${config.mail.sender.name}" <${config.mail.sender.email}>`,
        to: recipients,
        subject: payload.subject,
        text: plainText,
        html: htmlText
      })

      return Result.ok(null)
    } catch (err) {
      logger.error('Failed to send mail to ${recipients}', err)
      return Result.err('MAIL_NOT_SENT_ERROR')
    }
  }
}
