import React, { Component } from 'react'
import { Image, SafeAreaView, StyleSheet, View, Dimensions, Alert, ImageBackground, Text } from 'react-native'
import { getYoutubeMeta } from 'react-native-youtube-iframe';
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

import CommonStyles from '../CommonStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Post extends Component {
    state = {
        loading: true,
        favoritado: false,
    }
    async componentDidMount() {
        await getYoutubeMeta(this.props.videoId).then(meta => {
            this.setState({ meta })
        }).catch(e => console.log(e))
        await this.checkFavoritos()
        this.setState({ loading: false })
    }
    async checkFavoritos() {
        try {
            const value = await AsyncStorage.getItem('favoritos')
            if (value !== null) {
                const favoritos = JSON.parse(value)
                favoritos.filter(item => item == this.props.videoId).length > 0 ? this.setState({ favoritado: true }) : this.setState({ favoritado: false })
            }
        } catch (e) {
            console.log(e)
        }
    }
    async addFavoritos() {
        try {
            let favoritos = []
            const value = await AsyncStorage.getItem('favoritos')
            if (value != null) {
                favoritos = JSON.parse(value)
            }
            favoritos.push(this.props.videoId)
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
                let favoritos2 = favoritos.filter(item => item != this.props.videoId)
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
        await this.checkFavoritos()
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? null :
                    <View>
                        <TouchableOpacity onPress={() => {
                            this.props.playlist ? this.props.onPlaylistSelection(this.props.videoId) : null
                            this.props.navigation.navigate('Video',
                                {
                                    videoId: this.props.videoId,
                                    desc: this.props.desc,
                                    categoria: this.props.categoria,
                                })
                        }
                        }>
                            <ImageBackground
                                style={[styles.image, this.props.playlist ? { height: 150 } : null]}
                                source={{ uri: this.state.meta.thumbnail_url }}>
                                <LinearGradient
                                    colors={['transparent', 'transparent', '#000000']}
                                    style={styles.linearGradient}>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={styles.text}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title}>{this.state.meta.title}</Text>
                                {this.props.playlist ? null : <View><Text style={styles.desc}>{this.props.desc}</Text>
                                    <Text style={styles.categoria}>{this.props.categoria}</Text></View>}
                            </View>
                            <TouchableOpacity style={styles.favorito} onPress={() => this.state.favoritado ? this.removeFavoritos() : this.addFavoritos()}>
                                {this.state.favoritado ? <MaterialCommunityIcons name={'star'} size={25} color={'green'} /> : <MaterialCommunityIcons name={'star'} size={25} color={'black'} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 15,
    },
    image: {
        width: (Dimensions.get('screen').width),
        height: 260,
    },
    text: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    title: {
        textAlignVertical: 'top',
        color: 'black',
        flex: 1,
        marginBottom: 3,
        fontFamily: CommonStyles.fontFamilyTitle
    },
    desc: {
        textAlignVertical: 'top',
        color: '#666',
        flex: 1,
        fontFamily: CommonStyles.fontFamily,
    },
    categoria: {
        textAlignVertical: 'top',
        color: '#888',
        flex: 1,
        fontFamily: CommonStyles.fontFamily,
    },
    linearGradient: {
        flex: 1,
    },
    favorito: {
        alignSelf: 'center',
        flex: 1,
    },
})