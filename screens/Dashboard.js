import React from 'react';
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './Home';

import TaskList from '../components/TaskList';
import ModifyTask from '../components/ModifyTask';
import CreateTask from './CreateTask';



class Dashboard extends React.Component {

    constructor(props)
    {
      super(props);
      this.logOut = this.logOut.bind(this);
    }

    state = {
        logMyData: null,
        onLogoutPress: true
      }

    componentWillMount(){
      this.setState( {logMyData: this.props.screenProps.logData});
      console.log("Props data: " + this.props.screenProps.logData); 
    }

    logOut(){
      this.props.screenProps.onLogout();
    }

    render() {
      return (
        <View style={{flex:1}}>
          <Home onLogoutHandler = { this.logOut } myTask="Hello" navigation={this.props.navigation} />
        </View>
      );
    }
  }
  
  const AppNavigator = createStackNavigator(
    {
      Home:  {screen: Dashboard},
      Tasks: {screen: TaskList},
      Create: {screen: CreateTask},
      Assign: {screen: ModifyTask}
    },
    {
      defaultNavigationOptions:{ header:null }
    }
  );
  
  export default createAppContainer(AppNavigator);