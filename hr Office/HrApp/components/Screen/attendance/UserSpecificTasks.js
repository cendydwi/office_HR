import React, { Component } from 'react';
import
{
    ScrollView,
    FlatList, Text, View, Image, StatusBar, RefreshControl,
    BackHandler, AsyncStorage, Dimensions, TouchableOpacity,
    Platform, ActivityIndicator
} from 'react-native';

// import
// {
//     Constants,
// } from 'expo';


import { SearchBar } from 'react-native-elements';

import _ from "lodash";

import { DailyAttendanceStyle } from './DailyAttendanceStyle';

import call from 'react-native-phone-call'
import { TaskStyle } from '../tasks/TaskStyle';

import { GetRelatedToMeTasks } from '../../../services/TaskService';

import * as actions from '../../../common/actions';

import { ActionConst, Actions } from 'react-native-router-flux';

import TaskLists from "../tasks/TaskListComponent"


import { CommonStyles } from '../../../common/CommonStyles';


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
function StatusBarPlaceHolder()
{
    return (
        <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: '#F3F3F3',
        }}>
            <StatusBar />
        </View>
    );
}
var screen = Dimensions.get('window');

export default class UserSpecificTasks extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            progressVisible: false,
            refreshing: false,
            userId: global.aItemUserId,
            taskList: [],


        }
        this.arrayholder = [];
    }

    _onRefresh = async () =>
    {
        this.setState({ refreshing: true });
        setTimeout(function ()
        {
            this.setState({
                refreshing: false,
            });

        }.bind(this), 2000);

        this.getTaskList(this.state.userId, false);
    };
    call = () => {
        //handler to make a call
        const args = {
            number: global.phoneNumber,
            prompt: false,
        };
        call(args).catch(console.error);
    }
    async componentDidMount()
    {
        // const uId = await AsyncStorage.getItem("userId");
        // this.setState({ userId: uId });
        this.getTaskList(this.state.userId, true);


        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }


    handleBackButton()
    {
        Actions.DailyAttendance();
        return true;
    }

    componentWillUnmount()
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    searchFilterFunction = text =>
    {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item =>
        {
            const itemData = `${item.Title.toUpperCase()} ${item.Title.toUpperCase()} ${item.Title.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            taskList: newData,
        });
    };

    renderHeader = () =>
    {
        return (
            <ScrollView scrollEnabled={false}>


                <SearchBar
                    placeholder="Type Here..."
                    style={{ position: 'absolute', zIndex: 1 }}
                    lightTheme
                    containerStyle={{ backgroundColor: '#f6f7f9', }}
                    inputContainerStyle={{ backgroundColor: 'white', }}
                    round
                    onChangeText={text => this.searchFilterFunction(text)}
                    autoCorrect={false}
                    value={this.state.value}
                />
            </ScrollView>
        );
    };

    getTaskList = async (userId, isProgress) =>
    {
        try
        {
            this.setState({ progressVisible: isProgress });
            await GetRelatedToMeTasks(global.aItemUserId)
                .then(res =>
                {
                    this.setState({ taskList: res.result, progressVisible: false });
                    this.arrayholder = res.result;
                    console.log(this.arrayholder, 'taskresutl...');
                })
                .catch(() =>
                {
                    this.setState({ progressVisible: false });
                    console.log("error occured");
                });

        } catch (error)
        {
            this.setState({ progressVisible: false });
            console.log(error);
        }
    }

    goToCreateTask()
    {
        actions.push("CreateTask", {});
    }


    gotoDetails(task)
    {
        actions.push("ViewAssignToMe", { TaskModel: task, arrayholder: this.arrayholder, });
    }

    render()
    {

        return (
            <View
                style={TaskStyle.container}>
               
                <View
                    style={CommonStyles.HeaderContent}>
                    <View
                        style={CommonStyles.HeaderFirstView}>
                        <TouchableOpacity
                            style={CommonStyles.HeaderMenuicon}
                            onPress={() => { this.handleBackButton() }}>
                            <Image resizeMode="contain" style={CommonStyles.HeaderMenuiconstyle}
                                source={require('../../../assets/images/left_arrow.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={CommonStyles.HeaderTextView}>
                            <Text
                                style={CommonStyles.HeaderTextstyle}>
                                {global.aItemEmployeeName}
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={this.call}
                            style={{
                                padding: 8, paddingVertical: 2,
                               
                            }}>
                            <Image style={{ width: 20, height: 20,alignItems:'center',marginTop:5, }}
                                resizeMode='contain'
                                source={require('../../../assets/images/call.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>

                {this.state.progressVisible == true ?
                    (<ActivityIndicator size="large" color="#1B7F67"
                        style={TaskStyle.loaderIndicator} />) : null}


                <TaskLists
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    itemList={this.state.taskList} headerRenderer={this.renderHeader()} pointerEvents="none" />

            </View >
        )
    }
}
