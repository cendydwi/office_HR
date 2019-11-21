

import React, { Component } from 'react';
import {
    ToastAndroid, FlatList,
    Text, View, Image, StatusBar,
    ActivityIndicator, AsyncStorage,
    Dimensions, TextInput,
    TouchableOpacity, Platform,
    RefreshControl, ScrollView,
    Alert, BackHandler,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import Modal from 'react-native-modalbox';
import RadioButton from 'radio-button-react-native';
import { GetGroups, SaveTaskGroup } from '../../../services/TaskService';
import { TaskStyle } from '../tasks/TaskStyle';
import { CommonStyles } from '../../../common/CommonStyles';
// import {
//     FontAwesome,

// } from '@expo/vector-icons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
function StatusBarPlaceHolder() {
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
const numColumns = 2;


export default class TaskBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            isChecked: false,
            default: '',
            value: '#5a7fbf',
            userId: "",
            companyId: 0,
            progressVisible: false,
            groupList: [],
            groupName: "",

        }
    }
    goBack() {
        actions.push("app", {})
    }
    handleOnPress(value) {
        this.setState({ value: value })
    }
    goToCreateBoard() {
        this.refs.modalForBoard.open();
    }
    _onRefresh = async () => {
        this.setState({ refreshing: true });
        setTimeout(function () {
            this.setState({
                refreshing: false,
            });

        }.bind(this), 2000);

        this.getTaskGroups(this.state.companyId, false);
    };

    async saveTaskGroup() {
        var istrue = false
        if (this.state.groupName !== "") {
           
            this.state.groupList.map((userData) => {
                if (userData.Name.toUpperCase() == this.state.groupName.toUpperCase()) {
                     istrue = true
                }
            });
            if (!istrue) {
                 try {
                let groupModel = {
                    CreatedById: this.state.userId,
                    CompanyId: this.state.companyId,
                    Name: this.state.groupName,
                    BackGroundColor: this.state.value
                };
                this.setState({ progressVisible: true });
                await SaveTaskGroup(groupModel)
                    .then(res => {
                        this.setState({ progressVisible: false });
                        this.refs.modalForBoard.close();
                        ToastAndroid.show('Task Board Created.', ToastAndroid.TOP);
                        this.getTaskGroups(this.state.companyId, true);
                    })
                    .catch(() => {
                        this.setState({ progressVisible: false });
                        console.log("error occured");
                    });

            } catch (error) {
                this.setState({ progressVisible: false });
                console.log(error);
            }
            } else {
                ToastAndroid.show('This Name already exist', ToastAndroid.TOP);
               
            }
          
        }
    }
    async componentDidMount() {
        const uId = await AsyncStorage.getItem("userId");
        const cId = await AsyncStorage.getItem("companyId");
        this.setState({ userId: uId, companyId: cId });
        this.getTaskGroups(cId, true);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {
        BackHandler.exitApp()
        return true;
    }
    getTaskGroups = async (companyId, isProgress) => {
        try {
            this.setState({ progressVisible: isProgress });
            await GetGroups(companyId)
                .then(res => {
                    this.setState({ groupList: res.result, progressVisible: false });
                    console.log(this.state.groupList, 'BoardList....');
                })
                .catch(() => {
                    this.setState({ progressVisible: false });
                    console.log("error occured");
                });

        } catch (error) {
            this.setState({ progressVisible: false });
            console.log(error);
        }
    }
    gotoBordDetail(item) {
        actions.push("TaskBordDetail", { BordDetail: item });
    }
    renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity style={{ flex: 1, }}
                onPress={() => { this.gotoBordDetail(item) }}
            >
                <View
                    style={{
                        backgroundColor: item.BackGroundColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        margin: 5,
                        alignItems: 'center',
                        borderRadius: 15,
                        height: (Dimensions.get('window').width / numColumns) * .85,
                    }}
                >

                    <View style={{ justifyContent: 'center', flex: 8, marginTop: 10, }}>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ fontSize: 20, color: '#ffffff', textAlign: 'center' }}>{item.Name}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', paddingLeft: 15, marginTop: 5, }}>
                        <Image style={{ width: 15, height: 15 }} resizeMode='contain' source={require('../../../assets/images/group.png')}>
                        </Image>
                        <Text style={{ color: "white", fontSize: 10, }}> {item.TotalTask} TASKS</Text>
                    </View>

                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={TaskStyle.container}>
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
                                BOARD
                            </Text>
                        </View>
                    </View>
                    <View
                        style={CommonStyles.createTaskButtonContainer}>
                        <TouchableOpacity
                            onPress={() => this.goToCreateBoard()}
                            style={CommonStyles.createTaskButtonTouch}>
                            <View style={CommonStyles.plusButton}>
                                <FontAwesome
                                    name="plus" size={18} color="#ffffff">
                                </FontAwesome>
                            </View>
                            <View style={CommonStyles.ApplyTextButton}>
                                <Text style={CommonStyles.ApplyButtonText}>
                                    BOARD
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View
                        style={TaskStyle.createTaskButtonContainer}>
                        <TouchableOpacity
                            onPress={() => this.goToCreateBoard()}
                            style={TaskStyle.createTaskButtonTouch}>
                            <Image
                                style={{ width: 90, height: 90 }}
                                resizeMode='contain' source={require('../../../assets/images/board_p.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View> */}
                </View>

                {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={TaskStyle.loaderIndicator} />) : null}
                <ScrollView>
                    <View style={TaskStyle.scrollContainerView}>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                            data={this.state.groupList}
                            keyExtractor={(i, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            style={TaskStyle.taskBoardContainer}
                            renderItem={this.renderItem}
                            numColumns={numColumns}
                        />
                    </View>
                </ScrollView>
                <Modal style={TaskStyle.colorSelectModal} position={"center"} ref={"modalForBoard"} isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    onOpened={() => this.setState({ floatButtonHide: true })}
                >
                    <View style={TaskStyle.modalforViewContainerView}>
                        <View style={TaskStyle.flexstartView}></View>
                        <View style={TaskStyle.flexEnd}>
                            <TouchableOpacity onPress={() => this.refs.modalForBoard.close()}
                                style={TaskStyle.modalClose}>
                                <Image resizeMode="contain" style={TaskStyle.closemodalImage} source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={TaskStyle.modelContent}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            Create Board
                        </Text>
                    </View>
                    <Text style={TaskStyle.titleText}>Title</Text>
                    <View style={TaskStyle.creaatebordContent}>
                        <TextInput style={TaskStyle.boardInput}
                            placeholderTextColor="#cbcbcb"
                            returnKeyType="next" autoCorrect={false}
                            onChangeText={text => this.setState({ groupName: text })}
                        />
                        <View style={TaskStyle.radioButtonContainer}>
                            <Text style={{ marginRight: 10, color: '#848f98', fontFamily: 'PRODUCT_SANS_BOLD' }}>Color:</Text>
                            <RadioButton borderWidth={4} innerCircleColor='#5a7fbf' outerCircleColor='#5a7fbf' value={"#5a7fbf"} currentValue={this.state.value} onPress={this.handleOnPress.bind(this)}>
                                <Text style={TaskStyle.radioButtonText}></Text>
                            </RadioButton>
                            <RadioButton innerCircleColor='#5abfbc' outerCircleColor='#5abfbc' value={"#5abfbc"} currentValue={this.state.value} onPress={this.handleOnPress.bind(this)}>
                                <Text style={TaskStyle.radioButtonText}></Text>
                            </RadioButton>
                            <RadioButton innerCircleColor='#4899d6' outerCircleColor='#4899d6' value={"#4899d6"} currentValue={this.state.value} onPress={this.handleOnPress.bind(this)}>
                                <Text style={TaskStyle.radioButtonText}></Text>
                            </RadioButton>
                            <RadioButton innerCircleColor='#106d85' outerCircleColor='#106d85' value={"#106d85"} currentValue={this.state.value} onPress={this.handleOnPress.bind(this)}>
                                <Text style={TaskStyle.radioButtonText}></Text>
                            </RadioButton>
                            <RadioButton innerCircleColor='#13598f' outerCircleColor='#13598f' value={"#13598f"} currentValue={this.state.value} onPress={this.handleOnPress.bind(this)}>
                                <Text style={TaskStyle.radioButtonText}></Text>
                            </RadioButton>
                        </View>
                        <TouchableOpacity style={TaskStyle.createTouchableOpacity} onPress={() => this.saveTaskGroup()} >
                            <Text style={TaskStyle.createText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

            </View>
        );
    }
}


