import { Measure } from "@prisma/client";



export interface ConfirmRepository {
    getByMeasureId(id: string): Promise<Measure | null>;
    confirmMeasureValue(measure_uuid: string, confirmed_value: number): Promise<{ sucess: boolean}>	
}