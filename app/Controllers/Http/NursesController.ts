// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Group from 'App/Models/Group'
import Older from 'App/Models/Older'

export default class NursesController {

  public async nurse({ view, params }) {
    const olders = await Older.all()
  
    return view.render('nurse/nurse', { params, olders })
  }

  public async changeName({ request, params, response }) {
    const groupSchema = schema.create({
      name: schema.string({ trim: true })
    })
    const payload: any = await request.validate({ schema: groupSchema })
    const { group_id }: { group_id: Number } = params

    const group: any = await Group.find(group_id)
    if (!group) {
      return response.notFound({ message: 'group not found' })
    }

    group.name = payload.name

    await group.save()

    return response.redirect().back()
  }

}