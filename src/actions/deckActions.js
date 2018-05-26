import { createDeckStructure, createCardStructure } from '../utils/helpers'

export const types = {
    DECK_SET_ALL: '[decks] DECK_SET_ALL',
    DECK_CREATE: '[decks] DECK_CREATE',
    CARD_CREATE: '[decks-card] CARD_CREATE',
    UPDATE_SCORE: '[decks] DECK_UPDATE_SCORE',
}

export default {
    setDecks: (decks) => ({
        type: types.DECK_SET_ALL,
        decks: decks === null || decks === undefined ? {} : decks
    }),
    createDeck: (label) => {
        return {
            type: types.DECK_CREATE,
            deck: createDeckStructure({ label }),
        }
    },
    createCard: (deckId, question, answer) => {
        return {
            type: types.CARD_CREATE,
            deckId,
            card: createCardStructure({ question, answer }),
        }
    },
    updateScore: (deckId, score) => {
        return {
            type: types.UPDATE_SCORE,
            deckId,
            score,
        }
    },
}