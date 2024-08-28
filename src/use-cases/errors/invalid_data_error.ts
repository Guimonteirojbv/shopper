export class InvalidDataError extends Error { 
    constructor() {
        super("Os dados fornecidos no corpo da requisição são inválidos")
    }
}