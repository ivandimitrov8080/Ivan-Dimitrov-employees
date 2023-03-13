const TableRowLimit: React.FC<{ limit: number, setLimit: Function }> = ({ limit, setLimit }) => {

  return (
    <div className="flex items-center flex-col space-y-10">
      <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Row limit (higher values will take longer to render)</label>
      <input onChange={(e) => { setLimit(e.target.value) }} type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Row limit" required value={limit} />
      <div className="flex items-center h-5">
        <input onChange={(e) => { e.target.checked ? setLimit(-1) : setLimit(10) }} id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
      </div>
      <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Unlimited rows (will take longer to render for large amounts of data)</label>
    </div>
  )
}
export default TableRowLimit
