/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useTimer } from 'use-timer'
import Exercise from '~/components/Exercise'
import StopWatch from '~/components/StopWatch'
import { useExercises } from '~/context/ExerciseContext'
import FlagIcon from '~/icons/FlagIcon'
import NextExerciseIcon from '~/icons/NextExerciseIcon'
import PreviousExerciseIcon from '~/icons/PreviousExerciseIcon'
import ResultsIcon from '~/icons/ResultsIcon'

export default function WorkoutIndexRoute() {
  const { exercises, setExercises } = useExercises()
  const { time: tempTime, start: tempStart, reset: tempReset } = useTimer()
  const { time, start, pause, reset, status } = useTimer()
  const navigate = useNavigate()
  const [workoutFinished, setWorkoutFinished] = useState<boolean>(false)
  const [currentExercise, setCurrentExercise] = useState<number>(0)

  const workoutExercises = exercises.filter((exercise) => exercise.isSelected)

  const [exerciseTime, setExerciseTime] = useState<number[]>(
    Array(workoutExercises.length).fill(0)
  )

  const handleNextExercise = () => {
    if (status === 'RUNNING') registerExerciseTime()
    setCurrentExercise(
      (prevExercise) => (prevExercise + 1) % workoutExercises.length
    )
  }

  const registerExerciseTime = () => {
    setExerciseTime((prev) => {
      const newExerciseTime = [...prev]
      newExerciseTime[currentExercise] += tempTime
      return newExerciseTime
    })
  }

  const registerWorkoutTime = () => {
    const exercisesWithSeconds = workoutExercises.map((exercise, index) => {
      return {
        ...exercise,
        seconds: exerciseTime[index]
      }
    })
    setExercises((prev) =>
      prev.map((exercise) => {
        const newExercise = exercisesWithSeconds.find(
          (ex) => ex.id === exercise.id
        )
        return newExercise || exercise
      })
    )
  }

  const handlePrevExercise = () => {
    if (status === 'RUNNING') registerExerciseTime()
    setCurrentExercise((prevExercise) =>
      prevExercise === 0 ? workoutExercises.length - 1 : prevExercise - 1
    )
  }

  const handleGoToResults = () => {
    registerWorkoutTime()
    navigate('/workout/results')
  }

  const handleFinish = () => {
    console.log('Workout finished')
    if (status === 'RUNNING') registerExerciseTime()
    tempReset()
    reset()

    setWorkoutFinished(true)
  }

  useEffect(() => {
    if (status === 'PAUSED' || status === 'STOPPED') {
      registerExerciseTime()
      tempReset()
    } else if (status === 'RUNNING') {
      tempReset()
      tempStart()
    }
  }, [status])

  useEffect(() => {
    tempReset()
    if (status === 'RUNNING') tempStart()
  }, [currentExercise])

  return (
    <div className='p-4 sm:p-8  h-screen'>
      {workoutExercises.length === 0 && (
        <div className='flex justify-center h-full'>
          <div>
            <p className='h-full text-2xl semibold'>Select some exercises to start the workout</p>
          </div>
        </div>
      )}
      {workoutExercises.length > 0 && (
        <>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-sm text-center p-5 rounded-full'>
              <div
                className='bg-gray-200 rounded-full p-2 flex items-center justify-center dark:bg-gray-700 '

              >
                <span>
                  {currentExercise + 1} / {workoutExercises.length}
                </span>
              </div>
            </div>
            {!workoutFinished &&
              currentExercise + 1 === workoutExercises.length && (
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
            {workoutFinished && (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-5'
                onClick={handleGoToResults}
              >
                <div className='flex gap-2'>
                  <div className='flex items-center'>
                    <div className='w-4 h-4 text-black'>
                      <ResultsIcon />
                    </div>
                  </div>
                  <span>Go To Results</span>
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
