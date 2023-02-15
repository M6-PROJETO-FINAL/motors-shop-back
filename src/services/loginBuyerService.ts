import AppDataSource from "../data-source";
import { IBuyerLogin } from "../interfaces/buyer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { Buyer } from "../entities/buyer.entity";
import { validateEmail } from "../validators/buyer/buyerValidators";

const loginBuyerService = async ({email, password} : IBuyerLogin): Promise<String> => {
    const buyerRepository = AppDataSource.getRepository(Buyer);

    await validateEmail(email)

    const buyer = await buyerRepository.findOneBy({email: email})

    if(!buyer){
        throw new Error("Wrong email/password")
    } 

    if(!bcrypt.compareSync(password, buyer.password)) throw new Error("Wrong email or password")
    const token = jwt.sign({id: buyer.id}, String(process.env.JWT_SECRET), { expiresIn: "1d", subject: buyer.id})

    return token

}

export default loginBuyerService;