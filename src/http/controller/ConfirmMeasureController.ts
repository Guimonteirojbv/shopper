import { PrismaConfirmRepository } from "@/repositories/prisma-confirm-repository";
import { ConfirmImageUseCase } from "@/use-cases/confirm-image-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { validate } from 'uuid'
import z from 'zod'

export async function ConfirmMeasureController(request: FastifyRequest, response: FastifyReply) {

    const requestBodySchema = z.object({
        measure_uuid: z.string().refine(validate),
        confirmed_value: z.number()
    })

    const { measure_uuid, confirmed_value } = requestBodySchema.parse(request.body)

    try {
        const repository = new PrismaConfirmRepository()
        const useCase = new ConfirmImageUseCase(repository)
        
        await useCase.execute({measure_uuid, confirmed_value})
    } catch (error) {
        console.log(error)
    }


}