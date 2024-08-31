import { Measure } from "@prisma/client";
import { GetByCodeRepository } from "./get-by-code-repository.js";
import { prisma } from "../lib/prisma.js";


export class GetByIdRepository implements GetByCodeRepository {
    getByCode(customer_code: string, type: string): Promise<Measure[] | null> {
        const now = new Date();

        const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
        const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999)).toISOString();


        const result =  prisma.measure.findMany({
            where: {
                customer_code,
                measure_type: type,
                measure_datetime: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                }
            },
            
        })

        return result
    }
    
}