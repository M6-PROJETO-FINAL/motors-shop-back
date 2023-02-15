import AppDataSource from "../data-source";
import { ISellerLogin } from "../interfaces/seller";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { Seller } from "../entities/seller.entity";

const loginSellerService = async ({email, password} : ISellerLogin): Promise<String> => {
    const sellerRepository = AppDataSource.getRepository(Seller);

    const seller = await sellerRepository.findOneBy({email: email})

    if(!seller){
        throw new Error("Wrong email/password")
    } 
    if(!bcrypt.compareSync(password, seller.password)) throw new Error("Wrong email or password")
    const token = jwt.sign({id: seller.id}, String(process.env.JWT_SECRET), { expiresIn: "1d",})

    return token

}

export default loginSellerService;