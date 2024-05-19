import { useEffect, useState } from 'react'
import Exercise from '~/components/Exercise'
import { useExercises } from '~/context/ExerciseContext'

const ExercisesIndexRoute = () => {
  const [showSelectedExercises, setShowSelectedExercises] = useState(false)
  const { exercises } = useExercises()

  const filteredExercises = showSelectedExercises
    ? exercises.filter((exercise) => exercise.isSelected)
    : exercises.filter((exercise) => !exercise.isSelected)

  return (
    <div className='p-8'>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mb-8'>
        <div className='col-span-1'></div>
        <h1 className='col-span-1 text-4xl font-bold text-center pb-8 md:pb-0'>
          Exercises
        </h1>
        <div className='col-span-1 flex justify-center'>
          <button
            className='px-4 py-2 bg-blue-700 text-white rounded-md shadow-md font-semibold hover:bg-blue-800 transition-colors duration-300'
            onClick={() => setShowSelectedExercises(!showSelectedExercises)}
          >
            {showSelectedExercises
              ? 'Show All Exercises'
              : 'Show Workout Exercises'}
          </button>
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {filteredExercises.map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} mode='preview' />
        ))}
      </div>
    </div>
  )
}

export default ExercisesIndexRoute
