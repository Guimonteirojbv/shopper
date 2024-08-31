import { Prisma, Measure } from "@prisma/client";
import { UploadRepository } from "./upload-repository.js";
import { prisma } from "../lib/prisma.js";


export class PrismaUploadRepository implements UploadRepository {
    create(data: Prisma.MeasureCreateInput): Promise<Measure | null> {
       const measure = prisma.measure.create({data})

       return measure
    }
    
}