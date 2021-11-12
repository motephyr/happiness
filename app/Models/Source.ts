import { DateTime } from 'luxon'
import Group from 'App/Models/Group'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

export default class Source extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public groupId: number

  @belongsTo(() => Group)
  public group: BelongsTo<typeof Group>

  @column()
  public idstring: string

  @column()
  public datestring: string

  @column()
  public timestring: string

  @column()
  public action: string

  @column()
  public space: string

  @column()
  public url: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
