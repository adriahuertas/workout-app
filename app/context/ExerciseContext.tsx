import React, { createContext, useContext, useState, ReactNode } from 'react'
import { IExercise } from '~/types'

interface ExerciseContextType {
  exercises: IExercise[]
  setExercises: React.Dispatch<React.SetStateAction<IExercise[]>>
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined
)

export const ExerciseProvider = ({
  children,
  initialData
}: {
  children: ReactNode
  initialData: IExercise[]
}) => {
  const [exercises, setExercises] = useState<IExercise[]>(initialData)

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        setExercises
      }}
    >
      {children}
    </ExerciseContext.Provider>
  )
}

export const useExercises = () => {
  const context = useContext(ExerciseContext)
  if (context === undefined) {
    throw new Error('useExercises must be used within an ExerciseProvider')
  }
  return context
}
