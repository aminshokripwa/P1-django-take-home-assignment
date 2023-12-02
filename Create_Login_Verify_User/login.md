# Login User

request

```http request
POST http://localhost:8060/api/auth-login
Content-Type: application/json

{
    "email": "{{email}}",
    "password": "{{password}}"
}
```

Response

```http request
{
    "resp": true,
    "message": "Welcome to JAMEET",
    "token": "User token"
}
```