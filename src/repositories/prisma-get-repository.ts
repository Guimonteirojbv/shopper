import { Measure } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { GetRepository } from "./get-repository";


export class PrismaGetRepository implements GetRepository {
    getByCustomerId(customerId: string, type?: string): Promise<Measure[] | null> {
       
       const filters : any = {
        customer_code: {equals: customerId}
       }

       if(type && type.trim().length > 0) {
            filters.measure_type = { equals: type}
       }
       
       const measure = prisma.measure.findMany({
        where: filters,
    })

       return measure
    }
    
}