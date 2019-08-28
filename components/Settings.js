'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {View, ScrollView, StyleSheet, Text } = ReactNative;
import { Card, Appbar, Button, List } from 'react-native-paper';
import {withNavigation} from 'react-navigation';

import ajax from '../service/fetchGETRestData';

class Settings extends React.Component {

  constructor(props) {
    super(props)

    this.state={
      screenTitle: "",
      username:"",
    }

  }

  async componentWillMount(){
    const taskTypeURL = this.props.navigation.getParam('taskuri', '');        
    const scrTitle = this.props.navigation.getParam('screenTitle','Patatask Task List');
    const username = this.props.navigation.getParam('uname','');
    this.setState({screenTitle: scrTitle, username });

    console.log("TASK TYPE : " + taskTypeURL + " || USERNAME: " + username);
  }

  goback(){
    console.log("GO BACK PRESSED");
    this.props.navigation.goBack();
  }


  render () {

    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation

    return (
      
        <View style={styles.container} >

              <Appbar style={styles.bottom}>
                  <Appbar.Action icon="arrow-back" size={40} onPress={() => goBack()}/>
                  <Appbar.Content title={this.state.screenTitle} TitleStyle={{textAlign: 'center'}} />
                  <Appbar.Action style={styles.exitBtn} icon="exit-to-app" size={40} onPress={ ()=> this.props.screenProps.onLogout() } />
              </Appbar>              
              <Card style={styles.cardStyle}>
                <Card.Content style={styles.cardContentBox}>
                  <List.Section>
                    <List.Subheader>Account Settings</List.Subheader>
                    <List.Item
                        title="Profile Settings"
                        description = ""
                        titleStyle = {styles.listItemTitle}
                        left={() => <List.Icon icon="account-box" />}
                        onPress={ ()=> console.log("Pressed")}
                    />
                    <List.Item
                      title="Wallet Management"
                      description=""
                      titleStyle = {styles.listItemTitle}
                      left={() => <List.Icon color="#000" icon="account-balance-wallet" />}
                      onPress={ ()=> console.log("Pressed")}
                    />
                    <List.Subheader>Manage Friends</List.Subheader>
                    <List.Item
                      title="Add Friend"
                      description =""
                      titleStyle = {styles.listItemTitle}
                      left={() => <List.Icon color="#000" icon="person-add" />}
                      onPress={ ()=> navigate("FriendAdd", {uname : this.state.username})}
                    />
                    <List.Item
                      title="Remove Friend"
                      description =""
                      titleStyle = {styles.listItemTitle}
                      left={() => <List.Icon color="#000" icon="remove-circle" style={styles.listIconStyle}/>}
                      onPress={ ()=> navigate("FriendRemove")}
                    />
                    <List.Item
                      title="Block Friend"
                      description =""
                      titleStyle = {styles.listItemTitle}
                      left={() => <List.Icon color="#000" icon="block" />}
                      onPress={ ()=> navigate("FriendBlock")}
                    />
                    
                  </List.Section>
              </Card.Content>
            </Card>

        </View>
    
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2980b9',
    alignContent: 'center',
    justifyContent: 'center',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: '#990000'
  },
  exitBtn: {
    alignSelf: 'flex-end'
  },
  cardStyle: {
    alignSelf: "center",
    justifyContent: 'center',
    width: "90%",
    backgroundColor:'#fff'
  },
  cardContentBox: {
    
  },
  listItemTitle: {
    fontSize: 18
  },
  listIconStyle:{
    width:40
  }
})

export default withNavigation(Settings);