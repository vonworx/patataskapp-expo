import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';


export default class LoginForm extends Component{

    render(){
        return (
            <View>
                <TextInput style={styles.textInputStyle} placeholder="Username" />
                <TextInput style={styles.textInputStyle} placeholder ="Password" secureTextEntry={ true }/>
                <Button title="Login" onPress = { this.props.onLoginPress } />
            </View>
        );
    }

}

const styles = StyleSheet.create({

	textInputStyle: {
		width: 200,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 5,
		margin:7
	},

});
