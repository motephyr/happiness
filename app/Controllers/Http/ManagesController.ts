// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Source from 'App/Models/Source'

export default class ManagesController {
  public async manage({ request, view, params }) {
    let sources = await Source.query().where({ datestring: params.datestring })
    sources = sources.map((source) => source.serialize())

    return view.render('manage', { sources, params })
  }
}
