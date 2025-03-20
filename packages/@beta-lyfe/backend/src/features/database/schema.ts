import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  numeric,
  varchar
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { ulid } from 'ulidx'
import { z } from 'zod'

export const media = z.object({
  platform: z.literal('cloudinary'),
  url: z.string()
})

export type Media = z.infer<typeof media>

export const pharmacyStores = pgTable('pharmacy_stores', {
  id: varchar('id')
    .primaryKey()
    .$default(() => ulid()),
  name: text('name').notNull(),
  description: text('description'),
  ownerId: varchar('owner_id').notNull(),
  phoneNumber: varchar('phone_number').notNull(),
  email: varchar('email').notNull(),
  address: text('address').notNull(),
  city: varchar('city').notNull(),
  state: varchar('state').notNull(),
  country: varchar('country').default('Nigeria'), // Assuming PostgreSQL syntax
  postalCode: varchar('postal_code'),
  openingHours: jsonb('opening_hours'),
  coverImage: jsonb('cover_image').$type<Media>().notNull(),
  rating: numeric('rating').notNull(),
  reviews: integer('reviews').notNull(),
  isActive: boolean('is_active').notNull(),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const pharmacyStoreItems = pgTable('pharmacy_store_items', {
  id: varchar('id')
    .primaryKey()
    .$default(() => ulid()),
  name: text('name').notNull(),
  description: text('description'),
  usage: text('usage'),
  sideEffects: text('side_effects'),
  warnings: text('warnings'),
  images: jsonb('images').$type<Array<Media>>().notNull(),
  pharmacyStoreId: text('pharmacy_store_id')
    .notNull()
    .references(() => pharmacyStores.id),
  quantityInStock: integer('quantity_in_stock').notNull(),
  price: numeric('price').notNull(),
  sellingPrice: numeric('selling_price').notNull(),
  batchNumber: text('batch_number'),
  manufacturer: text('manufacturer'),
  isAvailable: boolean('is_available').notNull(),
  expiryDate: timestamp('expiry_date'),
  requiresPrescription: boolean('requires_prescription').notNull(),
  isFeatured: boolean('is_featured').notNull(),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const pharmacyStoreReview = pgTable('pharmacy_store_review', {
  id: varchar('id')
    .primaryKey()
    .$default(() => ulid()),
  pharmacyStoreId: varchar('pharmacy_store_id')
    .notNull()
    .references(() => pharmacyStores.id),
  userId: varchar('user_id').notNull(),
  rating: numeric('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const pharmacyStoresRelations = relations(
  pharmacyStores,
  ({ many }) => ({
    items: many(pharmacyStoreItems)
  })
)

export const pharmacyStoreItemsRelations = relations(
  pharmacyStoreItems,
  ({ one }) => ({
    store: one(pharmacyStores, {
      fields: [pharmacyStoreItems.pharmacyStoreId],
      references: [pharmacyStores.id]
    })
  })
)

export const pharmacyStoreReviewRelations = relations(
  pharmacyStoreReview,
  ({ one }) => ({
    store: one(pharmacyStores, {
      fields: [pharmacyStoreReview.pharmacyStoreId],
      references: [pharmacyStores.id]
    })
  })
)
