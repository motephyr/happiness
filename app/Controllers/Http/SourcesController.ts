// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Source from 'App/Models/Source'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import ImportService from 'App/Services/ImportService'


export default class SourcesController {
  /**
* @swagger
* /sources:
*   get:
*     tags:
*       - Source
*     summary: Source API lists
*     responses:
*       200:
*         description: Source lists
*/
  public async index({ response }) {
    const sources = await Source.all()

    return response.ok(sources)
  }
  /**
* @swagger
* /sources:
*   post:
*     tags:
*       - Source
*     summary: Source API create
 *     parameters:
  *       - name: idstring
  *         description: idstring
  *         in: query
  *         required: true
  *         type: string
   *       - name: timestring
  *         description: timestring
  *         in: query
  *         required: true
  *         type: string
  *       - name: action
  *         description: action
  *         in: query
  *         required: true
  *         type: string
  *       - name: url
  *         description: url
  *         in: query
  *         required: true
  *         type: string
*     responses:
*       200:
*         description: Source lists
*/
  public async store({ request, response }) {
    const sourceSchema = schema.create({
      idstring: schema.string({ trim: true }),
      timestring: schema.string({ trim: true }),
      action: schema.string({ trim: true }),
      url: schema.string({ trim: true }),
    })

    const payload: any = await request.validate({ schema: sourceSchema })
    const source: Source = await Source.create(payload)

    return response.ok(source)
  }

  public async show({ params, response }) {
    const { id }: { id: String } = params

    const source: any = await Source.query().where({datestring: id}).orderBy('timestring')
    if (!source) {
      return response.notFound({ message: 'source not found' })
    }

    return response.ok(source)
  }
  public async update({ request, params, response }) {
    const sourceSchema = schema.create({
      idstring: schema.string({ trim: true }),
      timestring: schema.string({ trim: true }),
      action: schema.string({ trim: true }),
      url: schema.string({ trim: true }),
    })

    const payload: any = await request.validate({ schema: sourceSchema })

    const { id }: { id: Number } = params

    const source: any = await Source.find(id)
    if (!source) {
      return response.notFound({ message: 'source not found' })
    }

    source.title = payload.title
    source.content = payload.content

    await source.save()

    return response.ok(source)
  }
  public async destroy({ params, response }) {
    const { id }: { id: Number } = params

    const source: any = await Source.find(id)
    if (!source) {
      return response.notFound({ message: 'source not found' })
    }

    await source.delete()

    return response.ok({ message: 'source deleted successfully.' })
  }

  public async upload({ request, response }) {
    const upload = request.file('upload')
    let dir = 'upload/'

    if (upload) {
      await upload.move(Application.tmpPath(dir))
    }
    let send = await ImportService.ImportClassification('tmp/' + dir + upload.fileName)
    return response.ok({ message: 'source upload successfully.' })
  }
}
