import { FileManager, GenAI } from "../config/geminiconfig.js";
import { CreateImageFromBase64 } from "../helpers/create-image-from-base64.js";
import { GetByIdRepository } from "../repositories/prisma-get-by-code-repository.js";
import { UploadRepository } from "../repositories/upload-repository.js";
import { UploadFileResponse } from "@google/generative-ai/dist/server/server";
import { AlreadyExistsMeasure } from "./errors/already-exists-measure.js";
import { IsNotValidImage } from "./errors/is-not-valid-image.js";


interface UploadImageRequest {
    image: string;
    customer_code: string;
    measure_datetime: Date;
    measure_type: "WATER" | "GAS"
}

export class UploadUseCase {
    constructor(private UploadRepository: UploadRepository) {}

    async execute({
        image, customer_code, measure_datetime, measure_type
    } : UploadImageRequest) {

    

    const VerifyRepository = new GetByIdRepository()

    const response = await VerifyRepository.getByCode(customer_code, measure_type)

    

    if(response && response.length > 0) throw new AlreadyExistsMeasure()


    const ImagePath = CreateImageFromBase64(image)

    if(!ImagePath) throw new Error('Invalid image')

    const ImageGemini = await this.UploadImageInGemini(ImagePath)

    const Content = await this.GenerateContent(ImageGemini, measure_type)
 
    const transformContentInNumber = Number(Content)


    if(isNaN(transformContentInNumber)) throw new Error("Resultado inesperado, tente novamente ou tente enviar uma imagem mais nítida")

    if(transformContentInNumber === 400) throw new IsNotValidImage()
    
    
    const createMeasure = this.UploadRepository.create(
        {
            customer_code,
            measure_type,
            image_url: ImagePath,
            measure_datetime,
            measure_value: transformContentInNumber
        }
    )

        return createMeasure

    }




   private async  UploadImageInGemini(filePath: string) {
        const uploadFile = await FileManager.uploadFile(filePath, {
            mimeType: "image/png",
            displayName: 'Customer measure'
        })
    
        return uploadFile
    }
    
   private async  GenerateContent(imageGemini: UploadFileResponse, type: string) {
        const model = GenAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });
    
        const result = await model.generateContent([
            {
                fileData:{
                    mimeType: 'image/png',
                    fileUri: imageGemini.file.uri
                }
            },
            {
                text: `
                    Verifique se a imagem é um hidrômetro ou um gasômetro, se sim me retorne apenas o valor da leitura. Se não me retorne o número 400
                    `
            }
        ])
    
        return result.response.text();
    
    }
}


