import { useParams } from '@remix-run/react'
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
    <div className='p-4 sm:p-8 sm:py-16'>
      <Exercise exercise={exercise} mode='full' />
    </div>
  )
}
