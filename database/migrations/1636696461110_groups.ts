import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Groups extends BaseSchema {
  protected tableName = 'groups'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('datestring')
      table.index('datestring')

    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex('datestring')
      table.dropColumn('datestring')
    })
  }
}
