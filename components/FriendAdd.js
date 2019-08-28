import React from 'react';
import { StyleSheet, List, ListItem, FlatList, Text, View, StatusBar, AsyncStorage, Image } from 'react-native'
import { Appbar, TextInput, Card, Button, Title, ActivityIndicator, Colors } from 'react-native-paper';

import ajax from '../service/fetchGETRestData';

export default class FriendAdd extends React.Component {

    state = {
        friendname:"",
        friends:[],
        activity: false,
        addfriendname: "",
        username:"",
        id: 0,
    }

    async componentWillMount(){

        let uname = await this.props.navigation.getParam('uname','');
        let id = await this.props.navigation.getParam('id','');
        console.log("UNAME: " + uname);
        this.setState({username: uname, id });
    }

    async searchUser(friendname){

        this.setState({friendname, activity:true})
        console.log("Username: " + this.state.username);
        console.log(friendname);

        if ( friendname != "" ) {
            if ( friendname.length > 1 )
            {
                try{
                    const friendURI = 'http://patatask.com:3000/api/accounts?filter[where][username][like]='+ friendname +"%25";       
                    let friendids  = await ajax.fetchData(friendURI);
                    this.setState({ friends: friendids });
                    console.log("selectAllFriends : " + JSON.stringify(friendids[0]));
                    this.setState({ activity:false });
                }
                catch(e){
                    console.log(e);
                }
            } else 
            {
                this.setState({ activity:false });
            }
        } else {
            this.setState({ friends: [], activity:false });
        }

    }

    selectUserName(friendname, friendid){
        if (friendname != this.state.username)
        {
            this.setState({
                friends: [],
                friendname: friendname
            });
        }
    }

    async addFriend(friendname, friendid){
        if (friendname != this.state.username)
        {
            
            //http://patatask.com:3000/api/UserFriends?filter=%7B%22where%22%3A%7B%22userid%22%3A 1 %2C%20%22friendid%22%3A 4 %7D%7D
            //CHECK IF FRIEND ALREADY EXISTS

            const checkURI = "http://patatask.com:3000/api/UserFriends?filter=%7B%22where%22%3A%7B%22userid%22%3A" +  this.state.id +"%2C%20%22friendid%22%3A"+ friendid +"%7D%7D";
            console.log(checkURI);
                /*
                    let friendids  = await ajax.fetchData(friendURI);
                    this.setState({ friends: friendids });
                    console.log("selectAllFriends : " + JSON.stringify(friendids[0]));
                    this.setState({ activity:false });
                    */
        }
    }

    render(){

        const { goBack } = this.props.navigation;
        const { navigate } = this.props.navigation
        
        return(

            <View style={styles.container}>
                
                <Appbar style={styles.bottom}>
                    <Appbar.Action icon="arrow-back" size={40} onPress={() => goBack()}/>                    
                    <Appbar.Content title="Add a new Friend" TitleStyle={{textAlign: 'center'}} />
                    <Appbar.Action style={styles.exitBtn} icon="exit-to-app" size={40} onPress={ ()=> this.props.screenProps.onLogout() } />
                </Appbar> 


                <Card style={{flex:1}}>
                <Card.Title titleStyle={{ 
                    textAlign: "auto", fontSize: 16 }} 
                    title={ "Search for friend's username " } 
                    leftStyle={{paddingRight:70}}
                 />
                  <Card.Content> 
                    <TextInput 
                        label="Friend's Username" 
                        style={styles.textInputStyle} 
                        placeholder="Enter Friend's Username"  
                        onChangeText={
                            (friendsearch) => this.searchUser(friendsearch)
                        } 
                        
                        value={ this.state.friendname } 
                        />
                    <Button dark={true} mode="contained" onPress = {this.addFriend} > Add Friend </Button>
                    <FlatList          
                        data={ this.state.friends }          
                        renderItem={({ item }) => ( 
                        <Card onPress={()=> this.selectUserName(item.username, item.id)} >
                            <Card.Content>
                                <Title>{ item.username }</Title>
                            </Card.Content>
                        </Card>
                         )}    
                              
                        keyExtractor={ item => item.id }                             
                    /> 
                    <ActivityIndicator animating={ this.state.activity } color={Colors.red800} />  
                </Card.Content>
                </Card>
                
                {/*
                <Card.Content>
                    
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList          
                        data={this.state.friends}          
                        renderItem={({ item }) => ( 
                        <ListItem              
                            roundAvatar              
                            title={`${item.username}`}  
                            subtitle={item.email}                           
                            avatar={{ uri: item.picture }}   
                            containerStyle={{ borderBottomWidth: 0 }} 
                        />          
                        )}          
                        keyExtractor={item => item.id}                             
                    />            
                    </List>
                </Card.Content>
                
                        */}

            </View>

        )

    }

}

const styles = StyleSheet.create(
    {
        container:{
            flex:1
        },
        bottom: {

        },

        flatList:{
            flex:1
        },
        card: {
            justifyContent: 'center',        
            borderRadius: 2,
            width: '100%',
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
    }

);