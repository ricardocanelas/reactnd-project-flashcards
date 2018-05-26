import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

function Button (props) {

    let Button

    if (props.theme && props.theme === 'full') {
        Button = styled.TouchableOpacity`
        padding: 20px;
        border: 1px solid #ccc;
        margin: 0px;
        background-color: #162a5c;
        border-radius: 0;
        `
    } else {
        Button = styled.TouchableOpacity`
        padding: 10px;
        border: 1px solid #ccc;
        margin: 5px 0;
        background-color: ${props.bg ? props.bg : 'white'};
        border-radius: 4px;
        `
    }


    return (
        <Button onPress={props.onPress}>
            {props.children}
        </Button>
    )
}

export default Button