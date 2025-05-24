import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Text,
    Heading,
    Section,
  } from 'jsx-email';
import { config } from '../../config';
  
  export default function ConsultationRejectedEmail({ patientName, doctorName }:{
    patientName:string,doctorName:string
  }) {
    return (
      <Html>
        <Head />
        <Preview>Your consultation request was declined</Preview>
        <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f9fc', padding: '20px' }}>
          <Container style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Heading style={{ fontSize: '20px', marginBottom: '20px', color: '#ef4444' }}>
              Hello {patientName},
            </Heading>
            <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
              We regret to inform you that Dr. {doctorName} has declined your recent consultation request.
            </Text>
            <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
              This might be due to scheduling conflicts or other constraints. We encourage you to explore other available doctors on our platform.
            </Text>
            <Section style={{ marginTop: '20px' }}>
              <Text style={{ fontSize: '16px', color: '#333' }}>
                You can <a href={`${config.frontend.webappUrl}/doctors`} style={{ color: '#3b82f6', textDecoration: 'underline' }}>browse other doctors</a> or try rescheduling at a different time.
              </Text>
            </Section>
            <Text style={{ fontSize: '14px', color: '#666', marginTop: '30px' }}>
              We're here to support your health journey. Thank you for using our service.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
  