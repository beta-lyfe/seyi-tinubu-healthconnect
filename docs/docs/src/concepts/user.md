# User

A `User` is anyone who interacts with BetaLyfe. There are 2 main categories of users, they are:

- `Patient`
- `Doctor`

```d2
users: {
  shape: sql_table
  id: varchar {constraint: primary_key}
  role: varchar
  is_verified: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

### Patient

A `Patient` is a user who books a `Consultation` with a `Doctor`.

```d2
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
```

### Doctor

A `Doctor` is a user who reponds to (either accepting or declining) a `Consultation` with a `Patient`.

```d2
doctor_profiles: {
  shape: sql_table
  id: varchar {constraint: primary_key}
  first_name: varchar
  last_name: varchar
  user_id: varchar
  created_at: timestamp
  updated_at: timestamp
}
```
