import { count, eq } from 'drizzle-orm'
import { db } from '../database'
import { schema } from '../database'
import { Pagination } from '../pagination'

namespace Repository {
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

  export const findManyPharmaciesWithCount = async (
    options?: Pagination.Options
  ) => {
    const page = options?.page ?? Pagination.defaults.page
    const perPage = options?.perPage ?? Pagination.defaults.perPage

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

  export type CreatePayload = typeof schema.pharmacyStores.$inferInsert

  export const create = async (payload: CreatePayload) => {
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
