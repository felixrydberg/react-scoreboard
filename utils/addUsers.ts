import { User } from "../types/user";
import { userSearch } from "./";

export const addUsers = (users: User[] | User, existingUsers: User[]): User[] => {
  if (!Array.isArray(users)) {
    users = [users];
  }
  
  users.sort((a, b) => b.highest_score - a.highest_score);
  if (existingUsers.length === 0) {
    return users;
  }
  
  const map = new Map(existingUsers.map((user, index) => [user.name, user]));
  const arr: User[] = [...existingUsers];
  let minIndex = 0;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (map.get(user.name)) {
      if (map.get(user.name)!.highest_score > user.highest_score) {
        continue;
      }
      const index = arr.findIndex((u) => u.name === user.name);
      arr.splice(index, 1);
    }

    const index = userSearch(arr, user, minIndex);
    arr.splice(index, 0, user);
    minIndex = index;
  }

  return arr;
}
