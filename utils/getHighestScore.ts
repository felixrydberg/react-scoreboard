export const getHighestScore = (scores: number[]): number => {
  if (scores[0] === undefined || !(typeof scores[0] === 'number')) {
    throw new Error('Scores must be an array of numbers')
  }

  return scores.reduce((highest, score) => {
    return score > highest ? score : highest
  }, 0)
}
