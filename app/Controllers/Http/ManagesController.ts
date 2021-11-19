// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Source from 'App/Models/Source'
import Group from 'App/Models/Group'


export default class ManagesController {
  public async manage({ view, params }) {
    return view.render('manage/manage', { params })
  }

  public async createGroup({ request, response, params }) {
    let { sourceId, remark } = request.all()
    let datestring = params.datestring

    const source1: any = await Source.find(sourceId[0])
    const source2: any = await Source.find(sourceId[1])

    const duringtime = Math.abs(parseInt(source1.timestring) - parseInt(source2.timestring)).toString()
    const group: Group = await Group.create({ remark, duringtime, datestring })

    source1.groupId = group.id
    await source1.save()

    source2.groupId = group.id
    await source2.save()
    return response.redirect().back()
  }

  public async resetData({ response, params }) {
    let datestring = params.datestring
      await Source.query().where({ datestring }).update({ group_id: null })
      await Group.query().where({ datestring }).delete()
    return response.ok({ message: 'Group reset successfully.' })

  }
}
