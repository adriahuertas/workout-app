import { Link } from '@remix-run/react'
import { useEffect } from 'react'
import { useExercises } from '~/context/ExerciseContext'
import MoonIcon from '~/icons/MoonIcon'
import SunIcon from '~/icons/SunIcon'

interface INavbarProps {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

const Navbar = ({ theme, setTheme }: INavbarProps) => {
  const { exercises } = useExercises()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [setTheme])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const numSelectedExercises = exercises.filter(
    (exercise) => exercise.isSelected
  ).length

  return (
    <header className='z-10 fixed top-0 w-full shadow-md'>
      <nav className='z-10 bg-white dark:bg-primary-dark p-2'>
        <div className='m px-4 py-2 flex justify-between items-center'>
          <button
            onClick={toggleTheme}
            className='p-3 bg-gray-200 dark:bg-gray-700 rounded-full'
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <div className='flex'>
            <Link
              to='/exercises'
              className='text-2xl font-bold pl-4 flex-grow-0'
            >
              Exercises
            </Link>
            <Link
              to='/workout'
              className='text-2xl font-bold pl-4 flex-grow-0 relative'
            >
              Workout
              {numSelectedExercises > 0 && (
                <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center'>
                  {numSelectedExercises}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
