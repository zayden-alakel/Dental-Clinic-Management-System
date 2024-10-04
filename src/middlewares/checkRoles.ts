import {Request, Response, NextFunction} from "express";
import CustomRequest from "../utils/CustomRequest";

export default function checkRoles(...roles: string[]) {
    return (req: Request, res:Response, next:NextFunction) =>{
        const rolesArray = [...roles]
        const result = (req as CustomRequest).user.roles.map((role: string) => rolesArray.includes(role)).find((val: boolean) => val === true)
        if(!result) throw new Error("403 unauthorized no role")
        next()
    }
}