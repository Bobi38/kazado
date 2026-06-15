import  {prisma} from "../../lib/prisma";
import bcrypt from 'bcrypt';
import { generateToken } from "..";
import jwt from 'jsonwebtoken'
import {secret} from ".."
import { FastifyReply } from 'fastify';
import { AppError } from "../preHandler/AppError";


export class UserService{
    async postRegister(data: any){
            console.log("i m in")
            const [email, username] = await Promise.all([
                prisma.core_user.findUnique({where: {email: data.email}}),
                prisma.core_user.findUnique({where: {pseudo: data.username}}),
            ])
            if (email)
                throw new AppError("email already use", 400)
            if (username)
                throw new AppError("username already use", 400)
            const CrypPass = await bcrypt.hash(data.password, 10);
            await prisma.core_user.create({data:{email: data.email, pseudo:data.username, password: CrypPass}})
            return {success: true, message: "user add to db"}
    }

    async login(data: any, rep: FastifyReply){
            const user = await prisma.core_user.findUnique({where:{email: data.email}})
            if (!user)
                throw new AppError("email doesn't exist", 401)
            const DecryPass = await bcrypt.compare(data.password, user.password)
            if (!DecryPass)
                throw new AppError("wrong password", 401)
            const token = jwt.sign({id: user.id}, secret, {expiresIn: '12h'});
            generateToken(false, token, rep)
            return {success: true, message: "user login sucess"}
    }
}
