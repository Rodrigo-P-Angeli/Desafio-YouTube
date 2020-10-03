import React, { Component } from 'react'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { getYoutubeMeta } from 'react-native-youtube-iframe';

export default class Feed extends Component {
    state = {
        loading: true,

    }
    async componentDidMount() {
        await getYoutubeMeta(this.props.videoId).then(meta => {
            this.setState({ meta, loadingImage: false })
        }).catch(e => Alert.alert(e))
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? null : <ImageBackground
                    style={styles.image}
                    source={{ uri: this.state.meta.thumbnail_url }}>
                    <LinearGradient
                        colors={['transparent', 'transparent', '#000000']}
                        style={styles.linearGradient}>
                    </LinearGradient>
                </ImageBackground>}
                {
                    this.state.loading ? null :
                        <View style={styles.content}>
                            <Text style={styles.title}>{this.state.meta.title}</Text>
                        </View>
                }
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    image: {
        width: (Dimensions.get('screen').width - 40) / 3,
        height: 90,
    },
    title: {
        margin: 10,
        textAlignVertical: 'top',
        color: 'white',
        fontWeight: 'bold',
        flex: 1,
    },
    linearGradient: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
})