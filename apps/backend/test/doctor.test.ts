import { createClient } from '@beta-lyfe/api'

const backendUrl = 'http/localhost:3002'
const client = createClient(backendUrl)

function createDoctorProfile() {
  const formData = new FormData()
  client.POST('/api/doctors', {
    body: {
      other_names: 'obi wan kenobi',
      date_of_birth: '2/12/1990',
      profile_picture: {
        public_id: '123k23kfks lmdp23pd,q',
        url: 'http://localhost/test/img.png'
      },
      specialization: 'dentist',
      patients_treated: 0,
      years_of_experience: 0,
      number_of_reviews: 0,
      rating: '0.0',
      description: '',
      home_consultation_charge: '20',
      video_consultation_charge: '20',
      clinic_consultation_charge: '20',
      certifications: null,
      experiences: null,
      working_hours: null,
      location: null
    }
  })
}

createDoctorProfile()
