import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons'
import { Provider } from 'react-redux'

// Our Depedencies
import store from './store'
import { setLocalNotification } from './utils/notification'
import { saveDecksStore } from './utils/api'
import DeckList from './views/DeckList'
import DeckCreate from './views/DeckCreate'
import DeckDetails from './views/DeckDetails'
import CardCreate from './views/CardCreate'
import Quiz from './views/Quiz'

const RootStacks = createStackNavigator ({
    Home: {
        screen: DeckList,
    },
    DeckCreate: {
        screen: DeckCreate,
    },
    DeckDetails: {
        screen: DeckDetails,
    },
    CardCreate: {
        screen: CardCreate,
    },
    Quiz: {
        screen: Quiz,
    },
},
{
    initialrouteName: 'Home'
});

store.subscribe((action) => {
    saveDecksStore(store.getState().decks.all)
})

export default class Init extends Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <RootStacks />
            </Provider>
        );
    }
}