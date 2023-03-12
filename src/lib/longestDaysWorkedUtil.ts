import {
	Row,
	longest_overlap_on_all_projects
} from "collection-util"
import EmployeeRelationship from "../types/employeeRelationship"
import { parseEmployeeRelationship } from "./wasmParser"


const calculateLongestDaysWorked = (data: Array<Row>): EmployeeRelationship[] => {
	return parseEmployeeRelationship(JSON.parse(longest_overlap_on_all_projects(data)))
}
export default calculateLongestDaysWorked
