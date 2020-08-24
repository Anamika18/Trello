import {
    CONSTANTS
} from '../actions'

let listRenderId = 1;
let cardRenderId = 2;

const initialState = [{
    title: 'Sample List',
    id: `list-${0}`,
    cards: [{
        id: `card-${0}`,
        text: 'Create lists. Create tasks and add them to the list. Move task around. Move lists around.'
    }]
}]



const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST: {
            const newList = {
                title: action.payload,
                id: `list-${listRenderId}`,
                cards: []
            }

            listRenderId += 1;

            return [
                ...state,
                newList
            ];
        }

        case CONSTANTS.ADD_CARD:{
            const newCard = {
                text: action.payload.text,
                id: `card-${cardRenderId}`,
            }

            cardRenderId += 1;

            const newState = state.map(list => {
                if (list.id === action.payload.listId) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list
                }
            });

            return newState
        }

        case CONSTANTS.DRAG_HAPPENED: {
        const {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        } = action.payload
            const newState = [...state]

            if(type === 'list'){
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            //in the same list
            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id)
                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }
            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.find(list => droppableIdStart === list.id)
                const card = listStart.cards.splice(droppableIndexStart, 1);
                const listEnd = state.find(list => droppableIdEnd === list.id)
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);

            }
            return newState;
        }

        default:
            return state;
    }
};

export default listsReducer;