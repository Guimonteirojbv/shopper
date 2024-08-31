import { Measure } from "@prisma/client";
import { ConfirmRepository } from "./confirm-repository.js";
import { prisma } from "../lib/prisma.js";


export class PrismaConfirmRepository implements ConfirmRepository{
    async getByMeasureId(id: string): Promise<Measure | null> {
       const measure =  await prisma.measure.findFirst
        ({
            where: { measure_uuid: id}
        })

        return measure
    }

    async confirmMeasureValue(measure_uuid: string, confirmed_value: number): Promise<{ sucess: boolean}> {
        const confirmed = await prisma.measure.update({
            where: { 
                measure_uuid 
            },
            data: {
                measure_value: confirmed_value,
                is_confirmed: true
            }
        })

        
        if(confirmed) {
            return { sucess: true}
        }
        return {sucess: false}
    }
    
}