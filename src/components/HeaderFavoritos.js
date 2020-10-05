import React, { Component } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export class HeaderFavoritos extends Component {
    state = {
        disable: false
    }
    render() {
        return (
            <TouchableOpacity
                style={{ alignSelf: 'center', alignItems: 'center', marginRight: 25, }}
                onPress={() => this.props.addToFavorite()}>
                {this.props.favoritado ? <MaterialCommunityIcons name={'star'} color={'green'} size={30} /> : <MaterialCommunityIcons name={'star-off'} color={'black'} size={30} />}
            </TouchableOpacity>
        )
    }
}