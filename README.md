# RAKT API

A set of tools to add features, services or more information with the help of RAKT API

> I created this project with Typescript and Docker so you can easily run it on any system that you want, It even included postman link.

## Start

To use this API , Just enter the code below :

```sh
	
	docker compose up
	
```

## Steps

1. Create user
2. Login User , Sent xxx-token in header
3. Use Truck links

## Description

> I have created a similar system to find the closest post office to a person's location, for this project the process is as follows:
1. The user registers through the web service, a full name, email, and password.
2. After registration, the user can login and receive a token by logging in. It is necessary to send this received token as a header to API. 
3. After logging in with the location specifications, the user can see the closest truck around him with the most possible specifications and distance based on mile. [Get nearby truck and filter](./Truck/truck.md)
4. The user can search the name of the truck and find the desired truck based on their name. [Search truck based on applicant and filter](./Truck/get-search-applicant.md)
5. Also, sometimes it may not be possible to reach the user's location, so it is possible to search the address and the description of the address. [Search truck address on applicant and filter](./Truck/get-search-address.md)

> It's possible to change food_truck_data CSV at any time , I did not optimize the file and used the same original file, you can easily change it from the [http://localhost:8003](http://localhost:8003) section with the login details in the [env](./.env) file.

## List
- [Create Login User](./Create_Login_User)
- [Truck](./Truck)

## Postman(Online)
>In the link below, you can view the online document and enter it into Postman software.
[Online Postman Documnet](https://documenter.getpostman.com/view/12464310/2s9YeK4VX5).