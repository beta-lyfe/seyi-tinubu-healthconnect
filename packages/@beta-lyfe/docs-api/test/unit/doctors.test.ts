import { suite, test, expect, assert } from 'vitest'
import { client, ozc } from '../setup'
import { faker } from '@faker-js/faker'
import { format } from 'date-fns'
import type { schema } from '@beta-lyfe/api'
import { fromError } from 'zod-validation-error'

const randomizeName = (name: string) =>
  `${faker.number.float({ min: 0, max: 1000 })}${name}${faker.number.float({ min: 0, max: 1000 })}`

const createDoctor = async () => {
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
    is_doctor: true,
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

suite('Doctors test', async () => {
  const doctorData = await createDoctor()
  const auth = await signIn({
    email: doctorData.email,
    password: doctorData.password
  })
  let doctorProfile: schema.components['schemas']['Api.Doctor.DoctorProfile']

  test('Should return the correct response for [GET] /api/doctors', async () => {
    const res = await client.GET('/api/doctors/')

    expect(res.response.status).to.equal(200)
    expect(res.error).to.be.undefined

    const validationResult = ozc.schemas.Api_Doctor_PaginatedDoctors.safeParse(
      res.data
    )

    expect(validationResult.success).to.equal(
      true,
      fromError(validationResult.error).toString()
    )
  })

  test('Should return the correct response for [GET] /api/doctors/profile', async () => {
    const res = await client.GET('/api/doctors/profile', {
      headers: { Authorization: `Bearer ${auth.data.access_token}` }
    })

    expect(res.response.status).to.equal(200)
    expect(res.error).to.be.undefined

    const validationResult = ozc.schemas.Api_Doctor_DoctorProfile.safeParse(
      res.data
    )

    expect(validationResult.success).to.equal(
      true,
      fromError(validationResult.error).toString()
    )

    assert(res.data)

    doctorProfile = res.data
  })

  test('Should return the correct response for [GET] /api/doctors/profile/{id}', async () => {
    const res = await client.GET('/api/doctors/profile/{id}', {
      params: { path: { id: doctorProfile.id } },
      headers: { Authorization: `Bearer ${auth.data.access_token}` }
    })

    expect(res.response.status).to.equal(200)
    expect(res.error).to.be.undefined

    const validationResult = ozc.schemas.Api_Doctor_DoctorProfile.safeParse(
      res.data
    )

    expect(validationResult.success).to.equal(
      true,
      fromError(validationResult.error).toString()
    )
  })

  test('Should return the correct response for [PATCH] /api/doctors/profile', async () => {
    const newPhoneNumber = faker.phone.number({ style: 'international' })
    const res = await client.PATCH('/api/doctors/profile', {
      headers: { Authorization: `Bearer ${auth.data.access_token}` },
      body: {
        phone_number: newPhoneNumber
      }
    })

    expect(res.response.status).to.equal(200)
    expect(res.error).to.be.undefined

    const validationResult =
      ozc.schemas.Api_Doctor_DoctorProfileUpdatedResponse.safeParse(res.data)

    expect(validationResult.success).to.equal(
      true,
      fromError(validationResult.error).toString()
    )
  })
})
