import { IykeFormType } from '@beta-lyfe/webapp/components/IykeForm'

export const basicInformationFields: IykeFormType[] = [
  {
    labelName: 'Full Name',
    inputType: 'text',
    name: 'fullName',
    value: 'Dr. John Smith',
    id: 'fullName',
    placeholder: 'Full name'
  },
  {
    labelName: 'Username',
    inputType: 'text',
    name: 'username',
    value: 'drjohnsmith',
    id: 'username',
    placeholder: 'Username'
  },
  {
    labelName: 'Email',
    inputType: 'email',
    name: 'email',
    value: 'drjohnsmith@example.com',
    id: 'email',
    placeholder: 'Email'
  },
  {
    labelName: 'Phone',
    inputType: 'tel',
    name: 'phone',
    value: '(123) 456-7890',
    id: 'phone',
    placeholder: 'Phone number'
  },
  {
    labelName: 'Gender',
    inputType: 'text',
    name: 'gender',
    value: 'Male',
    id: 'gender',
    placeholder: 'Gender'
  },
  {
    labelName: 'Date of Birth',
    inputType: 'text',
    name: 'dob',
    value: 'February 15, 1975',
    id: 'dob',
    placeholder: 'Date of birth'
  },
  {
    labelName: 'Address',
    inputType: 'text',
    name: 'address',
    value: '456 Medical St, Springfield, USA',
    id: 'address',
    placeholder: 'Address'
  }
]

export const professionalInformationFields: IykeFormType[] = [
  {
    labelName: 'Specialization',
    inputType: 'text',
    name: 'specialization',
    value: 'Cardiology',
    id: 'specialization',
    placeholder: 'Specialization'
  },
  {
    labelName: 'Medical License Number',
    inputType: 'text',
    name: 'licenseNumber',
    value: 'MD123456',
    id: 'licenseNumber',
    placeholder: 'Medical license number'
  },
  {
    labelName: 'Years of Experience',
    inputType: 'text',
    name: 'experience',
    value: '20 years',
    id: 'experience',
    placeholder: 'Years of experience'
  },
  {
    labelName: 'Clinic/Hospital Affiliation',
    inputType: 'text',
    name: 'affiliation',
    value: 'Springfield General Hospital',
    id: 'affiliation',
    placeholder: 'Clinic or hospital affiliation'
  },
  {
    labelName: 'Education',
    inputType: 'text',
    name: 'education',
    value: 'Harvard Medical School',
    id: 'education',
    placeholder: 'Educational background',
    textArea: true
  },
  {
    labelName: 'Professional Biography',
    inputType: 'text',
    name: 'bio',
    value:
      'Dr. John Smith is a renowned cardiologist with over 20 years of experience in treating heart-related conditions...',
    id: 'bio',
    placeholder: 'Professional biography',
    textArea: true
  }
]

export const contactInformationFields: IykeFormType[] = [
  {
    labelName: 'Office Phone',
    inputType: 'tel',
    name: 'officePhone',
    value: '(123) 456-7890',
    id: 'officePhone',
    placeholder: 'Office phone number'
  },
  {
    labelName: 'Office Email',
    inputType: 'email',
    name: 'officeEmail',
    value: 'contact@drjohnsmithclinic.com',
    id: 'officeEmail',
    placeholder: 'Office email'
  },
  {
    labelName: 'Office Address',
    inputType: 'text',
    name: 'officeAddress',
    value: '456 Medical St, Springfield, USA',
    id: 'officeAddress',
    placeholder: 'Office address'
  }
]

export const availabilityFields: IykeFormType[] = [
  {
    labelName: 'Office Hours',
    inputType: 'text',
    name: 'officeHours',
    value: 'Mon-Fri: 9 AM - 5 PM',
    id: 'officeHours',
    placeholder: 'Office hours'
  },
  {
    labelName: 'Emergency Availability',
    inputType: 'text',
    name: 'emergencyAvailability',
    value: 'On-call 24/7',
    id: 'emergencyAvailability',
    placeholder: 'Emergency availability'
  }
]

export const additionalInformationFields: IykeFormType[] = [
  {
    labelName: 'Languages Spoken',
    inputType: 'text',
    name: 'languages',
    value: 'English, Spanish',
    id: 'languages',
    placeholder: 'Languages spoken'
  },
  {
    labelName: 'Professional Associations',
    inputType: 'text',
    name: 'associations',
    value: 'American Medical Association, American College of Cardiology',
    id: 'associations',
    placeholder: 'Professional associations',
    textArea: true
  },
  {
    labelName: 'Research and Publications',
    inputType: 'text',
    name: 'publications',
    value: 'Published multiple research papers on cardiology...',
    id: 'publications',
    placeholder: 'Research and publications',
    textArea: true
  }
]
