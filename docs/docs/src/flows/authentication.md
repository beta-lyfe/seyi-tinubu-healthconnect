# Authentication

The flow for authenticating `Doctor`s and `Patient`s is esentially the same.

```d2
shape: sequence_diagram

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

webapp -> server: "[POST] /api/auth/sign-in\nSignInCredentials"
server -> webapp: AuthCredentials
```
