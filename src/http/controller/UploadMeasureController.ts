import { PrismaUploadRepository } from "@/repositories/prisma-uploads-repository";
import { UploadUseCase } from "@/use-cases/upload-image-use-case";
import  { FastifyReply, FastifyRequest } from "fastify";

import z, { ZodError } from 'zod'
import {Base64} from 'js-base64'
import { AlreadyExistsMeasure } from "@/use-cases/errors/already-exists-measure";

export async function UploadMeasureController(request: FastifyRequest, reply: FastifyReply) {

    const data = z.object({
        image: z.string(),
        customer_code: z.string({message: "customer_code must be a string but received other type"}),
        measure_datetime: z.string({message: "date must be a string of Date but received other type"}).transform((dateString) => {
            const date = new Date(dateString)
            if(isNaN(date.getTime())) {
                throw new Error('Invalid datetime Format')
            }
            return date;
        }),
        measure_type: z.enum(["WATER", "GAS"])
    })
    
    try {
       
        const {
            image, 
            customer_code, 
            measure_datetime, 
            measure_type
        } = data.parse(request.body)


        const repository = new PrismaUploadRepository()
        const useCase = new UploadUseCase(repository)

        const response = await useCase.execute(
            {
                image, customer_code, measure_datetime, measure_type
            }
        )

        const partialResponse = {
            image_url: response?.image_url,
            measure_value: response?.measure_value,
            measure_uuid: response?.measure_uuid
        }

        reply.status(200).send(partialResponse)

    } catch (error) {

       if(error instanceof ZodError) {
        reply.status(400).send({
            error_code: "INVALID_DATA",
            error_description: error.errors[0].message,
        })
       }

       if(error instanceof AlreadyExistsMeasure) {
        reply.status(409).send({
                error_code: "INVALID_DATA",
                error_description: error.message,
        })
       }

       reply.status(500).send({ message: 'Erro interno do servidor'})
    }

}