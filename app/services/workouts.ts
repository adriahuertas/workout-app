import { IWorkout, IWorkoutExercise, IWorkoutFromDB } from '~/types'
import { db } from '~/utils/db.server'
import { getUserByEmail } from './users'

export async function getWorkouts() {
  const querySnapshot = await db.collection('workouts').get()

  const data: IWorkoutFromDB[] = []

  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      date: doc.data().date,
      userId: doc.data().userId,
      workoutExercises: doc.data().workoutExercises as IWorkoutExercise[]
    } as IWorkoutFromDB)
  })

  return data
}

export async function createWorkout(workout: IWorkout) {
  if (!workout.userId) {
    throw new Error('User ID is required')
  }
  const user = await getUserByEmail(workout.userId)
  if (!user) {
    throw new Error('User not found')
  }
  const docRef = await db.collection('workouts').add(workout)
  return docRef.id
}

export async function deleteWorkout(id: string) {
  await db.collection('workouts').doc(id).delete()
}
