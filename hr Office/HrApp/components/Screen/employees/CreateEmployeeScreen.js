
import React, { Component } from 'react';
import {
    ScrollView, Text, View, StatusBar,
    BackHandler, AsyncStorage, TextInput, TouchableOpacity,
    ToastAndroid, Platform, KeyboardAvoidingView, NetInfo, Image, Switch,Share
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Clipboard } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Modal from 'react-native-modalbox';
import { CommonStyles } from '../../../common/CommonStyles';
import { EmpSetScreenStyle } from './EmpSetScreenStyle';
import { EmpCreateScreenStyle } from './EmpCreateScreenStyle';
import RadioButton from 'radio-button-react-native';
import { debounce } from 'lodash'
import { GetDepartmentByCompanyId, CreateDepartment, } from "../../../services/DepartmentService";
import { CreateEmployee } from "../../../services/AccountService";
import {
    FontAwesome,
    Feather,
    MaterialCommunityIcons
} from '@expo/vector-icons'
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
            <StatusBar />
        </View>
    );
}
const withPreventDoubleClick = (WrappedComponent) => {

    class PreventDoubleClick extends React.PureComponent {
  
      debouncedOnPress = () => {
        this.props.onPress && this.props.onPress();
      }
  
      onPress = debounce(this.debouncedOnPress, 300, { leading: true, trailing: false });
  
      render() {
        return <WrappedComponent {...this.props} onPress={this.onPress} />;
      }
    }
  
    PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName ||WrappedComponent.name})`
    return PreventDoubleClick;
  }
  const ButtonEx = withPreventDoubleClick(TouchableOpacity);
export default class CreateEmployeeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            companyId: "",
            date: new Date(),
            departmentList: [],
            DeptName: '',
            DeptId: '',
            UserFullName: "",
            PhoneNumber: "",
 	        Designation: "",
            DepartmentId: "",
            Gender:'Male',
            value:'Male',
            Email: "",
            IsAutoCheckPoint: false,
            AutoCheckPointTime: "1:00:00",
            MaximumOfficeHours: '8:00:00',
            OfficeOutTime: '00:30:00',
            Employee: {
                UserName: '',
                Password: '',
                DepartmentId: '',
            },
        }
          // preserve the initial state in a new object
    this.baseState = this.state 
    }
    async componentDidMount() {
        const uId = await AsyncStorage.getItem("userId");
        const cId = await AsyncStorage.getItem("companyId");
        this.setState({ userId: uId, companyId: cId });
        this.getDepartment(cId);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    resetForm = () => {
        this.setState(this.baseState)
      }
    handleOnPress(value) {
        this.setState({ value: value })
    }
    goBack() {
        Actions.pop();
    }
    toggleSwitch = value => {
        this.setState({ IsAutoCheckPoint: value });
    };
    toggleIsActiveSwitch = value => {
        this.setState({ IsActive: value });
    };
    async onFetchDepartmentRecords() {
        console.log("trying Department create..");

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
                    Actions.EmployeeSetupScreen();
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
                Actions.EmployeeSetupScreen();
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
    openModalforusername() {
        this.refs.modalforusername.open()
    }
    async saveEmployee() {
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
            let response = await CreateEmployee(data)
            this.setState({ successMessage: response.result.Message });
            if (response && response.result.Success) {
                this.resetForm();
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
    handleBackButton = () => {
        this.goBack();
        return true;
    }
    openModalForDeptSelection() {
        this.refs.ModalForDeptSelection.open();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    closeSuccessModal(){
        this.refs.modalforusername.close();
        Actions.EmployeeSetupScreen();
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
            this.saveEmployee();
        }
    }
    render() {
        return (
            <View style={{
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
                                Create Employee
                            </Text>
                        </View>
                    </View>
                    <View
                        style={CommonStyles.createTaskButtonContainer}>
                        <ButtonEx
                            disabled={this.state.touchabledisableForsaveExpense}
                            onPress={() => this.openModaladdPeople()}
                            style={CommonStyles.createTaskButtonTouch}>
                            <View style={CommonStyles.plusButton}>
                                <MaterialCommunityIcons name="content-save" size={17.5} color="#ffffff" />
                            </View>
                            <View style={CommonStyles.ApplyTextButton}>
                                <Text style={CommonStyles.ApplyButtonText}>
                                    POST
                                </Text>
                            </View>
                        </ButtonEx>
                    </View>
                </View>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode="on-drag" style={{ flex: 1, }}>
                        <View>
                            <Text
                                style={EmpCreateScreenStyle.createEmployeeLabel}>
                                Employee Name:
                                </Text>
                            <TextInput
                                style={EmpCreateScreenStyle.createEmpTextBox}
                                placeholder="Write employee  name"
                                placeholderTextColor="#dee1e5"
                                returnKeyType="next" autoCorrect={false}
                                value={this.state.UserFullName}
                                ref={"txtDesignation"}
                                autoCapitalize="none"
                                onChangeText={(text) => this.setState({ UserFullName: text })}
                                onSubmitEditing={() => this.txtDesignation.focus()}
                                ref={input => { this.textname = input }}
                            >
                            </TextInput>
                        </View>
                        <View>
                            <Text
                                style={EmpCreateScreenStyle.createEmployeeLabel}>
                                Designation:
                                </Text>
                            <TextInput style={EmpCreateScreenStyle.createEmpTextBox}
                                placeholder="Designation"
                                placeholderTextColor="#dee1e5"
                                returnKeyType="next" autoCorrect={false}
                                value={this.state.Designation}
                                ref={"txtDesignation"}
                                onChangeText={(text) => this.setState({ Designation: text })}
                                onSubmitEditing={() => this.textmobile.focus()}
                                ref={input => { this.txtDesignation = input }}
                            >
                            </TextInput>
                        </View>
                        <View>
                            <Text style={EmpCreateScreenStyle.createEmployeeLabel}>
                                Department:
                                </Text>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ width: "90%" }}>
                                    <ModalSelector
                                        style={EmpCreateScreenStyle.ModalSelectorStyle}
                                        data={this.state.departmentList}
                                        initValue="Select Department"
                                        onChange={(option) => {
                                            const newUser = option.key
                                            this.setState(Object.assign(this.state.Employee,
                                                { DepartmentId: newUser }));
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text
                                style={EmpCreateScreenStyle.createEmployeeLabel}>
                                Mobile Number:
                                </Text>
                            <TextInput style={EmpCreateScreenStyle.createEmpTextBox} placeholder="Mobile Number"
                                placeholderTextColor="#cbcbcb"
                                keyboardType="number-pad"
                                returnKeyType="go" autoCorrect={false}
                                value={this.state.PhoneNumber}
                                onSubmitEditing={() => this.textmail.focus()}
                                onChangeText={(text) => this.setState({ PhoneNumber: text })}
                                ref={input => { this.textmobile = input }}
                            />
                        </View>
                        <View>
                            <Text
                                style={EmpCreateScreenStyle.createEmployeeLabel}>
                                Email:
                                </Text>
                            <TextInput style={EmpCreateScreenStyle.createEmpTextBox} placeholder="Email"
                                placeholderTextColor="#cbcbcb"
                                returnKeyType="go" autoCorrect={false}
                                value={this.state.Email}
                                onChangeText={(text) => this.setState({ Email: text })}
                                ref={input => { this.textmail = input }}
                            />
                        </View>

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
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Modal style={[EmpSetScreenStyle.modal2]} position={"center"} ref={"modalforusername"} isDisabled={this.state.isDisabled} onClosed={() => this.setState({ floatButtonHide: !this.state.floatButtonHide })}
                    backdropPressToClose={false}
                    onOpened={() => this.setState({ floatButtonHide: true })}
                    onClosed={() => this.setState({ floatButtonHide: false })}>
                    <View style={EmpSetScreenStyle.modalUserFirstView}>
                        <View style={{ alignItems: "flex-start" }}></View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => closeSuccessModal} style={EmpSetScreenStyle.modalUserTuachableOpacity}>
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
                           </View>
        )
    }
}
