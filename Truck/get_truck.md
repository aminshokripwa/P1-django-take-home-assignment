# Get User Chat List

request

```http request
GET http://localhost:8080/api/truck
Content-Type: application/json
xxx-token: {{token}}

{
    "latitude": "{{latitude}}", // latitude
    "longitude": "{{longitude}}", // longitude
    "status": ""{{APPROVED}}", // APPROVED or null
    "checkExpirationDate": {{false}} , // true or false
    "foodItems": "{{foodItems}}", // rice , chicken , or ... or null
    "facilityType": "{{facilityType}}", // Push Cart or ... // can be null
    "addressDescription": "addressDescription", // address or place // can be null
    "applicant": "applicant", // search for applicant name // can be null
    "biggerThanMinDistance": "MinDistance", // bigger than this distance // can be null
    "lessThanMaxDistance": "MaxDistance" // less than this distance // can be null
}

```

> Get all trucks based on recived data

Response

```http request
{
    "resp": true,
    "message": "All Messages list by user",
    "listChat": [
        {
            "uid_list_chat": "xxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxx",
            "source_uid": "xxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxx",
            "target_uid": "xxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxx",
            "last_message": "message",
            "updated_at": "2021-11-15T08:56:14.000Z",
            "username": "username",
            "avatar": "avatar-default.png"
        }
    ]
}
```