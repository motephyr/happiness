// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Group from 'App/Models/Group'

export default class NursesController {

  public async nurse({ view, params }) {
    return view.render('nurse', { params })
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
