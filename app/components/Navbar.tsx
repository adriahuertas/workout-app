import { Link } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useExercises } from '~/context/ExerciseContext'
import CloseMenuIcon from '~/icons/CloseMenuIcon'
import MenuIcon from '~/icons/MenuIcon'
import MoonIcon from '~/icons/MoonIcon'
import SunIcon from '~/icons/SunIcon'

interface INavbarProps {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

const Navbar = ({ theme, setTheme }: INavbarProps) => {
  const { exercises } = useExercises()
  const [openMenu, setOpenMenu] = useState(false)

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
    <header className='z-10 fixed top-0 w-full shadow-md bg-primary-light dark:bg-primary-dark'>
      <nav className='z-10 p-2'>
        <div className={`px-4 py-2 flex justify-start ${openMenu ? 'items-start' : 'items-center'} sm:items-center`}>
          <button
            onClick={toggleTheme}
            className='p-3 rounded-full bg-button-bg-light text-button-text-light dark:bg-button-bg-dark dark:text-button-text-dark hover:bg-button-bg-hover-light dark:hover:bg-button-bg-hover-dark transition-colors duration-300'
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <div
            className={
              `flex flex-grow ${openMenu ? 'items-start' : 'items-center'} sm:flex-row justify-end`
            }
          >
            <button
              className='sm:hidden order-2 p-3 rounded-full bg-button-bg-light text-button-text-light dark:bg-button-bg-dark dark:text-button-text-dark hover:bg-button-bg-hover-light dark:hover:bg-button-bg-hover-dark transition-colors duration-300'
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu ? <CloseMenuIcon /> : <MenuIcon />}
            </button>
            <div
              className={`flex flex-col flex-grow items-center sm:flex-row sm:justify-end order-1 sm:flex ${
                openMenu ? 'block' : 'hidden'
              }`}
            >
              <Link
                to='/exercises'
                onClick={() => setOpenMenu(false)}
                className='text-2xl  font-bold p-4 flex-grow-0 text-primary-dark hover:text-black hover:bg-gray-200 dark:text-primary-light dark:hover:text-button-text-hover dark:hover:bg-gray-600 rounded-full transition-colors duration-300'
              >
                Exercises
              </Link>
              <Link
                to='/workout'
                onClick={() => setOpenMenu(false)}
                className='text-2xl font-bold p-4 flex-grow-0 relative text-primary-dark hover:text-black hover:bg-gray-200 dark:text-primary-light dark:hover:text-button-text-hover dark:hover:bg-gray-600 rounded-full transition-colors duration-300'
              >
                Workout
                {numSelectedExercises > 0 && (
                  <span className='absolute top-3 right-3 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center'>
                    {numSelectedExercises}
                  </span>
                )}
              </Link>
              <Link
                to='/workout/results'
                onClick={() => setOpenMenu(false)}
                className='text-2xl font-bold p-4 flex-grow-0 relative text-primary-dark hover:text-black hover:bg-gray-200 dark:text-primary-light dark:hover:text-button-text-hover dark:hover:bg-gray-600 rounded-full transition-colors duration-300'
              >
                Results
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
