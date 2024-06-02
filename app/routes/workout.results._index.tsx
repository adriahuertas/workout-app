import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { useExercises } from '~/context/ExerciseContext'
import { createWorkout } from '~/services/workouts'
import { IWorkout } from '~/types'
import { formatTimeResults } from '~/utils/formatTime'
import { getUserSession } from '~/utils/sessions.server'

export const action = async ({ request }:ActionFunctionArgs) => {
  const userSession = getUserSession(request)
  if (!userSession) {
    return redirect('/login')
  }
  const formData = await request.formData()
  const stringifyWorkout = formData.get('workoutExercises')
  const workout = typeof stringifyWorkout === 'string' ? JSON.parse(stringifyWorkout) : null

  if (workout && workout.workoutExercises?.length > 0) {
    await createWorkout(request, workout)
    return redirect('/history')
  } else console.log('No exercises selected')
  return null
}

export default function WorkoutResultsIndexRoute() {
  const { exercises, setExercises } = useExercises()
  const workoutExercises = exercises.filter((exercise) => exercise.isSelected)

  const totalWorkoutTime = workoutExercises.reduce(
    (acc, exercise) => acc + exercise.seconds,
    0
  )

  const handleClear = () => {
    setExercises((prev) =>
      prev.map((exercise) => {
        return {
          ...exercise,
          seconds: 0,
          isSelected: false
        }
      })
    )
  }

  const workout: IWorkout = {
    userId: 'adriahc@gmail.com',
    date: new Date().toISOString(),
    workoutExercises: workoutExercises.map((exercise) => {
      return {
        exerciseId: exercise.id,
        seconds: exercise.seconds
      }
    })
  }

  return (
    <div className='p-4 sm:p-8 sm:py-16'>
      <h1 className='text-3xl text-center font-bold'>Workout Results</h1>
      <Form method='POST'>
        <div className='mt-4'>
          <h2 className='text-xl font-semibold'>Exercises</h2>
          <ul className='mt-2'>
            {workoutExercises.map((exercise, index) => (
              <li
                key={exercise.id}
                className='flex justify-between items-center p-2'
              >
                <div className='flex items-center'>
                  <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    className='w-12 h-12 mr-4'
                  />
                  <span className='mr-4'>{index + 1}.</span>
                  <span>{exercise.name}</span>
                </div>
                <span>{formatTimeResults(exercise.seconds)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-4'>
          <div className='flex justify-between items-center p-2'>
            <h2 className='text-xl font-semibold'>Total Workout Time</h2>
            <span>{formatTimeResults(totalWorkoutTime)}</span>
          </div>
        </div>
        <div className='flex items-center gap-10 justify-center'>
          <input
            type='hidden'
            name='workoutExercises'
            value={JSON.stringify(workout)}
          />
          <button
            type='submit'
            className='mt-8 bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-800 transition-colors duration-300'
          >
            Save Workout
          </button>
          <button
            className='mt-8 bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-800 transition-colors duration-300'
            onClick={handleClear}
          >
            Clear Workout
          </button>
        </div>
      </Form>
    </div>
  )
}
