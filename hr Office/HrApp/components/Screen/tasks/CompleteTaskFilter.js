import React, { Component } from 'react';
import
{
    Text, View, Image, StatusBar,
    BackHandler, AsyncStorage, Dimensions,
    TouchableOpacity, Platform, Alert, RefreshControl,
    ActivityIndicator, ScrollView,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import _ from "lodash";
import { TaskStyle } from './TaskStyle';
import { GetRelatedToMeTasks } from '../../../services/TaskService';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import TaskLists from "./TaskListComponent"
import { CommonStyles } from '../../../common/CommonStyles';
// import
// {
//     FontAwesome,
// } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
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

export default class CompleteTaskFilter extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            progressVisible: false,
            refreshing: false,
            userId: "",
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

    async componentDidMount()
    {
        const uId = await AsyncStorage.getItem("userId");
        this.setState({ userId: uId });
        this.getTaskList(uId, true);



        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillMount()
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () =>
    {
      BackHandler.exitApp()
        return true;
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
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                containerStyle={{ backgroundColor: '#f6f7f9', }}
                inputContainerStyle={{ backgroundColor: 'white', }}
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />

        );
    };
    getTaskList = async (userId, isProgress) =>
    {
        try
        {
            this.setState({ progressVisible: isProgress });
            await GetRelatedToMeTasks(userId)
                .then(res =>
                {
                    this.setState({ taskList: res.result.filter(x=>x.StatusName==="Completed" || x.StatusName==="Cancelled"), progressVisible: false });
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
        Actions.CreateTask()
    }

    gotoDetails(task)
    {
        actions.push("ViewTask", { TaskModel: task, arrayholder: this.arrayholder, });
    }

    render()
    {

        return (
            <View
                style={TaskStyle.container}>
              <StatusBarPlaceHolder />
                <View
                    style={CommonStyles.HeaderContent}>
                    <View
                        style={CommonStyles.HeaderFirstView}>
                        <TouchableOpacity
                            style={CommonStyles.HeaderMenuicon}
                            onPress={() => { Actions.drawerOpen(); }}>
                            <Image resizeMode="contain" style={CommonStyles.HeaderMenuiconstyle}
                                source={require('../../../assets/images/menu_b.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={CommonStyles.HeaderTextView}>
                            <Text
                                style={CommonStyles.HeaderTextstyle}>
                                TASKS
                            </Text>
                        </View>
                    </View>
                    <View
                        style={CommonStyles.createTaskButtonContainer}>
                        <TouchableOpacity
                            onPress={() => this.goToCreateTask()}
                            style={CommonStyles.createTaskButtonTouch}>
                            <View style={CommonStyles.plusButton}>
                                <FontAwesome
                                    name="plus" size={18} color="#ffffff">
                                </FontAwesome>
                            </View>
                            <View style={CommonStyles.ApplyTextButton}>
                                <Text style={CommonStyles.ApplyButtonText}>
                                    TASK
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={TaskStyle.loaderIndicator} />) : null}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <TaskLists itemList={this.state.taskList} headerRenderer={this.renderHeader()} />
                </ScrollView>
            </View >
        )
    }
}


