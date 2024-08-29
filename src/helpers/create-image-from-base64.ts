import fs from 'node:fs'
import {randomUUID} from 'node:crypto'


export  function CreateImageFromBase64(base64: string) {

    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '')

    const imageBuffer = Buffer.from(base64Data, 'base64')
    
    const RandomCode = randomUUID()

    const outputPath = `tmp/images/${RandomCode}-output-image.png`



    try {
        fs.writeFileSync(outputPath, imageBuffer) 

        return outputPath

    } catch (error) {
        console.error("Erro ao criar a imagem", error)
        return null
    }


}