import React, { useRef } from 'react'
import { useState } from 'react'
import {
  Container,
  H1,
  Button,
  HStack,
  H2,
  Form,
  TextField,
  NumberInputField,
  Accordion,
  Box,
} from '@northlight/ui'
import { ScoreboardModal } from './modal.jsx'
import { ExcelDropzone } from './excel-dropzone.jsx'
import { UsersListItem } from './users/list-item.jsx'
import { BaseScore, BaseUser, ExcelRow, User } from '../types'

import baseUsers from './users.js';
import baseScores from './scores.js';
import { addUsers, createUsers, numberSearch } from '../utils'
import './index.css'

// This will be marked as an error but works anyway
const scores = Object.groupBy(baseScores, (score: BaseScore) => score.userId);
const initUsers: User[] = addUsers(baseUsers.map((user: BaseUser) => {
  return createUsers(user.name, scores[user._id].map((score: BaseScore) => score.score), user._id)
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
      const user = createUsers(name, row.map((score: ExcelRow) => score.score));
      users.push(user)
    }
    excelRef.current?.close()
    setUsers((prevUsers) => addUsers(users, prevUsers))
  }

  function handleSubmit (submit: { name: string, score: number }) {
    addRef.current?.close()

    const user = users.find((user) => user.name === submit.name)
    if (user) {
      const index = numberSearch(user.scores, submit.score);
      user.scores.splice(index, 0, submit.score);
      user.highest_score = user.scores[0];
      setUsers((prevUsers) => addUsers(user, prevUsers));
    } else {
      setUsers((prevUsers) => addUsers(createUsers(submit.name, [submit.score]), prevUsers));
    }
  }

  console.log(users)
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
      <Box w="100%" textAlign="left" px="4" pr="10" fontWeight="bold" display="grid" gridTemplateColumns="50% 50%" gridTemplateRows="auto">
        <span>Name</span>
        <span>Score</span>
      </Box>
      <Accordion variant="rounded" allowMultiple>
        {users.map((user: User, index) => (
          <UsersListItem key={`${user._id}-${index}`} user={user} />
        ))}
      </Accordion>
    </Container>
  ) 
}
