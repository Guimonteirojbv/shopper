import { FastifyInstance } from 'fastify'
import { UploadMeasureController } from './controller/UploadMeasureController.js'
import { ConfirmMeasureController } from './controller/ConfirmMeasureController.js'
import { GetMeasureController } from './controller/GetMeasureController.js'


export async function Routes(app: FastifyInstance) {
    app.post('/upload', UploadMeasureController)
    app.patch('/confirm', ConfirmMeasureController)
    app.get('/:customer_code/list', GetMeasureController)
}