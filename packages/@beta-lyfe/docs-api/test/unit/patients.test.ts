import { suite, test, expect, assert } from 'vitest'
import { client, ozc } from '../setup'
import { faker } from '@faker-js/faker'
import { format } from 'date-fns'
import type { schema } from '@beta-lyfe/api'
import { fromError } from 'zod-validation-error'

const randomizeName = (name: string) =>
  `${faker.number.float({ min: 0, max: 1000 })}${name}${faker.number.float({ min: 0, max: 1000 })}`

const createPatient = async () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const data = {
    email: faker.internet.email({
      firstName: randomizeName(firstName),
      lastName: randomizeName(lastName)
    }),
    first_name: firstName,
    last_name: lastName,
    password: faker.internet.password(),
    date_of_birth: format(faker.date.past(), 'yyyy-MM-dd'),
    phone_number: faker.phone.number()
  }
  const payload = {
    email: data.email,
    password: data.password,
    password2: data.password,
    date_of_birth: data.date_of_birth,
    is_doctor: false,
    last_name: data.last_name,
    first_name: data.first_name,
    phone_number: data.phone_number
  }

  await client
    .POST('/api/dev/user', {
      body: payload
    })
    .then((res) => {
      if (res.error) throw new Error(JSON.stringify(res.error))
    })
  return data
}

const signIn = async (payload: { email: string; password: string }) => {
  const res = await client.POST('/api/auth/sign-in', {
    body: payload
  })
  if (res.error) throw new Error(res.error.toString())
  return res.data
}

suite('Patients test', async () => {
  const doctorData = await createPatient()
  const auth = await signIn({
    email: doctorData.email,
    password: doctorData.password
  })
  let patientProfile: schema.components['schemas']['Api.Patient.PatientProfile']

  test('Should return the correct response for [GET] /api/patients/', async () => {
    const res = await client.GET('/api/patients/')

    expect(res.response.status).to.equal(200)
    expect(res.error).to.be.undefined

    const validationResult =
      ozc.schemas.Api_Patient_PaginatedPatients.safeParse(res.data)

    expect(validationResult.success).to.equal(
      true,
      fromError(validationResult.error).toString()
    )
  })

  test('Should return the correct response for [GET] /api/patients/profile/', async () => {
    const res = await client.GET('/api/patients/profile/', {
      headers: { Authorization: `Bearer ${auth.data.access_token}` }
    })

    expect(res.response.status).to.equal(200)
    expect(res.error).to.be.undefined

    const validationResult = ozc.schemas.Api_Patient_PatientProfile.safeParse(
      res.data
    )

    expect(validationResult.success).to.equal(
      true,
      fromError(validationResult.error).toString()
    )

    assert(res.data)

    patientProfile = res.data
  })

  test('Should return the correct response for [GET] /api/patients/{id}', async () => {
    const res = await client.GET('/api/patients/{id}', {
      params: { path: { id: patientProfile.id } },
      headers: { Authorization: `Bearer ${auth.data.access_token}` }
    })

    expect(res.response.status).to.equal(200)
    expect(res.error).to.be.undefined

    const validationResult = ozc.schemas.Api_Patient_PatientProfile.safeParse(
      res.data
    )

    expect(validationResult.success).to.equal(
      true,
      fromError(validationResult.error).toString()
    )
  })

  test('Should return the correct response for [PATCH] /api/patients/profile', async () => {
    const newPhoneNumber = faker.phone.number({ style: 'international' })
    const res = await client.PATCH('/api/patients/profile/', {
      headers: { Authorization: `Bearer ${auth.data.access_token}` },
      body: {
        phone_number: newPhoneNumber
      }
    })

    expect(res.response.status).to.equal(200)
    expect(res.error).to.be.undefined

    const validationResult =
      ozc.schemas.Api_Patient_PatientProfileUpdatedResponse.safeParse(res.data)

    expect(validationResult.success).to.equal(
      true,
      fromError(validationResult.error).toString()
    )
  })
})
