import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'flashCards:data'

export function fetchDeckResults() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(data => JSON.parse(data))
}

export function saveDecksStore(data) {
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}