import React from 'react'
import { config } from '../../config'

type PatientEmailProps = {
  patientName: string
  doctorName: string
  date: string
  time: string
  type: string
  mode: string
  roomname: string
  token: string
}

export const PatientConsultationEmail: React.FC<PatientEmailProps> = ({
  patientName,
  doctorName,
  date,
  time,
  type,
  mode,
  token,
  roomname
}) => {
  const consultationLink = `${config.frontend.webappUrl}/testcall?roomname=${roomname}&token=${token}`

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img
          src="https://yourdomain.com/logo.png"
          alt="Company Logo"
          style={styles.logo}
        />
        <h2>Your Consultation is Confirmed</h2>
      </div>
      <p>Hi {patientName},</p>
      <p>
        Your consultation with Dr. {doctorName} has been successfully scheduled.
      </p>
      <div style={styles.details}>
        <strong>Date:</strong> {date} <br />
        <strong>Time:</strong> {time} <br />
        <strong>Consultation Type:</strong> {type} <br />
        <strong>Mode:</strong> {mode}
      </div>
      <a href={consultationLink} style={styles.button}>
        Join Consultation
      </a>
      <p style={{ marginTop: '30px' }}>
        We look forward to helping you stay healthy.
        <br />
        The Beta-Lyfe Team
      </p>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    color: '#333'
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '20px'
  },
  logo: {
    height: '50px'
  },
  details: {
    marginTop: '20px'
  },
  button: {
    display: 'inline-block',
    padding: '10px 15px',
    background: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    marginTop: '20px'
  }
}
