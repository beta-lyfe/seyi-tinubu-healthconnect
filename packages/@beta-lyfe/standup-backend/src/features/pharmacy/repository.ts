import { count, eq, lte, gte, sql, arrayContains } from 'drizzle-orm'
import { db } from '../database'
import { schema } from '../database'
import { Pagination } from '../pagination'
import type { FiltersSchema } from './routes/list-item/schema'
import { Result } from 'true-myth'
import { Logger } from './logger'

namespace Repository {
  type Error = 'UNEXPECTED_ERROR'
  const logger = Logger.getSubLogger({ name: 'RepositoryLogger' })

  export const findById = async (id: string) =>
    (
      await db
        .select()
        .from(schema.pharmacyStores)
        .where(eq(schema.pharmacyStores, id))
    )[0]

  export const findItemById = async (id: string) =>
    (
      await db
        .select()
        .from(schema.pharmacyStoreItems)
        .where(eq(schema.pharmacyStoreItems, id))
    )[0]

  export type FindManyPharmaciesWithCount = Pagination.Options

  export const findManyPharmaciesWithCount = async (
    options?: FindManyPharmaciesWithCount
  ) => {
    const page = options?.page ?? Pagination.defaults.page
    const perPage = options?.per_page ?? Pagination.defaults.per_page

    const items = await db
      .select()
      .from(schema.pharmacyStores)
      .offset((page - 1) * perPage)
      .limit(perPage)

    const _count = (
      await db.select({ count: count() }).from(schema.pharmacyStores)
    )[0]

    return {
      count: _count.count,
      items
    }
  }

  export type FindManyPharmacyItemsWithCount = Pagination.Options &
    FiltersSchema

  export const findManyPharmacyItemsWithCount = async (
    options?: FindManyPharmacyItemsWithCount
  ): Promise<
    Result<{ count: number; items: schema.PharmacyStoreItem[] }, Error>
  > => {
    try {
      const page = options?.page ?? Pagination.defaults.page
      const perPage = options?.per_page ?? Pagination.defaults.per_page

      let chain: any = db.select().from(schema.pharmacyStores)

      if (options?.medication_type)
        chain = chain.where(
          eq(schema.pharmacyStoreItems.type, options.medication_type)
        )
      if (options?.price_range) {
        if (options.price_range.min)
          chain = chain.where(
            gte(
              schema.pharmacyStoreItems.selling_price,
              options.price_range.min.toString()
            )
          )

        if (options.price_range.max)
          chain = chain.where(
            lte(
              schema.pharmacyStoreItems.selling_price,
              options.price_range.max.toString()
            )
          )
      }

      if (options?.is_available !== undefined)
        chain = chain.where(
          eq(schema.pharmacyStoreItems.is_available, options.is_available)
        )

      if (options?.categories) {
        chain = chain.where(
          arrayContains(
            schema.pharmacyStoreItems.categories,
            options.categories
          )
        )
      }

      if (options?.brands)
        chain = chain.where(schema.pharmacyStoreItems.brands, options.brands)

      const items = await chain.offset((page - 1) * perPage).limit(perPage)

      const _count = (
        await db.select({ count: count() }).from(schema.pharmacyStores)
      )[0]

      return Result.ok({
        count: _count.count,
        items
      })
    } catch (err) {
      logger.error(
        'Error occurred while trying to find many pharmacy items with count, options',
        options
      )
      return Result.err('UNEXPECTED_ERROR')
    }
  }

  export type CreatePayload = typeof schema.pharmacyStores.$inferInsert

  export const createStore = async (payload: CreatePayload) => {
    const pharmacy = (
      await db.insert(schema.pharmacyStores).values(payload).returning()
    )[0]
    return pharmacy
  }

  export type CreateItemPayload = typeof schema.pharmacyStoreItems.$inferInsert

  export const createItem = async (payload: CreateItemPayload) => {
    const pharmacy = (
      await db.insert(schema.pharmacyStoreItems).values(payload).returning()
    )[0]
    return pharmacy
  }

  export type UpdateByIdPayload = Partial<
    typeof schema.pharmacyStores.$inferInsert
  >

  export const updateById = async (id: string, payload: UpdateByIdPayload) => {
    await db
      .update(schema.pharmacyStores)
      .set(payload)
      .where(eq(schema.pharmacyStores.id, id))
  }

  export type UpdateItemByIdPayload = Partial<
    typeof schema.pharmacyStoreItems.$inferInsert
  >

  export const updateItemById = async (
    id: string,
    payload: UpdateItemByIdPayload
  ) => {
    await db
      .update(schema.pharmacyStoreItems)
      .set(payload)
      .where(eq(schema.pharmacyStoreItems.id, id))
  }

  export const deleteById = async (id: string) => {
    await db
      .delete(schema.pharmacyStores)
      .where(eq(schema.pharmacyStores.id, id))
  }

  export const deleteItemById = async (id: string) => {
    await db
      .delete(schema.pharmacyStoreItems)
      .where(eq(schema.pharmacyStoreItems.id, id))
  }
}

export default Repository
