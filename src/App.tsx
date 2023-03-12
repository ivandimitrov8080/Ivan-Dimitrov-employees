import { ChangeEvent, useState } from 'react';
import parse from './lib/csvParser';
import calculateLongestDaysWorked from './lib/longestDaysWorkedUtil';
import { Row } from 'collection-util'
import EmployeeTable from './components/EmployeeTable';
import EmployeeRelationship from './types/employeeRelationship';
import Spinner from './components/Spinner';
import FileUpload from './components/FileUpload';

const App: React.FC<{}> = () => {

  const [employeeRelationships, setEmployeeRelationships] = useState<EmployeeRelationship[]>()
  const [loading, setLoading] = useState(false)

  const chooseFile = (e: ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement
    if (target.files) {
      parse(target.files, (r: Array<Row>) => {
        setLoading(true)
        processData(r)
      })
    }
  }

  const processData = (r: Array<Row>) => {
    setTimeout(() => {
      setEmployeeRelationships(calculateLongestDaysWorked(r))
      setLoading(false)
    }, 0)
  }

  const table = () => {
    return (<EmployeeTable employeeRelationships={employeeRelationships} />)
  }

  const fileUpload = () => {
    return (<FileUpload chooseFile={chooseFile} />)
  }

  const ui = () => {
    return employeeRelationships ? table() : fileUpload()

  }

  return (
    <div className='ctnr'>
      {loading ? <Spinner /> : ui()}
    </div>
  )
}

export default App
