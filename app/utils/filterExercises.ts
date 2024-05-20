import { IExercise } from '~/types'

export const filterExercises = (
  searchParams: URLSearchParams,
  exercises: IExercise[]
) => {
  // Filter by equipment, bodyPart, target and name
  const equipment = searchParams.get('equipment')
  const bodyPart = searchParams.get('bodyPart')
  const target = searchParams.get('target')
  const name = searchParams.get('name')
  return exercises.filter((exercise) => {
    return (
      (!equipment || exercise.equipment === equipment) &&
      (!bodyPart || exercise.bodyPart === bodyPart) &&
      (!target || exercise.target === target) &&
      (!name || exercise.name.toLowerCase().includes(name.toLowerCase()))
    )
  })
}
