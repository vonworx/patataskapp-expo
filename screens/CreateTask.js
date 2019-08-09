import React from 'react';
import { TextInput, Button, Text, Appbar, Card } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

class CreateTask extends React.Component{

    constructor(props){
        
        super(props);

        this.state = {
            userid: '',
            taskname: '',
            description: '',
            deadline: '',
            amount: '',
            assignee: ''
        };
    }

    componentWillMount(){

    }

    render(){

        const { goBack } = this.props.navigation;
        const { navigate } = this.props.navigation;

        return(

            <View>

                <Appbar style={styles.bottom}>
                    <Appbar.Action icon="arrow-back" onPress={() => goBack()}/>
                    <Appbar.Content title={this.state.screenTitle} TitleStyle={{textAlign: 'center'}} />
                    <Appbar.Action style={styles.exitBtn} icon="exit-to-app" onPress={ ()=> this.props.screenProps.onLogout() } />
                </Appbar> 

                <Card>
                    <Card.Title titleStyle={{ textAlign: "auto", fontSize: 18 }} title={ "CREATE A NEW TASK" }/>
                    <Card.Content>
                        <TextInput label="Task Title" placeholder="Task Title" onChangeText={(taskname) => this.setState({taskname})} value={this.state.taskname}/>
                    </Card.Content>

                </Card>
            </View>

        )

    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4c5fb1',
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
});

export default withNavigation(CreateTask);
