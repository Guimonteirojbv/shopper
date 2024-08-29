

interface ConfirmImageRequest {
    measure_uuid: string;
    confirmed_value: number;
}

export class ConfirmImageUseCase {
    constructor(repository: any) {}

    async execute({measure_uuid, confirmed_value} : ConfirmImageRequest) {
        
    }
}