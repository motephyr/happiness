// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Source from 'App/Models/Source'
import Group from 'App/Models/Group'
import Database from '@ioc:Adonis/Lucid/Database'


export default class ManagesController {
  public async manage({ request, view, params }) {
    return view.render('manage', { params })
  }

  public async createGroup({ request, response }) {
    let { sourceId, remark } = request.all()

    await Database.transaction(async (trx) => {
      const source1: any = await Source.find(sourceId[0])
      const source2: any = await Source.find(sourceId[1])

      const duringtime = Math.abs(parseInt(source1.timestring) - parseInt(source2.timestring))
      const group: Group = await Group.create({ remark, duringtime })

      source1.groupId = group.id
      await source1.save()

      source2.groupId = group.id
      await source2.save()
    })
    return response.redirect().back()
  }
}
