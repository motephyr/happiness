import Excel from 'exceljs'
import Source from 'App/Models/Source'

export default class ImportService {
  static async ImportClassification(filelocation) {
    var workbook = new Excel.Workbook()

    workbook = await workbook.csv.readFile(filelocation)
    Source.truncate()

    workbook.eachRow(async (row, rowNumber) => {
      if (rowNumber >= 2) {

      let values = JSON.parse(JSON.stringify(row.values))
      console.log(values[3])
      if (values[3] !== -1) {
        let idstring = values[2] //get cell and the row
        let timestring = values[1]
        let action = null
        let category = null
        let url = values[8]

        //custom field name in database to variable
        let inputsource = {
          idstring,
          timestring,
          action,
          category,
          url
        }

        await Source.create(inputsource)
      }
      }
    })
  }
}