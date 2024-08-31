import { PrismaGetRepository } from "../../repositories/prisma-get-repository.js";
import { DoesNotExistMeasure } from "../../use-cases/errors/does-not-exists-measure.js";
import { GetMeasureUseCase } from "../../use-cases/get-measure-use-case.js";
import { FastifyReply, FastifyRequest } from "fastify";

import z, { ZodError } from 'zod'


export async function GetMeasureController(request: FastifyRequest, reply: FastifyReply) {


    const RequestParamsSchema = z.object({
        customer_code: z.string({message: "Customer code não informado"})
    })

    //TO DO: Check if enum will be supported
    const QueryParamsSchema = z.object({
        type: z.enum(['WATER', 'GAS']).optional()
    })


    try {

        const {customer_code} = RequestParamsSchema.parse(request.params)
        const {type} = QueryParamsSchema.parse(request.query)

        const repository = new PrismaGetRepository()
        const useCase = new GetMeasureUseCase(repository)

        const measures = await useCase.execute({ customer_code, type })

        reply.status(200).send({ customer_code, measures })
    } catch(error) {
        if(error instanceof ZodError) {
            reply.status(400).send({
                error_code: "INVALID_TYPE",
                error_description: "Tipo de medição não permitida"
            })
        }

        if(error instanceof DoesNotExistMeasure) {
            reply.status(404).send({
                error_code: "MEASURES_NOT_FOUND",
                error_description: error.message
            })
        }

        reply.status(500).send({message: 'Erro interno do servidor'})
    }
}