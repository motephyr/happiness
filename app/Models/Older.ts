import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Group from 'App/Models/Group'


export default class Older extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Group)
  public groups: HasMany<typeof Group>

  @column()
  public name: string

  @column()
  public room: string

  @column()
  public birthday: string

  @column()
  public medicalrecord: string

  @column()
  public medicine: string

  @column()
  public notice: string

  @column()
  public pictureurl: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  sumtime: number[]
}
