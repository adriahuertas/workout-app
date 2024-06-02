import { IWorkout, IWorkoutExercise, IWorkoutFromDB } from '~/types'
import { db } from '~/utils/db.server'
import { getUserByEmail } from './users'
import { getUserSession } from '~/utils/sessions.server'
import { redirect } from '@remix-run/node'

export async function getWorkouts(request: Request) {
  const userSession = await getUserSession(request)
  console.log(userSession)
  if (!userSession) {
    return redirect('/login')
  }
  const querySnapshot = await db
    .collection('workouts')
    .where('userId', '==', userSession.email)
    .get()

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

export async function createWorkout(request: Request, workout: IWorkout) {
  const userSession = await getUserSession(request)
  console.log(userSession)
  if (!userSession) {
    return redirect('/login')
  }
  if (!userSession.email) {
    throw new Error('User ID is required')
  }
  workout.userId = userSession.email

  const docRef = await db.collection('workouts').add(workout)
  return docRef.id
}

export async function deleteWorkout(id: string) {
  await db.collection('workouts').doc(id).delete()
}
