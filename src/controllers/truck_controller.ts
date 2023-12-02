import { Request, Response } from 'express';
import { connect } from '../database/connection';
import { RowDataPacket } from 'mysql2';
import { CurrentLatLon } from '../interfaces/truck.interface';
import { statusCalculater , foodItemsCalculater , addressDescriptioCalculater , applicantCalculater , facilityTypeCalculater , biggerThanMinDistanceCalculater , lessThanMaxDistanceCalculater , dataLastCalculater} from '../truck/status.calculater';

/**
 * Show truck important information based on requested data
 * @param req 
 * @param res 
 * @returns 
 */
export const showTruckInformation = async (req: Request, res: Response): Promise<Response> => {

    try {

        const { latitude , longitude , status , foodItems , addressDescription , applicant  , facilityType , biggerThanMinDistance , lessThanMaxDistance , checkExpirationDate}: CurrentLatLon = req.body;

        //check status of truck
        let truckstatus:string = statusCalculater(status) ?? '';

        //check truck food item
        let truckfoodItems:string = foodItemsCalculater(foodItems) ?? '';

        //check truck adress or description
        let truckaddressDescription:string = addressDescriptioCalculater(addressDescription) ?? '';

        //check truck applicant
        let truckapplicant:string = applicantCalculater(applicant) ?? '';

        //check truck facility type
        let truckfacilityType:string = facilityTypeCalculater(facilityType) ?? '';

        //bigger than for limit distance for example distance more than 10 mile 
        let truckMinDistance:string = biggerThanMinDistanceCalculater(biggerThanMinDistance) ?? '';

        //less than for limit distance for example distance less than 10 mile
        let truckMaxDistance:string = lessThanMaxDistanceCalculater(lessThanMaxDistance) ?? '';

        //connect to database
        const conn = await connect();

        //to search in databse I have only imported csv no changes you can easly insert another csv
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

        //perepare data to show
        var acceptedTruck = [];

        //check data if asked for check expiration date
        acceptedTruck = dataLastCalculater(trucksInformation , checkExpirationDate) ;

        return res.json({
            resp: true,
            message: 'Get All nearst truck',
            listStories: acceptedTruck
        });

    } catch(err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}