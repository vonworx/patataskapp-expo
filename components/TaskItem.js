import React, {Component} from 'react';
import { Appregistry, StyleSheet, Text, View } from 'react-native';


export default class TaskItem extends React.Component {

  constructor(props) {
  	super(props);
  }

  render() {
    return (

     	 <Text>{this.props.titleText}</Text>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});