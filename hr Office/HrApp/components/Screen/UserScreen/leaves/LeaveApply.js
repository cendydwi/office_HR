import React, { Component } from 'react';

import {
    Text, View, Platform, Image,
    StatusBar, ScrollView, Dimensions,
    BackHandler, TouchableOpacity,
    KeyboardAvoidingView, TextInput,
    AsyncStorage, ToastAndroid, NetInfo,
} from 'react-native';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommonStyles } from '../../../../common/CommonStyles';

import Modal from 'react-native-modalbox';

import { Actions, Scene } from 'react-native-router-flux';

import DatePicker from 'react-native-datepicker'

import { LeaveApplyStyle, } from './LeaveApplyStyle';
import { LeaveListStyle } from './LeaveListStyle';




import moment from 'moment'


import AntDesign from 'react-native-vector-icons/AntDesign'

import { createLeave } from '../../../../services/UserService/Leave';
import { GetLeaveStatusList } from '../../../../services/UserService/Leave';


export default class LeaveApply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            date1: new Date(),
            CompanyId: "",
            UserId: "",
            LeaveApplyFrom: "",
            LeaveApplyTo: "",
            IsHalfDay: false,
            LeaveTypeId: "",
            LeaveReason: "",
            CreatedAt: new Date(),
            IsApproved: false,
            IsRejected: false,
            RejectReason: "",
            ApprovedById: null,
            ApprovedAt: null,
            leave: {
                LeaveArrayText: '',
                LeaveArrayValue: '',
            },
            LeaveArray: [],
        }
        this.onDateChange = this.onDateChange.bind(this);
        this.onDateChange2 = this.onDateChange2.bind(this);
    }

    onDateChange2(date1) {

        this.setState({
            date1: date1,
        });
        dateValue1 = date1;

    }
    onDateChange(date) {

        this.setState({
            date: date,
        });
        dateValue = date;

    }

    getStatus = async () => {
        try {

            await GetLeaveStatusList()
                .then(res => {
                    this.setState({ LeaveArray: res.result, });
                    console.log(res.result, "statusList");
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

    goBack() {
        Actions.LeaveList();
    }

    async componentDidMount() {
        this.getStatus();
        const uId = await AsyncStorage.getItem("userId");
        const cId = await AsyncStorage.getItem("companyId");
        this.setState({ UserId: uId, CompanyId: cId });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    LeaveTypeDropDown(value, text) {

        this.setState(Object.assign(this.state.leave, { LeaveArrayText: value }));

        this.setState(Object.assign(this.state.leave, { LeaveArrayValue: text }));

        this.refs.LeaveTypeModal.close()
    }

    async createLeave() {

        if (this.state.taskTitle !== "") {
            let leaveModel = {
                CompanyId: this.state.CompanyId,
                UserId: this.state.UserId,
                LeaveApplyFrom: moment(new Date(this.state.date)).format('YYYY-MM-DD HH:mm:ss a'),
                LeaveApplyTo: moment(new Date(this.state.date1)).format('YYYY-MM-DD HH:mm:ss a'),
                IsHalfDay: this.state.IsHalfDay,
                LeaveTypeId: this.state.leave.LeaveArrayText,
                LeaveReason: this.state.LeaveReason,
                CreatedAt: this.state.CreatedAt,
                IsApproved: this.state.IsApproved,
                IsRejected: this.state.IsRejected,
                RejectReason: this.state.RejectReason,
                ApprovedById: this.state.ApprovedById,
                ApprovedAt: this.state.ApprovedAt,
            };
            console.log("leaveModel", leaveModel);

            if (leaveModel.LeaveTypeId != "") {
                if (leaveModel.LeaveReason != "") {
                    let response = await createLeave(leaveModel);
                    ToastAndroid.show('Leave applied successfully', ToastAndroid.TOP);
                    this.goBack();
                }
                else {
                    ToastAndroid.show('Please Enter Reason', ToastAndroid.TOP);
                }
            }
            else {
                ToastAndroid.show('Please Enter Cause', ToastAndroid.TOP);
            }
        }

    }

    renderLeaveArrayList() {
        let content = this.state.LeaveArray.map((arraytext, i) => {
            arraytext
            return (
                <TouchableOpacity
                    style={{
                        paddingVertical: 7, borderBottomColor: '#D5D5D5',
                        borderBottomWidth: 2
                    }}
                    key={i}
                    onPress={() => { this.LeaveTypeDropDown(arraytext.Id, arraytext.Name) }}>
                    <Text style={LeaveApplyStyle.renderLeaveArrayListTextStyle}
                        key={arraytext.Id}>{arraytext.Name}
                    </Text>
                </TouchableOpacity>
            )
        });
        return content;
    }
    render() {
        var { width, height } = Dimensions.get('window');
        return (
            <View style={LeaveApplyStyle.container}>

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
                                Leave Apply
                            </Text>
                        </View>
                    </View>
                    <View
                        style={LeaveListStyle.ApplyButtonContainer}>
                        <TouchableOpacity
                            onPress={() => this.createLeave()}
                            style={LeaveListStyle.ApplyButtonTouch}>
                            <View style={LeaveListStyle.plusButton}>
                                <MaterialCommunityIcons name="content-save" size={17.5} color="#ffffff" />
                            </View>
                            <View style={LeaveListStyle.ApplyTextButton}>
                                <Text style={LeaveListStyle.ApplyButtonText}>
                                    REQUEST
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, }}>
                        <ScrollView showsVerticalScrollIndicator={false}
                            keyboardDismissMode="on-drag"
                            style={{ flex: 1, }}>
                            <View
                                style={LeaveApplyStyle.mainBodyStyle}>
                                <View
                                    style={LeaveApplyStyle.mainBodyTopStyle}>
                                    <Text
                                        style={LeaveApplyStyle.fromTextStyle}>
                                        from:
                                    </Text>
                                    <Text
                                        style={LeaveApplyStyle.toTextStyle}>
                                        To:
                                    </Text>
                                </View>

                                <View
                                    style={LeaveApplyStyle.datePickerRowStyle}>
                                    <View
                                        style={LeaveApplyStyle.datePickerLeftStyle}>
                                        <DatePicker
                                            date={this.state.date}
                                            style={LeaveApplyStyle.datePickerWidth}
                                            placeholder='Check Previous Date'
                                            mode="date"
                                            format="DD MMMM YYYY"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={false}
                                            customStyles={{
                                                dateInput: {
                                                    borderRadius: 8,
                                                    backgroundColor: "#f5f7fb",
                                                    height: 30,
                                                    width: '100%',
                                                    marginRight: 25,
                                                },
                                                dateText: {
                                                    color: "#848f98",
                                                    fontFamily: "Montserrat_SemiBold",
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    padding: 5,
                                                }
                                            }}
                                            onDateChange={this.onDateChange}
                                        >
                                        </DatePicker>
                                    </View>
                                    <View
                                        style={LeaveApplyStyle.datePickerRightStyle}>
                                        <DatePicker
                                            date={this.state.date1}
                                            style={LeaveApplyStyle.datePickerWidth}
                                            placeholder='Check Previous Date'
                                            mode="date"
                                            format="DD MMMM YYYY"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={false}
                                            customStyles={{
                                                dateInput: {
                                                    borderRadius: 8,
                                                    backgroundColor: "#f5f7fb",
                                                    height: 30,
                                                    width: '100%',
                                                    marginRight: 25,
                                                },
                                                dateText: {
                                                    color: "#848f98",
                                                    fontFamily: "Montserrat_SemiBold",
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                }
                                            }}
                                            onDateChange={this.onDateChange2}
                                        >
                                        </DatePicker>
                                    </View>
                                </View>
                                <View
                                    style={LeaveApplyStyle.leaveTypeRowStyle}>
                                    <Text
                                        style={LeaveApplyStyle.leaveTypeRowTextStyle}>
                                        Leave Type:
                                    </Text>
                                </View>
                                <View
                                    style={LeaveApplyStyle.leaveDropDownRow}>
                                    <TouchableOpacity
                                        style={LeaveApplyStyle.leaveDropDownStyle}
                                        onPress={() => this.refs.LeaveTypeModal.open()}>
                                        <Text
                                            style={LeaveApplyStyle.leaveDropDownText}>
                                            {this.state.leave.LeaveArrayValue == '' ? "Leave type" : this.state.leave.LeaveArrayValue}
                                        </Text>
                                        <AntDesign
                                            name="caretdown"
                                            style={LeaveApplyStyle.leaveDropDownIconStyle}
                                            size={14} color="#848f98">
                                        </AntDesign>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={LeaveApplyStyle.leaveCauseRow}>
                                    <Text
                                        style={LeaveApplyStyle.leaveCauseText}>
                                        Cause:
                                    </Text>
                                </View>
                                <View
                                    style={LeaveApplyStyle.leaveTextInputRow}>
                                    <TextInput
                                        style={LeaveApplyStyle.leaveCauseTextInputStyle}
                                        multiline={true}
                                        placeholderTextColor="#cbcbcb"
                                        placeholder="write cause here"
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        onChangeText={text => this.setState({ LeaveReason: text })}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    <Modal
                        style={LeaveApplyStyle.leaveTypeModalMainStyle}
                        position={"center"} ref={"LeaveTypeModal"}
                        isDisabled={this.state.isDisabled}
                        backdropPressToClose={false}
                        onOpened={() => this.setState({ floatButtonHide: true })}
                        onClosed={() => this.setState({ floatButtonHide: false })}
                        swipeToClose={false}>
                        <View>
                            <View
                                style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View style={{ alignItems: "flex-start" }}>
                                </View>
                                <View style={{ alignItems: "flex-end" }}>
                                    <TouchableOpacity
                                        style={{ padding: 5, }}
                                        onPress={() => this.refs.LeaveTypeModal.close()}>
                                        <AntDesign name="closecircle"
                                            size={30} color="black">
                                        </AntDesign>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                            // style={{ paddingVertical: 20, }}
                            >
                                <ScrollView showsVerticalScrollIndicator={false}
                                    style={{ height: (height * 50) / 100, }}>
                                    <View style={{ width: "100%" }} >
                                        {this.state.LeaveArray != null ?
                                            this.renderLeaveArrayList()
                                            : <Text>No Leave Selected</Text>}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View >
        )
    }
}


