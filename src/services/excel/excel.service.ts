import { Injectable } from '@nestjs/common'
import * as excel from 'exceljs'

@Injectable()
export class ExcelService {
  async read(filePath: string) {
    console.log(filePath)
    const workbook = new excel.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet(1)

    const data = []
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      const rowData = [];
      row.eachCell({ includeEmpty: true }, (cell) => {
        rowData.push(cell.value);
      });
      data.push(rowData);
    });
    return data
  }

  async read2Json(filePath: string) {
    const data = await this.read(filePath)
    const json = []
    for (let i = 1; i < data.length; i++) {
      const tmp = {}
      for (let [j, v] of data[i].entries()) {
        tmp[data[0][j]] = v
      }
      json.push(tmp)
    }
    return json
  }
}
