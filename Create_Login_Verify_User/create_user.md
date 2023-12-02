# Create User

request

```http request
POST http://localhost:8080/api/user
Content-Type: application/json

{
    "fullname": "{{fullname}}",
    "email": "{{email}}",
    "password": "{{password}}"
}
```

Response

```http request
{
    "resp": true,
    "message": "User created"
}

```