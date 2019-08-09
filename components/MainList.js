import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

export default class MainList extends React.Component {

    render(){
        return(

            <ScrollView showsVerticalScrollIndicator={false}>
            <List.Section style={{backgroundColor: '#fff', flex: 1, marginTop: 0 }}>
              <List.Item
                title = 'YOUR ASSIGNMENTS'
                titleStyle = {{alignSelf: 'center'}}
                style={{top: 0}}
              />
              <List.Item
                title="Assigned" 
                description = "Tasks assigned to you"
                left ={() => <List.Icon icon='assignment' />}
                right ={() => <List.Icon icon='chevron-right' />}
                style ={styles.listItem}
              />
              <List.Item
                title="Pending" 
                description="Tasks you marked as done and is pending approval"
                left ={() => <List.Icon icon='assignment-ind' />}  
                right ={() => <List.Icon icon='chevron-right' />}
                style ={styles.listItem}            
              />
              <List.Item
                title="Completed" 
                description = "Tasks accepted"
                left ={() => <List.Icon icon='assignment' />}
                right ={() => <List.Icon icon='chevron-right' />}
                style ={styles.listItem}
              />
              <List.Item
                title = 'OTHER ASSIGNMENTS'
                titleStyle = {{alignSelf: 'center'}}
              />
              <List.Item
                title="Created Tasks" 
                description = "Tasks you created that you can be assign to any of your contacts."
                left ={() => <List.Icon icon='assignment' />}
                right ={() => <List.Icon icon='chevron-right' />}
                style ={styles.listItem}
              />
              <List.Item
                title="Public assignments" 
                description = "List of public tasks that you can take"
                left ={() => <List.Icon icon='public' />}
                right ={() => <List.Icon icon='chevron-right' />}
                style ={styles.listItem}
              />
              <List.Item
                title="For Approval" 
                description="Your assigned tasks that needs your approval"
                left ={() => <List.Icon icon='assignment-ind' />}  
                right ={() => <List.Icon icon='chevron-right' />}
                style ={styles.listItem}            
              />
              <List.Item
                title="Completed assignments" 
                description = "Tasks that you accepted"
                left ={() => <List.Icon icon='assignment' />}
                right ={() => <List.Icon icon='chevron-right' />}
                style ={styles.listItem}
              />
          </List.Section>  
          </ScrollView>

        )
    }

}

const styles = StyleSheet.create({
    listItem:{
      borderColor: '#c5c5cc', 
      borderStyle:'solid', 
      borderWidth: 1
    },  
  });
  