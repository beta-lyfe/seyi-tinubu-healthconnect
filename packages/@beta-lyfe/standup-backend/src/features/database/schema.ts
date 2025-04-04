import {
  pgTableCreator,
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
import { config } from '../config'

export const media = z.object({
  public_id: z.string(),
  url: z.string()
})

export type Media = z.infer<typeof media>

export const certification = z.object({
  name: z.string(),
  institution: z.string(),
  date: z.string()
})

export type Certification = z.infer<typeof certification>

export const experience = z.object({
  title: z.string(),
  institution: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable()
})

export type Experience = z.infer<typeof experience>

export const workingHour = z.object({
  day: z.enum([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ]),
  start_time: z.string(),
  end_time: z.string()
})

export type WorkingHour = z.infer<typeof workingHour>

export const location = z.object({
  landmark: z.string(),
  street: z.string(),
  coordinates: z.string().nullable(),
  city: z.string(),
  state: z.string()
})

export type Location = z.infer<typeof location>

export const authenticationMethodMeta = z.discriminatedUnion('provider', [
  z.object({
    provider: z.literal('credentials'),
    data: z.string()
  })
])

export type AuthenticationMethodMeta = z.infer<typeof authenticationMethodMeta>

const pgTable = pgTableCreator((name) => `${config.db.prefix}${name}`)

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

export type PharmacyStore = typeof pharmacyStores.$inferSelect

export const pharmacyStoreItems = pgTable('pharmacy_store_items', {
  id: varchar('id')
    .primaryKey()
    .$default(() => ulid()),
  name: text('name').notNull(),
  description: text('description'),
  usage: text('usage'),
  sideEffects: text('side_effects'),
  warnings: text('warnings'),
  images: jsonb('images').$type<Media[]>().notNull(),
  pharmacyStoreId: text('pharmacy_store_id')
    .notNull()
    .references(() => pharmacyStores.id),
  type: varchar('type').notNull().$type<'otc' | 'prescription'>(),
  quantityInStock: integer('quantity_in_stock').notNull(),
  categories: jsonb('categories').notNull().$type<string[]>(),
  brands: jsonb('brands').notNull().$type<string[]>(),
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

export type PharmacyStoreItem = typeof pharmacyStoreItems.$inferSelect

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

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .notNull()
    .$default(() => ulid()),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  email: varchar('email').notNull(),
  phoneNumber: numeric('phone_number').notNull(),
  role: varchar('role').notNull().$type<'patient' | 'doctor'>(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export type User = typeof users.$inferSelect

export const patientProfiles = pgTable('patient_profiles', {
  id: varchar('id')
    .primaryKey()
    .notNull()
    .$default(() => ulid()),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  otherNames: varchar('other_names'),
  email: varchar('email').notNull(),
  phoneNumber: numeric('phone_number').notNull(),
  dateOfBirth: numeric('date_of_birth').notNull(),
  profilePicture: jsonb('profile_picture').notNull().$type<Media>(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export type PatientProfile = typeof patientProfiles.$inferSelect

export const doctorProfiles = pgTable('doctor_profiles', {
  id: varchar('id')
    .primaryKey()
    .notNull()
    .$default(() => ulid()),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  otherNames: varchar('other_names'),
  email: varchar('email').notNull(),
  phoneNumber: numeric('phone_number').notNull(),
  dateOfBirth: numeric('date_of_birth').notNull(),
  profilePicture: jsonb('profile_picture').notNull().$type<Media>(),
  specialization: varchar('specialization'),
  patientsTreated: numeric('patients_treated').notNull(),
  yearsOfExperience: numeric('years_of_experience').notNull(),
  numberOfReviews: numeric('number_of_reviews').notNull(),
  rating: numeric('rating').notNull(),
  description: text('description').notNull(),
  home_consultation_charge: numeric('home_consultation_charge').notNull(),
  video_consultation_charge: numeric('video_consultation_charge').notNull(),
  clinic_consultation_charge: numeric('clinic_consultation_charge').notNull(),
  certifications: jsonb('certifications').$type<Certification[]>(),
  experiences: jsonb('experiences').$type<Experience[]>(),
  working_hours: jsonb('working_hours').$type<WorkingHour[]>(),
  location: jsonb('location').$type<Location>(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export type DoctorProfile = typeof doctorProfiles.$inferSelect

export const authenticationMethods = pgTable('authentication_methods', {
  id: varchar('id')
    .primaryKey()
    .notNull()
    .$default(() => ulid()),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id),
  meta: jsonb('meta').notNull().$type<AuthenticationMethodMeta>(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export type AuthenticationMethod = typeof authenticationMethods.$inferSelect

export const tokens = pgTable('tokens', {
  id: varchar('id')
    .primaryKey()
    .notNull()
    .$default(() => ulid()),
  token: varchar('token').notNull(),
  purpose: varchar('purpose')
    .notNull()
    .$type<'verification' | 'password_reset'>(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  userId: varchar('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export type Token = typeof tokens.$inferSelect
