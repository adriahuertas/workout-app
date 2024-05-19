import PauseIcon from '~/icons/PauseIcon'
import ResetIcon from '~/icons/ResetIcon'
import StartIcon from '~/icons/StartIcon'

interface IStopWatchProps {
  time: number
  start: () => void
  pause: () => void
  reset: () => void
  status: string
}

const StopWatch = ({ time, start, pause, reset, status }: IStopWatchProps) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return (
    <div className='flex flex-col items-center mb-5'>
      <div className='flex justify-between w-full'>
        {status !== 'RUNNING' && (
          <button
            className='bg-green-500 p-3 rounded-full focus:outline-none'
            onClick={start}
          >
            <StartIcon />
          </button>
        )}
        {status === 'RUNNING' && (
          <button
            className='bg-red-500 p-3  rounded-full focus:outline-none'
            onClick={pause}
          >
            <PauseIcon />
          </button>
        )}
        <button
          className='bg-blue-500 p-3 rounded-full focus:outline-none'
          onClick={reset}
        >
          <ResetIcon />
        </button>
      </div>
      <span className=' text-lg font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded-md mt-5 pl-3 pr-3'>
        {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </span>
    </div>
  )
}

export default StopWatch
