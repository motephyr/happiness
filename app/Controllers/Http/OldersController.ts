import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Older from 'App/Models/Older'
// import { schema } from '@ioc:Adonis/Core/Validator'

export default class OldersController {
  public async index({ view }) {
    const olders = await Older.all()
    return view.render('olders/index', { olders })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('olders/new', { older: {} })
  }

  public async store({ request, response, session }: HttpContextContract) {
    // const data = await this.validateInput(request)

    const older = await Older.create({
      name: request.input('name'),
      room: request.input('room'),
      birthday: request.input('birthday'),
      medicalrecord: request.input('medicalrecord'),
      medicine: request.input('medicine'),
      notice: request.input('notice'),
      pictureurl: request.input('pictureurl'),
    })
    session.flash('notification', 'Older saved.')
    return response.redirect(`/olders/${older.id}`)
  }

  public async show(ctx: HttpContextContract) {
    const older = await Older.findBy('id', ctx.params.id)
    return ctx.view.render('olders/_id', { older })
  }

  public async edit({ view, params }: HttpContextContract) {
    const older = await Older.findBy('id', params.id)
    return view.render('olders/edit', { older: older })
  }

  public async update({ request, params, response, session }: HttpContextContract) {
    // const data = await this.validateInput(request)
    const older = await Older.findByOrFail('id', params.id)
    older.merge({
      name: request.input('name'),
      room: request.input('room'),
      birthday: request.input('birthday'),
      medicalrecord: request.input('medicalrecord'),
      medicine: request.input('medicine'),
      notice: request.input('notice'),
      pictureurl: request.input('pictureurl'),
    })
    await older.save()
    session.flash('notification', 'Older saved.')
    return response.redirect(`/olders/${older.id}`)
  }

  public async destroy({ }: HttpContextContract) { }

  // private async validateInput(request) {
  //   const valSchema = schema.create({
  //     title: schema.string({ trim: true }),
  //     // title: schema.string({ trim: true }, [rules.maxLength(150), rules.required()]),

  //   })

  //   return await request.validate({
  //     schema: valSchema,
  //     messages: {
  //       'title.required': 'Title is required',
  //       'title.maxLength': 'Title allows upto 150 characters',
  //     },
  //   })
  // }
}