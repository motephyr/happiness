import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Source extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idstring: string

  @column()
  public timestring: string

  @column()
  public action: string

  @column()
  public category: string

  @column()
  public url: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}