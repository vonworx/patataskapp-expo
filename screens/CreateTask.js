import React from 'react';
import { TextInput, Button, Appbar, Card, Checkbox, DataTable } from 'react-native-paper';
import { Text, View, StyleSheet, AsyncStorage, ScrollView} from 'react-native';
import { withNavigation } from 'react-navigation';
import { NavigationArrowDropDownCircle } from 'material-ui/svg-icons';
import DatePicker from 'react-native-datepicker';
import { Constants } from 'expo';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';
import { Image } from 'react-native-elements';

export default class CreateTask extends React.Component{


    constructor(props){
        
        super(props);

        this.state = {
            logData: '',
            userid: '',
            taskname: '',
            description: '',
            date: new Date(),
            deadline: new Date(),
            amount: '',
            image: "https://img.patatask.com/assets/checklist-default.png",
            assignee: '',
            imgSource: "https://img.patatask.com/assets/checklist-default.png",
            public: 'unchecked',
            checked: false,
            screenTitle:''
        };       
        
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    componentWillMount(){
        const scrTitle = this.props.navigation.getParam('screenTitle','Patatask Task List');
        this.setState({screenTitle: scrTitle});
    }

    _checkBoxUpdate(){
        if (this.state.public == 'checked')
        {
            this.setState({
                public:'unchecked'
            });

        } else {
            this.setState({
                public:'checked'
            })
        }
    }

    _assignTask = async () => {

        try{

            const userData = await AsyncStorage.getItem('USERDATA', (err, result)=>{
                this.setState({logData: JSON.parse(result)})
                console.log(this.state.logData);
            });

            const account = this.state.logData;
            const ad = account[0]; //Account Details
            
            this.setState({          
              userid: ad.id
            });

            //Check if set as public or privte
            let setpublic = 0;

            if (this.state.public == 'checked'){
                setpublic = 1;
            }

            //upload image first
            var createRecord = false;
            const imageSource = this.state.image;

            // ImagePicker saves the taken photo to disk and returns a local URI to it
            let localUri = this.state.image;
            let filename = localUri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            // Upload the image using the fetch and FormData APIs
            let formData = new FormData();
            // Assume "photo" is the name of the form field the server expects
            formData.append('pictures', { uri: localUri, name: filename, type });
            formData.append('Content-Type', 'image/'+type);

            let resp = await fetch("https://img.patatask.com/fileupload.php",{
                method:'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },                
            });//.then((res) => {console.log("SERVER RESPONSE: " + JSON.stringify(res))});

            let respJson = await resp.json();
            console.log("RESPONSE : " + JSON.stringify(respJson));

            if (respJson.status == "success"){
                createRecord = true;
            }

            //=============================================================================

            if (createRecord){
                console.log("START : " + createRecord);

                let fetchresponse = await fetch('http://patatask.com:3000/api/Tasks', {
                        method: 'POST',
                        headers: { 
                                'Accept': 'application/json',
                                'Content-Type': 'application/json' 
                                },
                        body: JSON.stringify({
                            taskname: this.state.taskname,
                            description: this.state.description,
                            deadline: this.state.deadline,
                            amount: this.state.amount,
                            owner: this.state.userid,
                            file: 'https://img.patatask.com/images/'+filename,
                            public: setpublic
                        }),
                    })//.then((response) => response.json()).then((responseJson) => {console.log("JSON RESPONSE: ======================> " + JSON.parse(responseJson)); return responseJson;}).catch((error) => {console.error(error);});

                let response = await fetchresponse.json();
                
                //Deduct task rewards from user credits
                var usercredit = ad.credit - this.state.amount;
                var patchURI = "http://patatask.com:3000/api/accounts/"+this.state.userid;
                let patchResponse = await fetch(patchURI, {
                        method: 'PATCH',
                        headers: { 
                                'Accept': 'application/json',
                                'Content-Type': 'application/json' 
                                },
                        body: JSON.stringify({
                            credit: usercredit,
                        }),
                })
                
                this.props.navigation.goBack();
            }

        } catch(e){
            console.log(e);
        }
    }

    getPermissionAsync = async () => {
        //if (Constants.platform.ios) {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);          
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    getCameraPermissionAsync = async () =>{
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
        }  
    }
    
      _pickImage = async () => {
        
        this.getCameraPermissionAsync();

        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          quality: .5,
        });
    
        console.log(result);

        if (!result.cancelled) {
          this.setState({ 
              image: result.uri,
              imgSource: result.uri
         });
        }
      };

    render(){

        const { goBack } = this.props.navigation;
        const { navigate } = this.props.navigation;
        const { checked } = this.state;
      
        return(
            <View style={styles.container}>
                <Appbar style={styles.bottom}>
                    <Appbar.Action icon="arrow-back" size={40} onPress={() => goBack() }/>
                    <Appbar.Content title={this.state.screenTitle} TitleStyle={{textAlign: 'center'}} />
                    <Appbar.Action style={styles.exitBtn} icon="exit-to-app" size={40} onPress={ ()=> this.props.screenProps.onLogout() } />
                </Appbar> 
                <Card style={styles.cardStyle}>
                    <Card.Title titleStyle={{ textAlign: "auto", fontSize: 18 }} title={ "Task Deadline" }/>
                    <Card.Content style={styles.dateCard}>                        
                        <DatePicker 
                                date={this.state.date}
                                onDateChange={(date) => this.setState({ 
                                    date: date,
                                    deadline: date
                                 })}
                                mode="datetime" //The enum of date, datetime and time
                                placeholder="Select date of deadline"
                                minDate={((new Date).getDate()+1).toString()}        
                                value={this.state.deadline}    
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                style={{width:"90%"}}
                                />
                    </Card.Content>
                    <Card.Title titleStyle={{ textAlign: "auto", fontSize: 18, marginTop:10 }} title={ "Enter Task Information" }/>
                    <Card.Content>
                        <Image source={{uri: this.state.imgSource}} style={{ width: 100, height: 100 }} />
                        <TextInput style={styles.title} label="Task Title" placeholder="Task Title" onChangeText={(taskname) => this.setState({taskname})} value={this.state.taskname}/>
                        <TextInput style={styles.description} label="Desciption" placeholder="Description" multiline={true} numberOfLines={3} onChangeText={(description) => this.setState({description})} value={this.state.description}/>                                                
                        <TextInput style={styles.amount} label="Set Amount" placeholder="Set amount" onChangeText={(amount) => this.setState({amount})} value={this.state.amount}/>
                        <Button  contentStyle={{fontSize: 28}} mode="contained" dark={true} style = {styles.button} onPress={this._pickImage}> Take Photo </Button>                        
                    </Card.Content>
                    <Card.Content style={{flexDirection:'row-reverse', alignContent: 'center', marginTop: 10}}>                        
                        <Text style={{alignSelf:'center'}}>Set as public task</Text>
                        <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={this._checkBoxUpdate} />  
                        <Button contentStyle={{fontSize: 28}} mode="contained" dark={true} style = {styles.button} onPress = { this._assignTask } uppercase={false} > CREATE TASK </Button> 
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
    cardStyle: {                
        marginTop: 80,
        width: "90%",
        alignSelf: 'center',
        justifyContent:'center',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: '#990000'
    },
    amount:{
        marginBottom: 5
    },
    button:{
        backgroundColor: '#990000',   
    },
        exitBtn: {
        alignSelf: 'flex-end'
    },
    title:{        
        marginBottom: 5
    },
    description: {
        marginBottom: 5
    },
    date: {
        padding:5
    },
    dateCard:{
        //flexDirection:"row", 
        justifyContent:'space-evenly', 
        alignContent:'center', 
    }

});
