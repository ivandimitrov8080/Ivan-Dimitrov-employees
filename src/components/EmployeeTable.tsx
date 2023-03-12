import EmployeeRelationship from "../types/employeeRelationship"

const EmployeeTable: React.FC<{ employeeRelationships: EmployeeRelationship[] | undefined }> = ({ employeeRelationships }) => {

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="th1">
              Employee ID #1
            </th>
            <th scope="col" className="th2">
              Employee ID #2
            </th>
            <th scope="col" className="th1">
              Project ID
            </th>
            <th scope="col" className="th2">
              Days Worked On Project
            </th>
            <th scope="col" className="th1">
              Total Days Worked
            </th>
          </tr>
        </thead>
        <tbody>
          {employeeRelationships ?
            employeeRelationships.map(r => (
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="td1">{r.eid1}</td>
                <td className="td2">{r.eid2}</td>
                <td className="td1">{r.projects.map(p => (<div>{p.pid}<br /></div>))}</td>
                <td className="td2">{r.projects.map(p => (<div>{p.daysWorked}<br /></div>))}</td>
                <td className="td1">{r.totalDaysWorked}</td>
              </tr>
            )) :
            null}
        </tbody>
      </table>
    </div>

  )
}

export default EmployeeTable
