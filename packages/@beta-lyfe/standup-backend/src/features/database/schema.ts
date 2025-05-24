import {
  pgTableCreator,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  numeric,
  varchar,
  date,
  unique
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
  owner_id: varchar('owner_id').notNull(),
  phone_umber: varchar('phone_number').notNull(),
  email: varchar('email').notNull(),
  address: text('address').notNull(),
  city: varchar('city').notNull(),
  state: varchar('state').notNull(),
  country: varchar('country').default('Nigeria'), // Assuming PostgreSQL syntax
  postal_code: varchar('postal_code'),
  opening_hours: jsonb('opening_hours'),
  cover_image: jsonb('cover_image').$type<Media>().notNull(),
  rating: numeric('rating').notNull(),
  reviews: integer('reviews').notNull(),
  is_active: boolean('is_active').notNull(),
  is_deleted: boolean('is_deleted').notNull().default(false),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
})

export type PharmacyStore = typeof pharmacyStores.$inferSelect

export const pharmacyStoreItems = pgTable('pharmacy_store_items', {
  id: varchar('id')
    .primaryKey()
    .$default(() => ulid()),
  name: text('name').notNull(),
  description: text('description'),
  usage: text('usage'),
  side_effects: text('side_effects'),
  warnings: text('warnings'),
  images: jsonb('images').$type<Media[]>().notNull(),
  pharmacy_store_id: text('pharmacy_store_id')
    .notNull()
    .references(() => pharmacyStores.id),
  type: varchar('type').notNull().$type<'otc' | 'prescription'>(),
  quantity_in_stock: integer('quantity_in_stock').notNull(),
  categories: jsonb('categories').notNull().$type<string[]>(),
  brands: jsonb('brands').notNull().$type<string[]>(),
  price: numeric('price').notNull(),
  selling_price: numeric('selling_price').notNull(),
  batch_number: text('batch_number'),
  manufacturer: text('manufacturer'),
  is_available: boolean('is_available').notNull(),
  expiry_date: timestamp('expiry_date'),
  requires_prescription: boolean('requires_prescription').notNull(),
  is_featured: boolean('is_featured').notNull(),
  is_deleted: boolean('is_deleted').notNull().default(false),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
})

export type PharmacyStoreItem = typeof pharmacyStoreItems.$inferSelect

export const pharmacyStoreReview = pgTable('pharmacy_store_review', {
  id: varchar('id')
    .primaryKey()
    .$default(() => ulid()),
  pharmacy_store_id: varchar('pharmacy_store_id')
    .notNull()
    .references(() => pharmacyStores.id),
  user_id: varchar('user_id').notNull(),
  rating: numeric('rating').notNull(),
  comment: text('comment'),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
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
      fields: [pharmacyStoreItems.pharmacy_store_id],
      references: [pharmacyStores.id]
    })
  })
)

export const pharmacyStoreReviewRelations = relations(
  pharmacyStoreReview,
  ({ one }) => ({
    store: one(pharmacyStores, {
      fields: [pharmacyStoreReview.pharmacy_store_id],
      references: [pharmacyStores.id]
    })
  })
)

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .notNull()
    .$default(() => ulid()),
  first_name: varchar('first_name').notNull(),
  last_name: varchar('last_name').notNull(),
  email: varchar('email').notNull(),
  phone_number: numeric('phone_number').notNull(),
  is_verified: boolean('is_verified').default(false).notNull(),
  role: varchar('role').notNull().$type<'patient' | 'doctor'>(),
  created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true, mode: 'string' })
})

export type User = typeof users.$inferSelect

export const patientProfiles = pgTable('patient_profiles', {
  id: varchar('id')
    .primaryKey()
    .notNull()
    .$default(() => ulid()),
  first_name: varchar('first_name').notNull(),
  last_name: varchar('last_name').notNull(),
  other_names: varchar('other_names'),
  email: varchar('email').notNull(),
  phone_number: numeric('phone_number').notNull(),
  date_of_birth: date('date_of_birth',{mode:'string'}).notNull(),
  profile_picture: jsonb('profile_picture').$type<Media>(),
  user_id: varchar('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
  created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true, mode: 'string' })
})

export type PatientProfile = typeof patientProfiles.$inferSelect

export const doctorProfiles = pgTable('doctor_profiles', {
  id: varchar('id')
    .primaryKey()
    .notNull()
    .$default(() => ulid()),
  first_name: varchar('first_name').notNull(),
  last_name: varchar('last_name').notNull(),
  other_names: varchar('other_names'),
  email: varchar('email').notNull(),
  phone_number: varchar('phone_number').notNull(),
  date_of_birth: varchar('date_of_birth').notNull(),
  profile_picture: jsonb('profile_picture').notNull().$type<Media>(),
  specialization: varchar('specialization'),
  patients_treated: integer('patients_treated').notNull(),
  years_of_experience: integer('years_of_experience').notNull(),
  number_of_reviews: integer('number_of_reviews').notNull(),
  rating: numeric('rating', { precision: 3, scale: 2 }).notNull(),
  description: text('description').notNull(),
  home_consultation_charge: numeric('home_consultation_charge', {
    scale: 2
  }).notNull(),
  video_consultation_charge: numeric('video_consultation_charge', {
    scale: 2
  }).notNull(),
  clinic_consultation_charge: numeric('clinic_consultation_charge', {
    scale: 2
  }).notNull(),
  certifications: jsonb('certifications').$type<Certification[]>(),
  experiences: jsonb('experiences').$type<Experience[]>(),
  working_hours: jsonb('working_hours').$type<WorkingHour[]>(),
  location: jsonb('location').$type<Location>(),
  user_id: varchar('user_id')
    .notNull().unique()
    .references(() => users.id),
  created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true, mode: 'string' })
})

export type DoctorProfile = typeof doctorProfiles.$inferSelect

export const authenticationMethods = pgTable('authentication_methods', {
  id: varchar('id')
    .primaryKey()
    .notNull()
    .$default(() => ulid()),
  user_id: varchar('user_id')
    .notNull()
    .references(() => users.id),
  meta: jsonb('meta').notNull().$type<AuthenticationMethodMeta>(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
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
  expires_at: timestamp('expires_at', {
    withTimezone: true,
    mode: 'string'
  }).notNull(),
  user_id: varchar('user_id')
    .notNull()
    .references(() => users.id),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
} )

export type Token = typeof tokens.$inferSelect

export const consultationRequests = pgTable('consultation_requests', {
  id: varchar('id')
    .primaryKey()
    .$default(() => ulid()), // Unique identifier for the consultation request
  doctor_id: varchar('doctor_id')
    .notNull()
    .references(() => doctorProfiles.id), // Foreign key referencing the doctor
  patient_id: varchar('patient_id')
    .notNull()
    .references(() => patientProfiles.id), // Foreign key referencing the patient
  status: varchar('status')
    .notNull()
    .$type<'pending' | 'approved' | 'rejected'>(), // Status of the request
  message: text('message').notNull(), // Message from the patient
  start_time: timestamp('start_time', { withTimezone: true }).notNull(), // Start time of the consultation
  end_time: timestamp('end_time', { withTimezone: true }), // End time of the consultation
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(), // Timestamp for when the request was created
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull() // Timestamp for when the request was last updated
})

export type ConsultationRequest = typeof consultationRequests.$inferSelect

export const consultations = pgTable('consultations', {
  id: varchar('id')
    .primaryKey()
    .$default(() => ulid()), // Unique identifier for the consultation
  doctor_id: varchar('doctor_id')
    .notNull()
    .references(() => doctorProfiles.id), // Foreign key referencing the doctor
  patient_id: varchar('patient_id')
    .notNull()
    .references(() => patientProfiles.id), // Foreign key referencing the patient
  room_name: varchar('room_name').notNull(), // Room name for the consultation
  doctor_token: text('doctor_token').notNull(), // Token for the doctor
  patient_token: text('patient_token').notNull(), // Token for the patient
  start_time: timestamp('start_time', { withTimezone: true }).notNull(), // Start time of the consultation
  end_time: timestamp('end_time', { withTimezone: true }), // End time of the consultation
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(), // Timestamp for when the consultation was created
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull() // Timestamp for when the consultation was last updated
})

export type Consultation = typeof consultations.$inferSelect
