import React from 'react';
import { View, Text, Easing, Animated } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from './Home';
import TaskList from '../components/TaskList';
import ModifyTask from '../components/ModifyTask';
import AssignTask from '../components/AssignTask';
import ApproveTask from '../components/ApproveTask';
import StatusTask from '../components/StatusTask';
import ViewTask from '../components/ViewTask';
import CreateTask from './CreateTask';

import Settings from '../components/Settings';
import FriendAdd from '../components/FriendAdd';
import FriendRemove from '../components/FriendRemove';
import FriendBlock from '../components/FriendBlock';


class Dashboard extends React.Component {

    constructor(props)
    {
      super(props);
      this.logOut = this.logOut.bind(this);

      this.state = {
        logMyData: null,
        onLogoutPress: true
      }

    }

    

    componentWillMount(){

      this.setState( {logMyData: this.props.screenProps.logData});
      //console.log("Props data: " + this.props.screenProps.logData);
    
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
      Home:   {screen: Dashboard},
      Tasks:  {screen: TaskList},
      Create: {screen: CreateTask},
      Assign: {screen: AssignTask},
      Modify: {screen: ModifyTask},
      Approve:{screen: ApproveTask},
      Status: {screen: StatusTask},
      View:   {screen: ViewTask},
      Settings: {screen: Settings},
      FriendAdd : {screen: FriendAdd},
      FriendRemove : {screen: FriendRemove},
      FriendBlock : {screen: FriendBlock},
    },
    {
      defaultNavigationOptions:{ header:null },
      transitionConfig: () => ({
        transitionSpec: {
          duration: 350,
          easing: Easing.inOut(Easing.poly(3)),
          timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
  
          const width = layout.initWidth;
          const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [width, 0, 0],
          });
  
          const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
          });
  
          return { opacity, transform: [{ translateX }] };
        },
      }),
    }
    
  );
  
  export default createAppContainer(AppNavigator);