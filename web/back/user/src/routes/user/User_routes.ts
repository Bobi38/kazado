import { FastifyInstance } from 'fastify';
import * as UserSchema from './User_schema';
import { UserController } from './User_controllers';
import { UserService } from './User_service';

export async function User(fastify: FastifyInstance) {
    const service = new UserService();
    const controller = new UserController(service);

    fastify.post('/register', {schema: {body: UserSchema.UserPost, response: {200: UserSchema.UserReturnMess}}},
    controller.post)
    fastify.post('/login', {schema: {body: UserSchema.UserLogin, response: {200: UserSchema.UserReturnMess}}},
    controller.login)
}
