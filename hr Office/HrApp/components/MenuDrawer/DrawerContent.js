import React, { Component } from 'react';

import {
    ScrollView, StatusBar, Platform,
    Text, View, TouchableOpacity, Image, Alert, AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { DrawerContentStyle } from './DrawerContentStyle';
import {
    Feather,
} from '@expo/vector-icons';
const logOut = () => {
    global.DrawerContentId = 8;
    Alert.alert(
        'Log Out'
        ,
        'Log Out From The App?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            style: 'ok',
            onPress: async () => {
                await AsyncStorage.clear();
                Actions.login();
            }
        },], {
        cancelable: false
    }
    )
    return true;
};
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;


const drawerSelectedOption = (id) => {
    global.DrawerContentId = id
    switch (id) {
        case 1: //Attendance
            global.DrawerContentId = 1;
            break;
        // case 2: //My Panel
        // global.DrawerContentId = 2;
        // break;
        case 2: //Tasks
            global.DrawerContentId = 2;
            break;
        case 3: //Board
            global.DrawerContentId = 3;
            break;
        case 4: //leave
            global.DrawerContentId = 4;
            break;
        case 6: //Reports
            global.DrawerContentId = 6;
            break;
        case 7: //Notice Board
            global.DrawerContentId = 7;
            break;
        case 8: //Leader Board
            global.DrawerContentId = 8;
            break;
        case 9: //Settings
            global.DrawerContentId = 9;
            break;
    }
};
const DailyAttendanceCombo = () => {
    Actions.DailyAttendance(); drawerSelectedOption(1);
}
const TasksCombo = () => {

    if (userType == "admin") {
        Actions.TabnavigationInTasks(); drawerSelectedOption(2);
    } else {
        Actions.userTask(); drawerSelectedOption(2);
    }
}
const TasksboardCombo = () => {
    if (userType == "admin") {
        Actions.TaskBoardScreen(); drawerSelectedOption(3);
    } else {
        Actions.MyPanel(); drawerSelectedOption(3);
    }
}
const MyPanelCombo = () => {
    Actions.MyPanel(); drawerSelectedOption(2);
}
const LeavesCombo = () => {
    if (userType == "admin") {
        Actions.LeaveList(); drawerSelectedOption(4);
    } else {
        Actions.LeaveListUser(); drawerSelectedOption(4);
    }
}



const ReportsCombo = () => {
    Actions.ReportScreen(); drawerSelectedOption(6);
}

const NoticeCombo = () => {
    if (userType == "admin") {
        Actions.Notice(); drawerSelectedOption(7);

    } else {
        Actions.NoticeUser(); drawerSelectedOption(7);

    }
}
const LeaderBoardCombo = () => {
    Actions.LeaderBoard(); drawerSelectedOption(8);
}
const SettingsCombo = () => {
    if (userType == "admin") {
        Actions.SettingScreen(); drawerSelectedOption(9);

    } else {
        drawerSelectedOption(9);
        logOut();

    }
}

export {
    DailyAttendanceCombo,
    TasksCombo,
    LeavesCombo,
    ReportsCombo, NoticeCombo, SettingsCombo,
    drawerSelectedOption,
    TasksboardCombo,
}

export default class DrawerContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedId: 1,
        }
    }
    async componentDidMount() {
        global.DrawerContentId = 1;
    }
    getMyPanel() {
        if (global.userType == "user") {
            return (<TouchableOpacity
                onPress={() => MyPanelCombo()}
                style={
                    global.DrawerContentId == 2 ?
                        DrawerContentStyle.itemContainerSelected :
                        DrawerContentStyle.itemContainer}>
                <Feather name="map" size={24} color="#218f6f"
                    style={{ transform: [{ scaleX: -1 }] }}
                />
                <Text style={DrawerContentStyle.itemTextStyle}>
                    My panel
            </Text>
            </TouchableOpacity>)
        }
    }
    render() {
        return (
            <View style={DrawerContentStyle.container}>
                {/* <StatusBarPlaceHolder /> */}
                <View
                    style={[DrawerContentStyle.logoImage,
                    { marginBottom: 2, marginTop: 2, justifyContent: "flex-start", alignItems: 'center' }
                    ]}>
                    <Image
                        resizeMode='contain'
                        style={{ height: 90, }}
                        source={require('../../assets/images/logo_ns.png')} >
                    </Image>
                </View>
                {/* <View style={DrawerContentStyle.emptyLineStyle}>
                </View>
                <View style={{ marginBottom: 10, }}>
                </View> */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                        onPress={() => DailyAttendanceCombo()}
                        style={
                            global.DrawerContentId == 1 ?
                                DrawerContentStyle.itemContainerSelected :
                                DrawerContentStyle.itemContainer}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 23, height: 23, }}
                            source={require('../../assets/images/home.png')} >
                        </Image>

                        <Text style={DrawerContentStyle.itemTextStyle}>
                            Attendance
                        </Text>
                    </TouchableOpacity>
                    {/* {this.getMyPanel()} */}
                    <TouchableOpacity
                        onPress={() => TasksCombo()}
                        style={
                            global.DrawerContentId == 2 ?
                                DrawerContentStyle.itemContainerSelected :
                                DrawerContentStyle.itemContainer}>

                        <Image
                            resizeMode='contain'
                            style={{ width: 23, height: 23, }}
                            source={require('../../assets/images/task.png')} >

                        </Image>
                        {global.userType == "admin" ?
                            <Text style={DrawerContentStyle.itemTextStyle}>
                                All Tasks
                        </Text> :
                            <Text style={DrawerContentStyle.itemTextStyle}>
                                Tasks
                    </Text>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => TasksboardCombo()}
                        style={
                            global.DrawerContentId == 3 ?
                                DrawerContentStyle.itemContainerSelected :
                                DrawerContentStyle.itemContainer}>

                        {global.userType == "admin" ?
                            <Image
                                resizeMode='contain'
                                style={{ width: 23, height: 23, }}
                                source={require('../../assets/images/Board_s.png')} >

                            </Image> :
                            <Feather name="map" size={24} color="#218f6f"
                                style={{ transform: [{ scaleX: -1 }] }}
                            />
                        }
                        {global.userType == "admin" ?
                            <Text style={DrawerContentStyle.itemTextStyle}>
                                Task Board
                        </Text> :
                            <Text style={DrawerContentStyle.itemTextStyle}>
                                My Panel
                        </Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => LeavesCombo()}
                        style={
                            global.DrawerContentId == 4 ?
                                DrawerContentStyle.itemContainerSelected :
                                DrawerContentStyle.itemContainer}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 23, height: 23, }}
                            source={require('../../assets/images/leaves.png')} >

                        </Image>
                        <Text style={DrawerContentStyle.itemTextStyle}>
                            Leaves
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => ReportsCombo()}
                        style={
                            global.DrawerContentId == 6 ?
                                DrawerContentStyle.itemContainerSelected :
                                DrawerContentStyle.itemContainer}>

                        <Image
                            resizeMode='contain'
                            style={{ width: 23, height: 23, }}
                            source={require('../../assets/images/report.png')} >

                        </Image>
                        <Text style={DrawerContentStyle.itemTextStyle}>
                            Reports
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => NoticeCombo()}
                        style={
                            global.DrawerContentId == 7 ?
                                DrawerContentStyle.itemContainerSelected :
                                DrawerContentStyle.itemContainer}>

                        <Image
                            resizeMode='contain'
                            style={{ width: 23, height: 23, }}
                            source={require('../../assets/images/notice.png')} >

                        </Image>
                        <Text style={DrawerContentStyle.itemTextStyle}>
                            Notice Board
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => LeaderBoardCombo()}
                        style={
                            global.DrawerContentId == 8 ?
                                DrawerContentStyle.itemContainerSelected :
                                DrawerContentStyle.itemContainer}>

<Feather name="activity" size={24} color="#218f6f"
                    style={{ transform: [{ scaleX: -1 }] }}
                />
                        <Text style={DrawerContentStyle.itemTextStyle}>
                            Leader Board
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => SettingsCombo()}
                        style={
                            global.DrawerContentId == 9 ?
                                DrawerContentStyle.itemContainerSelected :
                                DrawerContentStyle.itemContainer}>
                        {global.userType == "admin" ?
                            <Image
                                resizeMode='contain'
                                style={{ width: 23, height: 23, }}
                                source={require('../../assets/images/setting.png')} >

                            </Image> :
                            <Feather name="log-out" size={25} color="#c24a4a" />
                        }
                        {global.userType == "admin" ?
                            <Text style={DrawerContentStyle.itemTextStyle}>
                                Settings
                        </Text> :
                            <Text style={DrawerContentStyle.itemTextStyle}>
                                Logout
                    </Text>}
                    </TouchableOpacity>
                </ScrollView>
            </View >
        )
    }
}
