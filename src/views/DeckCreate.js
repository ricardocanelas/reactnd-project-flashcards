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

const Input = styled.TextInput`
padding: 5px;
text-align: center;
font-size: 14px;
border: 1px solid #ccc;
height: 50px;
width: 300px;
margin: 10px;
`

class DeckCreate extends Component {
    state = {
        name: ''
    }

    static navigationOptions = {
        title: 'Create Deck',
        headerStyle: {
            backgroundColor: '#162a5c',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
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
                <Input
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