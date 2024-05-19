import { useNavigate } from '@remix-run/react'
import { useState } from 'react'
import { useTimer } from 'use-timer'
import Exercise from '~/components/Exercise'
import StopWatch from '~/components/StopWatch'
import { useExercises } from '~/context/ExerciseContext'
import FlagIcon from '~/icons/FlagIcon'
import NextExerciseIcon from '~/icons/NextExerciseIcon'
import PreviousExerciseIcon from '~/icons/PreviousExerciseIcon'

export default function WorkoutIndexRoute() {
  const { exercises } = useExercises()
  const { tempTime, tempStart, tempReset } = useTimer()
  const { time, start, pause, reset, status } = useTimer()

  const navigate = useNavigate()
  const [currentExercise, setCurrentExercise] = useState<number>(0)

  const workoutExercises = exercises.filter((exercise) => exercise.isSelected)

  const handleNextExercise = () => {
    setCurrentExercise(
      (prevExercise) => (prevExercise + 1) % workoutExercises.length
    )
  }

  const handlePrevExercise = () => {
    setCurrentExercise((prevExercise) =>
      prevExercise === 0 ? workoutExercises.length - 1 : prevExercise - 1
    )
  }

  const handleFinish = () => {
    console.log('Workout finished')
    navigate('/')
  }

  return (
    <div className='p-8 h-screen'>
      {workoutExercises.length === 0 && (
        <div className='flex items-center justify-center h-full'>
          <div>
            <p className='text-xl h-full'>No exercises selected for workout</p>
          </div>
        </div>
      )}
      {workoutExercises.length > 0 && (
        <>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-sm text-center p-5 rounded-full'>
              <div
                className='bg-gray-200 rounded-full flex items-center justify-center dark:bg-gray-700 '
                style={{ width: '56px', height: '56px' }}
              >
                <span>
                  {currentExercise + 1} / {workoutExercises.length}
                </span>
              </div>
            </div>
            {currentExercise + 1 === workoutExercises.length && (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-5'
                onClick={handleFinish}
              >
                <div className='flex gap-2'>
                  <div className='flag-animation flex items-center'>
                    <FlagIcon />
                  </div>
                  <span>Finish</span>
                </div>
              </button>
            )}
          </div>
          <div className='flex flex-col items-center'>
            <div className='flex justify-between w-full'>
              <button
                className={`m-4 p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none text-black text-2xl dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 ${
                  currentExercise === 0 && 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handlePrevExercise}
                disabled={currentExercise === 0}
                style={{ width: '56px', height: '56px' }}
              >
                <PreviousExerciseIcon />
              </button>
              <div className='flex flex-col items-center'>
                <span>
                  <StopWatch
                    time={time}
                    start={start}
                    pause={pause}
                    reset={reset}
                    status={status}
                  />
                </span>
              </div>
              <button
                className={`m-4 p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none text-black text-2xl dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 ${
                  currentExercise === workoutExercises.length - 1 &&
                  'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleNextExercise}
                disabled={currentExercise === workoutExercises.length - 1}
                style={{ width: '56px', height: '56px' }}
              >
                <NextExerciseIcon />
              </button>
            </div>
            <Exercise
              exercise={workoutExercises[currentExercise]}
              mode='full'
            />
          </div>
        </>
      )}
    </div>
  )
}
