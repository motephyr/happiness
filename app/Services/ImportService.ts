import Excel from 'exceljs'
import Source from 'App/Models/Source'
import Group from 'App/Models/Group'

export default class ImportService {
  public static async ImportClassification(filelocation) {
    let newworkbook = new Excel.Workbook()

    let workbook = await newworkbook.csv.readFile(filelocation)
    const row = workbook.getRow(2);
    const date = new Date(Number(row.values[1]) * 1000);
    const datestring = `${date.getFullYear()}${(date.getMonth() + 1)}${date.getDate()}`
    await Source.query().where({ datestring }).delete()
    await Group.query().where({ datestring }).delete()

    workbook.eachRow(async (row, rowNumber) => {
      if (rowNumber >= 2) {
        let values = JSON.parse(JSON.stringify(row.values))

        let idstring = values[2] //get cell and the row
        let timestring = values[1]
        if (values[3] !== -1) {
          let action = values[4]
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