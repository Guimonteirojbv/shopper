import { ConfirmRepository } from "@/repositories/confirm-repository";
import { DoesNotExistMeasure } from "./errors/does-not-exists-measure";
import { MeasureAlreadyConfirmed } from "./errors/measure-already-confirmed";


interface ConfirmImageRequest {
    measure_uuid: string;
    confirmed_value: number;
}

export class ConfirmImageUseCase {
    constructor(private repository: ConfirmRepository) {}

    async execute({measure_uuid, confirmed_value} : ConfirmImageRequest) {

        const exits = await this.repository.getByMeasureId(measure_uuid);

        if(!exits) throw new DoesNotExistMeasure()

           
        if(exits.is_confirmed === true) throw new MeasureAlreadyConfirmed()

        const confirmed = await this.repository.confirmMeasureValue(measure_uuid, confirmed_value)

       return confirmed
    }
}