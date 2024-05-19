export interface IExerciseFromApi {
  bodyPart: string
  equipment: string
  gifUrl: string
  id: string
  name: string
  target: string
  secondaryMuscles: string[]
  instructions: string[]
}

export interface IExercise extends IExerciseFromApi {
  isSelected: boolean
}
