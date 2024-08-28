

interface UploadImageRequest {
    image: string;
    customer_code: string;
    measure_datetime: Date;
    measure_type: "WATER" | "GAS"
}

export class UploadUseCase {
    constructor(repository) {}
    async execute({
        image, customer_code, measure_datetime, measure_type
    } : UploadImageRequest) {

        if()
        //TO DO VALIDATIONS OF REQUEST



    }
}