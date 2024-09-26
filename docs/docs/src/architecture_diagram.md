# Architecture diagram

```d2
users: {
  shape: sql_table
  id: varchar {constraint: primary_key}
  role: varchar
  is_verified: boolean
  created_at: timestamp
  updated_at: timestamp
}

user_contact_info: {
  shape: sql_table
  id: varchar {constraint: primary_key}
  phone_number: varchar
  email: varchar
  user_id: varchar
  created_at: timestamp
  updated_at: timestamp
}

user_contact_info.user_id -> users.id

auth: {
  shape: sql_table
  id: varchar {constraint: primary_key}
  method: varchar
  metadata: json
  user_id: varchar
  created_at: timestamp
  updated_at: timestamp
}

auth.user_id -> users.id

patient_profiles: {
  shape: sql_table
  id: varchar {constraint: primary_key}
  first_name: varchar
  last_name: varchar
  age: int
  user_id: varchar
  created_at: timestamp
  updated_at: timestamp
}

patient_profiles.user_id -> users.id

doctor_profiles: {
  shape: sql_table
  id: varchar {constraint: primary_key}
  first_name: varchar
  last_name: varchar
  user_id: varchar
  created_at: timestamp
  updated_at: timestamp
}

doctor_profiles.user_id -> users.id

consultations: {
  shape: sql_table
  id: varchar {constraint: primary_key}
  doctors_notes: json
  chats: json
  doctor_id: varchar
  patient_id: varchar
  created_at: timestamp
  updated_at: timestamp
}

consultations.doctor_id -> doctor_profiles.id
consultations.patient_id -> patient_profiles.id
```
