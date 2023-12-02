import { Request, Response } from 'express';
import { connect } from '../database/connection';
import { RowDataPacket } from 'mysql2';
import { CurrentLatLon } from '../interfaces/truck.interface';
import { statusCalculater , foodItemsCalculater , addressDescriptioCalculater , applicantCalculater , facilityTypeCalculater , biggerThanMinDistanceCalculater , lessThanMaxDistanceCalculater , dataLastCalculater} from '../truck/status.calculater';

/**
 * Show important truck information based on requested data and filter it
 * @param req 
 * @param res 
 * @returns 
 */
export const showTruckInformation = async (req: Request, res: Response): Promise<Response> => {

    try {

        const { latitude , longitude , status , foodItems , addressDescription , applicant  , facilityType , biggerThanMinDistance , lessThanMaxDistance , checkExpirationDate}: CurrentLatLon = req.body;

        //Check status of truck
        let truckstatus:string = statusCalculater(status) ?? '';

        //Check truck food item
        let truckfoodItems:string = foodItemsCalculater(foodItems) ?? '';

        //Check truck adress or description
        let truckaddressDescription:string = addressDescriptioCalculater(addressDescription) ?? '';

        //Check truck applicant
        let truckapplicant:string = applicantCalculater(applicant) ?? '';

        //Check truck facility type
        let truckfacilityType:string = facilityTypeCalculater(facilityType) ?? '';

        //Bigger than for limit distance, for example distance more than 10 mile (16.09 km) 
        let truckMinDistance:string = biggerThanMinDistanceCalculater(biggerThanMinDistance) ?? '';

        //Less than for limit distance, for example distance less than 10 mile (16.09 km)
        let truckMaxDistance:string = lessThanMaxDistanceCalculater(lessThanMaxDistance) ?? '';

        //Connect to database
        const conn = await connect();

        //To search in database I have only imported CSV no changes you can easily insert another CSV
        const trucksInformation = await conn.query<RowDataPacket[]>(`SELECT 
            locationid , Applicant , FacilityType , LocationDescription AS Description , Address , Status , Latitude , Longitude , DATE_FORMAT(STR_TO_DATE(ExpirationDate, '%m/%d/%Y %H:%i'), '%m-%d-%Y') AS ExpirationDate,  
            (
            3959 *
            acos(cos(radians(?)) * 
            cos(radians(latitude)) * 
            cos(radians(longitude) - 
            radians(?)) + 
            sin(radians(?)) * 
            sin(radians(latitude )))
            ) AS distanceMile
            FROM food_truck_data 
            WHERE  applicant IS NOT NULL `+truckstatus+` `+truckfoodItems+` `+truckaddressDescription+` `+truckapplicant+` `+truckfacilityType+` 
            HAVING `+truckMinDistance+` `+truckMaxDistance+` 
            ORDER BY distanceMile LIMIT 0, 30;`, [ latitude , longitude ,  latitude ]);

        conn.end();

        //Prepare data to show
        var acceptedTruck = [];

        //Check data if asked for, check expiration date
        acceptedTruck = dataLastCalculater(trucksInformation , checkExpirationDate) ;

        return res.json({
            resp: true,
            message: 'Get All nearest truck',
            listTruck: acceptedTruck
        });

    } catch(err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}

/**
 * Search truck important information based on requested data
 * @param req 
 * @param res 
 * @returns 
 */
export const searchTruckInformation = async (req: Request, res: Response): Promise<Response> => {

    try {

        const { status , foodItems , facilityType , checkExpirationDate}: CurrentLatLon = req.body;

        //Check status of truck
        let truckstatus:string = statusCalculater(status) ?? '';

        //Check truck food item
        let truckfoodItems:string = foodItemsCalculater(foodItems) ?? '';

        //Check truck facility type
        let truckfacilityType:string = facilityTypeCalculater(facilityType) ?? '';

        //Connect to database
        const conn = await connect();
        let trucksInformation ;

        //To search in database I have only imported CSV no changes you can easily insert another CSV
        if(req.params.applicant){

            trucksInformation = await conn.query<RowDataPacket[]>(`SELECT 
            locationid , Applicant , FacilityType , LocationDescription AS Description , Address , Status , Latitude , Longitude , DATE_FORMAT(STR_TO_DATE(ExpirationDate, '%m/%d/%Y %H:%i'), '%m-%d-%Y') AS ExpirationDate,  
            FROM food_truck_data 
            WHERE  applicant IS NOT NULL AND ( applicant LIKE '%?%' )  `+truckstatus+` `+truckfoodItems+`  `+truckfacilityType+` 
            ORDER BY distanceMile LIMIT 0, 30;`, [ req.params.applicant]);

        }else{

            trucksInformation = await conn.query<RowDataPacket[]>(`SELECT 
            locationid , Applicant , FacilityType , LocationDescription AS Description , Address , Status , Latitude , Longitude , DATE_FORMAT(STR_TO_DATE(ExpirationDate, '%m/%d/%Y %H:%i'), '%m-%d-%Y') AS ExpirationDate,  
            FROM food_truck_data 
            WHERE  applicant IS NOT NULL AND ( Address LIKE '%?%' OR LocationDescription LIKE '%?%' )  `+truckstatus+` `+truckfoodItems+`  `+truckfacilityType+` 
            ORDER BY distanceMile LIMIT 0, 30;`, [ req.params.address , req.params.address ]);

        }

        conn.end();

        //Prepare data to show
        var acceptedTruck = [];

        //Check data if asked for, check expiration date
        acceptedTruck = dataLastCalculater(trucksInformation , checkExpirationDate) ;

        return res.json({
            resp: true,
            message: 'ّFind All nearest truck',
            listTruck: acceptedTruck
        });

    } catch(err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}