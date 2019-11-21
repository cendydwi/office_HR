import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TaskStyle } from './TaskStyle'
import * as actions from '../../../../common/actions';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 2,
        borderLeftWidth:4,
    },
    title: {
        fontSize: 16,
        color: '#505050',
        marginBottom: 5,
        fontWeight: '500',
        flexWrap: 'wrap',
        fontFamily: 'PRODUCT_SANS_BOLD',

    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5,
        justifyContent: 'center',
    },
    submittedDate: {
        fontSize: 13,
      //  marginBottom: 10,
        color: "#878787",
        fontFamily: "PRODUCT_SANS_BOLD",
        marginTop: 3,
        marginLeft:5,

    },
    description: {
        fontSize: 12,
        fontFamily: 'OPENSANS_REGULAR',
        color: '#878787'
    },
    statusContainer: {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderTopWidth: 1,
        borderTopColor: "#edeeef",
        paddingTop: 5,
        marginTop: 10,
    },
    statusText: {
        // padding: 5,
        alignItems: 'flex-start',
        width: '40%',
        fontWeight: "bold",
        fontSize: 16
    },
    ToDo: {
        color: '#C4C4C4',
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: 'Montserrat_Bold'
    },
    InProgress: {
        color: '#3D8EC5',
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: 'Montserrat_Bold'
    },
    Pause: {
        color: '#CB9A3A',
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: 'Montserrat_Bold'
    },
    Completed: {
        color: '#3DC585',
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: 'Montserrat_Bold'
    },
    Done: {
        color: '#0A7A46',
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: 'Montserrat_Bold'
    },
    Cancelled: {
        color: '#A53131',
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: 'Montserrat_Bold'
    },

    totalAmount: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        fontWeight: "bold",
        fontSize: 16,
        alignSelf: 'center',
        marginRight:5,
    },
    dateTimeText: {
        color: '#878787',
        fontFamily: 'Montserrat_Bold',
        marginRight:5,
    },
    contentContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        //marginTop: 10,
    },
    TitleContainer: {
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: '90%'
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deescriptionView: {
        alignItems: 'flex-start',
        width: '90%',
        flexWrap: 'wrap'
    },
    fileIconContainer: {
        alignItems: 'flex-end',
        alignSelf: 'flex-start'
    },

});


let sytlecolor = ""
const setSelectedOption = (id) => {
    switch (id) {
        case "To Do":
            sytlecolor = "ToDo"
            break;
        case "In Progress":
            sytlecolor = "InProgress"
            break;
        case "Pause":
            sytlecolor = "Pause"
            break;
        case "Completed":
            sytlecolor = "Completed"
            break;
        case "Done & Bill Collected":
            sytlecolor = "Done"
            break;
        case "Cancelled":
            sytlecolor = "Cancelled"
            break;
        default:
            sytlecolor = "ToDo"
    }
};
let stylecolor = ""
const setSelectedOptionCircle = (id) => {
    switch (id) {
        case "Normal":
            stylecolor = "white"
            break;
        case "High":
            stylecolor = "#cc5c5c"
            break;
        case "Low":
            stylecolor = "white"
            break;
    }
};

let leftSideColor = ""
const leftSideColorfunction = (id) => {
    switch (id) {
        case "To Do":
            leftSideColor = "#C4C4C4"
            break;
        case "In Progress":
            leftSideColor = "#3D8EC5"
            break;
        case "Pause":
            leftSideColor = "#CB9A3A"
            break;
        case "Completed":
            leftSideColor = "#3DC585"
            break;
        case "Done & Bill Collected":
            leftSideColor = "#0A7A46"
            break;
        case "Cancelled":
            leftSideColor = "#A53131"
            break;
    }
};

const TaskListRowCompoent = (props) => (

        <TouchableOpacity
          onPress={() => actions.push("ViewAssignToMe", { TaskModel: props.itemData })}>
               {leftSideColorfunction(props.itemData.StatusName)}
          <View style={[styles.container,{borderLeftColor:leftSideColor}]}>
              <View style={styles.container_text}>
                  <View style={styles.contentContainer}>
                      <View style={styles.TitleContainer}>
                          <Text style={styles.title}>
                              {props.itemData.Title}
                          </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end',marginRight:8, }}>
                          {setSelectedOptionCircle(props.itemData.PriorityName)}
                          <MaterialIcons
                              name="priority-high" size={18}
                              color={stylecolor}
                          >
                          </MaterialIcons>
                      </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                      <Ionicons name="md-people" size={20} style={{ marginHorizontal: 0, }} color="#4a535b" />
                      <Text style={styles.submittedDate}>
                          {props.itemData.AssignToName}
                      </Text>
                  </View>
               
                  <View style={styles.statusContainer}>
                      <View style={styles.statusText}>
                          {setSelectedOption(props.itemData.StatusName)}
                          <Text style={styles[sytlecolor]}>{props.itemData.StatusName}</Text>
                      </View>
                      <View style={styles.totalAmount}>
                      {props.itemData.DueDateVw !=="" ?
                          <FontAwesome
                              name="calendar"
                              size={15} color="#878787"
                              style={{ marginRight: 2 }} />
                              : <Text></Text>}
                          <Text style={styles.dateTimeText}> {props.itemData.DueDateVw}</Text>
                      </View>
                  </View>
  
              </View>
          </View>
      </TouchableOpacity >
  
  
);

export default TaskListRowCompoent;
