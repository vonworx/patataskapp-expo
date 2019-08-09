import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";


import TaskList from '../components/TaskList';
import CreateTask from './CreateTask';

const AppNavigator = createStackNavigator(
{
    Home:  {screen: Dashboard},
    Tasks: {screen: TaskList},
    Create: {screen: CreateTask}
},
{
    defaultNavigationOptions:{ header:null }
}
);
  
 export default createAppContainer(AppNavigator);