import { db } from '../database'
import { doctorProfiles, type DoctorProfile } from '../database/schema'
import { count, eq } from 'drizzle-orm'
import { Result } from 'true-myth'
import { Pagination } from '../pagination'
import { Logger } from '../logger'

namespace Repository {
  export type Error = 'NOT_FOUND' | 'UNEXPECTED_ERROR'
  const logger = Logger.getSubLogger({ name: 'RepositoryLogger' })

  export type FindManyWithCountOptions = Pagination.Options
  /**
   * Get many doctors
   */
  export const findManyWithCount = async (
    options: FindManyWithCountOptions
  ): Promise<Result<{ items: DoctorProfile[]; count: number }, Error>> => {
    try {
      const page = options?.page ?? Pagination.defaults.page
      const perPage = options?.per_page ?? Pagination.defaults.per_page

      const items = await db
        .select()
        .from(doctorProfiles)
        .offset((page - 1) * perPage)
        .limit(perPage)

      const _count = (
        await db.select({ count: count() }).from(doctorProfiles)
      )[0]

      return Result.ok({ items, count: _count.count })
    } catch (error) {
      logger.warn('Error fetching many doctors with count:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  /**
   * Get all doctors.
   */
  export const findAll = async (): Promise<Result<DoctorProfile[], Error>> => {
    try {
      const doctors = await db.select().from(doctorProfiles)
      return Result.ok(doctors)
    } catch (error) {
      console.error('Error fetching doctors:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  /**
   * Get a doctor by ID.
   */
  export const findById = async (
    id: string
  ): Promise<Result<DoctorProfile | null, Error>> => {
    try {
      const doctor = (
        await db.select().from(doctorProfiles).where(eq(doctorProfiles.id, id))
      )[0]
      if (!doctor) return Result.ok(null)
      return Result.ok(doctor)
    } catch (error) {
      console.error('Error fetching doctor by ID:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  /**
   * Get a doctor by user ID.
   */
  export const findByUserId = async (
    userId: string
  ): Promise<Result<DoctorProfile | null, Error>> => {
    try {
      const doctor =
        (
          await db
            .select()
            .from(doctorProfiles)
            .where(eq(doctorProfiles.user_id, userId))
        )[0] ?? null
      return Result.ok(doctor)
    } catch (error) {
      console.error('Error fetching doctor by ID:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export type CreateProfilePayload = Omit<
    DoctorProfile,
    'id' | 'created_at' | 'updated_at'
  >
  export const createProfile = async (
    payload: CreateProfilePayload
  ): Promise<Result<DoctorProfile, Error>> => {
    try {
      const doctor = (
        await db.insert(doctorProfiles).values(payload).returning()
      )[0]
      return Result.ok(doctor)
    } catch (error) {
      console.error('Error fetching doctor by ID:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export const findByEmail = async (
    email: string
  ): Promise<Result<DoctorProfile | null, Error>> => {
    try {
      const doctor = (
        await db
          .select()
          .from(doctorProfiles)
          .where(eq(doctorProfiles.email, email))
      )[0]
      if (!doctor) return Result.ok(null)
      return Result.ok(doctor)
    } catch (error) {
      console.error('Error fetching doctor by ID:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  /**
   * Update a doctor's profile by ID.
   */
  export const updateById = async (
    id: string,
    updates: Partial<typeof doctorProfiles.$inferSelect>
  ): Promise<Result<DoctorProfile, Error>> => {
    try {
      const [updatedDoctor] = await db
        .update(doctorProfiles)
        .set(updates)
        .where(eq(doctorProfiles.id, id))
        .returning()
      if (!updatedDoctor) return Result.err('NOT_FOUND')
      return Result.ok(updatedDoctor)
    } catch (error) {
      console.error('Error updating doctor profile:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export type UpdateByUserIdPayload = Partial<CreateProfilePayload>

  /**
   * Update a doctor's profile by user ID.
   */
  export const updateByUserId = async (
    userId: string,
    updates: UpdateByUserIdPayload
  ): Promise<Result<DoctorProfile, Error>> => {
    try {
      const [updatedDoctor] = await db
        .update(doctorProfiles)
        .set(updates)
        .where(eq(doctorProfiles.user_id, userId))
        .returning()
      if (!updatedDoctor) return Result.err('NOT_FOUND')
      return Result.ok(updatedDoctor)
    } catch (error) {
      console.error('Error updating doctor profile:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }
}

export default Repository
