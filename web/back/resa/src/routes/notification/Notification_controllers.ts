import { FastifyReply, FastifyRequest } from 'fastify';
import { NotificationService } from './Notification_service';

export class NotificationController{
    constructor (private NotificationService: NotificationService) {}
}
