import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


interface IPayload {
    serverId: string | boolean;
    idPerson: string;
}

/**
 * verify is token right
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
// Verify token to Routes
export const verifyToken = (req: any, res: Response, next: NextFunction) => {

    let token = req.header('xxx-token');
    
    //console.log(token);

    if( !token ){
        return res.status(401).json({
            resp: false,
            message: 'Access denied'
        });
    }

    try {

        const payload = jwt.verify( token, process.env.TOKEN_SECRET || 'rakt_2023' ) as IPayload;

        //console.log(payload);

        //check if token has this detiles
        if(payload.idPerson ){
            req.idPerson = payload.idPerson;
            next();
        }else{
            return res.status(401).json({
                resp: false,
                message: 'Access denied'
            });
        }

        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }
}