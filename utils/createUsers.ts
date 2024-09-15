import { User } from "../types/user";

export const createUsers = (name: string, scores: number[], id = Date.now()): User => {
  
  scores.sort((a, b) => b - a);
  const higestScore = scores[0];
  return {
    _id: id,
    name,
    highest_score: higestScore,
    scores,
  }
}


