import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_doctor/doctor/lab/')({
  component: LabResultsTable
})

const labResults = [
  {
    id: '001',
    orderDate: '2024-08-01',
    name: 'John Doe',
    result: 'Positive',
    physician: 'Dr. Smith',
    tag: 'Blood Test'
  },
  {
    id: '002',
    orderDate: '2024-08-05',
    name: 'Jane Doe',
    result: 'Negative',
    physician: 'Dr. Johnson',
    tag: 'Urinalysis'
  },
  {
    id: '003',
    orderDate: '2024-08-12',
    name: 'Alice Brown',
    result: 'Positive',
    physician: 'Dr. Lee',
    tag: 'X-Ray'
  },
  {
    id: '004',
    orderDate: '2024-08-15',
    name: 'Bob White',
    result: 'Negative',
    physician: 'Dr. Adams',
    tag: 'CT Scan'
  },
  {
    id: '005',
    orderDate: '2024-08-20',
    name: 'Charlie Black',
    result: 'Positive',
    physician: 'Dr. Clark',
    tag: 'MRI'
  },
  {
    id: '006',
    orderDate: '2024-08-22',
    name: 'Diana Green',
    result: 'Negative',
    physician: 'Dr. Wilson',
    tag: 'Echocardiogram'
  },
  {
    id: '007',
    orderDate: '2024-08-25',
    name: 'Edward Grey',
    result: 'Positive',
    physician: 'Dr. Lewis',
    tag: 'Ultrasound'
  },
  {
    id: '008',
    orderDate: '2024-08-28',
    name: 'Fiona Blue',
    result: 'Negative',
    physician: 'Dr. King',
    tag: 'Electrocardiogram'
  },
  {
    id: '009',
    orderDate: '2024-08-30',
    name: 'George Red',
    result: 'Positive',
    physician: 'Dr. Scott',
    tag: 'Allergy Test'
  },
  {
    id: '010',
    orderDate: '2024-09-01',
    name: 'Hannah Orange',
    result: 'Negative',
    physician: 'Dr. Wright',
    tag: 'Hematology'
  }
]

function LabResultsTable() {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Lab Results</h1>
      <div className="overflow-x-auto scrollbar-none">
        <table className="min-w-full divide-y divide-gray-200 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lab ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Result
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Physician
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tag
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {labResults.map((result) => (
              <tr key={result.id} className="hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {result.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.orderDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.result}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.physician}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.tag}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
