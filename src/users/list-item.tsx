import React from 'react'
import { User } from "../../types/user";
import { Td, Tr } from '@northlight/ui';

export function UsersListItem (props: { user: User }) {
  const { user } = props
  return (
    <Tr>
      <Td>{user.name}</Td>
      <Td>{user.score}</Td>
    </Tr>
  )
}