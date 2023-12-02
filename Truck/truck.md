# Get User Chat List

request

```http request
GET http://localhost:8080/api/truck
Content-Type: application/json
xxx-token: {{token}}

{
    "latitude": "{{latitude}}", // latitude
    "longitude": "{{longitude}}", // longitude
    "checkApproved": {{false}}, // true or false
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

1. latitude is latitude of user location.
2. longitude is longitude of user location.
3. If checkApproved is true, only the trucks that have Approved will be displayed, and if it is false, all trucks will be displayed.
4. If checkExpirationDate is true, only the trucks that have not yet expired will be displayed, and if it is false, all trucks will be displayed.
5. It's possible to insert all food Items like rice , chicken, and it will show trucks with this parameter.
6. It's possible to limit facility type like Push Cart or ...
7. It's possible to search in nearest truck's adress by addressDescription
8. It's possible to search in nearest truck's name by applicant
9. It's possible to limit distance, for example distance more than 10 mile (16.09 km)  by biggerThanMinDistance
10. It's possible to limit distance, for example distance less than 10 mile (16.09 km) by lessThanMaxDistance

Response

```http request
{
    "resp": true,
    "message": "Get All nearest truck",
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