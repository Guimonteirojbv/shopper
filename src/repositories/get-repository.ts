import { Measure } from "@prisma/client";


export interface GetRepository {
    getByCustomerId(customerId: string, type?: string): Promise<Measure[] | null>;
}