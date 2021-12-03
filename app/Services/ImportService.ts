import Excel from 'exceljs'
import Source from 'App/Models/Source'
import Group from 'App/Models/Group'

export default class ImportService {
  public static async ImportClassification(filelocation, datestring) {
    let newworkbook = new Excel.Workbook()

    let workbook = await newworkbook.csv.readFile(filelocation)

    await Source.query().where({ datestring }).delete()
    await Group.query().where({ datestring }).delete()

    workbook.eachRow(async (row, rowNumber) => {
      if (rowNumber >= 2) {
        let values = JSON.parse(JSON.stringify(row.values))

        let idstring = values[2] //get cell and the row
        let timestring = values[1]
        if (values[3] !== -1) {
          let action = values[4] || values[7]
          let space = values[5]
          let url = values[6]

          //custom field name in database to variable
          let inputsource = {
            idstring,
            datestring,
            timestring,
            action,
            space,
            url
          }

          await Source.create(inputsource)
        } else {
          let action = values[7]

          let inputsource = {
            idstring,
            datestring,
            timestring,
            action,
          }

          await Source.create(inputsource)
        }
      }
    })
  }
}