# Get User Chat List

request

```http request
GET http://localhost:8080/api/truck/get-search-address/{{address}}
Content-Type: application/json
xxx-token: {{token}}

{
    "checkApproved": {{false}}, // true or false
    "checkExpirationDate": {{false}} , // true or false
    "foodItems": "{{foodItems}}", // rice , chicken , or ... or null
    "facilityType": "{{facilityType}}", // Push Cart or ... // can be null
    "addressDescription": "addressDescription", // address or place // can be null
    "applicant": "applicant", // search for applicant name // can be null
}

```

> Get all trucks based on recived data

Response

```http request
{
    "resp": true,
    "message": "Find All nearest truck",
    "listTruck": [
        {
            "locationid": xxxx,
            "Applicant": "xxxx",
            "FacilityType": "xxxx",
            "Description": "xxxx xxxx",
            "Address": "xxxx xxxx xxxx",
            "Status": "xxxx",
            "Latitude": "xxxx",
            "Longitude": "xxxx",
            "ExpirationDate": "mm-dd-yyyy",
            "distanceMile": miles
        },
        {
           ... 
        }
    ]
}
```