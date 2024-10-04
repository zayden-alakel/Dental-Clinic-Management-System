import Clinic from "../models/Clinic";
import User from "../models/User";
import Roles from "../utils/Roles";
import { hashPassword } from "../utils/hashPassword";

export default class UserService{
    public async createSecretary(user: User): Promise<User>{
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
                role: Roles.SECRETARY
            })
            return newUser;
        } catch (error) {
            throw error
        }
    }

    public async createAssistant(user: User): Promise<User>{
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
                role: Roles.ASSISTANT
            })
            return newUser;
        } catch (error) {
            throw error
        }
    }
}