# Login User

request

```http request
POST http://localhost:8080/api/auth-login
Content-Type: application/json

{
    "email": "",
    "password": ""
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