import React, { Component } from 'react'
import { Image, SafeAreaView, StyleSheet, View, Dimensions, Alert, ImageBackground, Text } from 'react-native'
import { getYoutubeMeta } from 'react-native-youtube-iframe';
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Feed extends Component {
    state = {
        loading: true,
    }
    async componentDidMount() {
        await getYoutubeMeta(this.props.videoId).then(meta => {
            this.setState({ meta, loading: false })
        }).catch(e => console.log(e))
    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('Video', { videoId: this.props.videoId })}>
                {this.state.loading ? null :
                    <View style={styles.content}>
                        <ImageBackground
                            style={styles.image}
                            source={{ uri: this.state.meta.thumbnail_url }}>
                            <LinearGradient
                                colors={['transparent', 'transparent', '#000000']}
                                style={styles.linearGradient}>
                            </LinearGradient>
                        </ImageBackground>
                        <Text style={styles.title}>{this.state.meta.title}</Text>
                    </View>
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 20,
    },
    image: {
        width: (Dimensions.get('screen').width),
        height: 260,
    },
    title: {
        margin: 10,
        textAlignVertical: 'top',
        color: 'black',
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