import { IExercise } from '~/types'

let exercises: IExercise[] = []

export async function fetchExercises(): Promise<IExercise[] | null> {
  if (exercises.length) {
    return exercises
  }
  const apiUrl = process.env.API_URL
  const apiKey = process.env.API_KEY
  const apiHost = process.env.API_HOST

  if (!apiUrl || !apiKey || !apiHost) {
    console.error(
      'API_URL, API_KEY, and API_HOST must be defined in the environment variables'
    )
    return null
  }

  const url = `${apiUrl}?limit=10`
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
    }
  }

  try {
    console.log('Fetching exercises')
    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error('Failed to fetch exercises')
    }
    exercises = await res.json()
    return exercises
  } catch (error) {
    console.error('Failed to load exercises', error)
    return null
  }
}
