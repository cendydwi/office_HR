import React, { Component } from 'react';
import {
    ScrollView, Text, View, Image, StatusBar,
    TextInput, ToastAndroid, Alert, Dimensions,
    BackHandler, TouchableOpacity, Platform,ActivityIndicator,
    KeyboardAvoidingView, AsyncStorage,FlatList,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { TaskStyle } from './TaskStyle';
import { NoticeStyle } from "../../../notice/NoticeStyle"
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Modal as Modal1 } from 'react-native';
import { EmployeeList } from '../../../../../services/UserService/EmployeeTrackService';
import { TaskStatus, SaveTask, deleteTask, PriorityList,SaveFile,GetTaskAttachments } from '../../../../services/UserService/TaskService';
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";
import { CommonStyles } from '../../../../common/CommonStyles';
import ImageViewer from 'react-native-image-zoom-viewer';

import Modal from 'react-native-modalbox';
import moment from 'moment'
import ImagePicker from 'react-native-image-picker';

import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import _ from "lodash";
import { MyTaskCombo } from '../../../../MenuDrawer/DrawerContent';
const refreshOnBack = () => {
    MyTaskCombo();
    Actions.CreateByMe();
    Actions.refresh();
}
const { width, height } = Dimensions.get('window');

const options = {
    title: 'Select',
   // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


const numColumns = 2;
export default class ViewTask extends Component {
    constructor(props) {
        _isMounted = false;
        super(props);
        this.state = {
            taskModel: {},
            isDateTimePickerVisible: false,
            DueDate: "",
            EmployeeList: [],
            companyId: 0,
            TaskStatusList: [],
            StatusId: '',
            StatusName: '',
            Title: '',
            Description: '',
            AssignToName: '',
            AssignedToId: "",
            progressVisible: false,
            taskId: '',
            PriorityId: null,
            PriorityName: null,
            priorityList: [],
            Imageparam: "resourcetracker",
            ImageFileName:'',
            fileList:[],
            isModelVisible:false,
            statuscolor: '',
        }
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({ DueDate: date })
        this._hideDateTimePicker();

    }
    setSelectedOption = (id) => {
        switch (id) {
            case "To Do":
                this.setState({ statuscolor: "#C4C4C4" });
                break;
            case "In Progress":
                this.setState({ statuscolor: "#3D8EC5" });
                break;
            case "Pause":
                this.setState({ statuscolor: "#CB9A3A" });
                break;
            case "Completed":
                this.setState({ statuscolor: "#3DC585" });
                break;
            case "Done & Bill Collected":
                this.setState({ statuscolor: "#0A7A46" });
                break;
            case "Cancelled":
                this.setState({ statuscolor: "#A53131" });
                break;
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        if (this._isMounted) {
            this.setState({ taskModel: this.props.TaskModel });

            this.setState({ Title: this.props.TaskModel.Title });
            this.setState({ Description: this.props.TaskModel.Description });
            this.setState({ AssignedToId: this.props.TaskModel.AssignedToId });
            this.setState({ AssignToName: this.props.TaskModel.AssignToName });
            this.setState({ StatusId: this.props.TaskModel.StatusId });
            this.setState({ taskId: this.props.TaskModel.Id });
            this.setState({ DueDate: this.props.TaskModel.DueDate });
        }
        const cId = await AsyncStorage.getItem("companyId");
        this.getEmployeeList(cId);
        this.getPriorityList();
        this.GetTaskAttachments(this.props.TaskModel.Id)
        this.setState({ companyId: cId });
        this.getTaskStatuslist();
        this.setSelectedOption(this.state.taskModel.StatusName)

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {
        this.goBack();
        return true;
    }

    goBack() {
        Actions.pop();
    }
    gotoBordDetail(item) {
        this.setState({ images: [{ url: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + item.FileName, },] });
        this.ImageViewer();
    }
    ImageViewer() {
        this.setState({ isModelVisible: true })
    }
    ShowModalFunction(visible) {
        this.setState({ isModelVisible: false });
    }
    GetTaskAttachments = async (TaskId) => {
        try {
            //this.setState({ progressVisible: isProgress });
            await GetTaskAttachments(TaskId)
                .then(res => {
                    this.setState({ fileList: res.result, progressVisible: false });
                    console.log("Filelist...", this.state.fileList, 'fileList...View');
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
    callsave() {
        if (this.state.ImageFileName !== "") {
            this.saveFile();
        }
        this.saveTask();
    }
    async saveFile() {
        try {
            let fileModel = {
                TaskId: this.props.TaskModel.Id, //this.state.TaskId,
                FileName: this.state.ImageFileName,
                BlobName: this.state.ImageFileName,
                UpdatedById: this.props.TaskModel.CreatedById,
            };
            console.log(fileModel, '....fileModel....')
            await SaveFile(fileModel)
                .then(res => {
                    this.setState({ progressVisible: false });
                    ToastAndroid.show('Task Updated successfully', ToastAndroid.TOP);
                    this.setState({ ImageFileName: "" });
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

    _takePhoto = async () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.handleUploadPhoto(source)
            //   this.setState({
            //     avatarSource: source,
            //   });
            }
          });
 
    };
    
    handleUploadPhoto = async (pickerResult) => {
 
     const userToken = await AsyncStorage.getItem("userToken");
     console.log(pickerResult.uri, '...............send')
     var data = new FormData();
     data.append('my_photo', {
         uri: pickerResult.uri,
         name: 'my_photo.jpg',
         type: 'image/jpg'
     })
     this.setState({ progressVisible: true });
     fetch("https://medilifesolutions.com/api/AzureFileStorageApi/Upload?containerName=" + this.state.Imageparam, {
         headers: {
             'Authorization': `bearer ${userToken}`,
             'Accept': 'application/json',
             'Content-Type': 'multipart/form-data'
         },
         method: "POST",
         body: data
     })
         .then(response => response.json())
         .then(response => {
             console.log("upload succes", response);
             this.setState({ image: "https://medilifesolutions.blob.core.windows.net/resourcetracker/" + response.ReturnCode });
             this.setState({ ImageFileName: response.ReturnCode });
             this.setState({ progressVisible: false });
             ToastAndroid.show('Uploaded successfully', ToastAndroid.TOP);
             console.log(response.ReturnCode, 'return..............');
             //this.updateEmployeeRecords();
             this.setState({ photo: null });
         })
         .catch(error => {
             console.log("upload error", error);
             ToastAndroid.show('Upload Fail', ToastAndroid.TOP);
         });
 };

    // handleUploadPhoto = async (pickerResult) => {

    //     const userToken = await AsyncStorage.getItem("userToken");
    //     console.log(pickerResult.uri, '...............send')
    //     var data = new FormData();
    //     data.append('my_photo', {
    //         uri: pickerResult.uri,
    //         name: 'my_photo.jpg',
    //         type: 'image/jpg'
    //     })
    //     this.setState({ progressVisible: true });
    //     fetch("https://medilifesolutions.com/api/AzureFileStorageApi/Upload?containerName=" + this.state.Imageparam, {
    //         headers: {
    //             'Authorization': `bearer ${userToken}`,
    //             'Accept': 'application/json',
    //             'Content-Type': 'multipart/form-data'
    //         },
    //         method: "POST",
    //         body: data
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             console.log("upload succes", response);
    //             this.setState({ image: "https://medilifesolutions.blob.core.windows.net/resourcetracker/" + response.ReturnCode });
    //             this.setState({ ImageFileName: response.ReturnCode });
    //             this.setState({ progressVisible: false });
    //             ToastAndroid.show('Uploaded successfully', ToastAndroid.TOP);
    //             console.log(response.ReturnCode, 'return..............');
    //             //this.updateEmployeeRecords();
    //             this.setState({ photo: null });
    //         })
    //         .catch(error => {
    //             this.setState({ progressVisible: false });
    //             console.log("upload error", error);
    //             ToastAndroid.show('Upload Fail', ToastAndroid.TOP);
    //         });
    // };

    // _pickImage = async () => {
    //     this.refs.modalForImage.close()
    //     await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     await Permissions.askAsync(Permissions.CAMERA);
    //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //         //aspect: [4, 4],
    //         quality: 1,
    //         height: 250,
    //         width: 250,
    //     });
    //     if (pickerResult.cancelled == false) {
    //         this.handleUploadPhoto(pickerResult)
    //     }
    // };

    openmodalForImage() {
        this.refs.modalForImage.open();
    }

    soonMsg() {
        ToastAndroid.show('Attachment Feature Coming Soon', ToastAndroid.TOP);
    }

    renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity
                style={{
                  //  backgroundColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: "45%",
                    margin: 5,
                    alignItems: 'center',
                    borderRadius: 15,
                    borderWidth:1,
                    borderColor:'gray',
                    marginLeft:10,
                    // height: (Dimensions.get('window').width / numColumns) * .45,
                    height: 200,
                }}
                onPress={() => { this.gotoBordDetail(item) }}
            >
                <View>

                    {/* <View style={{ justifyContent: 'center', flex: 8, marginTop: 10, }}>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ fontSize: 20, color: '#ffffff', textAlign: 'center' }}>{item.Name}</Text>
                        </View>
                    </View> */}

                    <Image style={{ height: 200, width: 200, }} resizeMode='cover' source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + item.FileName }} >
                    </Image>
                    {/* <Image style={{ }} resizeMode='contain' source={require(FilePath)} >
                        </Image> */}

                </View>
            </TouchableOpacity>
        );
    };


    renderEmpList() {
        let content = this.state.EmployeeList.map((emp, i) => {
            return (
                <TouchableOpacity style={{
                    paddingVertical: 7, borderBottomColor: '#D5D5D5',
                    borderBottomWidth: 2
                }} key={i}
                    onPress={() => { this.closeModal1(emp.Value, emp.Text) }}>
                    <Text style={[{ textAlign: 'center' }, TaskStyle.dbblModalText]}
                        key={emp.Value}>{emp.Text}</Text>
                </TouchableOpacity>
            )
        });
        return content;
    }
    DeleteTask = async () => {
        try {
            await deleteTask(this.state.taskId)
                .then(res => {
                    Alert.alert(
                        "",
                        "successfully Deleted",
                        [
                            { text: 'OK', },
                        ],
                        { cancelable: false }
                    )
                    console.log("sucessDelete............");
                })
                .catch(() => {
                    Alert.alert(
                        "Not Deleted",
                        "Please try again...",
                        [
                            { text: 'OK', },
                        ],
                        { cancelable: false }
                    )
                    console.log("error occured");
                });
        } catch (error) {
            console.log(error);
        }
    }
    alertmethod() {
        Alert.alert(
            "",
            'Are You Sure?',
            [
                { text: 'NO', onPress: () => console.log('Cancel Pressed!') },
                { text: 'YES', onPress: () => this.DeleteTask() },
            ],
            { cancelable: false }
        )
    }
    renderstatusList() {
        let content = this.state.TaskStatusList.map((item, i) => {
            return (
                <TouchableOpacity style={{ paddingVertical: 7, borderBottomColor: '#D5D5D5', borderBottomWidth: 2 }} key={i}
                    onPress={() => { this.closeModalforStatus(item.Id, item.Name) }}>
                    <Text style={[{ textAlign: 'center' }, TaskStyle.dbblModalText]} key={item.Id}>{item.Name}</Text>
                </TouchableOpacity>
            )
        });
        return content;
    }
    async  closeModal1(index, value) {
        this.setState({ AssignToName: value })
        this.setState({ AssignedToId: index })
        this.refs.modal1.close()
    }

    async  closeModalforStatus(index, value) {
        this.setState({ StatusId: index })
        this.setState({ StatusName: value })
        this.setSelectedOption(value);
        this.refs.modalforstatus.close()
    }

    async  setPriority(id, name) {
        this.setState({ PriorityId: id })
        this.setState({ PriorityName: name })
        this.refs.modalPriority.close()
    }

    renderPriorityList() {
        let content = this.state.priorityList.map((x, i) => {
            return (
                <TouchableOpacity style={{ paddingVertical: 7, borderBottomColor: '#D5D5D5', borderBottomWidth: 2 }} key={i}
                    onPress={() => { this.setPriority(x.Id, x.Name) }}>
                    <Text style={[{ textAlign: 'center' }, TaskStyle.dbblModalText]} key={x.Id}>{x.Name}</Text>
                </TouchableOpacity>
            )
        });
        return content;
    }

    getPriorityList = async () => {
        try {
            await PriorityList()
                .then(res => {
                    this.setState({ priorityList: res.result, progressVisible: false });
                })
                .catch(() => {
                    this.setState({ progressVisible: false });
                });

        } catch (error) {
            this.setState({ progressVisible: false });
        }
    }

    getTaskStatuslist = async () => {

        try {
            //this.setState({ progressVisible: isProgress });
            await TaskStatus()
                .then(res => {
                    this.setState({ TaskStatusList: res.result, progressVisible: false });
                    console.log(this.state.TaskStatusList, 'TaskStatusList...View');
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
    async saveTask() {
        if (this.state.Title !== "") {
            try {
                let taskModel = {
                    CreatedById: this.props.TaskModel.CreatedById,
                    CompanyId: this.props.TaskModel.CompanyId,
                    Title: this.state.Title,
                    Description: this.state.Description,
                    AssignToName: this.state.AssignToName,
                    AssignedToId: this.state.AssignedToId,
                    Id: this.props.TaskModel.Id,
                    StatusId: this.state.StatusId,
                    TaskGroupId: this.props.TaskModel.TaskGroupId,
                    PriorityId: this.state.PriorityId,
                    DueDate: moment(this.state.DueDate).format("YYYYY-MM-DD")
                };
                console.log(taskModel, '....taskmodel....')
                this.setState({ progressVisible: true });
                await SaveTask(taskModel)
                    .then(res => {
                        this.setState({ progressVisible: false });
                        ToastAndroid.show('Task Updated successfully', ToastAndroid.TOP);

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
        } else {
            ToastAndroid.show('Title Can not be Empty ', ToastAndroid.TOP);
        }

    }
    getEmployeeList = async (companyId) => {

        try {
            //this.setState({ progressVisible: isProgress });
            await EmployeeList(companyId)
                .then(res => {
                    this.setState({ EmployeeList: res.result, progressVisible: false });
                    console.log(this.state.EmployeeList, 'Employeelist...View');
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
        const DeleteTask = () => {
            hideMenu();
            this.alertmethod();
        }
        return (
            <View
                style={TaskStyle.viewTaskContainer}>
                <View
                    style={CommonStyles.HeaderContent}>
                    <View
                        style={CommonStyles.HeaderFirstView}>
                        <TouchableOpacity
                            style={CommonStyles.HeaderMenuicon}
                            onPress={() => { this.goBack() }}>
                            <Image resizeMode="contain" style={CommonStyles.HeaderMenuiconstyle}
                                source={require('../../../../assets/images/left_arrow.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={CommonStyles.HeaderTextView}>
                            <Text
                                style={CommonStyles.HeaderTextstyle}>
                                VIEW TASK
                            </Text>
                        </View>
                    </View>
                    <View
                        style={TaskStyle.createTaskButtonContainer}>
                        <TouchableOpacity
                            onPress={() => this.callsave()}
                            style={TaskStyle.createTaskButtonTouch}>
                            <View style={TaskStyle.plusButton}>
                            <MaterialCommunityIcons name="content-save" size={17.5} color="#ffffff"/>
                                
                            </View>
                            <View style={TaskStyle.ApplyTextButton}>
                                <Text style={TaskStyle.ApplyButtonText}>
                                    SAVE
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View  style={{ flex: 1, }}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardDismissMode="on-drag"
                        style={{ flex: 1, }}>
                        <View
                            style={TaskStyle.titleInputRow}>
                            <Text
                                style={TaskStyle.createTaskTitleLabel}>
                                Title:
                                </Text>
                            <TextInput
                                style={TaskStyle.createTaskTitleTextBox}
                                value={this.state.Title}
                                placeholderTextColor="#dee1e5"
                                autoCapitalize="none"
                                onChangeText={text => this.setState({ Title: text })}
                            >
                            </TextInput>
                        </View>

                        <View
                            style={TaskStyle.descriptionInputRow}>
                            <Text
                                style={TaskStyle.createTaskTitleLabel}>
                                Description:
                            </Text>
                            <TextInput
                                style={TaskStyle.createTaskDescriptionTextBox}
                                value={this.state.Description}
                                placeholderTextColor="#dee1e5"
                                multiline={true}
                                autoCapitalize="none"
                                multiline={true}
                                onChangeText={text => this.setState({ Description: text })}
                            >
                            </TextInput>
                        </View>

                        <View
                            style={TaskStyle.viewTaskBodyContainer}>
                            <View
                                style={TaskStyle.viewTaskStatusContainer}>
                                <Text
                                    style={TaskStyle.viewTaskStatusLabel}>
                                    Status:
                                </Text>
                                <TouchableOpacity onPress={() => this.refs.modalforstatus.open()}
                                   
                                        style={[TaskStyle.viewTaskStatusCheckboxContainer,{ backgroundColor: this.state.statuscolor }, { borderRadius: 5 }]}>
            
                                        {this.state.StatusName === "" ?
                                            <Text
                                                style={TaskStyle.viewTaskStatusText}>
                                                {this.state.taskModel.StatusName}
                                            </Text> :
                                            <Text
                                                style={TaskStyle.viewTaskStatusText}>
                                                {this.state.StatusName}
                                            </Text>
                                        }
                                    
                                </TouchableOpacity>
                            </View>
                            <View
                                style={TaskStyle.viewTaskDueDateContainer}>
                                <Text
                                    style={TaskStyle.viewTaskDueDateLabel}>
                                    Due Date:
                                    </Text>
                                <TouchableOpacity onPress={this._showDateTimePicker}>
                                    <View
                                        style={TaskStyle.viewTaskDueDateValueContainer}>
                                        <MaterialCommunityIcons
                                            name="clock"
                                            size={20}
                                            color="black"
                                        >
                                        </MaterialCommunityIcons>
                                        <Text
                                            style={TaskStyle.viewTaskDueDateValue}>
                                            {this.state.DueDate === null ? " " : moment(this.state.DueDate).format("DD MMMM YYYY")}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                    mode={'date'}
                                />
                            </View>
                        </View>


                        <View
                            style={[TaskStyle.viewTaskBodyContainer,
                            { marginVertical: -4, }
                            ]}>
                            <View
                                style={TaskStyle.viewTaskStatusContainer}>
                                {/* style={TaskStyle.viewTaskDueDateContainer} */}
                                <TouchableOpacity onPress={() => this.refs.modalPriority.open()}>
                                    <View
                                        style={{
                                            width: (width * 45) / 100, height: 35,
                                            borderRadius: 5, flexDirection: 'row',
                                            alignItems: 'center', justifyContent: 'center',
                                            padding: 5, backgroundColor: "#f6f7f9",
                                        }}>
                                        <Ionicons name="ios-stats" size={18} style={{ marginHorizontal: 5, }}
                                            color="#4a535b" />
                                        <TextInput
                                            style={[TaskStyle.assigneePeopleTextBox]}
                                            placeholder="Select Priority"
                                            placeholderTextColor="#4a535b"
                                            editable={false}
                                            autoCapitalize="none"
                                            value={this.state.PriorityName}
                                        >
                                        </TextInput>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={TaskStyle.viewTaskDueDateContainer}>
                                <TouchableOpacity
                                    onPress={() => this.refs.modal1.open()}>
                                    <View
                                        style={{
                                            width: (width * 45) / 100, height: 35,
                                            borderRadius: 5, flexDirection: 'row',
                                            alignItems: 'center', justifyContent: 'center',
                                            padding: 5, backgroundColor: "#f6f7f9",
                                        }}>
                                        <Ionicons name="md-people" size={20} style={{ marginHorizontal: 5, }} color="#4a535b" />
                                        {this.state.AssignToName === "" ?
                                            <Text
                                                style={[TaskStyle.assigneePeopleTextBox]}>
                                                {this.state.taskModel.AssignToName}
                                            </Text> :
                                            <Text
                                                style={[TaskStyle.assigneePeopleTextBox]}>
                                                {this.state.AssignToName}
                                            </Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={TaskStyle.viewTaskAttachmentContainer}>
                            <View
                                style={TaskStyle.viewTaskAttachmentInnerContainer}>
                                <Entypo name="attachment" size={14} color="black"
                                    style={{ marginRight: 10, }} />

                                <Text
                                    style={TaskStyle.viewTaskAttachmentLeftIcon}>
                                    Attachments
                                    </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => this._takePhoto()}
                                style={TaskStyle.viewTaskAttachmentPlusIcon}>
                                <Image
                                    style={{ width: 20, height: 20 }} resizeMode='contain'
                                    source={require('../../../assets/images/leftPlusBig.png')}>
                                </Image>
                            </TouchableOpacity>
                           
                        </View>
                        {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={TaskStyle.loaderIndicator} />) : null}
                            <View style={TaskStyle.scrollContainerView}>
                                <FlatList
                                    data={this.state.fileList}
                                    keyExtractor={(i, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    style={TaskStyle.taskBoardContainer}
                                    renderItem={this.renderItem}
                                    numColumns={numColumns}
                                />
                            </View>
                    </ScrollView>
                </View >
                <Modal style={[TaskStyle.modalforCreateCompany1]}
                    position={"center"} ref={"modal1"}
                    isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ alignItems: "flex-start" }}>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.modal1.close()} style={{
                                marginLeft: 0, marginTop: 0,
                            }}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }}
                                    source={require('../../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={TaskStyle.dblModelContent}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: "80%" }}>
                            <View style={{}} >
                                {this.renderEmpList()}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
                <Modal style={[TaskStyle.modalforCreateCompany1]} position={"center"} ref={"modalforstatus"} isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ alignItems: "flex-start" }}>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.modalforstatus.close()} style={{
                                marginLeft: 0, marginTop: 0,
                            }}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }} source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={TaskStyle.dblModelContent}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: "80%" }}>
                            <View style={{}} >
                                {this.renderstatusList()}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>

                <Modal style={[TaskStyle.modalforCreateCompany1]} position={"center"} ref={"modalPriority"}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ alignItems: "flex-start" }}>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.modalPriority.close()} style={{
                                marginLeft: 0, marginTop: 0,
                            }}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }} source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={TaskStyle.dblModelContent}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: "80%" }}>
                            <View style={{}} >
                                {this.renderPriorityList()}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
                <Modal
                    style={NoticeStyle.ImagemodalContainer}
                    position={"center"}
                    ref={"modalForImage"}
                    isDisabled={this.state.isDisabled}
                    backdropPressToClose={true}
                    swipeToClose={false}
                >
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>
                        <View
                            style={{ alignItems: "flex-start" }}>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity
                                onPress={() => this.refs.modalForImage.close()}
                                style={NoticeStyle.modalClose}>
                                <Image
                                    resizeMode="contain"
                                    style={NoticeStyle.closeImage}
                                    source={require('../../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={NoticeStyle.addPhotoText}>Add Photos</Text>
                        </View>
                        <View style={NoticeStyle.cemaraImageContainer}>
                            <TouchableOpacity onPress={() => this._takePhoto()} style={{ alignItems: "center", paddingLeft: 35 }}>
                                <Image resizeMode='contain' style={{ height: 36, width: 36, }} source={require('../../../../assets/images/photo_camera_black.png')}></Image>
                                <Text style={NoticeStyle.takePhotoText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._pickImage()} style={{ alignItems: 'center', paddingRight: 35 }}>
                                <Image resizeMode='contain' style={{ height: 36, width: 36, }} source={require('../../../../assets/images/Gallary.png')}></Image>
                                <Text style={NoticeStyle.takePhotoText}>From Gallary</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal1
                    visible={this.state.isModelVisible}
                    transparent={false}
                    onRequestClose={() => this.ShowModalFunction()}>
                    <View
                        style={{
                            width: "100%",
                            padding: 5,
                            backgroundColor: 'black',
                            justifyContent: 'space-between',

                        }}>
                        <View style={{ alignItems: "flex-start", }}>

                        </View>
                        <TouchableOpacity
                            style={{ alignItems: "flex-end",padding:10 }}
                            onPress={() => this.ShowModalFunction()}>
                            <Image resizeMode="contain" style={{ width:15 , height: 15  }}
                                // onPress={() => this.ShowModalFunction()}
                                source={require('../../../../assets/images/close.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <ImageViewer imageUrls={this.state.images} >
                    </ImageViewer>
                </Modal1>

            </View >
        )
    }
}

