import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Source from 'App/Models/Source'
import Older from 'App/Models/Older'


export default class Group extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Source)
  public sources: HasMany<typeof Source>

  @column()
  public olderId: number

  @belongsTo(() => Older)
  public older: BelongsTo<typeof Older>

  @column()
  public remark: string

  @column()
  public name: string

  @column()
  public datestring: string

  @column()
  public duringtime: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
