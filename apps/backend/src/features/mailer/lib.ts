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
    logger.debug('Sending mail to', payload.recipients)
    console.log(config.mail.url)
    const recipients = payload.recipients.join(', ')
    try {
      const plainText = await render(payload.email)
      const htmlText = await render(payload.email)

      // TODO: proper mail handling should be done here
      const info = await transporter.sendMail({
        from: `info@betalyfe.com.ng`,
        to: recipients,
        subject: payload.subject,
        text: plainText,
        html: htmlText
      })

      logger.debug(info)

      return Result.ok(null)
    } catch (err) {
      logger.error('Failed to send mail to ${recipients}', err)
      return Result.err('MAIL_NOT_SENT_ERROR')
    }
  }
}
