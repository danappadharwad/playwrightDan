import * as fs from "fs";
import { parse } from "csv-parse/sync";
import * as XLSX from "xlsx";

export class DataProvider {
  static readJson(filePath: string) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);
    return data;
  }

  static readCsv(filePath: string) {
    const fileContent = fs.readFileSync(filePath);
    const data = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
    return data;
  }

  static readExcel(filePath: string) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    return data;
  }
}