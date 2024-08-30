import { PrismaConfirmRepository } from "@/repositories/prisma-confirm-repository";
import { ConfirmImageUseCase } from "@/use-cases/confirm-image-use-case";
import { MeasureAlreadyConfirmed } from "@/use-cases/errors/measure-already-confirmed";
import { FastifyReply, FastifyRequest } from "fastify";
import { title } from "process";
import z, { ZodError } from 'zod'

export async function ConfirmMeasureController(request: FastifyRequest, reply: FastifyReply) {

    const requestBodySchema = z.object({
        measure_uuid: z.string({message: "measure_uuid recebeu um tipo diferente do tipo string."}),
        confirmed_value: z.number({message: "confirmed_value recebeu um tipo diferente do tipo number."})
    })

   

    try {

        const { measure_uuid, confirmed_value } = requestBodySchema.parse(request.body)
        const repository = new PrismaConfirmRepository()
        const useCase = new ConfirmImageUseCase(repository)
        
        const response = await useCase.execute({measure_uuid, confirmed_value})

        reply.status(200).send(response)
    } catch (error) {
        if(error instanceof ZodError) {
            reply.status(400).send({
                error_code: "INVALID_DATA",
                error_description: error.message
            })
        }

        if(error instanceof MeasureAlreadyConfirmed) {
            reply.status(409).send({
                error_code: "CONFIRMATION_DUPLICATE",
                error_description: error.message
            })
        }
    }


}