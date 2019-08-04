import * as React from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Avatar, Appbar, Card, Title, Paragraph, Divider, Chip, DataTable, Button, Badge } from 'react-native-paper';
import TaskFlatList from '../components/TaskFlatList';

export default class Home extends React.Component {

  state = {
    logData: this.props.logData,
    username:'',
    firstname: '',
    middlename: '',
    lastname: '',
    credit: '',
    id: '',
    avatar: '',
    id: '',
    selectedIndex: 0
  }

  componentWillMount(){
    const account = this.state.logData;
    const ad = account[0]; //Account Details
    /*this.setState({
      username: accountDetails.username,
      id: accountDetails.id
    });
    */
    console.log(ad);
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
  
  componentWillReceiveProps(){
    
  }

  componentDidMount() {
    
  }

  updateIndex = e = (selectedIdx) => {
    this.setState({selectedIndex: selectedIdx})
  }

  render() {
    return(
        <View style={styles.container}>      
          <StatusBar hidden={true} />
          
          <Appbar style={styles.bottom}>
              <Appbar.Action icon="menu" onPress={() => console.log('Pressed archive')}/>
              <Appbar.Content title="PataTask: Task List" TitleStyle={{textAlign: 'center'}} />
              <Appbar.Action style={styles.exitBtn} icon="exit-to-app" onPress={ this.props.onLogoutPress } />
          </Appbar>   

          <Card style={styles.cardStyleHome}>
            {/* <Card.Title titleStyle={{ textAlign: "auto", fontSize: 28 }} title={ "Hello " + this.state.firstname } left={(props) => <Avatar.Image size={100} source={{uri: this.state.avatar}} />} leftStyle={{paddingRight:100}} right={(props) => <Image style={{width:75, height:75, marginRight:20, marginTop:10}} source={require('../assets/coins-tn.jpg')} />}  /> */}
            <Card.Title titleStyle={{ textAlign: "auto", fontSize: 18 }} title={ "Hello " + this.state.firstname } left={(props) => <Avatar.Image size={100} source={{uri: this.state.avatar}} />} leftStyle={{paddingRight:100}}/>
            <Card.Content style={{alignSelf:"flex-end", position:"absolute", fontSize:22,  marginRight:10}}>
              <Image style={{width:75, height:75, alignSelf:"center"}} source={require('../assets/coins-tn.jpg')} /> 
              <Text style={{alignSelf:"center", fontStyle:"italic", fontWeight:"200"}}>1000000000.265624</Text>
            </Card.Content>
          </Card>

          <Card style={styles.cardStyleTasksBtn}>
            <Button mode='text' style={{ fontSize: 20, paddingBottom:5 }}>TASKS TYPE</Button>
            <Card.Content style={styles.cardContentBox}>
                <Button color='#d04925' icon='assignment' mode='outlined' >Assigned</Button>
                <Button color='#d04925' icon='assignment-ind' mode='outlined' >Pending</Button>
                <Button color='#d04925' icon='assignment-turned-in' mode='outlined' >Completed</Button>
            </Card.Content>
          </Card>
          <Card style={styles.cardStyleTasksList}>
          <Button mode='text' style={{ fontSize: 16, paddingBottom:5 }}>TASKS ASSIGNED TO YOU</Button>
            <Card.Content>
                <TaskFlatList/>
            </Card.Content>
          </Card>

          
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4c5fb1',
  },
  textInfoStyle:{
    fontSize: 18
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
    backgroundColor: '#2c2955'
  },
  exitBtn: {
    alignSelf: 'flex-end'
  },
  cardStyleHome: {
    marginTop: 75,
    height: 100,
    alignSelf: "center",
    flexDirection: 'row',
    width: "98%",
  },
  cardStyleTasksBtn: {
    marginTop: 10,
    height: 100,
    alignSelf: "center",
    width: "98%",
  },
  cardStyleTasksList: { 
    marginTop: 10,
    height: 400,
    alignSelf: "center",
    width: "98%",
    paddingBottom: 80,
  },
  cardContentBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 0,
  }

});
