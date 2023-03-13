import { ChangeEvent, useEffect, useState } from 'react';
import parse from './lib/csvParser';
import calculateLongestDaysWorked from './lib/longestDaysWorkedUtil';
import { Row } from 'collection-util'
import EmployeeTable from './components/EmployeeTable';
import EmployeeRelationship from './types/employeeRelationship';
import Spinner from './components/Spinner';
import FileUpload from './components/FileUpload';
import init from 'collection-util';
import TableRowLimit from './components/TableRowLimit';

const App: React.FC<{}> = () => {

  const [employeeRelationships, setEmployeeRelationships] = useState<EmployeeRelationship[]>()
  const [loading, setLoading] = useState(true)
  const [rowLimit, setRowLimit] = useState(10)

  const chooseFile = (e: ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement
    if (target.files) {
      setLoading(true)
      parse(target.files, (r: Array<Row>) => {
        processData(r)
      })
    }
  }

  const processData = (r: Array<Row>) => {
    setTimeout(() => {
      setEmployeeRelationships(calculateLongestDaysWorked(r, rowLimit))
      setLoading(false)
    }, 0)
  }

  useEffect(() => {
    init().then(() => {
      setLoading(false)
    })
  })

  const table = () => {
    return (<EmployeeTable employeeRelationships={employeeRelationships} />)
  }

  const fileUpload = () => {
    return (
      <div className='w-full flex space-y-10 flex-col'>
        <TableRowLimit limit={rowLimit} setLimit={setRowLimit} />
        <FileUpload chooseFile={chooseFile} />
      </div>
    )
  }

  const ui = () => {
    return employeeRelationships ? table() : fileUpload()

  }

  return (
    <div className='ctnr dark'>
      {loading ? <Spinner /> : ui()}
    </div>
  )
}

export default App
