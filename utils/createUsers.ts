import { User } from "../types/user";

export const createUsers = (name: string, score: number[] | number, id = Date.now()): User => {
  
  const higestScore = !Array.isArray(score) ? score : score.reduce((largest, current) =>
    (current > largest ? current : largest), score[0]);;
  return {
    _id: id,
    name,
    score: higestScore
  }
}


