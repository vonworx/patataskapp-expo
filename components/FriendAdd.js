import React from 'react';
import { StyleSheet, List, ListItem, FlatList, Text, View, StatusBar, AsyncStorage, Image } from 'react-native'
import { Appbar, TextInput, Card, Button, Title } from 'react-native-paper';

import ajax from '../service/fetchGETRestData';

export default class FriendAdd extends React.Component {

    state = {
        friendname:"",
        friends:[]
    }

    async searchUser(friendname){

        this.setState({friendname})
        console.log(friendname);

        if ( friendname != "" ) {
            if ( friendname.length > 1 )
            {
                try{
                    const friendURI = 'http://patatask.com:3000/api/accounts?filter[where][username][like]='+ friendname +"%25";       
                    let friendids  = await ajax.fetchData(friendURI);
                    this.setState({ friends: friendids });
                    console.log("selectAllFriends : " + friendids[0].firstname);

                }
                catch(e){
                    console.log(e);
                }
            }
        } else {
            this.setState({ friends: [] });
        }

    }

    selectUserName(friendname){
        this.setState({
            friends: [],
            friendname: friendname
        });
        

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
                            (friendname) => this.searchUser(friendname)
                        }
                        value={this.state.friendname} 
                        />
                    <Button dark={true} mode="contained" >Add Friend </Button>

                    <FlatList          
                        data={this.state.friends}          
                        renderItem={({ item }) => ( 
                        <Card >
                        <Card.Content>
                            <Title>{item.username}</Title>
                        </Card.Content>
                        </Card>
                         )}    
                              
                        keyExtractor={item => item.id}                             
                    />            
                </Card.Content>
                </Card>    
                {/*
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