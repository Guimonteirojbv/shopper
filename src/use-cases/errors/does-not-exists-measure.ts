export class DoesNotExistMeasure extends Error {
    constructor() {
        super('Nenhuma leitura encontrada')
    }
}