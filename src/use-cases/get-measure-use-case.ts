import { GetRepository } from "../repositories/get-repository.js";
import { DoesNotExistMeasure } from "./errors/does-not-exists-measure.js";

interface GetMeasureRequest {
    customer_code: string;
    type: string | undefined; 
}

export class GetMeasureUseCase {
    constructor(private getMeasuresRepository: GetRepository) {}

    async execute({ customer_code, type } : GetMeasureRequest)  {

        if(!customer_code)  throw new Error("É necessário informar o código do customer")

        const measures = await this.getMeasuresRepository.getByCustomerId(customer_code, type);

        if(measures?.length === 0) throw new DoesNotExistMeasure()

        return measures
    }

}