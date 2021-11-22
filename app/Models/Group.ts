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


  public get duringtimeToHHMMSS() {
    if (this.duringtime) {
      let sec_num = parseInt(this.duringtime, 10); // don't forget the second param
      let hours: number | string = Math.floor(sec_num / 3600);
      let minutes: number | string = Math.floor((sec_num - (hours * 3600)) / 60);
      let seconds: number | string = sec_num - (hours * 3600) - (minutes * 60);

      if (hours < 10) { hours = "0" + hours; }
      if (minutes < 10) { minutes = "0" + minutes; }
      if (seconds < 10) { seconds = "0" + seconds; }
      return hours + ':' + minutes + ':' + seconds;

    } else {
      return ""
    }
  }

}
