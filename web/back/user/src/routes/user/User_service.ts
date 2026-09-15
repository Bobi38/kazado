import  {prisma} from "../../lib/prisma";
import bcrypt from 'bcrypt';
import { generateToken } from "..";
import jwt from 'jsonwebtoken'
import {secret} from ".."
import { FastifyReply } from 'fastify';
import { AppError } from "../preHandler/AppError";
import nodemailer from 'nodemailer';


export class UserService{
    async postRegister(data: any){
            const CrypPass = await bcrypt.hash(data.password, 10);
            await prisma.core_user.create({data:{email: data.email, pseudo:data.username, password: CrypPass}})
            return {success: true, message: "Utilisateur ajouté à la base de données"}
    }

    async login(data: any, rep: FastifyReply){
            const user = await prisma.core_user.findUnique({where:{email: data.email}})
            if (!user)
                throw new AppError("L'email n'existe pas", 401)
            const DecryPass = await bcrypt.compare(data.password, user.password)
            if (!DecryPass)
                throw new AppError("Mauvais mot de passe", 401)
            const token = jwt.sign({id: user.id}, secret, {expiresIn: '12h'});
            generateToken(false, token, rep)
            return {success: true, message: "Login a été effectué avec succès"}
    }

    async passwordForget(data: any, rep: FastifyReply){
        const user = await prisma.core_user.findUnique({where:{email: data.email}})
        if (!user)
            throw new AppError("L'email n'existe pas", 401)
        const token = jwt.sign({id: user.id}, secret, {expiresIn: '12h'});
        await prisma.core_user.update({where:{email: data.email}, data:{token: token}})
        return {success: true, token: token}
    }

    async sendMail(email: string, token: string){
        console.log("sendMail", email, token)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kazado.noreply@gmail.com',
                pass: 'ydut joro ykui qgoo'
            }
        });
        await transporter.sendMail({
            from: 'kazado.noreply@gmail.com',
            to: email,
            subject: 'Réinitialisation de mot de passe',
            text: `Bonjour, \n\nVous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour le faire :\n\nhttp://localhost:5173/passwordreset?token=${token}\n\nSi vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.\n\nMerci.`
        });
        return {success: true, message: "Un mail a été envoyé pour réinitialiser votre mot de passe"}
    }

    async passwordReset(data: any, rep: FastifyReply){
        const CrypPass = await bcrypt.hash(data.password, 10);
        await prisma.core_user.update({where:{token: data.token}, data:{password: CrypPass, token: null}})
        return {success: true, message: "Mot de passe réinitialisé avec succès"}
    }

}
