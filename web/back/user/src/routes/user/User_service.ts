import  {prisma} from "../../lib/prisma";
import bcrypt from 'bcrypt';
import { generateToken } from "..";
import jwt from 'jsonwebtoken'
import {secret} from ".."
import { FastifyReply } from 'fastify';


export class UserService{
    async postRegister(data: any){
        try{
            console.log("i m in")
            const [email, username] = await Promise.all([
                prisma.core_user.findUnique({where: {email: data.email}}),
                prisma.core_user.findUnique({where: {pseudo: data.username}}),
            ])
            if (email)
                return {success: false, message: "email already use"}
            if (username)
                return {success: false, message: "username already use"}
            const CrypPass = await bcrypt.hash(data.password, 10);
            await prisma.core_user.create({data:{email: data.email, pseudo:data.username, password: CrypPass}})
            return {success: true, message: "user add to db"}
        }catch(err){
            return {success: false, message: "error catch post " + err}
        }
    }

    async login(data: any, rep: FastifyReply){
        try{
            const user = await prisma.core_user.findUnique({where:{email: data.email}})
            if (!user)
                return {success: false, message: "email doesn't exist"}
            const DecryPass = await bcrypt.compare(data.password, user.password)
            if (!DecryPass)
                return {success: false, message: "wrong password"}
            const token = jwt.sign({id: user.id}, secret, {expiresIn: '12h'});
            generateToken(false, token, rep)
            return {success: true, message: "user login sucess"}
        }catch(err){
            return {success: false, message: "error catch post " + err}
        }
    }
}
