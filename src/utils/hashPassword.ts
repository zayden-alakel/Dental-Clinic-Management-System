import bcrypt from 'bcrypt';

export async function hashPassword(password:string): Promise<string>{
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw error;
    }
}

export async function comparePassword(password:string, hashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw error;
    }
}