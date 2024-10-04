import User from "../models/User";
import {sign} from "jsonwebtoken";
import {hashPassword, comparePassword} from "../utils/hashPassword";
import Clinic from "../models/Clinic";

export default class AuthService{

    async signup(user: User): Promise<User>{
        try {
            const clinic = await Clinic.findByPk(user.ClinicId);
            if(!clinic) throw new Error("there is no clinic with such an ID")
            const hashedPassword = await hashPassword(user.password);
            const newUser = await User.create({
                fullName: user.fullName,
                email: user.email,
                password: hashedPassword,
                address: user.address,
                ClinicId: user.ClinicId,
                phoneNumber: user.phoneNumber,
                role: user.role
            })
            const token = sign({
                id: newUser.id,
                fullName: newUser.fullName,
                roles: [newUser.role]
            }, process.env.TOKEN_SECRET as string);
            newUser.token = token;
            return newUser;
        } catch (error) {
            throw error
        }
    }

    async login(email: string, password: string): Promise<any>{
        const user = await User.findOne({where: {email: email}, include: [User.associations.clinic]})
        if(!user)throw new Error('email or password is incorect');

        if(await comparePassword(password, user.password)){
            const token = sign({
                id: user.id,
                fullName: user.fullName,
                roles: [user.role]
            }, process.env.TOKEN_SECRET as string);
            user.token = token
            return {
                user,
                token: user.token
            }
        }
        else{
            throw new Error('email or password is incorect')
        }
    }
}