// root.tsx
import {
  Outlet,
  Links,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import { LinksFunction, LoaderFunction, json } from '@remix-run/node'
import styles from './tailwind.css?url'
import { ExerciseProvider } from '~/context/ExerciseContext'
import { fetchExercises } from '~/utils/fetchExercises'
import { IExercise } from '~/types'
import Navbar from './components/Navbar'
import { useState } from 'react'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
  },
  { rel: 'icon', href: '/favicon.png' }
]

export const loader: LoaderFunction = async () => {
  const exercises = await fetchExercises()

  if (!exercises) {
    throw new Response('Failed to load exercises', { status: 500 })
  }

  return json({ exercises })
}

export default function App() {
  const { exercises } = useLoaderData<{ exercises: IExercise[] }>()
  const [theme, setTheme] = useState('dark')

  return (
    <html lang='en' className={theme}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Workout App</title>
        <Links />
      </head>
      <body className='font-lato bg-primary-light text-primary-dark dark:bg-primary-dark dark:text-primary-light'>
        <ExerciseProvider initialData={exercises}>
          <Navbar theme={theme} setTheme={setTheme} />
          <div className='mb-[80px]'></div>
          <Outlet />
        </ExerciseProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
