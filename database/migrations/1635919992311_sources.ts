import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sources extends BaseSchema {
  protected tableName = 'sources'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('datestring')
      table.string('space')

    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('datestring')
      table.dropColumn('space')
    })
  }
}
