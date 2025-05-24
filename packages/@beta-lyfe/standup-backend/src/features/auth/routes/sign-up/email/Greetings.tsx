import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from 'jsx-email'
import type { User } from '../../../../database/schema'

export default function GreetingEmail({user}:{user:User}){
    return (
<Html>
  <Head />
  <Preview>Welcome to BetaLyfe!</Preview>
  <Body style={main}>
    <Container style={container}>
      <Img src={logoUrl} width="40" height="33" alt="BetaLyfe" />

      <Section>
        <Text style={text}>Hi {user.first_name},</Text>

        <Text style={text}>
          Welcome to <strong>BetaLyfe</strong> — we’re so glad to have you with us!
        </Text>

        <Text style={text}>
          With BetaLyfe, you now have access to:
        </Text>

        <ul style={{ paddingLeft: 20 }}>
          <li style={text}>✔️ Video consultations with verified doctors</li>
          <li style={text}>✔️ Order prescriptions from trusted pharmacies</li>
          <li style={text}>✔️ Book lab tests and view results online</li>
          <li style={text}>✔️ Track your wallet and medical activity</li>
        </ul>

        <Text style={text}>
          If you have any questions, we’re always here to help.
        </Text>

        <Text style={text}>To your health,</Text>
        <Text style={text}><strong>The BetaLyfe Team</strong></Text>

        <Text style={{ ...text, fontSize: 12, color: '#888', marginTop: 30 }}>
          This message was sent to {user.email}. If you did not sign up for BetaLyfe, you can safely ignore this email.
        </Text>
      </Section>
    </Container>
  </Body>
</Html>
    )}





const logoUrl = 'https://betalyfe.com.ng/images/betalyfe-icon.svg'

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0'
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px'
}

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px'
}

const anchor = {
  textDecoration: 'underline'
}
