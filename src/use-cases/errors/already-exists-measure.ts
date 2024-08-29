export class AlreadyExistsMeasure extends Error {
    constructor() {
        super('Leitura do mês já realizada')
    }
}