import { Form, useSearchParams } from '@remix-run/react'
import { Equipment, Target, BodyPart } from '../types'

interface IFilterProps {
  closeFilter: () => void;
}

const Filter = ({ closeFilter }: IFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSubmit = () => {
    closeFilter()
  }

  const handleClearFilter = () => {
    // Clear all search params
    searchParams.delete('name')
    searchParams.delete('equipment')
    searchParams.delete('target')
    searchParams.delete('bodyPart')
    setSearchParams(searchParams)

    closeFilter()
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md mb-5">
      <Form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={searchParams.get('name') || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Equipment:
          </label>
          <select
            id="equipment"
            name="equipment"
            defaultValue={searchParams.get('equipment') || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Equipment</option>
            {Object.values(Equipment).map((equipment) => (
              <option key={equipment} value={equipment}>
                {equipment}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Target:
          </label>
          <select
            id="target"
            name="target"
            defaultValue={searchParams.get('target') || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Targets</option>
            {Object.values(Target).map((target) => (
              <option key={target} value={target}>
                {target}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="bodyPart" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Body Part:
          </label>
          <select
            id="bodyPart"
            name="bodyPart"
            defaultValue={searchParams.get('bodyPart') || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Body Parts</option>
            {Object.values(BodyPart).map((bodyPart) => (
              <option key={bodyPart} value={bodyPart}>
                {bodyPart}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 md:col-span-4 flex justify-center gap-4">
          <button
            type="submit"
            className="mt-4 px-4 py-2 w-full sm:w-40 bg-button-bg-light text-button-text-light rounded-md shadow-md font-semibold hover:bg-button-bg-hover-light dark:bg-button-bg-dark dark:text-button-text-dark dark:hover:bg-button-bg-hover-dark transition-colors duration-300"
          >
            Apply Filters
          </button>
          <button
          type="button"
          onClick={handleClearFilter}
            className="mt-4 px-4 py-2 w-full sm:w-40 bg-button-bg-light text-button-text-light rounded-md shadow-md font-semibold hover:bg-button-bg-hover-light dark:bg-button-bg-dark dark:text-button-text-dark dark:hover:bg-button-bg-hover-dark transition-colors duration-300"
          >
            Clear Filters
          </button>
        </div>

      </Form>
    </div>
  )
}

export default Filter
