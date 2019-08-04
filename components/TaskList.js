'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {View, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList} = ReactNative;

import ajax from '../service/fetchGETRestData';

export default class TaskList extends React.PureComponent {

  state = {
    tasks: []
  } 
  //http://patatask.com:3000/api/Tasks?filter[where][assignee]=2&filter[where][completed]=0
  async componentDidMount() {
    const tasks = await ajax.fetchUsers(this.props.taskTypeURL);
    this.setState({tasks});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.users}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) =>
            <View style={styles.flatview}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            }
            keyExtractor={item => item.email}
          />
      </View>
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