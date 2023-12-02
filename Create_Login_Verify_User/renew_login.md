# Renew Login

request

```http request
POST http://localhost:8080/api/auth/renew-login
Content-Type: application/json
xxx-token: {{token}}

```

> Send token as xxx-token in Header

Response

```http request
{
    "resp": true,
    "message": "User created"
}
```