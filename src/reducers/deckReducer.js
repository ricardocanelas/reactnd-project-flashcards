// External Depedencies
import produce from 'immer'

// Our Depedencies
import { types } from '../actions/deckActions'
import { datetimeNow } from '../utils/helpers'

const initialState = {
	all: {}
}
// const initialState = {
//     all: {
//         'deck001': {
// 			id: 'deck001',
// 			label: 'Inglês',
// 			created_at: '2018-05-24 10:10:30',
// 			last_score: null,
// 			last_score_at: null,
// 			scores: [],
// 			cards: {
// 				// loops
// 				"card00101": {
// 					id: 'card00101',
// 					question: 'Vermelho em inglês',
// 					answer: 'Red',
// 					created_at: "2018-05-24 11:10:30"
// 				},
// 				"card00102": {
// 					id: 'card00102',
// 					question: 'Preto em inglês',
// 					answer: 'Black',
// 					created_at: "2018-05-24 11:10:30"
// 				},
// 				"card00103": {
// 					id: 'card00102',
// 					question: 'Azul em inglês',
// 					answer: 'Blue',
// 					created_at: "2018-05-24 11:10:30"
// 				},
// 			}
//         },

//         'deck002': {
// 			id: 'deck002',
// 			label: 'React',
// 			created_at: '2018-05-24 10:10:30',
// 			last_score: null,
// 			last_score_at: null,
// 			scores: [],
// 			cards: {
// 				// loops
// 				"card00201": {
// 					id: 'card00201',
// 					question: 'O que é JSX',
// 					answer: 'JSX é apenas uma especificação criada para que pré-processadores JavaScript transformem sintaxe XML em JavaScript comum.',
// 					created_at: "2018-05-24 11:10:30"
// 				},
// 			}
// 		},
// 		'deck003': {
// 			id: 'deck003', label: 'Javascript', cards: {}
// 		},
// 		'deck004': {
// 			id: 'deck004', label: 'Travel', cards: {}
// 		},
// 		'deck005': {
// 			id: 'deck005', label: 'Spanish', cards: {}
// 		},
// 		'deck006': {
// 			id: 'deck006', label: 'Mathematic', cards: {}
// 		},
// 		'deck007': {
// 			id: 'deck007', label: 'Portuguese', cards: {}
// 		},
//     }
// }

const deckReducer = produce((state = initialState, action) => {
    switch (action.type) {

		case types.DECK_SET_ALL:
			state.all = action.decks
            break

        case types.DECK_CREATE:
            state.all[action.deck.id] = action.deck
            break

        case types.CARD_CREATE:
            state.all[action.deckId].cards[action.card.id] = action.card
			break

        case types.UPDATE_SCORE:
            state.all[action.deckId].last_score = action.score
            state.all[action.deckId].last_score_at = datetimeNow()
            state.all[action.deckId].scores.push(action.score)
            break

        default:
            break
    }

    return state
})

export default deckReducer;