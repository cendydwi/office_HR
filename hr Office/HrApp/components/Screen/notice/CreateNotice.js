import React, { Component } from 'react';
import {
    ScrollView, Text, View, Image, StatusBar, ActivityIndicator, ToastAndroid, NetInfo,
    BackHandler, AsyncStorage, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, CheckBox
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import Modal from 'react-native-modalbox';
import { GetDepartmentByCompanyId } from "../../../services/DepartmentService";
import {
    MaterialCommunityIcons
} from '@expo/vector-icons'
import _ from "lodash";
import { CommonStyles } from '../../../common/CommonStyles';
import { NoticeStyle } from './NoticeStyle';
import { SaveNotice } from '../../../services/Notice';
// import {
//     Permissions,
//     ImagePicker,
// } from 'expo';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'


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
var tempCheckValues = [];
var cListforcheckbox = [];
export default class CreateNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            companyId: "",
            details: "",
            progressVisible: false,
            departmentList: [],
            checkBoxChecked: [],
            test: {
                CheckBoxList: []
            },
            ImageFileName: "",
            image: null,
            Imageparam: "resourcetracker",
        }
    }

    goBack() {
        Actions.Notice();
    }

    async componentDidMount() {
        const uId = await AsyncStorage.getItem("userId");
        const cId = await AsyncStorage.getItem("companyId");
        this.setState({ userId: uId, companyId: cId });
        this.getDepartment("1")
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    async saveNotice() {
        if (await NetInfo.isConnected.fetch()) {
            if (this.state.details !== "" || this.state.ImageFileName !== "") {
                try {
                    let noticeModel = {
                        CreatedBy: this.state.userId,
                        CompanyId: this.state.companyId,
                        Details: this.state.details,
                        // DepartmentIdList: this.state.test.CheckBoxList,
                        ImageFileName: this.state.ImageFileName,
                    };
                    this.setState({ progressVisible: true });
                    await SaveNotice(noticeModel)
                        .then(res => {
                            this.setState({ progressVisible: false });
                            ToastAndroid.show('Notice saved successfully', ToastAndroid.TOP);
                            Actions.Notice();
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
        } else {
            ToastAndroid.show('Please connect to Internet', ToastAndroid.TOP);
        }
    }
    checkBoxChanged(Value, value, isChecked) {
        this.setState({
            checkBoxChecked: tempCheckValues
        })

        var tempCheckBoxChecked = this.state.checkBoxChecked;
        tempCheckBoxChecked[Value] = !value;

        this.setState({
            checkBoxChecked: tempCheckBoxChecked
        })
        if (isChecked) {
            cListforcheckbox.push(Value);
        } else {

            for (let index = 0; index < cListforcheckbox.length; index++) {
                const element = cListforcheckbox[index];

                if (element == Value) {
                    cListforcheckbox.splice(index, 1);
                }

            }
        }
        { this.setState(Object.assign(this.state.test, { CheckBoxList: cListforcheckbox })) }
        // this.setState({ CheckBoxList: cList })
        console.log(this.state.tempCheckValues, '......test1')
        console.log(this.state.test.CheckBoxList, '......test')
    }
    handleBackButton = () => {
        Actions.Notice();
        return true;
    }
    openmodalForImage() {
        this.refs.modalForImage.open();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    openModaldept() {
        this.refs.modalfordept.open();
    }
    closeModaldept() {
        this.refs.modalfordept.close();
    }
    closeModaledpt() {
        this.refs.modalfordept.close();

    }
    _takePhoto = async () => {
        this.refs.modalForImage.close()
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            // aspect: [4, 4],
            //quality: .2,
            height: 250,
            width: 250,
        });
        console.log(pickerResult, '.......................')
        if (pickerResult.cancelled == false) {
            this.handleUploadPhoto(pickerResult)
        }
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

    _pickImage = async () => {
        this.refs.modalForImage.close()
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            //aspect: [4, 4],
            quality: 1,
            height: 250,
            width: 250,
        });
        if (pickerResult.cancelled == false) {
            this.handleUploadPhoto(pickerResult)
        }
    };
    getDepartment = async (cid) => {
        try {

            await GetDepartmentByCompanyId(cid)
                .then(res => {
                    console.log('comlen', res.result);
                    if (res.result !== null) {
                        console.log('comlen2', res.result);
                        if (res.result.length > 0) {
                            const depList = [];
                            res.result.forEach(function (item) {
                                const ob = {
                                    'Text': item.DepartmentName,
                                    'Value': item.Id
                                }
                                depList.push(ob);
                            });
                            this.setState(
                                { departmentList: depList }
                            )
                            console.log(this.state.departmentList, 'testcall')
                        }
                    } else {
                        this.setState(
                            { departmentList: [] })
                    }
                })
                .catch(() => {
                    console.log("error occured");
                });
        } catch (error) {
            console.log(error);
        }
    }

    rendercheckbox() {

        return (
            this.state.departmentList.map((val) => {
                { tempCheckValues[val.Value] = false }

                return (
                    <View
                        key={val.Value}
                        style={{
                            // flex: 1,
                            flexDirection: 'row',
                            padding: 5,
                            alignSelf: 'center',
                        }}>
                        <CheckBox
                            value={this.state.checkBoxChecked[val.Value]}
                            onValueChange={(value) =>
                                this.checkBoxChanged(val.Value,
                                    this.state.checkBoxChecked[val.Value], value)}
                        />
                        <Text style={{ marginTop: 6, color: '#636363', }}>{val.Text}</Text>
                    </View >
                )
            }
            )
        );
    }

    render() {
        return (
            <View
                style={{
                    flex: 1, backgroundColor: '#ffffff', flexDirection: 'column',
                }}>
                <StatusBarPlaceHolder />
                <View
                    style={CommonStyles.HeaderContent}>
                    <View
                        style={CommonStyles.HeaderFirstView}>
                        <TouchableOpacity
                            style={CommonStyles.HeaderMenuicon}
                            onPress={() => { this.goBack() }}>
                            <Image resizeMode="contain" style={CommonStyles.HeaderMenuiconstyle}
                                source={require('../../../assets/images/left_arrow.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={CommonStyles.HeaderTextView}>
                            <Text
                                style={CommonStyles.HeaderTextstyle}>
                                CREATE NOTICE
                         </Text>
                        </View>
                    </View>

                    <View
                        style={NoticeStyle.createNoticeButtonContainer}>
                        <View
                            style={NoticeStyle.ApplyButtonContainer}>
                            <TouchableOpacity
                                onPress={() => this.saveNotice()}
                                style={NoticeStyle.ApplyButtonTouch}>
                                <View style={NoticeStyle.plusButton}>
                                    <MaterialCommunityIcons name="content-save" size={17.5} color="#ffffff" />
                                </View>
                                <View style={NoticeStyle.ApplyTextButton}>
                                    <Text style={NoticeStyle.ApplyButtonText}>
                                        PUBLISH
                                </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>


                {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={NoticeStyle.loaderIndicator} />) : null}

                <KeyboardAvoidingView behavior="padding" enabled style={NoticeStyle.createnoticecontainer}>
                    {/* <View style={NoticeStyle.createnoticecontainer}> */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={NoticeStyle.selectContainer}>
                            <TouchableOpacity onPress={() => this.openmodalForImage()}
                                style={NoticeStyle.opencemarTouchableopacity}>
                                <View>
                                    <Image resizeMode='contain'
                                        style={NoticeStyle.opencemarastle}
                                        source={require('../../../assets/images/camera_white.png')}>
                                    </Image>

                                </View>
                                <View style={NoticeStyle.selectContainerview}>
                                    <Text style={NoticeStyle.selectText}>
                                        SELECT TO
                                    </Text>
                                    <Text style={NoticeStyle.addPhotoText1}>
                                        ADD PHOTO
                                    </Text>
                                </View>
                                {/* </View> */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={NoticeStyle.openDeptTouhableOpacity}>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={NoticeStyle.inputTextContainer}>


                            <TextInput
                                style={NoticeStyle.inputText}
                                multiline={true}
                                placeholderTextColor="#cbcbcb"
                                placeholder="Write your notice here..."
                                returnKeyType="next"
                                autoCorrect={false}
                                onChangeText={text => this.setState({ details: text })}
                            />


                            <TouchableOpacity
                                style={NoticeStyle.ImageTouchableOpacity}>
                                <Image resizeMode='contain'
                                    style={NoticeStyle.uploadImageStyle}
                                    source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + this.state.ImageFileName }}></Image>
                            </TouchableOpacity>


                            {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={NoticeStyle.loaderIndicator} />) : null}
                        </View>
                    </ScrollView>

                    {/* </View> */}
                </KeyboardAvoidingView>
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
                                    source={require('../../../assets/images/close.png')}>
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
                                <Image resizeMode='contain' style={{ height: 36, width: 36, }} source={require('../../../assets/images/photo_camera_black.png')}></Image>
                                <Text style={NoticeStyle.takePhotoText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._pickImage()} style={{ alignItems: 'center', paddingRight: 35 }}>
                                <Image resizeMode='contain' style={{ height: 36, width: 36, }} source={require('../../../assets/images/Gallary.png')}></Image>
                                <Text style={NoticeStyle.takePhotoText}>From Gallary</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    style={[NoticeStyle.modalfordept]}
                    position={"center"}
                    ref={"modalfordept"}
                    isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}
                    onOpened={() => this.setState({ floatButtonHide: true })}
                    onClosed={() => this.setState({ floatButtonHide: false })}
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
                                onPress={() => this.refs.modalfordept.close()}
                                style={NoticeStyle.modalClose}>
                                <Image
                                    resizeMode="contain"
                                    style={{
                                        width: 15, height: 15, marginRight: 17, marginTop: 15
                                    }}
                                    source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{}}>
                            <Text style={NoticeStyle.departListText}>
                                Department List
                        </Text>
                        </View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ height: 150 }}>
                            <View style={{}} >
                                {this.rendercheckbox()}

                            </View>
                        </ScrollView>
                        <TouchableOpacity style={NoticeStyle.DoneTouchableopacity} onPress={() => this.closeModaledpt()} >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>


            </View >
        )
    }
}
