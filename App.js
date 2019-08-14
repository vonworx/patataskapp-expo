import React from 'react';
import { StyleSheet, Text, View, StatusBar, AsyncStorage, Image } from 'react-native';
import LoginForm from './components/forms/LoginForm';
import { Appbar, TextInput, Button } from 'react-native-paper';

import Login from './screens/Login';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard'

////<Text>Choi open up App.js to start working on your app!</Text>
export default class App extends React.Component {

    constructor(props){
      super(props);
      this.logOut = this.logOut.bind(this);

      this.state = {
        username: 'choister',
        password: 'choipogi123',
        isLoggedIn: false,
        message: '',
        logData: [],
        length: ''
      }

    }

    logOut(){
      
      this.setState({
        isLoggedIn:false
      });

    }

    _userLogin = async () => {
      var username = this.state.username;
      var proceed = false;
      //var url = "http://13.228.19.190:3000/api/accounts?filter=%7B%22where%22%3A%7B%22username%22%3A%22"+ username + "%22%20%7D%7D";
      var url = "http://13.228.19.190:3000/api/accounts?filter[where][username]="+ username;

      try {
        let response = await fetch(url);
        
        if (response.status == 200){
            this.setState({ message: "Account not found" });
            proceed = true;
            const userInfo = await response.json();
            const details = userInfo[0];

            //console.log(details);

            if ( (JSON.stringify(userInfo)).length > 2){
              if ( (this.state.username == details.username) && (this.state.password == details.password) ){

                this.setState({
                  isLoggedIn: true,
                  logData: userInfo,
                  password: details.password,
                  message: ''
                 });

                AsyncStorage.setItem('USERDATA', JSON.stringify(userInfo));

              } else {
                this.setState({message: "Invalid password"});
              }
            } else {
              this.setState({ message: "No account not found" });
            }
        } else {
          //this.setState({ isLoggingIn: false });
        }

        if (proceed) {
          //this.props.onLoginPress();
        }

      }
      catch(e) {
          console.log(e)
      }

    }

    render() {

    if (!this.state.isLoggedIn){
      return (
        <View style={styles.container}>
        <StatusBar hidden={true} />
            <Image source={ require('./assets/logo-trans.png')} width="95%" height="95%"  />
            <TextInput label="Enter Username" style={styles.textInputStyle} onChangeText={(username) => this.setState({username})} placeholder="Username" value={this.state.username} />
            <TextInput label="Enter Password" style={styles.textInputStyle} onChangeText={(password) => this.setState({password})} placeholder ="Password" value={this.state.password} secureTextEntry={ true }/>
            <Button contentStyle={{fontSize: 28}} mode="contained" dark={true} style = {styles.logButtonStyle} onPress = { this._userLogin } uppercase={false} >LOGIN</Button>
            <Text style={ styles.errText }>{this.state.message}</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.homeStyle}>
          <Dashboard screenProps = {{onLogout: this.logOut, logData: this.state.logData, navigation: this.props.navigation}} logData={this.state.logData} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7cf',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logButtonStyle : {
    backgroundColor: '#990000',
    width: "80%",
    height: 50,
  },
  errText: {
    padding: 5,
    fontSize: 22,
    color: '#fff',
    fontWeight: '300',
    fontStyle:'italic'
  },
  loginText:{
    fontSize: 22,
    fontWeight: '200',
    color: "#fff",
  },
  headerText:{
    borderColor: '#fff',
		borderWidth: 5,
    fontSize: 68,
    padding: 20,
    fontWeight: 'bold',
    color: "#fff",
    textAlignVertical: 'top',
    position: 'absolute',
    top: 120,
  },
  textInputStyle: {
    width: "80%",
    height: 56,
    borderColor: '#2EA1FF',
		borderWidth: 2,
		margin:2,
    color: '#fff',
    fontWeight: '200',
    fontSize:22
  },
  homeStyle:{
    height: "100%",
    backgroundColor: '#4c5fb1'
  }
});
