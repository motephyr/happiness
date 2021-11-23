// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'
import Older from 'App/Models/Older'

export default class NursesController {

  public async nurse({ view, params }) {
    const olders = await Older.query()

    return view.render('nurse/nurse', { params, olders })
  }

  public async setOlderId({ request, params, response }) {
    const { older_id }: { older_id: Number } = request.all()
    const { group_id }: { group_id: Number } = params

    const group: any = await Group.find(group_id)
    if (!group) {
      return response.notFound({ message: 'group not found' })
    }
    group.olderId = older_id

    await group.save()

    return response.redirect().back()
  }

}