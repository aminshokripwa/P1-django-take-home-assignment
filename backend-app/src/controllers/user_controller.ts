import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket } from 'mysql2';
import { connect } from '../database/connection';
import { User } from '../interfaces/user.interface';

/**
 * Creat new user
 * @param req 
 * @param res 
 * @returns 
 */
export const createUser = async ( req: Request, res: Response ): Promise<Response> => {

    try {

        const { email, password }: User = req.body;

        if( !validator.isEmail(email) ){
            return res.status(401).json({
                resp: false,
                message : 'The email is not accepted!'
            });
        }

        const conn = await connect();

        const [existsEmail] = await conn.query<RowDataPacket[]>('SELECT email FROM users WHERE email = ? ', [ email ]);

        if( existsEmail.length > 0 ){
            return res.status(401).json({
                resp: false,
                message : 'The email already exists!'
            });
        }

        let salt = bcrypt.genSaltSync();
        const pass = bcrypt.hashSync( password, salt );
        
        await conn.query('INSERT INTO users (uid, email , itassword, person_uid) value (?,?,?,?)', [uuidv4(), email, pass, uuidv4()]);

        conn.end();

        return res.json({
            resp: true,
            message : 'Registered user successfully' 
        });

        
    } catch (err) {
        return res.status(501).json({
            resp: false,
            message : err
        });
    }
}


