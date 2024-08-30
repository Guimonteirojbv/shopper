import { Measure } from "@prisma/client";


export interface GetByCodeRepository {
    getByCode(customer_code: string, type: string): Promise<Measure[] | null>
}