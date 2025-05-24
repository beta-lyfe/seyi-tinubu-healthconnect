import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Text,
    Button,
    Heading,
    Section,
  } from 'jsx-email';
import { config } from '../../config';
  
  export default function ConsultationApprovalEmail({ doctorName, patientName, consultationId }:{
    doctorName:string,
    patientName:string,
    consultationId:string
  }) {
    const approveUrl = `${config.frontend.webappUrl}/consultations/${consultationId}/accept`;
    const rejectUrl = `${config.frontend.webappUrl}/consultations/${consultationId}/reject`;
  
    return (
      <Html>
        <Head />
        <Preview>Accept or reject the consultation request</Preview>
        <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f9fc', padding: '20px' }}>
          <Container style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Heading style={{ fontSize: '20px', marginBottom: '20px' }}>
              Hello Dr. {doctorName},
            </Heading>
            <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
              You have a new consultation request from <strong>{patientName}</strong>.
            </Text>
            <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
              Please take a moment to review and respond to the request.
            </Text>
            <Section style={{ display: 'flex', gap: '12px' }}>
              <Button
              width={70}
              height={20}
                href={approveUrl}
                style={{ backgroundColor: '#22c55e', padding: '12px 24px', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}
              >
                Accept
              </Button>
              <Button
              width={70}
              height={20}
                href={rejectUrl}
                style={{ backgroundColor: '#ef4444', padding: '12px 24px', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}
              >
                Reject
              </Button>
            </Section>
            <Text style={{ fontSize: '14px', color: '#666', marginTop: '30px' }}>
              Thank you for being part of our medical team.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
  