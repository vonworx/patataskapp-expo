'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {View, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList, Alert} = ReactNative;
import { Card, Appbar, Button } from 'react-native-paper';
import { Image, Overlay, ListItem } from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import ajax from '../service/fetchGETRestData';

class ApproveTask extends React.Component{

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
            public:"",
            assignee:"",
            assigneeName:"",
            assigneeCredit:0,  
            completed:"",
            file:"https://img.patatask.com/assets/checklist-default.png",
            created:"",
            modified: null,
            approved:"",
            id:"",
            isVisible: false,
                   
        }
    }
    
    async getName(id){
        try {
            const friendURI = 'http://patatask.com:3000/api/accounts?filter[where][id]='+ id;
            const myFriend = await ajax.fetchData(friendURI);
            const fData = await myFriend[0];
            console.log("myfriend " + fData.firstname + " " + fData.lastname);
            const fullname = fData.firstname + " " + fData.lastname;
            this.setState({ assigneeName: fullname});
            return fullname.toString() ;
        }
        catch(e){
            console.log(e);
        }
    }

    async getAssigneeCredit(id){
        try {
            const friendURI = 'http://patatask.com:3000/api/accounts?filter[where][id]='+ id;
            const myFriend = await ajax.fetchData(friendURI);
            const fData = await myFriend[0];
            const credit = fData.credit;
            this.setState({ assigneeCredit: credit});;
        }
        catch(e){
            console.log(e);
        }
    }

    async modifyTask(){

        const forcredit = this.state.assigneeCredit + this.state.amount;

        var patchURI = "http://patatask.com:3000/api/Tasks/"+this.state.id;
        
        const patchResponse = await fetch(patchURI, {
                method: 'PATCH',
                headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' 
                        },
                body: JSON.stringify({
                    approved: 1,
                }),
        })

        let patch = await patchResponse.json().then( (response) => console.log("RESP :" + JSON.stringify(response)));

        console.log("COMPLETE : " + this.state.assigneeCredit + " + " + this.state.amount +" = " + forcredit );

        var creditURI = "http://patatask.com:3000/api/accounts/"+this.state.assignee;
        const creditUpdateResponse = await fetch(creditURI, {
                method: 'PATCH',
                headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' 
                        },
                body: JSON.stringify({
                    credit: forcredit
                }),
        })

        Alert.alert("Task Approved","You have approved task. Amount credited to assignee. Thank you!",[
            {text:'Ok', onPress: ()=> this.props.navigation.goBack() },
        ])

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

        this.getName(stateVars.assignee);
        this.getAssigneeCredit(stateVars.assignee);


    }

    render(){

        const { goBack } = this.props.navigation;
        const { navigate } = this.props.navigation
        
        return(
            <View style={styles.container}>
                <Appbar style={styles.bottom}>
                    <Appbar.Action icon="arrow-back" onPress={() => goBack()}/>
                    <Appbar.Content title={this.state.screenTitle} TitleStyle={{textAlign: 'center'}} />
                    <Appbar.Action style={styles.exitBtn} icon="exit-to-app" onPress={ ()=> this.props.screenProps.onLogout() } />
                </Appbar>

                <Card style={styles.card}>
                    <Card.Cover source={{uri: this.state.file }} />
                    <Card.Title title={this.state.taskname} titleStyle={styles.taskname} />
                    <Card.Content style={{marginBottom: 10}}>
                        <Text><Text style={styles.label}>Assigned to </Text><Text style={styles.amount}>  { this.state.assigneeName }</Text></Text>
                        <Text><Text style={styles.label}>Reward Amount </Text><Text style={styles.amount}>  {this.state.amount}</Text></Text>
                        <Text><Text style={styles.label}>Description </Text><Text style={styles.description}> {this.state.description}</Text></Text>
                        <Text><Text style={styles.label}>Due on </Text><Text style={styles.deadline}> { this.formatDate(this.state.deadline) }</Text></Text>       
                    </Card.Content>
                    <Card.Actions style={{justifyContent:'space-evenly'}}>
                        <Button onPress={ () => goBack() } >Cancel</Button>
                        <Button onPress={ this.modifyTask.bind(this) } >Approve</Button>
                    </Card.Actions>
                </Card>
            </View>

            
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f7cf',
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
        marginTop: 175,
        justifyContent: 'center',        
        borderRadius: 2,
        maxWidth: '90%',
        width: '90%',
        backgroundColor:'#fff',
        alignSelf:'center',
        
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

export default withNavigation(ApproveTask);
