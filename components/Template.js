import React from 'react';
import { StyleSheet, Text, View, StatusBar, AsyncStorage, Image } from 'react-native'
import { Appbar } from 'react-native-paper';

export default class FriendAdd extends React.Component {

    render(){
        const { goBack } = this.props.navigation;
        const { navigate } = this.props.navigation
        return(

            <View>
                <Appbar style={styles.bottom}>
                    <Appbar.Action icon="arrow-back" size={40} onPress={() => goBack()}/>
                    <Appbar.Content title="Add a new Friend" TitleStyle={{textAlign: 'center'}} />
                    <Appbar.Action style={styles.exitBtn} icon="exit-to-app" size={40} onPress={ ()=> this.props.screenProps.onLogout() } />
                </Appbar>   
            </View>

        )

    }

}

const styles = StyleSheet.create(
    {
        
    }

);