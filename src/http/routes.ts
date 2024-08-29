import { FastifyInstance } from 'fastify'
import { UploadMeasureController } from './controller/UploadMeasureController'
import { ConfirmMeasureController } from './controller/ConfirmMeasureController'
import { GetMeasureController } from './controller/GetMeasureController'


export async function Routes(app: FastifyInstance) {
    app.post('/upload', UploadMeasureController)
    app.patch('/confirm', ConfirmMeasureController)
    app.get('/:customer_code/list', GetMeasureController)
}