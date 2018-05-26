import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const Button = styled.TouchableOpacity`
padding: 10px;
margin: 0;
border: 1px solid #ccc;
flex: 1;
justify-content: center;
align-items: center;
height: 90px;
`

const Label = styled.Text`
text-align: center;
font-size: 16px;
font-weight: bold;
`

const SubLabel = styled.Text`
color: grey;
text-align: center;
`

export default function DeckListItem (props) {
    return (
        <Button onPress={props.onPress}>
            <Label>{props.label}</Label>
            <SubLabel>{props.cardLength} cards</SubLabel>
        </Button>
    )
}