# Consultation

A `Patient` books a consultation to an active `Doctor`. When the `Doctor` accepts the `Consultation`, the status of the `Consultaition` would be set to accepted. The `Patient` can then query the `Consultation` data again to get the connection details in order to communicate with the `Doctor` in real-time.

```d2
shape: sequence_diagram

webapp_patient: {
  shape: image
  icon: https://icons.terrastruct.com/tech%2F052-smartphone-3.svg
  label: Webapp (Patient)
}
server: {
  shape: image
  icon: https://icons.terrastruct.com/essentials%2F112-server.svg
  label: Server
}
webapp_doctor: {
  shape: image
  icon: https://icons.terrastruct.com/tech%2F052-smartphone-3.svg
  label: Webapp (Doctor)
}

webapp_patient -> server: "[POST] /api/consultations"
webapp_doctor -> server: "[GET] /api/consultations?status=pending"
server -> webapp_doctor: Consultations
webapp_doctor -> server: "[POST] /api/consultations/:id/accept"
webapp_patient -> server: "[GET] /api/consultations/:id"
server -> webapp_patient: Consultation
webapp_patient <-> webapp_doctor: RTC connection
webapp_doctor -> server: "[POST] /api/consultations/:id/note\nConsultationNote"
webapp_patient -> server: "[POST] /api/consultations/:id/chat\nConsultationChatMessage"
webapp_doctor -> server: "[POST] /api/consultations/:id/chat\nConsultationChatMessage"
```
