import { db } from '../database'
import {
  patientProfiles,
  type DoctorProfile,
  type PatientProfile
} from '../database/schema'
import { count, eq } from 'drizzle-orm'
import { Result } from 'true-myth'
import { Logger } from '../logger'
import { Pagination } from '../pagination'

namespace Repository {
  export type Error = 'NOT_FOUND' | 'UNEXPECTED_ERROR'
  const logger = Logger.getSubLogger({ name: 'RepositoryLogger' })

  /**
   * Get all patients.
   */
  export const findAll = async (): Promise<Result<PatientProfile[], Error>> => {
    try {
      const patients = await db.select().from(patientProfiles)
      return Result.ok(patients)
    } catch (error) {
      console.error('Error fetching patients:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export type CreateProfilePayload = Omit<
    PatientProfile,
    'id' | 'created_at' | 'updated_at'
  >
  export const createProfile = async (
    payload: CreateProfilePayload
  ): Promise<Result<PatientProfile, Error>> => {
    try {
      const patient = (
        await db.insert(patientProfiles).values(payload).returning()
      )[0]
      return Result.ok(patient)
    } catch (error) {
      console.error('Error creating patient profile:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }


  export const saveProfileImage = async (
    payload: PatientProfile['profile_picture']
  ): Promise<Result<PatientProfile['profile_picture'], Error>> => {
    try {
      const profile_image = await db.update(patientProfiles).set({'profile_picture':payload})
      return Result.ok(payload)
    } catch (error) {
      console.error('Error creating patient profile:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  /**
   * Get a patient by ID.
   */
  export const findById = async (
    id: string
  ): Promise<Result<PatientProfile | null, Error>> => {
    try {
      const patient = (
        await db
          .select()
          .from(patientProfiles)
          .where(eq(patientProfiles.id, id))
      )[0]
      if (!patient) return Result.ok(null)
      return Result.ok(patient)
    } catch (error) {
      console.error('Error fetching patient by ID:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  /**
   * Get a patient by user ID.
   */
  export const findByUserId = async (
    userId: string
  ): Promise<Result<PatientProfile | null, Error>> => {
    try {
      const patient =
        (
          await db
            .select()
            .from(patientProfiles)
            .where(eq(patientProfiles.user_id, userId))
        )[0] ?? null
      return Result.ok(patient)
    } catch (error) {
      console.error('Error fetching patient by ID:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export const findByEmail = async (
    email: string
  ): Promise<Result<PatientProfile | null, Error>> => {
    try {
      const patient = (
        await db
          .select()
          .from(patientProfiles)
          .where(eq(patientProfiles.email, email))
      )[0]
      if (!patient) return Result.ok(null)
      return Result.ok(patient)
    } catch (error) {
      console.error('Error fetching patient by ID:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export type FindManyWithCountOptions = Pagination.Options

  /**
   * Get many patients
   */
  export const findManyWithCount = async (
    options: FindManyWithCountOptions
  ): Promise<Result<{ items: PatientProfile[]; count: number }, Error>> => {
    try {
      const page = options?.page ?? Pagination.defaults.page
      const perPage = options?.per_page ?? Pagination.defaults.per_page

      const items = await db
        .select()
        .from(patientProfiles)
        .offset((page - 1) * perPage)
        .limit(perPage)

      const _count = (
        await db.select({ count: count() }).from(patientProfiles)
      )[0]

      return Result.ok({ items, count: _count.count })
    } catch (error) {
      logger.warn('Error fetching many patients with count:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export type UpdateByIdPayload = Partial<typeof patientProfiles.$inferSelect>

  /**
   * Update a patient's profile by ID.
   */
  export const updateById = async (
    id: string,
    updates: UpdateByIdPayload
  ): Promise<Result<PatientProfile, Error>> => {
    try {
      const [updatedPatient] = await db
        .update(patientProfiles)
        .set(updates)
        .where(eq(patientProfiles.id, id))
        .returning()
      if (!updatedPatient) return Result.err('NOT_FOUND')
      return Result.ok(updatedPatient)
    } catch (error) {
      console.error('Error updating patient profile:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export type UpdateByUserIdPayload = Partial<
    typeof patientProfiles.$inferSelect
  >
  /**
   * Update a patient's profile by ID.
   */
  export const updateByUserId = async (
    userId: string,
    updates: UpdateByUserIdPayload
  ): Promise<Result<PatientProfile, Error>> => {
    try {
      const [updatedPatient] = await db
        .update(patientProfiles)
        .set(updates)
        .where(eq(patientProfiles.user_id, userId))
        .returning()
      if (!updatedPatient) return Result.err('NOT_FOUND')
      return Result.ok(updatedPatient)
    } catch (error) {
      logger.warn('Error updating patient profile:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }
}

export default Repository
