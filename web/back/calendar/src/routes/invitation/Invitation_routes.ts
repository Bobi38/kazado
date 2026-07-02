import { FastifyInstance } from 'fastify';
import * as InvitationSchema from './Invitation_schema';
import { InvitationController } from './Invitation_controllers';
import { InvitationService } from './Invitation_service';
import * as H from '../preHandler/hook';

export async function Invitation(fastify: FastifyInstance) {
    const service = new InvitationService();
    const controller = new InvitationController(service);

    fastify.get('/send', {schema: {response: {200: InvitationSchema.ReturnData}}},
    controller.getInvitation)
    fastify.get('/waiting', {schema: {response: {200: InvitationSchema.ReturnData}}},
    controller.getInvitationWaiting)
    fastify.patch('/:id', {schema: {response: {200: InvitationSchema.ReturnMessage}}},
    controller.validate)
    fastify.delete('/:id', {schema: {response: {200: InvitationSchema.ReturnMessage}}},
    controller.remove)
}
