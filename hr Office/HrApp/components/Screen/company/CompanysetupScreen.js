import React from 'react';
import {
    Platform, StatusBar, ToastAndroid, Dimensions, KeyboardAvoidingView,
    Alert, View, BackHandler, Text, FlatList, Image, AsyncStorage, ScrollView,
    ActivityIndicator, TouchableOpacity, TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';

import { IsNullOrEmpty } from '../../../services/settingService';

import {
    FontAwesome,
} from '@expo/vector-icons'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { CreateCompany, GetCompanyByUserId, GetCompanyByIdentity, updatedeCompany } from '../../../services/CompanyService';
import {
    loadFromStorage,
    storage,
    CurrentUserProfile,
} from "../../../common/storage";
import { NoticeStyle } from '../../Screen/notice/NoticeStyle'
import { CompanySetupStyle } from './CompanySetupStyle'
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
function StatusBarPlaceHolder() {
    return (
        <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: '#F3F3F3',
        }}>
            <StatusBar
            // barStyle="light-content"
            />
        </View>
    );
}

export default class CompanysetupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            companyList: [],
            ComName: "",
            ComId: "",
            Address: '',
            phone: '',
            isDateTimePickerVisible: false,
            isDateTimePickerVisible1: false,
            IsAutoCheckPoint: false,
            selectedStartDate: null,
            PortalUserId: '',
            UserId: '',
            isDisabled: false,
            swipeToClose: false,
            backdropPressToClose: false,
            CompanyName: '',
            CompanyAddress: '',
            CompanyMobileNo: '',
            DepartmentName: '',
            MaximumOfficeHours: '8:00:00',
            OfficeOutTime: '00:30:00',
            progressVisible: true,
            refreshing: false,
            companyid: null,
        }
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({ MaximumOfficeHours: moment(date).format("HH:mm:ss") })
        console.log('A date has been picked: ', moment(date).format("HH:mm:ss"));

        this._hideDateTimePicker();
        // alert( moment(date).format("HH:mm:ss"));
    }
    _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });

    _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });

    _handleDatePicked1 = (date) => {
        this.setState({ OfficeOutTime: moment(date).format("HH:mm:ss") })
        console.log('A date has been picked: ', moment(date).format("HH:mm:ss"));

        this._hideDateTimePicker1();
        // alert( moment(date).format("HH:mm:ss"));
    }

    handleBackButton = () => {

        this.goBack();
        return true;
    }

    async componentDidMount() {
        this._bootstrapAsync();
        this.getCompany();
        const companyid = await AsyncStorage.getItem("companyId");
        this.setState({ companyid: companyid });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    openModal2() {
        this.getCompany();
        this.refs.modal2.open()
    }

    openmodalforEmpList() {

        this.getCompany();
        this.refs.modalforEmpList.open();
    }
    _bootstrapAsync = async () => {
        var response = await loadFromStorage(storage, CurrentUserProfile);
        await this.setState({ PortalUserId: response.item.Id });
    }

    _EditCom = async (item) => {
        this.methodforcom(item);
        this.refs.modalcomupdate.open();
        // this.refs.modal3.close();
    }

    methodforcom = async (item) => {
        this.setState({ ComName: item.Text })
        this.setState({ ComId: item.Value })
        this.setState({ Address: item.Address })
        this.setState({ phone: item.phone })
        this.setState({ MaximumOfficeHours: item.MaximumOfficeHours })
        this.setState({ OfficeOutTime: item.OfficeOutTime })
    }

    closemodalForupdateCom() {
        if (this.state.ComName == "" && this.state.Address == "" && this.state.phone == "") {
            ToastAndroid.show('Field can not be empty', ToastAndroid.TOP);
        }
        else {
            this.refs.modalcomupdate.close();
            this.updateCom();
        }
    }
    updateCom = async () => {
        try {
            let company = {
                Id: this.state.ComId,
                CompanyName: this.state.ComName,
                Address: this.state.Address,
                PhoneNumber: this.state.phone,
                MaximumOfficeHours: this.state.MaximumOfficeHours,
                OfficeOutTime: this.state.OfficeOutTime
            };
            let response = await updatedeCompany(company);
            console.log('Company..', response);
            if (response && response.isSuccess) {
                this.getCompany();
            } else {
                Alert.alert(
                    "",
                    "Invalid Input",
                    [
                        { text: 'OK', },
                    ],
                    { cancelable: false }
                )
            }
        } catch (errors) {
            console.log(errors);
        }
    }

    getCompany = async () => {
        try {
            this.setState({ progressVisible: true })
            var response = await loadFromStorage(storage, CurrentUserProfile);
            await GetCompanyByUserId(response.item.Id)
                .then(res => {
                    console.log('company', res.result);
                    if (res.result === null) {
                        this.setState({ progressVisible: false })
                    } else if (res.result.length > 0) {

                        const cList = [];
                        res.result.forEach(function (item) {
                            const ob = {
                                'Text': item.CompanyName,
                                'Value': item.Id,
                                'Address': item.Address,
                                'phone': item.PhoneNumber,
                                'MaximumOfficeHours': item.MaximumOfficeHours,
                                'OfficeOutTime': item.OfficeOutTime,
                            }
                            cList.push(ob);
                        });
                        this.setState(
                            { companyList: cList }
                        )
                        this.setState({ selctedCompanyValue: this.state.companyList[0].Text })
                        this.setState({ slectedCompanyIndex: this.state.companyList[0].Value })
                        if (this.state.companyid == null) {
                            AsyncStorage.setItem("companyId", this.state.companyList[0].Value.toString());
                        }
                        this.setState({ progressVisible: false })
                    }
                })
                .catch(() => {
                    this.setState({ progressVisible: false })
                    console.log("error occured");
                });
        } catch (error) {
            this.setState({ progressVisible: false })
            console.log(error);
        }
    }
    closeModal4() {
        if (this.state.CompanyName == "") {
            ToastAndroid.show('CompanyName can not be empty', ToastAndroid.TOP);
        } else if (this.state.CompanyAddress == '') {
            ToastAndroid.show('Address can not be empty', ToastAndroid.TOP);
        } else if (this.state.CompanyMobileNo == '') {
            ToastAndroid.show('Phonenumber can not be empty', ToastAndroid.TOP);
        }
        else {
            this.onFetchCompanyRecords();
        }

    }
    async onFetchCompanyRecords() {
        console.log("trying company create..");
        try {
            let CompanyModel = {
                MaximumOfficeHours: this.state.MaximumOfficeHours,
                OfficeOutTime: this.state.OfficeOutTime,
                CompanyName: this.state.CompanyName,
                Address: this.state.CompanyAddress,
                PhoneNumber: this.state.CompanyMobileNo,
                PortalUserId: this.state.PortalUserId,
            };
            console.log(CompanyModel, 'savetest')

            let response = await CreateCompany(CompanyModel);
            console.log('com', response);

            if (response && response.isSuccess) {
                console.log('com', response);
                const ob = {
                    'Text': response.result.CompanyName,
                    'Value': response.result.Id
                }
                this.state.companyList.push(ob);
                this.getCompany();
                ToastAndroid.show("Company created successfully", ToastAndroid.TOP);
                this.refs.modal4.close();
                this.setState({
                    CompanyName: '',
                    CompanyAddress: '',
                    CompanyMobileNo: '',
                })
            } else {
                ToastAndroid.show("error", ToastAndroid.TOP);
            }
        } catch (errors) {
            ToastAndroid.show("error", ToastAndroid.TOP);
        }
    }
    openModal4() {
        this.refs.modal4.open()
    }

    goBack() {
        Actions.pop();
    }

    render() {
        var { width, } = Dimensions.get('window');

        return (

            <View style={CompanySetupStyle.container}>
                <StatusBarPlaceHolder />
                <View style={NoticeStyle.headerBarforCompany}>

                    <View
                        style={NoticeStyle.backIcon}>
                        <TouchableOpacity
                            style={NoticeStyle.backIconTouch}
                            onPress={() => { this.goBack() }}>
                            <Image resizeMode="contain" style={{ width: 20, height: 20, }}
                                source={require('../../../assets/images/left_arrow.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={NoticeStyle.headerTitle}>
                            <Text
                                style={NoticeStyle.headerTitleText}>
                                COMPANY SETUP
                           </Text>
                        </View>
                    </View>
                    <View
                        style={NoticeStyle.createNoticeButtonContainer}>
                        <View
                            style={NoticeStyle.ApplyButtonContainer}>
                            <TouchableOpacity
                                onPress={() => this.openModal4()}
                                style={NoticeStyle.ApplyButtonTouch}>
                                <View style={NoticeStyle.plusButtonforCompany}>
                                    <FontAwesome
                                        name="plus" size={18} color="#ffffff">
                                    </FontAwesome>
                                </View>
                                <View style={NoticeStyle.ApplyTextButtonforNotice}>
                                    <Text style={NoticeStyle.ApplyButtonText}>
                                        NEW
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, justifyContent: 'center', alignContent: 'center', }} />) : null}
                <View style={CompanySetupStyle.FlatListContainer}>
                    <FlatList
                        data={this.state.companyList}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) =>
                            <View style={CompanySetupStyle.FlatListItemContainer}>
                                <View style={CompanySetupStyle.ListPart}>
                                    <Text style={CompanySetupStyle.companyText}>{item.Text}</Text>
                                    <View style={{ flexDirection: 'row', width: (width * 50) / 100, }}>
                                        <Image resizeMode="contain" style={CompanySetupStyle.locationIcon} source={require('../../../assets/images/Path_87.png')}></Image>
                                        <Text style={CompanySetupStyle.locationText}>{item.Address}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: (width * 50) / 100, }}>
                                        <Image style={CompanySetupStyle.phoneIcon} source={require('../../../assets/images/Path_86.png')}></Image>
                                        <Text style={CompanySetupStyle.phoneText}>{item.phone}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => this._EditCom(item)} style={{ marginTop: 5, }}>
                                    <View style={CompanySetupStyle.editCotainer}>
                                        <Image style={CompanySetupStyle.editImage} source={require('../../../assets/images/edit.png')}></Image>
                                        <Text style={CompanySetupStyle.editText}>EDIT</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                    {/* <CompanyLists itemList={this.state.companyList}/> */}
                </View>
                <Modal
                    style={[CompanySetupStyle.modal3]}
                    position={"center"} ref={"modal4"} isDisabled={this.state.isDisabled}
                    onOpened={() => this.setState({ floatButtonHide: true })}
                    backdropPressToClose={false}
                    swipeToClose={true}
                >
                    <View style={CompanySetupStyle.modalHeader}>
                        <View style={CompanySetupStyle.modalheaderLeft}></View>
                        <View style={CompanySetupStyle.modalheaderRight}>
                            <TouchableOpacity onPress={() => this.refs.modal4.close()} style={CompanySetupStyle.closeTouchable}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }} source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={CompanySetupStyle.modelContent}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                            ADD COMPANY
                        </Text>
                        <Image resizeMode="contain" style={CompanySetupStyle.addPeopleImg} source={require('../../../assets/images/company.png')}>
                        </Image>
                    </View>
                   
                            <TextInput style={CompanySetupStyle.addCompanyinputBox} placeholder="Company Name"
                                placeholderTextColor="#cbcbcb"
                                returnKeyType="next" autoCorrect={false}
                                onSubmitEditing={() => this.refs.txtAddress.focus()}
                                onChangeText={(text) => this.setState({ CompanyName: text })}
                                value={this.state.CompanyName}
                            />
                            <TextInput style={CompanySetupStyle.addCompanyinputBox} placeholder="Address"
                                placeholderTextColor="#cbcbcb"
                                returnKeyType="next" autoCorrect={false}
                                ref={"txtAddress"}
                                onSubmitEditing={() => this.refs.txtPhone.focus()}
                                onChangeText={(text) => this.setState({ CompanyAddress: text })}
                                value={this.state.CompanyAddress}
                            />
                            <TextInput style={CompanySetupStyle.addCompanyinputBox} placeholder="Mobile Number"
                                placeholderTextColor="#cbcbcb"
                                keyboardType="number-pad"
                                ref={"txtPhone"}
                                returnKeyType="go" autoCorrect={false}
                                onChangeText={(text) => this.setState({ CompanyMobileNo: text })}
                                value={this.state.CompanyMobileNo}
                            />

                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <Text style={{
                                    // marginTop: 10,
                                    marginLeft: 20, justifyContent: 'flex-start'
                                }}>
                                    Maximum Office Hours:
                                 </Text>
                                <TouchableOpacity onPress={this._showDateTimePicker}
                                    style={{ marginRight: 18, justifyContent: "flex-end" }}
                                >
                                    <View>
                                        <TextInput
                                            editable={false}
                                            style={CompanySetupStyle.inputstylecom}
                                            value={this.state.MaximumOfficeHours}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                    mode={'time'}
                                />
                            </View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    // marginTop: 10,
                                    marginLeft: 20, justifyContent: 'flex-start',
                                }}>
                                    Can Leave Before:
                             </Text>
                                <TouchableOpacity onPress={this._showDateTimePicker1}
                                    style={{ marginRight: 18, justifyContent: "flex-end" }}
                                >
                                    <View>
                                        <TextInput
                                            editable={false}
                                            style={CompanySetupStyle.inputstylecom}
                                            value={this.state.OfficeOutTime}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible1}
                                    onConfirm={this._handleDatePicked1}
                                    onCancel={this._hideDateTimePicker1}
                                    mode={'time'}
                                />
                            </View>
                            <TouchableOpacity style={CompanySetupStyle.addPeopleBtn} onPress={() => this.closeModal4()} >
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', }}>Add</Text>
                            </TouchableOpacity>           
                </Modal>
                <Modal style={[CompanySetupStyle.modalforCreateCompany]}
                    position={"center"} ref={"modalcomupdate"} isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ alignItems: "flex-start" }}>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.modalcomupdate.close()}
                                style={CompanySetupStyle.closeTouchable}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }}
                                    source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{}}>
                            <Text style={CompanySetupStyle.lablecompanyName}>
                                Company Name:
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={CompanySetupStyle.inputstyle}
                                value={this.state.ComName}
                                onChangeText={(txt) => this.setState({ ComName: txt })}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{}}>
                            <Text style={CompanySetupStyle.lableAddress}>
                                Company Address:
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={CompanySetupStyle.inputstyle}
                                value={this.state.Address}
                                onChangeText={(txt) => this.setState({ Address: txt })}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{}}>
                            <Text
                                style={CompanySetupStyle.labelphone}>
                                Company Phone:
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={CompanySetupStyle.inputstyle}
                                value={this.state.phone}
                                onChangeText={(txt) => this.setState({ phone: txt })}
                            />
                        </View>
                    </View>
                    <View style={CompanySetupStyle.labelContainerMax}>
                        <Text style={CompanySetupStyle.lablemax}>
                            Maximum Office Hours:
                        </Text>
                        <TouchableOpacity onPress={this._showDateTimePicker}
                            style={CompanySetupStyle.TextinputTouch}
                        >
                            <View>
                                <TextInput
                                    editable={false}
                                    style={CompanySetupStyle.inputstylecom}
                                    value={this.state.MaximumOfficeHours}
                                />
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                            mode={'time'}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={CompanySetupStyle.canleaveText}>
                            Can Leave Before:
                    </Text>
                        <TouchableOpacity onPress={this._showDateTimePicker1}
                            style={{ marginRight: 18, justifyContent: "flex-end" }}
                        >
                            <View>
                                <TextInput
                                    editable={false}
                                    style={CompanySetupStyle.inputstylecom}
                                    value={this.state.OfficeOutTime}

                                />
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible1}
                            onConfirm={this._handleDatePicked1}
                            onCancel={this._hideDateTimePicker1}
                            mode={'time'}
                        />
                    </View>
                    <TouchableOpacity style={CompanySetupStyle.addPeopleBtncom} onPress={() => this.closemodalForupdateCom()} >
                        <Text style={CompanySetupStyle.SaveStyle}>Save</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

