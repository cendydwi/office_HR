import React, { Component } from 'react';
import {
    Text, View, Image, StatusBar, RefreshControl,
    BackHandler, AsyncStorage, Dimensions,ToastAndroid,
    TouchableOpacity, Platform,TextInput,
    ActivityIndicator, ScrollView,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import _ from "lodash";
import { TaskStyle } from '../tasks/TaskStyle';
import { GetTaskByGroup,SaveTaskGroup } from '../../../services/TaskService';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import TaskLists from "../Board/TaskListComponent"
import { CommonStyles } from '../../../common/CommonStyles';
import RadioButton from 'radio-button-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";
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
var screen = Dimensions.get('window');
const refreshOnBack = () =>
{
    //Actions.TabnavigationInTasks();
    Actions.TaskBordDetail();    
}
export default class TaskBordDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressVisible: false,
            refreshing: false,
            userId: "",
            taskList: [],
            bordDetail: [],
            Name: "",
            GroupId: "",
            value: '#5a7fbf',
            

        }
        this.arrayholder = [];
    }

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        setTimeout(function () {
            this.setState({
                refreshing: false,
            });

        }.bind(this), 2000);

        this.GetTaskByGroupList(this.state.GroupId);
    };

    async componentDidMount() {
        const Gid = this.props.BordDetail.Id
        this.setState({ GroupId: this.props.BordDetail.Id })
        this.setState({ Name: this.props.BordDetail.Name })
        this.setState({ value: this.props.BordDetail.BackGroundColor})
        this.GetTaskByGroupList(Gid)
        this.setState({ bordDetail: this.props.BordDetail });
        console.log(this.props.BordDetail, '...Borddetails...');



        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {
        Actions.pop();
        return true;
    }
    handleOnPress(value) {
        this.setState({ value: value })
    }
    goToEditBoard() {
        this.refs.modalForBoard.open();
    }
    async saveTaskGroup() {
        if (this.state.Name!== "") {
            try {
                let groupModel = {
                    CreatedById: this.state.userId,
                    CompanyId: this.state.companyId,
                    Name: this.state.Name,
                    BackGroundColor: this.state.value,
                    Id:this.state.GroupId
                };
               // this.setState({ progressVisible: true });
                console.log(groupModel,'groupModel.....');
                await SaveTaskGroup(groupModel)
                    .then(res => {
                        this.setState({ progressVisible: false });
                        this.refs.modalForBoard.close();
                        ToastAndroid.show('Task Board Updated.', ToastAndroid.TOP);
                        refreshOnBack();
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
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    searchFilterFunction = text => {
        this.setState({
            values: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.Title.toUpperCase()} ${item.Title.toUpperCase()} ${item.Title.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            taskList: newData,
        });
    };
    goToCreateTask() {
        actions.push("CreateTaskForBoard", {BordDetail: this.props.BordDetail });
        
    }

    renderHeader = () => {
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
                    value={this.state.values}

                />
            </ScrollView>
        );
    };
    GetTaskByGroupList = async (GroupId) => {
        try {

            await GetTaskByGroup(GroupId)
                .then(res => {
                    this.setState({ taskList: res.result, progressVisible: false });
                    this.arrayholder = res.result;
                    console.log(this.arrayholder, 'taskresutl...');
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

    render() {
        let textRef = React.createRef();
        let menuRef = null;
        const setMenuRef = ref => menuRef = ref;
        const hideMenu = () => menuRef.hide();
        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_RIGHT);
        const onPress = () => showMenu();
        const DeleteBord = () => {
            hideMenu();
        }
        const EditBord = () => {
            hideMenu();
            this.goToEditBoard();
        }
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
                            onPress={() => { Actions.pop() }}>
                            <Image resizeMode="contain" style={CommonStyles.HeaderMenuiconstyle}
                                source={require('../../../assets/images/left_arrow.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={CommonStyles.HeaderTextView}>
                            <Text
                                style={CommonStyles.HeaderTextstyle}>
                                {this.state.Name}
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
                        <TouchableOpacity onPress={onPress} ref={textRef} style={{ alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons
                                name="dots-vertical" size={28}
                                color="#bec3c8"
                                style={{ padding:0, }}
                            />
                        </TouchableOpacity>
                        <Menu ref={setMenuRef}>
                            <MenuItem onPress={EditBord}>Edit Board</MenuItem>
                            <MenuDivider />
                            <MenuItem onPress={DeleteBord}>Delete Board</MenuItem>
                        </Menu>
                    </View>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={TaskStyle.loaderIndicator} />) : null}
                    <TaskLists itemList={this.state.taskList} headerRenderer={this.renderHeader()} />
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
                            value={this.state.Name}
                            returnKeyType="next" autoCorrect={false}
                            onChangeText={text => this.setState({Name: text })}
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
                            <Text style={TaskStyle.createText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View >
        )
    }
}


