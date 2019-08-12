'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {View, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList} = ReactNative;
import { withNavigation } from 'react-navigation';
import { Card, Appbar } from 'react-native-paper';
import { Image } from 'react-native-elements';
import ajax from '../service/fetchGETRestData';

class TaskList extends React.PureComponent {

  constructor(props){
    super(props);
  }

  state = {
    tasks: [],
    screenTitle: "",
    taskid: null,
    taskType:""
  }

  async componentWillMount() {

    const { navigation } = this.props;

    //UNCOMMENT BELOW FOR TESTING
    //const taskTypeURL = 'http://52.34.74.81/tasks.json';

    const taskTypeURL = this.props.navigation.getParam('taskuri', '');
    const scrTitle    = this.props.navigation.getParam('screenTitle','Patatask Task List');
    const taskType    = this.props.navigation.getParam('taskType','assigned');
    
    const tasks = await ajax.fetchData(taskTypeURL);    
    this.setState({tasks, screenTitle: scrTitle, taskType});

  }


  getYourTasks = e = ()=> { 
    const apiuri = "http://patatask.com:3000/api/Tasks?filter[where][id]="+ this.state.taskid;
    this.props.navigation.navigate('Tasks',{taskuri: apiuri, screenTitle: "Assign Your Tasks", taskType:"own"});
  }


  getItemId(itemid){

    this.setState({
      taskid: itemid
    });

    console.log(this.state.taskid);
    
    let scrTitle = "";
    
    switch(this.state.taskType){
      case "assigned":
        scrTitle = "Edit Your Assigned Task";
        break;
      case "pending": {
        scrTitle = "View Pending Task";
        break;
      }
      case "approved": {
        scrTitle = "View Approved Task";
        break;
      } 
      case "own": {
        scrTitle = "Assign Your Task";
        break;
      }
      

    }

    const apiuri = "http://patatask.com:3000/api/Tasks?filter[where][id]="+ itemid;
    this.props.navigation.navigate('Assign',{taskuri: apiuri, screenTitle: scrTitle, taskType:"own"});
  }

  render() {

    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>

        <Appbar style={styles.bottom}>
            <Appbar.Action icon="arrow-back" onPress={() => goBack()}/>
            <Appbar.Content title={this.state.screenTitle} TitleStyle={{textAlign: 'center'}} />
            <Appbar.Action style={styles.exitBtn} icon="exit-to-app" onPress={ ()=> this.props.screenProps.onLogout() } />
        </Appbar> 

        <FlatList 
            style={styles.flatList}
            data={this.state.tasks}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) =>
            <View style={styles.view}>
              <Card style={styles.card} onPress={() => this.getItemId(item.id) }>
                <Card.Title title={item.taskname} titleStyle={styles.taskname} />                
                <Card.Content>
                  <Image source={{uri: item.file}} style={{ width: 50, height: 50 }} />
                  <Text><Text style={styles.label}>Description </Text><Text style={styles.description}>{item.description}</Text></Text>
                  <Text><Text style={styles.label}>Reward Amount </Text><Text style={styles.amount}>{item.amount}</Text></Text>
                </Card.Content>
              </Card>
            </View>
            }
            keyExtractor={item => item.id.toString()}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7cf',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatList:{
    marginTop: 75,
  },
  view: {
    justifyContent: 'center',
    paddingLeft: 10,
    borderRadius: 2,
    maxWidth: '90%',
    width: '90%',
    backgroundColor:'#f7f7cf',
    alignSelf:'center'
  },
  card:{
    margin: 5,
    elevation: 2
  },
  label:{
    fontSize: 12,
    fontWeight:"bold"
  },
  taskname: {
    fontSize: 18
  },
  description: {
    fontSize: 10
  },
  amount: {
    color: 'red'
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
});

export default withNavigation(TaskList);