import Excel from 'exceljs'
import Source from 'App/Models/Source'

export default class ImportService {
  public static async ImportClassification(filelocation) {
    let workbook = new Excel.Workbook()

    workbook = await workbook.csv.readFile(filelocation)
    Source.truncate()

    workbook.eachRow(async (row, rowNumber) => {
      if (rowNumber >= 2) {
        let values = JSON.parse(JSON.stringify(row.values))
        console.log(values)
        if (values[3] !== -1) {
          let idstring = values[2] //get cell and the row
          let datestring = values[1]
          let timestring = values[4] || values[5] || values[6] || values[7]

          let action = (values[4] || values[6]) ? 'come' : 'go'
          let space = (values[4] || values[5]) ? '0' : '1'

          let category = null
          let url = values[8]

          //custom field name in database to variable
          let inputsource = {
            idstring,
            datestring,
            timestring,
            action,
            space,
            category,
            url
          }

          await Source.create(inputsource)
        }
      }
    })
  }
}