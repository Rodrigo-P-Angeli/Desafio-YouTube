import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet, SafeAreaView, Text, ScrollView, LogBox  } from 'react-native'
import YoutubePlayer, { getYoutubeMeta } from 'react-native-youtube-iframe'
import AsyncStorage from '@react-native-community/async-storage'

import { HeaderFavoritos } from '../components/HeaderFavoritos'
import { List } from '../VideosList'
import CommonStyles from '../CommonStyles'
import { FlatList } from 'react-native-gesture-handler'
import Post from '../components/Post'

LogBox.ignoreAllLogs()

export default class Video extends Component {
    state = {
        loading: true,
        playing: false,
        favoritado: false
    }
    async componentDidMount() {
        await this.loadVideo(this.props.route.params.videoId)
        await this.checkFavoritos(this.props.route.params.videoId)
        await this.setState({ list: List, loading: false })
    }
    async onPlaylistSelection(videoId) {
        await this.setState({ loading: true })
        await this.loadVideo(videoId)
        await this.checkFavoritos(videoId)
        await this.setState({ loading: false })
    }
    async checkFavoritos(videoId) {
        try {
            const value = await AsyncStorage.getItem('favoritos')
            if (value !== null) {
                const favoritos = JSON.parse(value)
                favoritos.filter(item => item == videoId).length > 0 ? this.setState({ favoritado: true }) : this.setState({ favoritado: false })
            }
        } catch (e) {
            console.log(e)
        }
        await this.setHeader()
    }
    async addFavoritos() {
        try {
            let favoritos = []
            const value = await AsyncStorage.getItem('favoritos')
            if (value != null) {
                favoritos = JSON.parse(value)
            }
            favoritos.push(this.props.route.params.videoId)
            try {
                let favoritos2 = JSON.stringify(favoritos)
                await AsyncStorage.setItem('favoritos', favoritos2)
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e)
        }
        await this.checkFavoritos()
    }
    async removeFavoritos() {
        try {
            const value = await AsyncStorage.getItem('favoritos')
            if (value != null) {
                let favoritos = JSON.parse(value)
                let favoritos2 = favoritos.filter(item => item != this.props.route.params.videoId)
                try {
                    const jsonValue = JSON.stringify(favoritos2)
                    await AsyncStorage.setItem('favoritos', jsonValue)
                } catch (e) {
                    console.log('Erro ao salvar favoritos', e)
                }
            }
        } catch (e) {
            console.log('Erro ao carregar favoritos', e)
        }
        this.checkFavoritos()
    }
    setHeader = () => {
        this.props.navigation.setOptions({
            title: this.state.meta.title,
            headerRight: () => (
                <HeaderFavoritos {...this.props} addToFavorite={this.state.favoritado ? () => this.removeFavoritos() : () => this.addFavoritos()} favoritado={this.state.favoritado} />
            ),
        });
    }
    async loadVideo(videoId) {
        this.props.navigation.setOptions({
            title: 'Carregando',
        });
        await getYoutubeMeta(this.props.route.params.videoId).then(meta => {
            this.setState({ meta })
        }).catch(e => console.log(e))
    }
    render() {
        const onStateChange = (state) => {
            if (state === "ended") {
                this.setState({ playing: false })
            }
        }
        return (
            <SafeAreaView>
                {this.state.loading ?
                    <ActivityIndicator animating={true} size={'large'} style={styles.ActInd} color={'#333'} /> :
                    <ScrollView>
                        <YoutubePlayer
                            height={270}
                            play={this.state.playing}
                            videoId={this.props.route.params.videoId}
                            onChangeState={onStateChange} />
                        <View style={{ flexDirection: 'row', padding: 10, }}>
                            <Text style={styles.title}>Descrição: </Text><Text style={styles.text}>{this.props.route.params.desc}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10, }}>
                            <Text style={styles.title}>Categoria: </Text><Text style={styles.text}>{this.props.route.params.categoria}</Text>
                        </View>
                        <View style={{ padding: 10, }}>
                            <Text style={styles.title}>Comentários [0]: </Text><Text style={styles.text}>...</Text>
                        </View>
                        <View style={{ padding: 10, }}>
                            {this.state.list.map(item => item.videoId != this.props.route.params.videoId ? <Post playlist={true} key={item.videoId} {...item} {...this.props} onPlaylistSelection={(a) => this.onPlaylistSelection(a)} /> : null)}
                        </View>
                    </ScrollView>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    ActInd: {
        alignSelf: 'center'
    },
    title: {
        fontFamily: CommonStyles.fontFamilyTitle,
        fontSize: 15,
    },
    text: {
        fontFamily: CommonStyles.fontFamily,
        fontSize: 15,
    },
})