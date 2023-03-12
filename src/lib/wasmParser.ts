import EmployeeRelationship from "../types/employeeRelationship"
import ProjectRelationship from "../types/projectRelationship"


const parseProjects = (arr: []): ProjectRelationship[] => {
	let result: ProjectRelationship[] = []
	for (let item of arr) {
		result.push({
			pid: item[0],
			daysWorked: item[1]
		})
	}
	return result
}

const parseEmployeeRelationship = (arr: []): EmployeeRelationship[] => {
	let result: EmployeeRelationship[] = []
	for (let item of arr) {
		result.push({
			eid1: item[0],
			eid2: item[1],
			projects: parseProjects(item[2]),
			totalDaysWorked: item[3]
		})
	}
	return result
}
export { parseEmployeeRelationship }
