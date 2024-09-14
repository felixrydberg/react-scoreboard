import React, { useRef } from 'react'
import { useState } from 'react'
import {
  Container,
  H1,
  Button,
  HStack,
  VStack,
  H2,
  Form,
  TextField,
  NumberInputField,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from '@northlight/ui'
import { ScoreboardModal } from './modal.jsx'
import { ExcelDropzone } from './excel-dropzone.jsx'
import { UsersListItem } from './users/list-item.jsx'
import { BaseScore, BaseUser, ExcelRow, User } from '../types'

import baseUsers from './users.js';
import baseScores from './scores.js';
import { addUsers, createUsers, getHighestScore } from '../utils'
import './index.css'

// This will be marked as an error but works anyway
const scores = Object.groupBy(baseScores, (score: BaseScore) => score.userId);
const initUsers: User[] = addUsers(baseUsers.map((user: BaseUser) => {
  return {
    ...user,
    score: !scores[user._id] ? 0 :
      getHighestScore(scores[user._id]
        .map((scores: BaseScore) => scores.score))
  }
}), []);

export default function App () {  
  const excelRef = useRef<{ open: () => void, close: () => void }>(null);
  const addRef = useRef<{ open: () => void, close: () => void }>(null);
  
  const [users, setUsers] = useState<User[]>(initUsers);

  function handleSheetData (data: ExcelRow[]) {
    // This will be marked as an error but works anyway
    const scores: {[key: string]: ExcelRow[]} = Object.groupBy(data, (score: ExcelRow) => score.name);
    
    const users: User[] = [];
    for (const name in scores) {
      const row: ExcelRow[] = scores[name];
      const user = createUsers(name, getHighestScore(row.map((scores: ExcelRow) => scores.score)))
      users.push(user)
    }
    excelRef.current?.close()
    // To prevent overwriting the content we append to it instead
    setUsers((prevUsers) => addUsers(users, prevUsers))
  }

  function handleSubmit (submit: { name: string, score: number }) {
    addRef.current?.close()
    // To prevent overwriting the content we append to it instead
    setUsers((prevUsers) => addUsers(createUsers(submit.name, submit.score), prevUsers))
  }
  return (
    <Container minW="240px" padding="4">
      <HStack justify="space-between">
        <H1 marginBottom="4" >Mediatool exercise</H1>
      </HStack>
      <HStack justify="space-between">
        <H2 marginBottom="4" >Users</H2>
        <div className="flex gap-1">
          <ScoreboardModal ref={excelRef} text="Import excel">
            <Container padding="4" mt="8">
              <ExcelDropzone
                onSheetDrop={ handleSheetData }
                label="Import excel file here"
              ></ExcelDropzone>
            </Container>
          </ScoreboardModal>
          <ScoreboardModal ref={addRef} text="Add user">
            <Container padding="4" mt="8">
              <Form initialValues={{ name: '', score: 0 }} onSubmit={handleSubmit}>
                <TextField name="name" label="Name" />
                <NumberInputField name="score" label="Score" />
                <Button type="submit" w="full" mt="4">Submit</Button>
              </Form>
            </Container>
          </ScoreboardModal>
        </div>
      </HStack>
      <Table variant="rounded">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user: User, index) => (
            <UsersListItem key={`${user._id}-${index}`} user={user} />
          ))}
        </Tbody>
      </Table>
    </Container>
  ) 
}
