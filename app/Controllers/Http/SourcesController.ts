// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Source from 'App/Models/Source'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class SourcesController {
  public async index({ response }) {
    const sources = await Source.all()

    return response.ok(sources)
  }

  public async store({ request, response }) {
    const sourceSchema = schema.create({
      idstring: schema.string({ trim: true }),
      timestring: schema.string({ trim: true }),
      action: schema.string({ trim: true }),
      category: schema.string({ trim: true }),
      url: schema.string({ trim: true }),
    })

    const payload: any = await request.validate({ schema: sourceSchema })
    const source: Source = await Source.create(payload)

    return response.ok(source)
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params

    const source: any = await Source.find(id)
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
      category: schema.string({ trim: true }),
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
}
