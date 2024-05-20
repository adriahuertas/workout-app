import PauseIcon from '~/icons/PauseIcon'
import ResetIcon from '~/icons/ResetIcon'
import StartIcon from '~/icons/StartIcon'
import { formatTimeWorkout } from '~/utils/formatTime'

interface IStopWatchProps {
  time: number
  start: () => void
  pause: () => void
  reset: () => void
  status: string
}

const StopWatch = ({ time, start, pause, reset, status }: IStopWatchProps) => {
  const formattedTime = formatTimeWorkout(time)
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
        {formattedTime}
      </span>
    </div>
  )
}

export default StopWatch
