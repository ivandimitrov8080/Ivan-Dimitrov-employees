import ProjectRelationship from "./projectRelationship"

type EmployeeRelationship = {
	eid1: string
	eid2: string
	projects: ProjectRelationship[]
	totalDaysWorked: number
}

export default EmployeeRelationship
