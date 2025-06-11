import { db } from '../database'
import { eq, or, count, and } from 'drizzle-orm'
import {
  users,
  authenticationMethods,
  consultations,
  type AuthenticationMethod,
  type User,
  type Consultation,
  consultationRequests,
  type ConsultationRequest
} from '../database/schema'
import { Result } from 'true-myth'
import { Pagination } from '../pagination'
import { ulid } from 'ulidx'

namespace ConsultationRepository {
  export type Error = 'UNEXPECTED_ERROR' | 'NOT_FOUND'
  export type RepositoryError = 'UNEXPECTED_ERROR'
  export type FindManyConsultationsWithCount = Pagination.Options

  /**
   * Find a consultation by its ID.
   * @param consultationId - The ID of the consultation.
   * @returns A Result containing the consultation or null if not found.
   */
  export const findById = async (
    consultationId: string
  ): Promise<Result<Consultation | null, Error>> => {
    try {
      const consultation = (
        await db
          .select()
          .from(consultations)
          .where(eq(consultations.id, consultationId))
      )[0]
      if (!consultation) return Result.ok(null)
      return Result.ok(consultation)
    } catch (error) {
      console.error('Error finding consultation by ID:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  /**
   * Create a new consultation.
   * @param payload - The consultation data to insert.
   * @returns A Result indicating success or failure.
   */
  export const createConsultationRequest = async (
    payload: Omit<
      typeof consultationRequests.$inferSelect,
      'id' | 'created_at' | 'updated_at'
    >
  ): Promise<Result<ConsultationRequest, Error>> => {
    try {
      const [requests] = await db
        .insert(consultationRequests)
        .values(payload)
        .returning()
      return Result.ok(requests)
    } catch (error) {
      console.error('Error creating consultation:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export const createConsultation = async (
    payload: Omit<
      Consultation,
      'id' | 'room_name' | 'created_at' | 'updated_at'
    >
  ): Promise<Result<Consultation, Error>> => {
    try {
      const id = ulid()
      const [consultation] = await db
        .insert(consultations)
        .values({ ...payload, room_name: id, id })
        .returning()
      return Result.ok(consultation)
    } catch (error) {
      console.error('Error creating consultation:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  type UpdateConsultationPayload = Partial<Omit<Consultation, 'id' | ''>>

  /**
   * Update a consultation by its ID.
   * @param consultationId - The ID of the consultation to update.
   * @param updates - The fields to update.
   * @returns A Result indicating success or failure.
   */
  export const updateConsultation = async (
    consultationId: string,
    updates: UpdateConsultationPayload
  ): Promise<Result<Consultation, Error>> => {
    try {
      const [updatedConsultation] = await db
        .update(consultations)
        .set(updates)
        .where(eq(consultations.id, consultationId))
        .returning()
      if (!updatedConsultation) return Result.err('NOT_FOUND')
      return Result.ok(updatedConsultation)
    } catch (error) {
      console.error('Error updating consultation:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  /**
   * Delete a consultation by its ID.
   * @param consultationId - The ID of the consultation to delete.
   * @returns A Result indicating success or failure.
   */
  export const deleteConsultation = async (
    consultationId: string
  ): Promise<Result<null, Error>> => {
    try {
      const deletedCount = await db
        .delete(consultations)
        .where(eq(consultations.id, consultationId))
      if (typeof deletedCount === 'number' && deletedCount === 0)
        return Result.err('NOT_FOUND')
      return Result.ok(null)
    } catch (error) {
      console.error('Error deleting consultation:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  /**
   * Get all consultations for a user.
   * @param userId - The ID of the user.
   * @returns A Result containing the list of consultations or an error.
   */
  export const getAllConsultations = async (
    userId: string
  ): Promise<Result<Consultation[], Error>> => {
    try {
      const consultationsList = await db
        .select()
        .from(consultations)
        .where(
          or(
            eq(consultations.doctor_id, userId),
            eq(consultations.patient_id, userId)
          )
        )

      return Result.ok(consultationsList)
    } catch (error) {
      console.error('Error fetching consultations:', error)
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  /**
   * Get consultations with pagination for a specific user.
   * @param userId - The ID of the user (doctor or patient).
   * @param options - Pagination options.
   * @returns An object containing the consultations and total count.
   */
  export const findManyConsultationsWithCount = async (
    userId: string,
    options?: FindManyConsultationsWithCount
  ) => {
    const page = options?.page ?? Pagination.defaults.page
    const perPage = options?.per_page ?? Pagination.defaults.per_page

    try {
      // Fetch consultations with pagination
      const items = await db
        .select()
        .from(consultations)
        .where(
          or(
            eq(consultations.doctor_id, userId),
            eq(consultations.patient_id, userId)
          )
        )
        .offset((page - 1) * perPage)
        .limit(perPage)

      // Count total consultations for the user
      const _count = (
        await db
          .select({ count: count() })
          .from(consultations)
          .where(
            or(
              eq(consultations.doctor_id, userId),
              eq(consultations.patient_id, userId)
            )
          )
      )[0]

      return {
        count: _count.count,
        items
      }
    } catch (error) {
      console.error('Error fetching consultations with pagination:', error)
      throw new Error('UNEXPECTED_ERROR')
    }
  }

  export const findManyConsultationsRequestWithCount = async (
    userId: string,
    options?: FindManyConsultationsWithCount
  ) => {
    const page = options?.page ?? Pagination.defaults.page
    const perPage = options?.per_page ?? Pagination.defaults.per_page

    try {
      const items = await db
        .select()
        .from(consultationRequests)
        .where(
          or(
            eq(consultationRequests.doctor_id, userId),
            eq(consultationRequests.patient_id, userId)
          )
        )
        .offset((page - 1) * perPage)
        .limit(perPage)

      // Count total consultations for the user
      const _count = (
        await db
          .select({ count: count() })
          .from(consultationRequests)
          .where(
            or(
              eq(consultationRequests.doctor_id, userId),
              eq(consultationRequests.patient_id, userId)
            )
          )
      )[0]

      return {
        count: _count.count,
        items
      }
    } catch (error) {
      console.error('Error fetching consultations with pagination:', error)
      throw new Error('UNEXPECTED_ERROR')
    }
  }

  export const findOneConsultationRequestWithCount = async (
    userId: string,
    consultationRequestId: string
  ) => {
    try {
      const items = await db
        .select()
        .from(consultationRequests)
        .where(
          and(
            eq(consultationRequests.id, consultationRequestId),
            or(
              eq(consultationRequests.doctor_id, userId),
              eq(consultationRequests.patient_id, userId)
            )
          )
        )
        .limit(1)

      return items[0]
    } catch (error) {
      console.error('Error fetching consultation:', error)
      throw new Error('UNEXPECTED_ERROR')
    }
  }

  export const UpdateStatusConsultationRequest = async (
    userId: string,
    consultationRequestId: string,
    status: ConsultationRequest['status']
  ): Promise<Result<ConsultationRequest, Error>> => {
    try {
      const items = await db
        .update(consultationRequests)
        .set({ status: status })
        .where(
          and(
            eq(consultationRequests.id, consultationRequestId),
            eq(consultationRequests.doctor_id, userId)
          )
        )
        .returning()

      return Result.ok(items[0])
    } catch (error) {
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export const UpdateRejectStatusConsultationRequest = async (
    userId: string,
    consultationRequestId: string
  ) => {
    try {
      const items = await db
        .update(consultationRequests)
        .set({ status: 'rejected' })
        .where(eq(consultationRequests.id, consultationRequestId))
        .returning()

      return items[0]
    } catch (error) {
      console.error('Error updating consultation:', error)
      throw new Error('UNEXPECTED_ERROR')
    }
  }
}

export default ConsultationRepository
