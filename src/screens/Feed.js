import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, FlatList, ActivityIndicator, Image, LogBox } from 'react-native'

import Post from '../components/Post'
import { List } from '../VideosList'

LogBox.ignoreAllLogs()

export default class Feed extends Component {
    state = {
        list: [],
        loading: true,
    }
    async componentDidMount() {
        this.setState({ loading: true })
        await this.setState({ list: List })
        this.props.navigation.setOptions({
            headerLeft: () => (
                <Image source={require('../assets/images/FeedHeader.png')} style={{ resizeMode: 'contain', width: 30, height: 30, marginLeft: 20, }} />
            )
        })
        this.setState({ loading: false })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.loading ?
                    <ActivityIndicator animating={true} size={'large'} style={styles.ActInd} color={'#333'} /> :
                    <FlatList
                        style={styles.flatlist}
                        data={this.state.list}
                        keyExtractor={item => `${Math.random()}`}
                        renderItem={({ item }) => <Post {...item} {...this.props} />}
                    />}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    ActInd: {
        alignSelf: 'center'
    },
})