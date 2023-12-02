import jwt from 'jsonwebtoken';


/**
 * Generate new token for login
 * @param idPerson 
 * @param serverId 
 * @returns 
 */
export const generateJsonWebToken = ( idPerson: string , serverId: string ): string => {

    try {

        return jwt.sign( { idPerson , serverId }, process.env.TOKEN_SECRET || 'rakt_2023', {
            expiresIn: '10h'
            //expiresIn: "10h" // it will be expired after 10 hours
            //expiresIn: 120 // it will be expired after 120ms
            //expiresIn: "120s" // it will be expired after 120s
        });

    } catch (err) {
        return 'Error generating the Jwt - Token';
    }

    
}