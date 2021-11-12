import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Groups extends BaseSchema {
  protected tableName = 'groups'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('remark')
      table.string('name')
      table.string('duringtime')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable('sources', (table) => {
      table.integer('group_id').unsigned().references('groups.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)

    this.schema.alterTable('sources', (table) => {
      table.dropColumn('group_id')
    })
  }
}
