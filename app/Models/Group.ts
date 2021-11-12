import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Source from 'App/Models/Source'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Source)
  public groups: HasMany<typeof Source>

  @column()
  public remark: string

  @column()
  public name: string

  @column()
  public duringtime: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
