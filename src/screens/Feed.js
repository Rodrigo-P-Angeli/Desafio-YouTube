import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, FlatList } from 'react-native'

import Post from '../components/Post'

export default class Feed extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    style={styles.flatlist}
                    data={this.state.list}
                    keyExtractor={item => item.videoId}
                    renderItem={item => <Post {...item} />}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})