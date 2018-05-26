import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Button from '../components/Button'
import DeckListItem from '../components/DeckListItem'
import { fetchDeckResults } from '../utils/api'
import actions from '../actions'

class DeckList extends Component {
    state = {
        ready: false
    }

    static navigationOptions = {
        title:'Listagem'
    }

    componentDidMount() {
        fetchDeckResults()
            .then((data) => this.props.setDecks(data))
            .then(() => this.setState(() => ({ready: true})))
    }

    gotoDeckDetails = (deckId) => () => {
        this.props.navigation.navigate('DeckDetails', {
            deckId: deckId,
            deckLabel: this.props.decks[deckId].label,
        })
    }

    gotoDeckCreate = () => {
        this.props.navigation.navigate('DeckCreate')
    }

    renderList = () => {
        const { decks } = this.props
        const list = Object.keys(decks).map(key => {
            const deck = decks[key]
            return (
                <DeckListItem
                    key={key}
                    label={deck.label}
                    cardLength={Object.keys(deck.cards).length}
                    onPress={this.gotoDeckDetails(key)}
                />
            )
        })

        return (
            <ScrollView>
                {list}
            </ScrollView>
        )
    }

    render() {
        const { decks } = this.props
        const { ready } = this.state

        if (ready === false) {
            return (
                <View sytle={{ flex: 1 }}>
                    <Text>Fetching data...</Text>
                </View>
            )
        }

        return (
            <View style={{flex:1, justifyContent:'flex-start' }}>

                {this.renderList()}

                <Button onPress={this.gotoDeckCreate} theme='sidebar'>
                    <Text style={{ textAlign: 'center' }}>
                        Create a New Deck
                    </Text>
                </Button>
            </View>
        )
    }
}

const mapState = (state, props) => {
    return {
        decks: state.decks.all
    }
}

const mapDispatch = (dispatch) => {
    return {
        setDecks: (data) => dispatch(actions.decks.setDecks(data)),
    }
}

export default connect(mapState, mapDispatch)(DeckList)