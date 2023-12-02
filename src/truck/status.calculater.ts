import { Request, Response } from 'express';

/**
 * check status of truck
 * @param status 
 * @returns 
 */
export function statusCalculater  (status: string | null)  { 
    let truckstatus ;
    if(status && status != 'APPROVED'){
        truckstatus = " AND status = 'APPROVED' "  ;
    }
    return truckstatus; 
} 

/**
 * check truck food item
 * @param foodItems 
 * @returns 
 */
export function foodItemsCalculater  (foodItems: string | null)  { 
    let truckfoodItems ;
    if(foodItems){
        let myarray = foodItems.split(',');
        for(var i = 0; i < myarray.length ; i++)
        {
            if(i == 0){
                truckfoodItems = " AND foodItems LIKE '%"+myarray[i]+"%' "  ;
            }else{
                truckfoodItems = "foodItems LIKE '%"+myarray[i]+"%' OR " + truckfoodItems ;
            }
        }
    }
    return truckfoodItems; 
} 

/**
 * check truck adress or description
 * @param addressDescription 
 * @returns 
 */
export function addressDescriptioCalculater  (addressDescription: string | null)  { 
    let truckaddressDescription ;
    if(addressDescription){
        truckaddressDescription = " AND Address LIKE '%"+addressDescription+"%' OR LocationDescription LIKE '%"+addressDescription+"%' " ;
    }
    return truckaddressDescription; 
} 

/**
 * check truck applicant
 * @param applicant 
 * @returns 
 */
export function applicantCalculater  (applicant: string | null)  { 
    let truckapplicant ;
    if(applicant){
        truckapplicant = " AND applicant LIKE '%"+applicant+"%' " ;
    }
    return truckapplicant; 
} 

/**
 * check truck facility type
 * @param facilityType 
 * @returns 
 */
export function facilityTypeCalculater  (facilityType: string | null)  { 
    let truckfacilityType ;
    if(facilityType){
        truckfacilityType = " AND facilityType = '"+facilityType+"' " ;
    }
    return truckfacilityType; 
} 

/**
 * bigger than for limit distance for example distance more than 10 mile 
 * @param biggerThanMinDistance 
 * @returns 
 */
export function biggerThanMinDistanceCalculater  (biggerThanMinDistance: number | null)  { 
    let truckMinDistance ;
    if(biggerThanMinDistance && !isNaN(biggerThanMinDistance) ){
        truckMinDistance = " distanceMile >= "+biggerThanMinDistance+" "  ;
    }else{
        truckMinDistance = " distanceMile >= 0 "  ;
    }
    return truckMinDistance; 
} 

/**
 * less than for limit distance for example distance less than 10 mile
 * @param lessThanMaxDistance 
 * @returns 
 */
export function lessThanMaxDistanceCalculater  (lessThanMaxDistance: number | null)  { 
    let truckMaxDistance ;
    if(lessThanMaxDistance && !isNaN(lessThanMaxDistance) ){
        truckMaxDistance = " AND distanceMile <= "+lessThanMaxDistance+" "  ;
    }
    return truckMaxDistance; 
} 

/**
 * 
 * @param trucksInformation 
 * @param checkExpirationDate 
 * @returns 
 */
export function dataLastCalculater  (trucksInformation: any , checkExpirationDate : string | null)  { 
    var acceptedTruck = [];
    let j = 0 ;
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${month}-${day}-${year}`;

    for (var i = 0; i < trucksInformation[0].length; i++) {
      
        if(checkExpirationDate){

            let d1 = trucksInformation[0][i].ExpirationDate ;
            let d2 = formattedDate ;

            let date1 = new Date(d1);
            let date2 = new Date(d2);

            if (date1 < date2) {
                console.log(`${d1} is less than ${d2}`);
            }else{
                console.log(`${d1} is greater than ${d2}`);
                acceptedTruck[j] = trucksInformation[0][i] ;
                j++;
            }

        }else{
            acceptedTruck[j] = trucksInformation[0][i] ;
            j++;
        }

    }
    return acceptedTruck; 
} 