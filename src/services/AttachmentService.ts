import Attachment from "../models/Attachment"

export class AttachmentService {
    public constructor() { }
    async create(attachments: { title: string, url: string }[], patientId: number): Promise<Attachment[]> {
        try {
            const createdattachments: Attachment[] = [];
            for (const { title, url } of attachments) {
                const createdattachment = await Attachment.create({
                    PatientId: patientId,
                    title: title,
                    url: url
                });
                createdattachments.push(createdattachment);
            }
            return createdattachments;
        }
        catch (error) {
            throw error;
        }

    }
}












