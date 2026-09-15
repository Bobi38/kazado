import { FastifyInstance } from 'fastify';
import * as UserSchema from './User_schema';
import { UserController } from './User_controllers';
import { UserService } from './User_service';
import * as H from '../preHandler/hook';

export async function User(fastify: FastifyInstance) {
    const service = new UserService();
    const controller = new UserController(service);

    fastify.post('/register', {schema: {body: UserSchema.UserPost, response: {200: UserSchema.UserReturnMess}},
        preHandler: [H.checkRegister, H.checkName]},
        controller.post)
    fastify.post('/login', {schema: {body: UserSchema.UserLogin, response: {200: UserSchema.UserReturnMess}},
        preHandler: [H.checkMail]},
    controller.login)
    fastify.post('/logout', {schema: {response: {200: UserSchema.UserReturnMess}}},
    controller.logout)
    fastify.post('/passwordforget', {schema: {body: UserSchema.UserForget, response: {200: UserSchema.ReturnToken}},
        preHandler: [H.checkMail]},
    controller.passwordForget)
    fastify.post('/passwordreset', {schema: {body: UserSchema.UserReset, response: {200: UserSchema.UserReturnMess}}},
    controller.passwordReset)
}
