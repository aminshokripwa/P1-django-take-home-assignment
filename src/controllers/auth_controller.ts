import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import { SignIn } from "../interfaces/login.interface";
import { connect } from '../database/connection';
import { generateJsonWebToken } from '../lib/generate_jwt';
import { IVerifyUser } from '../interfaces/userdb';

/**
 * Used for login user based on email and password
 * @param req 
 * @param res 
 * @returns 
 */
export const login = async ( req: Request, res: Response): Promise<Response> => {

    try {

        const { email, password }: SignIn = req.body;

        const conn = await connect();

        // Check is exists Email on database 
        const [verifyUserdb] = await conn.query<RowDataPacket[0]>('SELECT email, itassword FROM users WHERE email = ? ', [email]);

        if(verifyUserdb.length == 0){
            return res.status(401).json({
                resp: false,
                message: 'Credentials are not registered'
            });
        }

        const verifyUser: IVerifyUser = verifyUserdb[0];

        // Check Password
        if( !await bcrypt.compareSync( password, verifyUser.itassword )){
            return res.status(401).json({
                resp: false,
                message: 'Incorrect credentials'
            });
        }
        
        const uidPersondb = await conn.query<RowDataPacket[]>('SELECT person_uid as uid FROM users WHERE email = ? ', [email]);

        const { uid } = uidPersondb[0][0];

        let token = generateJsonWebToken( uid , req.idPerson);

        conn.end();
        
        return res.json({
            resp: true,
            message: 'Welcome' ,
            token: token
        });
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}

/**
 * Help user to regenerate token without login again only with its token
 * @param req 
 * @param res 
 * @returns 
 */
export const renweLogin = async ( req: any, res: Response ) => {

    try {

        const token = generateJsonWebToken( req.idPerson , req.serverId);

        return res.json({
            resp: true,
            message: 'Welcome back' ,
            token: token
        }); 
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }    

}
