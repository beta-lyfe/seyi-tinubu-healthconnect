import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Img,
  Text,
  Heading,
  Button
} from 'jsx-email'
import { config } from '../../config'

type Props = {
  doctorName: string
  patientName: string
  date: string
  time: string
  type: string
  mode: string
  roomname: string
  token: string
}

export default function DoctorConsultationEmail({
  doctorName,
  patientName,
  date,
  time,
  type,
  mode,
  roomname,
  token
}: Props) {
  const consultationLink = `${config.frontend.webappUrl}/testcall?roomname=${roomname}&token=${token}`

  return (
    <Html>
      <Head />
      <Preview>New consultation scheduled with {patientName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://yourdomain.com/logo.png"
            width="120"
            alt="Company Logo"
            style={{ margin: '0 auto' }}
          />
          <Heading as="h2" style={heading}>
            New Consultation Scheduled
          </Heading>
          <Text>Dear Dr. {doctorName},</Text>
          <Text>You have a new consultation appointment scheduled:</Text>
          <Text>
            <strong>Patient Name:</strong> {patientName}
            <br />
            <strong>Date:</strong> {date}
            <br />
            <strong>Time:</strong> {time}
            <br />
            <strong>Type:</strong> {type}
            <br />
            <strong>Mode:</strong> {mode}
          </Text>
          <Button
            href={consultationLink}
            style={buttonBlue}
            height={20}
            width={60}
          >
            View Consultation
          </Button>
          <Text style={{ marginTop: '30px' }}>
            Thank you,
            <br />
            The Beta-Lyfe Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f9f9f9',
  fontFamily: 'Arial, sans-serif'
}

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '600px',
  margin: '20px auto'
}

const heading = {
  textAlign: 'center' as const,
  color: '#333'
}

const buttonBlue = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  height: '10px',
  width: '60px',
  padding: '12px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '20px'
}
