import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect, useLoaderData } from '@remix-run/react'
import { useExercises } from '~/context/ExerciseContext'
import DeleteIcon from '~/icons/DeleteIcon'
import { deleteWorkout, getWorkouts } from '~/services/workouts'
import { IWorkoutExercise, IWorkoutFromDB } from '~/types'
import { formatTimeResults } from '~/utils/formatTime'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const workoutId = formData.get('workoutId')

  if (typeof workoutId === 'string') {
    await deleteWorkout(workoutId)
  }

  return redirect('/history')
}

export const loader = ({ request }: ActionFunctionArgs) => {
  const workouts = getWorkouts(request)

  return workouts
}

const HistoryRoute = () => {
  const workoutsFromLoader: IWorkoutFromDB[] = useLoaderData()
  // Sort workouts by date
  const workouts = workoutsFromLoader.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  const { exercises } = useExercises()

  const getExerciseNameById = (id: string) => {
    const exercise = exercises.find((ex) => ex.id === id)
    return exercise ? exercise.name : 'Unknown Exercise'
  }

  const getGiftUrlById = (id: string) => {
    const exercise = exercises.find((ex) => ex.id === id)
    return exercise ? exercise.gifUrl : ''
  }

  const calculateTotalTime = (workoutExercises: IWorkoutExercise[]) => {
    return workoutExercises.reduce(
      (total, exercise) => total + exercise.seconds,
      0
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return workouts !== undefined
    ? (
    <div className='p-4 sm:p-8 sm:py-16'>
      <h1 className='text-3xl text-center font-bold pb-8'>Workout History</h1>
      <div className='space-y-4'>
        {workouts.map((workout, index) => (
          <div
            key={workout.id}
            className={`p-4 ${
              index !== workouts.length - 1 ? 'border-b border-gray-500' : ''
            }`}
          >
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-4'>
                <h2 className='text-xl font-semibold inline'>
                  {formatDate(workout.date)}
                </h2>
                <Form method='DELETE' className='inline'>
                  <input type='hidden' name='workoutId' value={workout.id} />
                  <button className='p-2 dark:bg-slate-700 bg-gray-200 rounded-lg'>
                    <DeleteIcon />
                  </button>
                </Form>
              </div>
              <span className='text-lg font-semibold'>
                {formatTimeResults(calculateTotalTime(workout.workoutExercises))}
              </span>
            </div>
            <ul className='mt-2 space-y-2'>
              {workout.workoutExercises &&
                workout.workoutExercises.map((exercise: IWorkoutExercise) => (
                  <li
                    key={exercise.exerciseId}
                    className='grid grid-cols-3 items-center p-2'
                  >
                    <div className='col-span-2 rounded-lg flex justify-start items-center gap-x-4 sm:gap-x-10'>
                      <img
                        className='rounded w-20 h-20'
                        src={getGiftUrlById(exercise.exerciseId)}
                        alt=''
                      />
                      <div className='flex justify-start'>
                        <span>{getExerciseNameById(exercise.exerciseId)}</span>
                      </div>
                    </div>
                    <div className='col-span-1 flex justify-end'>
                      <span>{formatTimeResults(exercise.seconds)}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
      )
    : null
}

export default HistoryRoute
