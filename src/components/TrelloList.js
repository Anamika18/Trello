import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';
import styled from 'styled-components';

const ListContainer = styled.div ` 
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin-right: 8px;
`;

const ListTitle = styled.h4 `
  transition: background 0.3s ease-in;
  font-family: Arial, Helvetica, sans-serif;
  color: #23374d;
`;

const TrelloList = ({title, cards , listId , index}) => {
    return(
        <Draggable draggableId={String(listId)} index={index}>
        {(provided) => (
        <ListContainer
        {...provided.draggableProps} 
        ref={provided.innerRef} {...provided.dragHandleProps} 
        >
        <Droppable droppableId={String(listId)}>
        {(provided)=> (
            <div {...provided.droppableProps} ref={provided.innerRef}>
            <ListTitle>{title}</ListTitle>
            {cards.map((card, index) => 
            <TrelloCard key={card.id} index={index} text={card.text} id={card.id} ></TrelloCard>)}
            {provided.placeholder}
            <TrelloActionButton listId={listId}/>
            </div>
        )}  
       </Droppable>
       </ListContainer>
        )}
       </Draggable>
    )
}


export default TrelloList;