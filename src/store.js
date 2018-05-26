// External Depedencies
import { createStore, combineReducers } from 'redux'

// Our Reducers
import deckReducer from './reducers/deckReducer'

const reducers = combineReducers({
    decks: deckReducer
})

const store = createStore(reducers)

export default store