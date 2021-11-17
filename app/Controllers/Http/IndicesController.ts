// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Source from 'App/Models/Source'

export default class IndicesController {
  public async index({ view }) {

    let sourcesquery = await Source.query().distinct('datestring')
    let sources = sourcesquery.map((source) => source.serialize())
    return view.render('index', { sources })
  }
}
