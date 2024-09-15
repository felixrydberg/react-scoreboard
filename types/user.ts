import { BaseUser } from "./base";

export interface User extends BaseUser {
  highest_score: number,
  scores: number[],
}
