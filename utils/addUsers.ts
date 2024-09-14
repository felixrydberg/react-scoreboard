import { User } from "../types/user";

const binarySearch = (arr: User[], user: User, minIndex: number) => {
  let start = minIndex;
  let end = arr.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid].score === user.score) {
      if (arr[mid].name < user.name) {
        start = mid + 1;
      } else {
        return mid;
      }
    } else if (arr[mid].score > user.score) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start;
}

export const addUsers = (users: User[] | User, existingUsers: User[]): User[] => {
  if (!Array.isArray(users)) {
    users = [users];
  }

  // If there are no existing users insert the first and then let binarySearch handle sorting
  if (existingUsers.length === 0) {
    existingUsers = [users[0]];
    users = users.slice(1);
  // Else sort the existing users so that minIndex will be usable
  } else {
    users.sort((a, b) => b.score - a.score);
  }
  
  const map = new Map(existingUsers.map((user, index) => [user.name, user]));
  const arr: User[] = [...existingUsers];
  let minIndex = 0;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (map.get(user.name)) {
      if (map.get(user.name)!.score > user.score) {
        continue;
      }
      const index = arr.findIndex((u) => u.name === user.name);
      arr.splice(index, 1);
    }

    const index = binarySearch(arr, user, minIndex);
    arr.splice(index, 0, user);
    minIndex = index;
  }

  return arr;
}
