'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {View, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList} = ReactNative;

import ajax from '../service/fetchData';

export default class TaskFlatList extends React.PureComponent {

  state = {
      users: []
  }

  async componentDidMount() {
    const users = await ajax.fetchUsers();
    this.setState({users});
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
    backgroundColor: '#F5FCFF',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    paddingLeft: 50,
    borderRadius: 2,
    maxWidth: '100%',
    width: '100%',
  },
  name: {
    fontSize: 18
  },
  email: {
    color: 'red'
  }

});
