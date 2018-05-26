import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Button from '../components/Button'
import actions from '../actions'

const Input = styled.TextInput`
padding: 5px;
text-align: center;
font-size: 14px;
border: 1px solid #ccc;
height: 50px;
width: 300px;
margin: 10px;
`

class CardCreate extends Component {
    state = {
        question: '',
        answer: '',
    }

    static navigationOptions = {
        title:'Create New Question',
    }

    submit = () => {
        this.props.createCard(this.props.navigation.getParam('deckId'), this.state.question, this.state.answer)
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Question</Text>
                <Input
                    onChangeText={(question) => this.setState({...this.state, question})}
                    value={this.state.question}
                />

                <View style={{ height: 40 }} />

                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Answer</Text>
                <Input
                    onChangeText={(answer) => this.setState({...this.state, answer})}
                    value={this.state.answer}
                />
                <Button onPress={this.submit}>
                    <Text>Submit</Text>
                </Button>

            </View>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        createCard: (deckId, question, answer) => dispatch(actions.decks.createCard(deckId, question, answer)),
    }
}

export default connect(null, mapDispatch)(CardCreate)