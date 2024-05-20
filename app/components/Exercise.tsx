import { Link, useNavigate } from '@remix-run/react'
import { useExercises } from '~/context/ExerciseContext'
import AddIcon from '~/icons/AddIcon'
import GoBackIcon from '~/icons/GoBackIcon'
import RemoveIcon from '~/icons/RemoveIcon'
import { IExercise } from '~/types'

interface IExerciseProps {
  mode: 'preview' | 'full'
  exercise: IExercise
}

const Exercise = ({ mode, exercise }: IExerciseProps) => {
  const { setExercises } = useExercises()
  const navigate = useNavigate()
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const handleClick = () => {
    setExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.id === exercise.id ? { ...ex, isSelected: !ex.isSelected } : ex
      )
    )
  }

  const handleBack = () => {
    navigate(-1)
  }

  // Check if exercises is on the path
  const isExercise =
    typeof window !== 'undefined' &&
    window.location.pathname.includes('exercises')

  return mode === 'preview'
    ? (
    <div className='relative flex flex-col bg-white p-4 rounded-xl shadow-custom-light dark:bg-primary-dark dark:text-white dark:shadow-custom-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300'>
      <Link to={`/exercises/${exercise.id}`}>
        <h2 className='flex-grow font-semibold mb-2 text-center overflow-ellipsis overflow-hidden whitespace-nowrap'>
          {capitalize(exercise.name)}
        </h2>
        <div className='relative mt-4'>
          <img
            className='w-full h-auto rounded'
            src={exercise.gifUrl}
            alt={exercise.name}
          />
        </div>
      </Link>
      <button
        className='mt-5 px-4 py-2 bg-blue-700 text-white font-semibold rounded-md shadow-md hover:bg-blue-800 transition-colors duration-300'
        onClick={handleClick}
      >
        <div className='flex items-center justify-center'>
          {exercise.isSelected ? <RemoveIcon /> : <AddIcon />}
          <span className='ml-2 md:inline-block'>
            {exercise.isSelected ? 'Remove' : 'Add'}
          </span>
        </div>
      </button>
    </div>
      )
    : (
    <>
      <h1 className='text-4xl font-bold mb-8 text-center'>
        {capitalize(exercise.name)}
      </h1>
      <div className='flex flex-col lg:flex-row'>
        <img
          className='w-full lg:w-1/2 h-auto rounded-xl mb-4 lg:mb-0 lg:mr-4'
          src={exercise.gifUrl}
          alt={exercise.name}
        />

        <div className='flex flex-col lg:w-1/2'>
          {isExercise && (
            <div className='grid grid-cols-2 justify-center gap-5'>
              <button
                className='col-span-1 text-left flex-grow px-4 py-2 mb-5 bg-blue-700 text-white font-semibold rounded-md shadow-md hover:bg-blue-800 transition-colors duration-300'
                onClick={handleClick}
              >
                <div className='flex items-center justify-center'>
                  {exercise.isSelected ? <RemoveIcon /> : <AddIcon />}
                  <span className='ml-2 md:inline-block'>
                    {exercise.isSelected ? 'Remove' : 'Add'}
                  </span>
                </div>
              </button>
              <button
                className='col-span-1  flex-grow  px-4 py-2 mb-5 bg-blue-700 text-white font-semibold rounded-md shadow-md hover:bg-blue-800 transition-colors duration-300'
                onClick={handleBack}
              >
                <div className='flex justify-center items-center gap-3'>
                  <GoBackIcon />
                  Go Back
                </div>
              </button>
            </div>
          )}

          <div className='mb-2 text-md md:text-lg'>
            <strong>Instructions:</strong>
            <ol>
              {exercise.instructions.map((instruction, index) => (
                <li key={index}>{`${index + 1}. ${instruction}`}</li>
              ))}
            </ol>
          </div>
          <p className='text-md md:text-lg mb-2'>
            <strong>Target Muscle:</strong> {exercise.target}
          </p>
          <p className='text-md md:text-lg mb-2'>
            <strong>Body Part:</strong> {exercise.bodyPart}
          </p>
          <p className='text-md md:text-lg mb-2'>
            <strong>Equipment:</strong> {exercise.equipment}
          </p>
          <div className='mb-2 text-md md:text-lg'>
            <strong>Secondary Muscles:</strong>
            <ul>
              {exercise.secondaryMuscles.map((muscle, index) => (
                <li key={index}>{muscle}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
      )
}

export default Exercise
