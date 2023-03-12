import { Row } from 'collection-util';
import { csvParse, DSVRowString } from 'd3'
import parseDate from './dateParser';

const trimEntries = (obj: any) => {
	let result: any = {}
	for (let [k, v] of Object.entries(obj)) {
		result[k.trim()] = (v as string).trim()
	}
	return result
}

const parse = (files: FileList, callback: Function) => {
	let reader = new FileReader();
	reader.readAsText(files[0]);
	reader.onload = () => {
		callback(csvParse(reader.result as string, (row: DSVRowString) => {
			row = trimEntries(row)
			let r = new Row()
			r.eid = row.EmpID?.trim() as string
			r.pid = row.ProjectID?.trim() as string
			r.from = parseDate(row.DateFrom?.trim())
			r.to = parseDate(row.DateTo?.trim())
			return r
		})
		)
	}
}
export default parse
