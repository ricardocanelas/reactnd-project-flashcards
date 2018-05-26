import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Button from '../components/Button'

class DeckDetails extends Component {
    static navigationOptions = ({navigation}) => {
        const label = navigation.getParam('deckLabel', 'NO-ID')
        return {
            title:`Deck: ${label}`,
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

    gotoCardCreate = () => {
        this.props.navigation.navigate('CardCreate', {
            deckId: this.props.deck.id,
            deckLabel: this.props.deck.label,
        })
    }

    gotoQuiz = () => {
        this.props.navigation.navigate('Quiz', {
            deckId: this.props.deck.id,
            deckLabel: this.props.deck.label,
        })
    }

    render() {
        const { navigation, deck } = this.props

        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    {deck.label}
                </Text>

                <Text style={{ color: 'grey' }}>
                    {Object.keys(deck.cards).length} cards
                </Text>

                {deck.last_score !== null && (
                    <View style={{marginTop: 20}}>
                        <Text>Last score: {deck.last_score}</Text>
                    </View>
                )}

                <View style={{ marginTop: 20 }} />

                <Button onPress={this.gotoCardCreate} >
                    <Text>Create New Question</Text>
                </Button>

                {(Object.keys(deck.cards).length > 0) && (
                    <Button onPress={this.gotoQuiz} >
                        <Text>Start a Quiz</Text>
                    </Button>
                )}
            </View>
        )
    }
}

const mapState = (state, props) => {
    const deckId = props.navigation.getParam('deckId', 'NO-ID')
    return {
        deck: state.decks.all[deckId],
    }
}

export default connect(mapState)(DeckDetails)