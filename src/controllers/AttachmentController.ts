import Attachment from "../models/Attachment";
import { AttachmentService } from "../services/AttachmentService";

export default class AttachmentController {
    public constructor(public attachmentService: AttachmentService) { }

    async create(attachments: { title: string, url: string }[], patientId: number): Promise<Attachment[]> {
        try {
            return await this.attachmentService.create(attachments, patientId)
        } catch (error) {
            throw (error);
        }
    }
}