import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import CustomRequest from "../utils/CustomRequest";
import 'dotenv/config';

export default function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null || !token) throw new Error('unauthantected');

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
        if(err) throw new Error('unauthantected');
        (req as CustomRequest).user = user;
        next();
    })
}