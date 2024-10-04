import User from "../models/User";
import UserService from "../services/UserService";

export default class UserController{
    public constructor(public userService: UserService){};
    
    public async createSecretary(user: User): Promise<User>{
        return await this.userService.createSecretary(user);
    }

    public async createAssistant(user: User): Promise<User>{
        return await this.userService.createAssistant(user);
    }
}