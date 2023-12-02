# Get User Chat List

request

```http request
GET http://localhost:8060/api/truck/get-search-address/{{address}}
Content-Type: application/json
xxx-token: {{token}}

{
    "checkApproved": {{false}}, // true or false
    "checkExpirationDate": {{false}} , // true or false
    "foodItems": "{{foodItems}}", // rice , chicken , or ... or null
    "facilityType": "{{facilityType}}", // Push Cart or ... // can be null
    "addressDescription": "{{addressDescription}}", // address or place // can be null
    "applicant": "{{applicant}}" // search for applicant name // can be null
}

```

> Get all trucks based on recived data

1. If checkApproved is true, only the trucks that have Approved will be displayed, and if it is false, all trucks will be displayed.
2. If checkExpirationDate is true, only the trucks that have not yet expired will be displayed, and if it is false, all trucks will be displayed.
3. It's possible to insert all food Items like rice , chicken, and it will show trucks with this parameter.
4. It's possible to limit facility type like Push Cart or ...
5. It's possible to search in nearest truck's adress by addressDescription
6. It's possible to search in nearest truck's name by applicant

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
            "distanceOnmile": miles
        },
        {
           ... 
        }
    ]
}
```