import { FastifyInstance } from 'fastify';
import * as NotificationSchema from './Notification_schema';
import { NotificationController } from './Notification_controllers';
import { NotificationService } from './Notification_service';

export async function Notification(fastify: FastifyInstance) {
    const service = new NotificationService();
    const controller = new NotificationController(service);

    fastify.get('/test', {schema: {response: {200: NotificationSchema.test}}, prehandler: ...},
    test.contro)
}
