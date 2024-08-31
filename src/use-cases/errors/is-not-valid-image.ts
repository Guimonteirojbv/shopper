export class IsNotValidImage extends Error {
    constructor() {
        super("Imagem não representa um hidrômetro ou um gasômetro")
    }
}