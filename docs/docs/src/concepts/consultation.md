# Consultation

A `Consultation` is an audio-visual virtual meeting held between a `Doctor` and a `Patient`. In a `Consultation`, a `Doctor` can attach personal notes about about the `Patient` as well as chat with them via text messages.

```d2
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
```
