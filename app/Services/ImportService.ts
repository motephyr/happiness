import Excel from 'exceljs'
import Source from 'App/Models/Source'
import Group from 'App/Models/Group'

export default class ImportService {
  public static async ImportClassification(filelocation) {
    Group.truncate(true)

    Source.truncate(true)
    let newworkbook = new Excel.Workbook()

    let workbook = await newworkbook.csv.readFile(filelocation)

    let today = new Date()
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    workbook.eachRow(async (row, rowNumber) => {
      if (rowNumber >= 2) {
        let values = JSON.parse(JSON.stringify(row.values))

        if (values[3] !== -1) {
          let idstring = values[2] //get cell and the row
          let datestring = yyyy + mm + dd
          let timestring = values[1]
          let action = values[4] ? values[4] : values[7]
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
        }
      }
    })
  }
}