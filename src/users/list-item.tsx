import React from 'react'
import { User } from "../../types/user";
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, ListItem, UnorderedList, H4 } from '@northlight/ui';

export function UsersListItem (props: { user: User }) {
  const { user } = props
  return (
    <div>
      <AccordionItem>
        <AccordionButton>
          <Box w="100%" textAlign="left" display="grid" gridTemplateColumns="50% 50%" gridTemplateRows="auto">
            <span>{user.name}</span>
            <span>{user.highest_score}</span>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <H4>Scores</H4>
          <UnorderedList pl="4">
            {user.scores.map((score, index) => (
              <ListItem key={index}>{score}</ListItem>
            ))}
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </div>
  )
}