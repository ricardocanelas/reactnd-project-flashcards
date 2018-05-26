import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import styled from 'styled-components'
import Button from '../components/Button'
import { connect } from 'react-redux'
import actions from '../actions'

const Title = styled.Text`
text-align: center;
font-size: 24px;
padding: 16px;
`

class DeckCreate extends Component {
    state = {
        name: ''
    }

    static navigationOptions = {
        title:'Create a new deck',
    }

    submit = () => {
        let label = this.state.name.trim()

        if (label) {
            const { deck } = this.props.createDeck(this.state.name)

            this.props.navigation.navigate('DeckDetails', {
                deckId: deck.id,
                deckLabel: deck.label,
            })
        }
    }

    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center' }}>
                <Title>What is the title of your new deck?</Title>
                <TextInput
                    style={{height: 50, width: 270, textAlign: 'center'}}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                />
                <Button onPress={this.submit}>
                    <Text>Create Deck</Text>
                </Button>
                <Text>
                    {JSON.stringify(this.props.dispatch)}
                </Text>
            </View>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        createDeck: (name) => dispatch(actions.decks.createDeck(name)),
    }
}

export default connect(null, mapDispatch)(DeckCreate)