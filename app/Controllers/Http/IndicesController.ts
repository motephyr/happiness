// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Source from 'App/Models/Source'

export default class IndicesController {
  public async index({ view }) {

    let sources = await Source.query().distinct('datestring')
    sources = sources.map((source) => source.serialize())
    return view.render('index', { sources })
  }
}
