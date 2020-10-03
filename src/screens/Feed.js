import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, FlatList } from 'react-native'

import Post from '../components/Post'

export default class Feed extends Component {
    state = {
        list: [
            { videoId: 'iee2TATGMyI' },
            { videoId: 'ylY43jcjIjU' },
            { videoId: 'sAcj8me7wGI' },
            { videoId: 'S-gWb3sV9mY' },
            { videoId: 'acS7_Utso14' },
        ]
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    style={styles.flatlist}
                    data={this.state.list}
                    keyExtractor={item => Math.random()}
                    renderItem={({ item }) => <Post {...item} {...this.props}/>}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})