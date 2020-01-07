import { sortWith, prop, ascend, filter, equals, pipe, take, not } from 'ramda'

export const isReady = array => array && !!array.length

export const toMinutesAndSeconds = milliseconds => {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0)

  const minutesTreated = isNaN(minutes) ? 0 : minutes
  const secondsTreated = isNaN(seconds) ? 0 : seconds

  return `${minutesTreated < 10 ? '0' : ''}${minutesTreated}:${
    secondsTreated < 10 ? '0' : ''
  }${secondsTreated}`
}

export const totalSeconds = time => {
  const parts = time.split(':')
  return parts[0] * 3600 + parts[1] * 60
}

export const getDifficultyText = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
}

export const getXpByDifficulty = {
  easy: 50,
  medium: 80,
  hard: 110
}

export const getExerciseNotInitiated = exercises => {
  const [exercise] = pipe(
    sortWith([ascend(prop('order'))]),
    filter(({ status }) => equals('NOT_INITIATED', status)),
    take(1)
  )(exercises)

  return exercise || null
}

export const getExercisesWithoutCurrent = (exercises, { id }) => {
  return filter(exercise => not(equals(exercise.id, id)))(exercises)
}
