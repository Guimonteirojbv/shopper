import { PrismaUploadRepository } from "@/repositories/prisma-uploads-repository";
import { UploadUseCase } from "@/use-cases/upload-image-use-case";
import  { FastifyReply, FastifyRequest } from "fastify";


export async function ReadController(request: FastifyRequest, reply: FastifyReply) {

    try {
        const repository = new PrismaUploadRepository()
        const useCase = new UploadUseCase(repository)

        await useCase.execute(request)
    } catch (error) {
        console.log(error)
    }

}