import { User } from "../types";

export const userSearch = (arr: User[], user: User, minIndex: number) => {
  let start = minIndex;
  let end = arr.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid].highest_score === user.highest_score) {
      if (arr[mid].name < user.name) {
        start = mid + 1;
      } else {
        return mid;
      }
    } else if (arr[mid].highest_score > user.highest_score) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start;
}

export const numberSearch = (arr: number[], num: number) => {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === num) {
      return mid;
    } else if (arr[mid] > num) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start;
}
