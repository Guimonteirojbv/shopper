import { Prisma, Measure } from "@prisma/client";

export interface UploadRepository {
    create(data: Prisma.MeasureCreateInput): Promise<Measure | null>
}