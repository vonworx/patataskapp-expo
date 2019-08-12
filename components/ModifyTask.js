'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {View, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList} = ReactNative;
import { Card, Appbar } from 'react-native-paper';
import { Image } from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import ajax from '../service/fetchGETRestData';

class ModifyTask extends React.Component{

    constructor(props){
        super(props);
        
    }

    async componentWillMount(){

        const { navigation } = this.props;
        const taskTypeURL = this.props.navigation.getParam('taskuri', '');        
        const scrTitle = this.props.navigation.getParam('screenTitle','Patatask Task List');

        const tasks = await ajax.fetchData(taskTypeURL);    
        this.setState({tasks, screenTitle: scrTitle});
        
        console.log("tasks : " + JSON.stringify(tasks));
        let stateVars = tasks[0];

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


    }
    
    state = {
        tasks: [],
        screenTitle: "",
        taskname:"",
        description:"",
        deadline:"",
        amount:"",
        owner:"",
        public:"",
        assignee:"",
        completed:"",
        file:"https://img.patatask.com/assets/checklist-default.png",
        created:"",
        modified: null,
        approved:"",
        id:""
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
                    <Card.Content>
                        <Text>{this.state.description}</Text>            
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
    taskname: {
        fontSize: 18
    },
    card: {
        marginTop: 75,
        justifyContent: 'center',        
        borderRadius: 2,
        maxWidth: '90%',
        width: '90%',
        backgroundColor:'#fff',
        alignSelf:'center',
        elevation: 2
    },
    description: {
        fontSize: 10
    },
        amount: {
        color: 'red'
    },

});

export default withNavigation(ModifyTask);
