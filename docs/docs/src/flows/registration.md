# Registration

The flow for registering `Doctor`s and `Patient`s is esentially the same.

```d2
shape: sequence_diagram

user: {
  shape: image
  icon: https://icons.terrastruct.com/aws%2F_General%2FUser_light-bg.svg
  label: User
}
webapp: {
  shape: image
  icon: https://icons.terrastruct.com/tech%2F052-smartphone-3.svg
  label: Webapp
}
server: {
  shape: image
  icon: https://icons.terrastruct.com/essentials%2F112-server.svg
  label: Server
}

webapp -> server: "[POST] /api/auth/sign-in\nRegstrationCredentials"
server -> webapp: WelcomeMessage
server -> user: VerificationCode
user -> webapp: VerificationCode
webapp -> server: "[POST] /api/auth/verify\nVerificationCode"
server -> webapp: WelcomeMessage
```
