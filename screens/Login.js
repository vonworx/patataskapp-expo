import React from 'react';
import { StyleSheet, Text, TextInput, Button, ScrollView, View } from 'react-native';

export default class Login extends React.Component {
  constructor(props){

    super(props);
    state = {
      username: "",
      password: ""
    }

  }
  render()
  {
    return(
      <View>
          <Button title="Login" onPress = { this.props.onLoginPress } />
      </View>
    );
  }
}

const styles = StyleSheet.create({

	textInputStyle: {
		width: 300,
		borderColor: '#2EA1FF',
		borderWidth: 2,
		padding: 10,
		margin:10,
    color: '#fff',
    fontWeight: '200'
	},

});
