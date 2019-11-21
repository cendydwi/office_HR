import React from 'react';
import {
    KeyboardAvoidingView,
    Platform, StatusBar, ToastAndroid, AsyncStorage,
    Switch, Alert, View, BackHandler,
    Text, FlatList, Image, ScrollView, Share, ActivityIndicator,
    TouchableOpacity, TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import { Clipboard } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import { NoticeStyle } from '../notice/NoticeStyle';
import { EmpSetScreenStyle } from './EmpSetScreenStyle';
import { CommonStyles } from '../../../common/CommonStyles';
import RadioButton from 'radio-button-react-native';
import { GetEmpInfoByUserId, GetEmployeeWithCompanyId, getTokenforResetEmptPass, UpdateEmployee, DeleteEmployee, CreateEmployee, ChangePasswordforEmp } from "../../../services/AccountService";
import { GetDepartmentByCompanyId, CreateDepartment, } from "../../../services/DepartmentService";
import { GetCompanyByUserId, } from '../../../services/CompanyService';
import {
    loadFromStorage,
    storage,
    CurrentUserProfile
} from "../../../common/storage";

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
export default class EmployeeSetupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Male',
            date: new Date(),
            departmentList: [],
            DeptName: '',
            DeptId: '',
            companyList: [],
            employeeList: [],
            EmpImageFileName: null,
            Address: '',
            phone: '',
            isDateTimePickerVisible: false,
            isDateTimePickerVisible1: false,
            Name: '',
            Phone: '',
            Email: '',
            EmployeeUserId: 0,
            EmpUserFullName: '',
            EmpCompanyName: '',
            EmpDesignation: '',
            EmpPhoneNumber: '',
            EmpUserName: '',
            EmpUser: '',
            IsAutoCheckPoint: false,
            Employee: {
                UserName: '',
                Password: '',
                DepartmentId: '',
            },
            ImageFileId: "",
            UserId: '',
            PickerSelectedVal: '',
            floatButtonHide: false,
            company: {
                slectedCompanyIndex: 0,
                selctedCompanyValue: '',
            },
            isDisabled: false,
            swipeToClose: false,
            backdropPressToClose: false,
            CompanyName: '',
            CompanyAddress: '',
            CompanyMobileNo: '',
            DepartmentName: '',
            TrackType: '',
            companyId: "",
            Dept: {
                DepartmentName: '',
            },
            UserFullName: '',
            UserName: '',
            PhoneNumber: '',
            Password: '',
            Designation: '',
            DepartmentId: '',
            AutoCheckPointTime: "1:00:00",
            MaximumOfficeHours: '8:00:00',
            OfficeOutTime: '00:30:00',
            CopyUsername: '',
            CopyPassword: "",
            successMessage: "",
            serverMadePasscode: '',
            progressVisible: true,
            newpassword: "",
            resetId: '',
            resetToken: '',
            uName: '',
        }
    }



    handleOnPress(value) {
        this.setState({ value: value })
    }
    toggleSwitch = value => {
        this.setState({ IsAutoCheckPoint: value });
    };
    toggleIsActiveSwitch = value => {
        this.setState({ IsActive: value });
    };
    handleBackButton = () => {
        this.goBack();
        return true;
    }
    goBack() {
        Actions.pop();
    }
    openModalforaddpeople() {

        this.setState(Object.assign(this.state.Employee, { DepartmentId: "" }));
        this.setState({ IsAutoCheckPoint: false })
        this.refs.ModaladdPeople.open()
    }
    alertmethod(id) {
        this.setState({ deleteId: id })
        Alert.alert(
            "",
            'Are You Sure?',
            [
                { text: 'NO', onPress: () => console.log('Cancel Pressed!') },
                { text: 'YES', onPress: () => this.DeleteEmployeemethod() },
            ],
            { cancelable: false }
        )
    }
    DeleteEmployeemethod = async () => {
        try {
            await DeleteEmployee(this.state.deleteId)
                .then(res => {
                    Alert.alert(
                        "",
                        "successfully Deleted",
                        [
                            { text: 'OK', },
                        ],
                        { cancelable: false }
                    )
                    this.getEmpAllWithCompanyId(this.state.companyId)
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

    async componentDidMount() {
        const cId = await AsyncStorage.getItem("companyId");
        this.getDepartment(cId);
        this.setState({ companyId: cId });
        this.getEmpAllWithCompanyId(cId);

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    openModal2() {
        this.getCompany();
        this.refs.modal2.open()
    }
    openModalforusername() {
        this.refs.modalforusername.open()
    }
    openmodalforEmpList() {
        this.getCompany();
        this.refs.modalforEmpList.open();
    }
    _bootstrapAsync = async () => {
        var response = await loadFromStorage(storage, CurrentUserProfile);
        await this.setState({ Name: response.item.UserFullName });
        await this.setState({ Phone: response.item.PhoneNumber });
        await this.setState({ Email: response.item.Email });
    }

    getEmpAllWithCompanyId = async (companyId) => {
        try {
            this.setState({ progressVisible: true })

            await GetEmployeeWithCompanyId(companyId)
                .then(res => {

                    this.setState({ employeeList: res.result });
                    this.setState({ EmpImageFileName: res.result.ImageFileName })
                    console.log(res.result, 'EmpREault...............')
                    this.setState({ progressVisible: false })

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

    closeModal() {
        this.updateEmployeeRecords();
        this.refs.modalforEmpEdit.close();
    }

    async updateEmployeeRecords() {
        let data = {
            UserFullName: this.state.EmpUserName,
            DesignationName: this.state.EmpDesignation,
            Id: this.state.EmployeeUserId,
            ImageFileName: this.state.EmpImageFileName,
            ImageFileId: this.state.ImageFileId,
            IsActive: this.state.IsActive,
        };
        console.log(data, '.....data')
        try {
            let response = await UpdateEmployee(data);
            console.log('empr', response);
            this.setState({ serverMadePasscode: response.result.message });

            if (response && response.isSuccess) {
                ToastAndroid.show('Successfully Updated', ToastAndroid.TOP);
                this.getEmpAllWithCompanyId(this.state.companyId)
            } else {
                ToastAndroid.show(response.result.message, ToastAndroid.TOP);
                this.closeProgress();
            }
        } catch (errors) {
            // alert("data does not saved");
            ToastAndroid.show("data does not saved", ToastAndroid.TOP);
            this.closeProgress();
        }
    }

    openModalForDeptSelection() {
        this.refs.ModalForDeptSelection.open();
    }
    closeModalForDeptSelection() {
        if (this.state.Dept.DepartmentName == '') {
            ToastAndroid.show('Department can not be empty', ToastAndroid.TOP);

        } else {

            this.refs.ModalForDeptSelection.close();
            this.onFetchDepartmentRecords();
        }

    }
    testmethos = async (item) => {
        this.setState({ DeptName: item.Text })
        this.setState({ DeptId: item.Value })

    }

    async onFetchDepartmentRecords() {
        try {
            let Departmentodel = {
                DepartmentName: this.state.Dept.DepartmentName,
                CompanyId: this.state.companyId,
            };
            if (this.state.companyId == "") {
                ToastAndroid.show("At first create a company.", ToastAndroid.SHORT);
                return;
            }

            console.log(Departmentodel, '..depttest');
            let response = await CreateDepartment(Departmentodel);
            if (response && response.isSuccess) {
                console.log('com', response);
                alert("Department created successully");
                this.state.departmentList.push({
                    key: response.result.Id,
                    label: response.result.DepartmentName
                })
                const depList = [];

                Object.assign(depList, this.state.departmentList);
                console.log('tttt', depList);
                this.setState(
                    { departmentList: depList }
                )
                console.log('dept', this.state.departmentList)
                this.setState({ DepartmentId: this.state.departmentList[0].Value });
                this.setState({ PickerSelectedVal: this.state.departmentList[0].Value });
                console.log('deptlist', this.state.departmentList);
            } else {
                alert("error");
            }
        } catch (errors) {
            console.log(errors);
        }

    }
    closemodalchangepassword() {
        this.setState({ progressVisible: true })
        if (this.state.Employee.Password == "") {
            alert("Field can not be empty")
            this.setState({ progressVisible: false })
        }
        else if (this.state.Employee.Password.length < 6) {
            alert("Password must be at least 6 Characters");
            this.setState({ progressVisible: false })

        }
        else {
            this.changepassword();
            this.setState({ progressVisible: false })


        }
    }
    async changepassword() {
        console.log("trying changepassword..");
        try {
            this.setState({ progressVisible: true })

            let UserModel = {
                NewPassword: this.state.Employee.Password,
                UserId: this.state.resetId,
                Token: this.state.resetToken
            };

            let response = await ChangePasswordforEmp(UserModel);
            console.log('logins..', response);
            if (response && response.isSuccess) {
                this.closemodalResetPassword();
                this.openModal2();
                this.setState({ progressVisible: false })
            } else {
                this.setState({ progressVisible: false })
                alert("Password Not Updated. Please try again");
            }
        } catch (errors) {
            this.setState({ progressVisible: false })
            console.log(errors);

        }
    }
    closemodalResetPassword() {
        this.refs.modalResetPassword.close()
    }
    openmodalResetPassword(id, username, user) {
        this.setState({ resetId: id });
        this.setState({ uName: user });
        const userid = id;
        const Username = username;
        this.generateRePassword(Username);
        this.getTokenforResetEmpRestPass(userid);
        this.refs.modalResetPassword.open();
    }
    async getTokenforResetEmpRestPass(id) {
        try {
            // let userId = this.props.userId;
            await getTokenforResetEmptPass(id)
                .then(res => {
                    const ob = res.result;
                    alert
                    console.log('tokenforreset........', ob);
                    this.setState({ resetToken: ob });

                })
                .catch(() => {
                    console.log("error occured");
                    alert('failor');
                });
        } catch (error) {
            console.log(error);
            alert('failor')
        }
    }

    openModaladdPeople() {

        if (this.state.UserFullName == "") {
            ToastAndroid.show('Employee Name can not be empaty', ToastAndroid.SHORT);
        } else if (this.state.Designation == "") {
            ToastAndroid.show('Employee Designation can not be empaty', ToastAndroid.SHORT);
        }
        else if (this.state.PhoneNumber == "") {
            ToastAndroid.show('Employee PhoneNumber can not be empaty', ToastAndroid.SHORT);
        }
        else if (this.state.Email == "") {
            ToastAndroid.show('Employee Email can not be empaty', ToastAndroid.SHORT);
        }
        else if (this.state.Employee.DepartmentId == "") {
            ToastAndroid.show('Please Select Department', ToastAndroid.SHORT);
        }
        else {
            this.getUniqueUserName();
            this.onFetchEmployeeRecords();
        }
    }
    getUniqueUserName = async () => {

        const newUser = this.state.PhoneNumber;
        console.log(newUser);
        this.setState(Object.assign(this.state.Employee, { UserName: newUser }));
    }

    onShare = async (username, password) => {
        try {
            const result = await Share.share({
                message:
                    "UserName: " + username + " Password: " + password
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    copyToClicpBord = (username, password) => {

        this.setState({ CopyUsername: username });
        this.setState({ CopyPassword: password });
        Clipboard.setString("UserName: " + username + " Password: " + password);
        ToastAndroid.show('Text copied to clipboard', ToastAndroid.SHORT);
        setTimeout(
            () => {
                this.openModalforusername();
            },
            100,
        );
        this.onShare(username, password);
    }

    async onFetchEmployeeRecords() {
        let data = {
            UserFullName: this.state.UserFullName,
            PhoneNumber: this.state.PhoneNumber,
            UserType: 7,
            Designation: this.state.Designation,
            DepartmentId: this.state.Employee.DepartmentId,
            CompanyId: this.state.companyId,
            Gender: this.state.value,
            Email: this.state.Email,
            IsAutoCheckPoint: this.state.IsAutoCheckPoint,
            AutoCheckPointTime: this.state.AutoCheckPointTime,
            MaximumOfficeHours: this.state.MaximumOfficeHours,
            OfficeOutTime: this.state.OfficeOutTime,
            IsActive: this.state.IsActive
        };
        try {

            console.log(data, '....tex');
            let response = await CreateEmployee(data)
            console.log('empr', response);
            this.setState({ successMessage: response.result.Message });
            if (response && response.result.Success) {
                this.refs.ModaladdPeople.close()
                this.getEmpAllWithCompanyId(this.state.companyId);
                this.openModalforusername();
            } else {
                ToastAndroid.show(response.result.Message, ToastAndroid.TOP);
            }
        } catch (errors) {
            console.log(errors);
        }
    }
    getDepartment = async (companyId) => {
        try {
            await GetDepartmentByCompanyId(companyId)
                .then(res => {
                    console.log('comlen', res.result);
                    if (res.result !== null) {
                        console.log('comlen2', res.result);
                        if (res.result.length > 0) {
                            const depList = [];
                            res.result.forEach(function (item) {
                                const ob = {
                                    // 'Text': item.DepartmentName,
                                    // 'Value': item.Id
                                    'key': item.Id,
                                    'label': item.DepartmentName,
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

    goToEmpDetail(item) {
        console.log(item, 'testItem......')
        //this.setState({ EmpUser: id }); image EmpImageFileName
        this.setState({ EmployeeUserId: item.Id });
        this.setState({ EmpDesignation: item.Designation })
        this.setState({ EmpPhoneNumber: item.PhoneNumber })
        this.setState({ EmpUserName: item.UserName })
        this.setState({ EmpImageFileName: item.ImageFileName })
        this.setState({ IsActive: item.IsActive })
        //this.getEmpInfo(id);
        this.refs.modalforEmpEdit.open();
    };



    getCompany = async () => {
        try {
            var response = await loadFromStorage(storage, CurrentUserProfile);
            await GetCompanyByUserId(response.item.Id)
                .then(res => {
                    console.log('company', res.result);
                    if (res.result === null) {
                        this.openModal5();
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
                    }
                    if (this.state.companyList.length > 0) {
                        this.getDepartment(this.state.companyId);
                        this.getEmpAllWithCompanyId(this.state.companyId)
                    }
                })
                .catch(() => {
                    console.log("error occured");
                });
        } catch (error) {
            console.log(error);
        }
    }
    goToCreatScreen() {
        Actions.EmployeeCreateScreen();
      }
    render() {

        return (
            <View style={EmpSetScreenStyle.container}>
                <StatusBarPlaceHolder />

                <View style={CommonStyles.HeaderContent}>

                    <View
                        style={NoticeStyle.backIcon}>
                        <TouchableOpacity
                            style={NoticeStyle.backIconTouch}
                            onPress={() => { Actions.pop() }}>
                            <Image resizeMode="contain" style={{ width: 20, height: 20, }}
                                source={require('../../../assets/images/left_arrow.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={NoticeStyle.headerTitle}>
                            <Text
                                style={NoticeStyle.headerTitleText}>
                                EMPLOYEE SETUP
                            </Text>
                        </View>
                    </View>

                    <View
                        style={NoticeStyle.createNoticeButtonContainer}>
                        <View
                            style={NoticeStyle.ApplyButtonContainer}>
                            <TouchableOpacity
                                 //onPress={() => this.openModalforaddpeople()}
                                onPress={() => this.goToCreatScreen()}
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


                {this.state.progressVisible == true ?
                    (<ActivityIndicator size="large" color="#1B7F67"
                        style={EmpSetScreenStyle.ActivityIndicatorStyle} />) : null}

                <View style={{ flex: 1, marginTop: 10, }}>

                    <FlatList
                        data={this.state.employeeList}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) =>
                            <View style={EmpSetScreenStyle.FlatlistMainView}>
                            

                                <View style={EmpSetScreenStyle.FlLeftside}>

                                    <View style={{ paddingRight: 10, }}>


                                        {item.ImageFileName !== "" ?
                                            (<Image style={EmpSetScreenStyle.imageradious} resizeMode="contain" source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + item.ImageFileName }} />) :
                                            (<Image style={
                                                EmpSetScreenStyle.imageradious
                                            } resizeMode='contain' source={require('../../../assets/images/employee.png')} />)}

                                    </View>

                                    <View>
                                        <Text style={EmpSetScreenStyle.EmpText}>
                                            {item.UserName}
                                        </Text>

                                        <Text style={EmpSetScreenStyle.EmpText}>
                                            {item.Designation}
                                        </Text>

                                        <Text style={EmpSetScreenStyle.EmpText}>
                                            {item.DepartmentName}
                                        </Text>

                                    </View>
                                </View>
                                <View style={EmpSetScreenStyle.FlRightSide}>
                                    <TouchableOpacity
                                    // onPress={() => this.openmodalResetPassword(item.UserId,item.UserFullName, item.UserName)}
                                    >
                                        <View style={EmpSetScreenStyle.FlRightSideRow}>
                                            <Image resizeMode='contain'
                                                style={EmpSetScreenStyle.EmpSettingImage}
                                                source={require('../../../assets/images/res.png')}>
                                            </Image>
                                            <Text style={EmpSetScreenStyle.EmpSettingText}>
                                                RESET
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.goToEmpDetail(item)}
                                    >
                                        <View style={EmpSetScreenStyle.FlRightSideRow}>
                                            <Image resizeMode='contain'
                                                style={EmpSetScreenStyle.EmpSettingImage}
                                                source={require('../../../assets/images/edit.png')}></Image>
                                            <Text style={EmpSetScreenStyle.EmpSettingText}>
                                                EDIT
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={EmpSetScreenStyle.FlRightSideRow}>

                                        {item.IsActive ?
                                            <Text style={EmpSetScreenStyle.EmpText}>
                                                Active
                                       </Text> :
                                            <Text style={EmpSetScreenStyle.EmpText}>
                                                InActive
                                   </Text>
                                        }
                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>

                <Modal style={[EmpSetScreenStyle.AddEmployeeModalStyle]}
                    position={"center"} ref={"ModaladdPeople"}
                    isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}
                    onOpened={() => this.setState({ floatButtonHide: true })}
                    onClosed={() => this.setState({ floatButtonHide: false })}
                >
                    <View style={{ justifyContent: "space-between", flexDirection: "column" }}>
                        <View style={{ alignItems: "flex-start" }}></View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.ModaladdPeople.close()}
                                style={EmpSetScreenStyle.ModalCloseBtn}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }}
                                    source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={EmpSetScreenStyle.modelContent}>

                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                            ADD PEOPLE
                        </Text>

                        <View style={EmpSetScreenStyle.horizontalLine}>

                        </View>

                    </View>

                    <KeyboardAvoidingView
                        // behavior="padding"
                        style={{
                            // flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TextInput style={EmpSetScreenStyle.inputBox}
                                placeholder="Employee Name"
                                placeholderTextColor="#cbcbcb"
                                returnKeyType="next" autoCorrect={false}
                                ref={"txtDesignation"}
                                onChangeText={(text) => this.setState({ UserFullName: text })}
                                onSubmitEditing={() => this.txtDesignation.focus()}
                                ref={input => { this.textname = input }}
                            />

                            <TextInput style={EmpSetScreenStyle.inputBox}
                                placeholder="Designation"
                                placeholderTextColor="#cbcbcb"
                                returnKeyType="next" autoCorrect={false}
                                ref={"txtDesignation"}
                                onChangeText={(text) => this.setState({ Designation: text })}
                                onSubmitEditing={() => this.textmobile.focus()}
                                ref={input => { this.txtDesignation = input }}
                            />
                            <View style={{ flexDirection: 'row' }}>

                                <ModalSelector
                                    style={EmpSetScreenStyle.ModalSelectorStyle}
                                    data={this.state.departmentList}
                                    initValue="Select Department"
                                    onChange={(option) => {
                                        const newUser = option.key
                                        this.setState(Object.assign(this.state.Employee,
                                            { DepartmentId: newUser }));
                                    }}
                                />
                                <TouchableOpacity onPress={() => this.openModalForDeptSelection()}

                                    style={[
                                        (Platform.OS === 'android') ?
                                            (EmpSetScreenStyle.ModalForDeptSelectionAndroid) :

                                            (EmpSetScreenStyle.ModalForDeptSelectionIos)
                                    ]}>
                                    <Text style={[
                                        (Platform.OS === 'android') ?
                                            { textAlign: "center" } :
                                            { textAlign: "center", marginTop: -5 }
                                    ]}>

                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TextInput style={EmpSetScreenStyle.inputBox} placeholder="Mobile Number"
                                placeholderTextColor="#cbcbcb"
                                keyboardType="number-pad"
                                returnKeyType="go" autoCorrect={false}
                                onSubmitEditing={() => this.textmail.focus()}
                                onChangeText={(text) => this.setState({ PhoneNumber: text })}
                                ref={input => { this.textmobile = input }}
                            />
                            <TextInput style={EmpSetScreenStyle.inputBox} placeholder="Email"
                                placeholderTextColor="#cbcbcb"
                                returnKeyType="go" autoCorrect={false}

                                onChangeText={(text) => this.setState({ Email: text })}
                                ref={input => { this.textmail = input }}
                            />
                            <View style={EmpSetScreenStyle.RadioBtnView}>
                                <RadioButton innerCircleColor='green'
                                    currentValue={this.state.value}
                                    value={"Male"} onPress={this.handleOnPress.bind(this)}>
                                    <Text style={EmpSetScreenStyle.RadioBtnFirst}>
                                        Male
                                </Text>
                                </RadioButton>

                                <RadioButton innerCircleColor='green'
                                    currentValue={this.state.value} value={"Female"}
                                    onPress={this.handleOnPress.bind(this)}>
                                    <Text style={EmpSetScreenStyle.RadioBtnFirst}>
                                        Female
                               </Text>
                                </RadioButton>

                                <RadioButton innerCircleColor='green'
                                    currentValue={this.state.value} value={"Other"}
                                    onPress={this.handleOnPress.bind(this)}>
                                    <Text style={EmpSetScreenStyle.RadioBtnLast}>
                                        Other
                                    </Text>
                                </RadioButton>
                            </View>
                            <View style={EmpSetScreenStyle.ModalAddEmpLastRow}>
                                <View style={EmpSetScreenStyle.AutoCheckRow}>
                                    <Text style={EmpSetScreenStyle.AutoCheckText}>
                                        Auto Check Point
                                </Text>
                                </View>
                                <View
                                    style={[
                                        (Platform.OS === 'android') ?
                                            (EmpSetScreenStyle.CheckpointSliderViewAndroid) :
                                            (EmpSetScreenStyle.CheckpointSliderViewIos)
                                    ]}>
                                    <Text style={[
                                        (Platform.OS === 'android') ?
                                            (EmpSetScreenStyle.CheckpointSliderAndroidText) :
                                            (EmpSetScreenStyle.CheckpointSliderIosText)
                                    ]}>
                                        {this.state.IsAutoCheckPoint ? 'ON' : 'OFF'}
                                    </Text>
                                    <Switch
                                        onValueChange={this.toggleSwitch}
                                        value={this.state.IsAutoCheckPoint}
                                    />
                                </View>
                            </View>
                            <View style={{
                                alignSelf: 'center',
                                justifyContent: 'flex-end',
                                marginBottom: 20,
                            }}>
                                <TouchableOpacity style={EmpSetScreenStyle.addPeopleBtn}
                                    onPress={() => this.openModaladdPeople()} >
                                    <Text
                                        style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                                        Add
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                
                </Modal>
                <Modal style={[EmpSetScreenStyle.modal2]} position={"center"} ref={"modalforusername"} isDisabled={this.state.isDisabled} onClosed={() => this.setState({ floatButtonHide: !this.state.floatButtonHide })}
                    backdropPressToClose={false}
                    onOpened={() => this.setState({ floatButtonHide: true })}
                    onClosed={() => this.setState({ floatButtonHide: false })}>
                    <View style={EmpSetScreenStyle.modalUserFirstView}>
                        <View style={{ alignItems: "flex-start" }}></View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.modalforusername.close()} style={EmpSetScreenStyle.modalUserTuachableOpacity}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }} source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={EmpSetScreenStyle.modelContent}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                            SUCCESSFUL
                        </Text>
                        <View
                            style={EmpSetScreenStyle.horizontalLine}
                        />
                        <Image resizeMode="contain" style={EmpSetScreenStyle.addPeopleImg} source={require('../../../assets/images/successful.png')}>
                        </Image>
                    </View>
                    <View style={EmpSetScreenStyle.modalUserTextvaluecontainer}>
                        <Text style={{ color: '#757575', paddingVertical: 10, textAlign: 'center' }}>
                            Your employee added successfully send this info to log into employee's account.Mail already sent to employee.
                        </Text>
                        <Text style={EmpSetScreenStyle.modalUserUserName}>
                            USERNAME
                        </Text>
                        <Text style={EmpSetScreenStyle.modalUserUservalue}>
                            {this.state.UserName}
                        </Text>
                        <Text style={EmpSetScreenStyle.modalUserGeneratedPass}>
                            GENERATED PASSWORD
                        </Text>
                        <Text style={EmpSetScreenStyle.modalUserGenratedpassvalue}>
                            {this.state.successMessage}
                        </Text>
                    </View>
                    <TouchableOpacity style={EmpSetScreenStyle.addCopyBtn} onPress={() => this.copyToClicpBord(this.state.UserName, this.state.successMessage)} >
                        <Text style={EmpSetScreenStyle.testCopy}>Copy</Text>
                    </TouchableOpacity>
                </Modal>

                <Modal style={[EmpSetScreenStyle.modal31]} position={"center"} ref={"modalResetPassword"} isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >
                    <View style={{ justifyContent: "space-between", flexDirection: "column" }}>
                        <View style={{ alignItems: "flex-start" }}></View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.modalResetPassword.close()} style={{
                                marginLeft: 0, marginTop: 0,
                            }}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }} source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={EmpSetScreenStyle.modelContent}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'gray' }}>
                            Reset Password
                        </Text>
                        <View
                            style={EmpSetScreenStyle.horizontalLine}
                        />
                        {/* <Image resizeMode="contain" style={EmpSetScreenStyle.addPeopleImg} source={require('../../../assets/images/people.png')}>
                        </Image> */}
                    </View>
                    <View style={{ alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                            <Text style={{ color: 'black', paddingVertical: 3, fontSize: 18, fontWeight: 'bold' }}>
                                USERNAME:
                        </Text>
                            <Text style={{ color: '#504C4B', paddingVertical: 0, fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>
                                {this.state.uName}
                            </Text>
                        </View>
                        <TextInput style={EmpSetScreenStyle.inputBox1}
                            placeholderTextColor="#cbcbcb"
                            returnKeyType="next" autoCorrect={false}
                            ref={"txtpass"}
                            value={this.state.Employee.Password}
                            onChangeText={(pass) => {
                                const newpass = Object.assign({}, this.state.Employee, { Password: pass });
                                this.setState({ Employee: newpass });
                            }}
                            ref={input => { this.txtDesignation = input }}
                        />
                        <TouchableOpacity style={EmpSetScreenStyle.addPeopleBtn} onPress={() => this.closemodalchangepassword()} >
                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal style={[EmpSetScreenStyle.modalForEditProfile]} position={"center"} ref={"modalforEmpEdit"} isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >

                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ alignItems: "flex-start" }}>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.modalforEmpEdit.close()} style={EmpSetScreenStyle.modalEmpEdit}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }} source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={EmpSetScreenStyle.modelContent}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
                                EDIT EMPLOYEE PROFILE
                        </Text>

                            {this.state.EmpImageFileName !== "" ?
                                (<Image style={EmpSetScreenStyle.modalEmpEditdatabaseImage} resizeMode="contain" source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + this.state.EmpImageFileName }} />) :
                                (<Image style={EmpSetScreenStyle.modalEmpEditlocalImage} resizeMode='contain' source={require('../../../assets/images/employee.png')} />)}

                        </View>
                        <View style={{ width: 250 }}>
                            <Text>Name</Text>
                            <TextInput
                                style={EmpSetScreenStyle.modalEmpEditTextBox}
                                value={this.state.EmpUserName}
                                onChangeText={(txt) => this.setState({ EmpUserName: txt })}
                            />
                            <Text>Designation</Text>
                            <TextInput
                                style={EmpSetScreenStyle.modalEmpEditTextBox}

                                value={this.state.EmpDesignation}
                                onChangeText={(txt) => this.setState({ EmpDesignation: txt })}
                            />
                            <Text>Phone Number</Text>
                            <TextInput
                                style={EmpSetScreenStyle.modalEmpEditTextBox}
                                editable={false}
                                value={this.state.EmpPhoneNumber}
                                onChangeText={(txt) => this.setState({ EmpPhoneNumber: txt })}
                            />
                            <Text>Is Active ?</Text>
                            <Switch
                                onValueChange={this.toggleIsActiveSwitch}
                                value={this.state.IsActive}
                            />

                        </View>
                    </View>
                    <TouchableOpacity style={EmpSetScreenStyle.addPeopleBtn} onPress={() => this.closeModal()} >
                        <Text style={EmpSetScreenStyle.modalEmpEditSave}>Save</Text>
                    </TouchableOpacity>
                </Modal>
            </View >
        );
    }
}

