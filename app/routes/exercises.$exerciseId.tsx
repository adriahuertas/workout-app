import { useParams, Link } from '@remix-run/react'
import Exercise from '~/components/Exercise'
import { useExercises } from '~/context/ExerciseContext'

export default function ExerciseRoute() {
  const { exerciseId } = useParams()
  const { exercises } = useExercises()
  const exercise = exercises.find((ex) => ex.id === exerciseId)

  if (!exercise) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Exercise not found
      </div>
    )
  }

  return (
    <div className='p-4'>
      <div className='mb-8 text-center'>
        <Link to='/exercises' className='text-blue-500 text-2xl sm:text-xl '>
          Back to Exercises
        </Link>
      </div>
      <Exercise exercise={exercise} mode='full' />
    </div>
  )
}
