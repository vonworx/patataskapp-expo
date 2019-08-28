'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {View, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList} = ReactNative;
import { Card, Appbar, Button } from 'react-native-paper';
import { Image, Overlay, ListItem } from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import ajax from '../service/fetchGETRestData';

class ViewTask extends React.Component{

    constructor(props){

        super(props);

        this.state ={
            taskname: "",
            tasks: [],
            friends: [],
            screenTitle: "",
            taskname:"",
            description:"",
            deadline:"",
            amount:"",
            owner:"",
            ownerName:"",
            public:"",
            assignee:"",
            assigneeName:" Not assigned to anyone yet. Tap to assign ",
            completed:"",
            file:"https://img.patatask.com/assets/checklist-default.png",
            created:"",
            modified: null,
            approved:"",
            id:"",
            isVisible: false           
        }
    }
    
    
    

    async selecAllFriends(id){

        try{
            //http://patatask.com:3000/api/UserFriends?filter=%7B%22where%22%3A%7B%22userid%22%3A%222%22%7D%7D
            const friendURI = 'http://patatask.com:3000/api/UserFriends?filter=%7B%22where%22%3A%7B%22userid%22%3A%22'+ id +'%22%7D%7D';
            //const friends = await ajax.fetchData(friendURI);            

            let friendids = await ajax.fetchData(friendURI);

           await Promise.all(
                friendids.map( 
                    async (item) => { 
                        const myname = await this.getName( item.friendid );
                        item["friendname"] =  await myname;
                    }
                )
           )

            const friends = await friendids;

            this.setState({ friends });
            
            console.log("selectAllFriends : " + JSON.stringify(this.state.friends) );


        }
        catch(e){
            console.log(e);
        }
    }

    async getName(id){
        try {
            const friendURI = 'http://patatask.com:3000/api/accounts?filter[where][id]='+ id;
            const myFriend = await ajax.fetchData(friendURI);
            const fData = await myFriend[0];
            console.log("myfriend " + fData.firstname + " " + fData.lastname);
            const fullname = fData.firstname + " " + fData.lastname;

            this.setState({ ownerName: fullname});

            return fullname.toString() ;
        }
        catch(e){
            console.log(e);
        }
    }

    async assignTaskTo(){



    }

    //this needs to be in its own JS file for import
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

    async componentWillMount(){

        const { navigation } = this.props;
        const taskTypeURL = this.props.navigation.getParam('taskuri', '');        
        const scrTitle = this.props.navigation.getParam('screenTitle','Patatask Task List');
        //const taskType = this.props.navigation.getParam('taskType','');

        const tasks = await ajax.fetchData(taskTypeURL);    
        this.setState({tasks, screenTitle: scrTitle });
        
        const stateVars = tasks[0];

        console.log("tasks : " + stateVars.id);


        this.setState({
            taskname: stateVars.taskname,
            description: stateVars.description,
            deadline: stateVars.deadline,
            amount: stateVars.amount,
            owner: stateVars.owner,
            public: stateVars.public,
            assignee: stateVars.assignee,
            completed: stateVars.completed,
            file: stateVars.file,
            created: stateVars.created,            
            approved: stateVars.approved,
            id: stateVars.id
        })

        this.getName(stateVars.owner);


    }
        



    render(){

        const { goBack } = this.props.navigation;
        const { navigate } = this.props.navigation
        
        return(
            <View style={styles.container}>

                <Overlay isVisible={this.state.isVisible} height='90%'>
                    
                    <FlatList 
                        style={styles.flatList}
                        data={this.state.friends}
                        showsVerticalScrollIndicator={true}
                        renderItem={    ({item}) =>                                
                            <Card style={{elevation: 2, border:2, }} onPress={() => this.setState({ assignee: item.friendid, assigneeName: item.friendname, isVisible:false }) }>
                                <Card.Content>
                                    <Text>  { item.friendname } </Text>
                                </Card.Content>                                
                            </Card>
                        }

                        keyExtractor={item => item.friendid.toString()}
                    />               
                </Overlay>

                <Appbar style={styles.bottom}>
                    <Appbar.Action icon="arrow-back" size={40} onPress={() => goBack()}/>
                    <Appbar.Content title={this.state.screenTitle} TitleStyle={{textAlign: 'center'}} />
                    <Appbar.Action style={styles.exitBtn} icon="exit-to-app" size={40} onPress={ ()=> this.props.screenProps.onLogout() } />
                </Appbar>

                <Card style={styles.card}>
                    <Card.Cover source={{uri: this.state.file }} />
                    <Card.Title title={this.state.taskname} titleStyle={styles.taskname} />
                    <Card.Content style={{marginBottom: 10}}>
                        <Text><Text style={styles.label}>Task Owner </Text><Text style={styles.amount}>  {this.state.ownerName}</Text></Text>
                        <Text><Text style={styles.label}>Reward Amount </Text><Text style={styles.amount}>  {this.state.amount}</Text></Text>
                        <Text><Text style={styles.label}>Description </Text><Text style={styles.description}> {this.state.description}</Text></Text>
                        <Text><Text style={styles.label}>Due on </Text><Text style={styles.deadline}> { this.formatDate(this.state.deadline) }</Text></Text>       
                    </Card.Content>
                </Card>
            </View>

            
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f7cf',
      alignContent: 'center',
      justifyContent: 'center',
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
    flatList:{
        //
    },
    card: {
        justifyContent: 'center',        
        borderRadius: 2,
        backgroundColor:'#fff',
        alignSelf:'center',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "90%",

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

});

export default withNavigation(ViewTask);
