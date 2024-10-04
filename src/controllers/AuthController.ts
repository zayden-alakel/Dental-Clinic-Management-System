import User from "../models/User";
import AuthService from "../services/AuthService";

export default class AuthController{

    public constructor(public authService: AuthService){}

    async signup(user: User): Promise<User>{
        try {
            return await this.authService.signup(user);
        } catch (error) {
            throw error
        }
    }

    async login(email: string, password: string): Promise<any>{
        try {
            return await this.authService.login(email, password  );
        } catch (error) {
            throw(error)
        }
    }

}