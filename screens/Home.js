import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, AsyncStorage, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Avatar, Appbar, Card, List, Title, Paragraph, Divider, Chip, DataTable, Button, Badge, FAB } from 'react-native-paper';
import TaskFlatList from '../components/TaskFlatList';
import StackNavigator from 'react-navigation';

export default class Home extends React.Component {

  constructor(props){
    super(props);
  }

  state = {
    logData: this.props.logData,
    username:'',
    firstname: '',
    middlename: '',
    lastname: '',
    credit: '',
    id: '',
    avatar: 'https://patatask.com/avatar/default.png',
    id: '',
    selectedIndex: 0
  }


  async componentDidMount() {
    
    const userData = await AsyncStorage.getItem('USERDATA', (err, result)=>{
      this.setState({logData: JSON.parse(result)})
    });
    const account = this.state.logData;
    const ad = account[0]; //Account Details
    this.setState({
      username: ad.username,
      id: ad.id
    });

    this.setState({
      username: ad.username,
      firstname: ad.firstname,
      middlename: ad.middlename,
      lastname: ad.lastname,
      credit: ad.credit,
      id: ad.id,
      avatar: ad.picture,
    });

  }

  updateIndex = e = (selectedIdx) => {
    this.setState({selectedIndex: selectedIdx})
  }

  //"http://patatask.com:3000/api/Tasks?filter=%7B%22where%22%3A%7B%22assignee%22%3A%2"+ assignee + "2%22%2C%22completed%22%3A%22"+ completed +"%22%2C%22approved%22%3A%22"+ approved + "%22%7D%7D"

  getAssignedTasks = e = ()=> {
    const apiuri = "http://patatask.com:3000/api/Tasks?filter=%7B%22where%22%3A%7B%22assignee%22%3A%22"+ this.state.id + "%22%2C%22completed%22%3A%22"+ 0 +"%22%7D%7D";
    this.props.navigation.navigate('Tasks',{taskuri: apiuri, screenTitle: "Assigned Tasks", taskType:"assigned"});
  }

  getPendingTasks = e = ()=> {
    const apiuri = "http://patatask.com:3000/api/Tasks?filter=%7B%22where%22%3A%7B%22assignee%22%3A%2"+ this.state.id + "2%22%2C%22completed%22%3A%22"+ 1 +"%22%2C%22approved%22%3A%22"+ 0 + "%22%7D%7D";
    this.props.navigation.navigate('Tasks',{taskuri: apiuri, screenTitle: "Tasks Pending Approval", taskType:"pending"});
  }

  getApprovedTasks = e = ()=> { 
    const apiuri = "http://patatask.com:3000/api/Tasks?filter=%7B%22where%22%3A%7B%22assignee%22%3A%2"+ this.state.id + "2%22%2C%22completed%22%3A%22"+ 1 +"%22%2C%22approved%22%3A%22"+ 1 + "%22%7D%7D";
    this.props.navigation.navigate('Tasks',{taskuri: apiuri, screenTitle: "Approved Tasks", taskType:"approved"});
  }

  getYourTasks = e = ()=> { 
    //const apiuri = "http://patatask.com:3000/api/Tasks?filter=%7B%22where%22%3A%7B%22assignee%22%3A%220%22%2C%20%22owner%22%3A%222%22%7D%7D"
    const apiuri = "http://patatask.com:3000/api/Tasks?filter[where][assignee]="+ 0 + "&filter=[owner]="+ this.state.id;
    this.props.navigation.navigate('Tasks',{taskuri: apiuri, screenTitle: "Assign Your Tasks", taskType:"own"});
  }

  createTask = e = ()=> {
    this.props.navigation.navigate('Create',{screenTitle: "Create New Task"}); 
  }

  _onLogout(propsHandler){

  }

  render() {
    const {navigate} = this.props.navigation;
    return(
        <View style={styles.container}> 
          <StatusBar hidden={true} />
          <Appbar style={styles.bottom}>
              <Appbar.Action icon="menu" onPress={() => console.log('Pressed archive')}/>
              <Appbar.Content title="Dashboard" TitleStyle={{textAlign: 'center'}} />
              <Appbar.Action style={styles.exitBtn} icon="exit-to-app" onPress={ this.props.onLogoutHandler } />
          </Appbar>   

          <Card style={styles.cardStyleHome}>
            <Card.Title titleStyle={{ textAlign: "auto", fontSize: 18 }} title={ "Hello " + this.state.firstname } left={(props) => <Avatar.Image size={100} source={{uri: this.state.avatar}} />} leftStyle={{paddingRight:100}}/>
            <Card.Content style={{alignSelf:"flex-end", position:"absolute", fontSize:22,  marginRight:10}}>
              <Image style={{width:75, height:75, alignSelf:"center"}} source={require('../assets/coins-tn.jpg')} /> 
              <Text style={{alignSelf:"center", fontStyle:"italic", fontWeight:"200"}}>Cr. {this.state.credit}</Text>
            </Card.Content>
          </Card>
          
          <ScrollView>   
          <Card style={styles.cardStyleTasksBtn}>
            <Card.Content style={styles.cardContentBox}>
                <List.Section>
                  <List.Subheader>YOUR ASSIGNMENTS</List.Subheader>
                  <List.Item
                      title="Assigned"
                      description = "Tasks assigned to you"
                      left={() => <List.Icon icon="assignment" />}
                      onPress={ this.getAssignedTasks }
                  />
                  <List.Item
                    title="Pending"
                    description ="Assignments you marked as done and pending approval"
                    left={() => <List.Icon color="#000" icon="assignment-ind" />}
                    onPress={ this.getPendingTasks }
                  />
                  <List.Item
                    title="Completed"
                    description="Your assignments accepted by task owner"
                    left={() => <List.Icon color="#000" icon="assignment-turned-in" />}
                    onPress={this.getApprovedTasks }
                  />
                </List.Section>
                <List.Section>
                  <List.Subheader>OTHER TASKS</List.Subheader>
                  <List.Item
                      title="Assign Tasks"
                      description = "Assign your tasks"
                      left={() => <List.Icon icon="work" />}
                      onPress={this.getYourTasks}
                  />
                  <List.Item
                    title="Task Approval"
                    description ="Assignments you marked as done and pending approval"
                    left={() => <List.Icon color="#000" icon="check-circle" />}
                    onPress={() => console.log('Pressed Pending')}
                  />
                  <List.Item
                    title="Public Tasks"
                    description="Select public tasks that you want to do"
                    left={() => <List.Icon color="#000" icon="group" />}
                    onPress={() => console.log('Pressed Completed')}
                  />
                </List.Section>

            </Card.Content>
          </Card>
          </ScrollView>

          <FAB
            style={styles.fab}
            icon="add"
            onPress={this.createTask }
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
  textInfoStyle:{
    fontSize: 18
  },
  listMenuStyle: {
    flex: 1,
  },
  fab:{
    alignSelf: 'flex-end',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#990000'
  },
  taskButtonStyle:{
    alignContent: "space-around",
    top: 0
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
  cardStyleHome: {
    marginTop: 75,
    height: 100,
    alignSelf: "center",
    flexDirection: 'row',
    width: "90%",
    backgroundColor: '#fff'
  },
  cardStyleTasksBtn: {
    flex: 1,
    marginTop: 10,
    alignSelf: "center",
    width: "90%",
    backgroundColor:'#fff'
  },
  cardStyleTasksList: { 
    marginTop: 10,
    height: 400,
    alignSelf: "center",
    width: "90%",
    paddingBottom: 80,
  },
  cardContentBox: {
    flex:1
  }

});
