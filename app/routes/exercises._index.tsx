import { useState } from 'react'
import Exercise from '~/components/Exercise'
import { useExercises } from '~/context/ExerciseContext'
import PaginationNextIcon from '~/icons/PaginationNextIcon'
import PaginationPrevious from '~/icons/PaginationPreviousIcon'

const ExercisesIndexRoute = () => {
  const [showSelectedExercises, setShowSelectedExercises] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { exercises } = useExercises()

  const exercisesPerPage = 12

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleShowSelectedExercisesChange = () => {
    setShowSelectedExercises((prev) => !prev)
    setCurrentPage(1)
  }

  const filteredExercises = showSelectedExercises
    ? exercises.filter((exercise) => exercise.isSelected)
    : exercises.filter((exercise) => !exercise.isSelected)

  const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage)

  const currentExercises = filteredExercises.slice(
    (currentPage - 1) * exercisesPerPage,
    currentPage * exercisesPerPage
  )

  return (
    <div className='p-8'>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mb-8'>
        <div className='col-span-1'></div>
        <h1 className='col-span-1 text-4xl font-bold text-center pb-8 md:pb-0'>
          Exercises
        </h1>
        <div className='col-span-1 flex justify-center'>
          <button
            className='px-4 py-2 bg-button-bg-light text-button-text-light rounded-md shadow-md font-semibold hover:bg-button-bg-hover-light dark:bg-button-bg-dark dark:text-button-text-dark dark:hover:bg-button-bg-hover-dark transition-colors duration-300'
            onClick={handleShowSelectedExercisesChange}
          >
            {showSelectedExercises
              ? 'Show All Exercises'
              : 'Show Workout Exercises'}
          </button>
        </div>
      </div>
      {currentExercises.length !== 0 && (
        <div className='flex justify-center mt-8 mb-5'>
          <button
            className='flex items-center justify-center w-12 h-12 m-2 bg-button-bg-light text-button-text-light rounded-full hover:bg-button-bg-hover-light dark:bg-button-bg-dark dark:text-button-text-dark dark:hover:bg-button-bg-hover-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <PaginationPrevious />
          </button>
          <div className='flex items-center'>
            <span className='px-4 mx-1 text-primary-dark dark:text-primary-light font-semibold'>
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <button
            className='flex items-center justify-center w-12 h-12 m-2 bg-button-bg-light text-button-text-light rounded-full hover:bg-button-bg-hover-light dark:bg-button-bg-dark dark:text-button-text-dark dark:hover:bg-button-bg-hover-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <PaginationNextIcon />
          </button>
        </div>
      )}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {currentExercises.map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} mode='preview' />
        ))}
      </div>
    </div>
  )
}

export default ExercisesIndexRoute
