// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class GroupsController {
  /**
* @swagger
* /groups:
*   get:
*     tags:
*       - Group
*     summary: Group API lists
*     responses:
*       200:
*         description: Group lists
*/
  public async index({ response }) {
    const groups = await Group.all()

    return response.ok(groups)
  }
  /**
* @swagger
* /groups:
*   post:
*     tags:
*       - Group
*     summary: Group API create
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
*         description: Group lists
*/
  public async store({ request, response }) {
    const groupSchema = schema.create({
      idstring: schema.string({ trim: true }),
      timestring: schema.string({ trim: true }),
      action: schema.string({ trim: true }),
      url: schema.string({ trim: true }),
    })

    const payload: any = await request.validate({ schema: groupSchema })
    const group: Group = await Group.create(payload)

    return response.ok(group)
  }

  public async show({ params, response }) {
    const { id }: { id: String } = params

    const group: any = await Group.query().preload('sources').where({datestring: id}).orderBy('id')
    if (!group) {
      return response.notFound({ message: 'group not found' })
    }
    return response.ok(group.map((x) => x.serialize()))
  }
  public async update({ request, params, response }) {
    const groupSchema = schema.create({
      idstring: schema.string({ trim: true }),
      timestring: schema.string({ trim: true }),
      action: schema.string({ trim: true }),
      url: schema.string({ trim: true }),
    })

    const payload: any = await request.validate({ schema: groupSchema })

    const { id }: { id: Number } = params

    const group: any = await Group.find(id)
    if (!group) {
      return response.notFound({ message: 'group not found' })
    }

    group.title = payload.title
    group.content = payload.content

    await group.save()

    return response.ok(group)
  }
  public async destroy({ params, response }) {
    const { id }: { id: Number } = params

    const group: any = await Group.find(id)
    if (!group) {
      return response.notFound({ message: 'group not found' })
    }

    await group.delete()

    return response.ok({ message: 'group deleted successfully.' })
  }
}
