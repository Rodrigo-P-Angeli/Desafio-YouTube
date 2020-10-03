import React, { Component } from 'react'
import { View } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'

export default class Video extends Component {
    state = {
        playing: true,
    }
    render() {
        const onStateChange = (state) => {
            if (state === "ended") {
                this.setState({ playing: false })
            }
        }
        return (
            <View>
                <YoutubePlayer
                    height={350}
                    play={this.state.playing}
                    videoId={this.props.route.params.videoId}
                    onChangeState={onStateChange} />
            </View>
        )
    }
}