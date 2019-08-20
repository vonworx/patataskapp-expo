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
    await this.prepareData();
    this.willFocusSubscription = await this.props.navigation.addListener(
      'willFocus',
      () => {
        this.prepareData();
      }
    );
    
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  async prepareData(){
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

    console.log("ITEM ID: " + this.state.taskid);
    
    let scrTitle = "";
    
    const apiuri = "http://patatask.com:3000/api/Tasks?filter[where][id]="+ itemid;

    switch(this.state.taskType){
      case "assigned":
        scrTitle = "Complete Task";
        this.props.navigation.navigate('Modify',{taskuri: apiuri, screenTitle: scrTitle, taskType:"assigned"});
        break;
      case "pending": {
        scrTitle = "View Pending Task";
        this.props.navigation.navigate('View',{taskuri: apiuri, screenTitle: scrTitle, taskType:"pending"});
        break;
      }
      case "approved": {
        scrTitle = "View Approved Task";
        this.props.navigation.navigate('View',{taskuri: apiuri, screenTitle: scrTitle, taskType:"approved"});
        break;
      } 
      case "own": {
        scrTitle = "Assign Your Task";
        this.props.navigation.navigate('Assign',{taskuri: apiuri, screenTitle: scrTitle, taskType:"own"});
        break;
      }
      case "approval": {
        scrTitle = "Approve Task";
        this.props.navigation.navigate('Approve',{taskuri: apiuri, screenTitle: scrTitle, taskType:"approval"});
        break;
      }
      case "status": {
        scrTitle = "Task Status";
        this.props.navigation.navigate('Status',{taskuri: apiuri, screenTitle: scrTitle, taskType:"approval"});
        break;
      }
      

    }
    
  }

  formatDate(d) {
    let date = new Date(d);
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();    
    var min = date.getMinutes();

    var ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    min = min < 10 ? '0'+min : min;
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year + " - " + hour +":"+min + " " + ampm;
  }

  render() {

    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>

        <Appbar style={styles.bottom}>
            <Appbar.Action icon="arrow-back" size={40} onPress={() => goBack()}/>
            <Appbar.Content title={this.state.screenTitle} TitleStyle={{textAlign: 'center'}} />
            <Appbar.Action style={styles.exitBtn} icon="exit-to-app" size={40} onPress={ ()=> this.props.screenProps.onLogout() } />
        </Appbar> 

        <FlatList 
            style={styles.flatList}
            data={this.state.tasks}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) =>
            
            <View style={styles.view}>
              <Card style={styles.card} onPress={() => this.getItemId(item.id) }>
                <Card.Title title={item.taskname} titleStyle={styles.taskname} />                
                <Card.Content style={{alignSelf:'flex-start'}}>
                  <Image source={{uri: item.file}} style={{ width: 50, height: 50, position:'absolute' }} />                  
                </Card.Content>
                <Card.Content style={{marginLeft:80}}>                                    
                  <Text><Text style={styles.label}>Reward Amount </Text><Text style={styles.amount}>  {item.amount}</Text></Text>
                  <Text><Text style={styles.label}>Description </Text><Text style={styles.description}> {item.description}</Text></Text>
                  <Text><Text style={styles.label}>Due on </Text><Text style={styles.deadline}> { this.formatDate(item.deadline) }</Text></Text>
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
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatList:{
    marginTop: 70,
  },
  view: {
    justifyContent: 'center',
    borderRadius: 2,
    width: '100%',
    alignSelf:'center'
  },
  card:{
    margin: 5,
    elevation: 2,
    backgroundColor: '#f7f7cf'
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
  deadline: {
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