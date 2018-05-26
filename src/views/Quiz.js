import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Button from '../components/Button'
import actions from '../actions'
import { resetNotification } from '../utils/notification'

const SubTitle = styled.Text`
color: grey;
text-align: center;
`
const Title = styled.Text`
color: black;
text-align: center;
font-size: 22px;
margin-bottom: 30px;
`

const ContainerMiddle = styled.View`
flex: 1;
justify-content: center;
`

const ContainerBottom = styled.View`
flex-direction: row;
`

class Quiz extends Component {
    state = {
        score: 0,
        finalScore: 0,
        current: 0,
        screen: 'question',
    }

    static navigationOptions = ({navigation}) => {
        const label = navigation.getParam('deckLabel')
        return {
            title:`Quiz - ${label}`,
            headerStyle: {
                backgroundColor: '#6b52ae',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

    seeAnswer = () => {
        this.setState({ ...this.state, screen: 'answer' })
    }

    itCorrects = () => {
        this.nextCard(true)
    }

    itWrongs = () => {
        this.nextCard(false)
    }

    nextCard = (isCorrect) => {
        const hasMoreQuestions = this.state.current + 1 !== this.props.cardLength
        const score = isCorrect ? this.state.score + 1 : this.state.score
        const finalScore = (score * 100 / this.props.cardLength).toFixed(2)
        this.setState((prevState) => ({
            ...prevState,
            current: hasMoreQuestions ? prevState.current + 1 : prevState.current,
            score,
            finalScore,
            screen: hasMoreQuestions ? 'question' : 'result',
        }))
        if(!hasMoreQuestions) {
            this.saveScore()
        }
    }

    saveScore = () => {
        this.props.updateScore(this.props.deck.id, this.state.finalScore)
        resetNotification()
    }

    reset = () => {
        this.setState({
            score: 0,
            current: 0,
            screen: 'question',
        })
    }

    render() {
        const { deck, cardLength } = this.props
        const { score, finalScore, current, screen } = this.state
        const currentCard = deck.cards[Object.keys(deck.cards)[current]]

        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{paddingTop: 10}}>
                    {current + 1}  / {cardLength}
                </Text>

                {screen === 'question' && (
                    <React.Fragment>
                        <ContainerMiddle>
                            <SubTitle>Question</SubTitle>
                            <Title>{currentCard.question}</Title>
                        </ContainerMiddle>
                        <Button onPress={this.seeAnswer}>
                            <Text style={{ textAlign: 'center' }}>
                                Show Answer
                            </Text>
                        </Button>
                    </React.Fragment>
                )}

                {screen === 'answer' && (
                    <React.Fragment>
                        <ContainerMiddle>
                            <SubTitle>Answer</SubTitle>
                            <Title>{currentCard.answer}</Title>
                        </ContainerMiddle>

                        <ContainerBottom>
                            <Button onPress={this.itCorrects} bg="green">
                                <Text>
                                    Correct
                                </Text>
                            </Button>
                            <Button onPress={this.itWrongs} bg="red">
                                <Text>
                                    Incorrect
                                </Text>
                            </Button>
                        </ContainerBottom>
                    </React.Fragment>
                )}

                {screen === 'result' && (
                    <ContainerMiddle>
                        <SubTitle>Final Result</SubTitle>
                        <Title>{finalScore}</Title>
                        <Button>
                            <Text onPress={this.reset}>
                                Restart Quiz
                            </Text>
                        </Button>
                        <Button>
                            <Text onPress={() => this.props.navigation.navigate('Home')}>
                                Back to Deck
                            </Text>
                        </Button>
                    </ContainerMiddle>
                )}
            </View>
        )
    }
}

const mapState = (state, props) => {
    const deckId = props.navigation.getParam('deckId')
    const cardLength = Object.keys(state.decks.all[deckId].cards).length
    return {
        deck: state.decks.all[deckId],
        cardLength,
    }
}

const mapDispatch = (dispatch) => {
    return {
        updateScore: (deckId, score) => dispatch(actions.decks.updateScore(deckId, score)),
    }
}

export default connect(mapState, mapDispatch)(Quiz)