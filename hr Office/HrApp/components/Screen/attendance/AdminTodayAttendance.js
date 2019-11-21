import React, { Component } from 'react';
import {
    FlatList, Text, View, Image, StatusBar, TouchableOpacity, ScrollView,
    Platform, RefreshControl, AsyncStorage, BackHandler, Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign'
import Iconic from 'react-native-vector-icons/Feather'
import * as actions from '../../../common/actions';
import { CommonStyles } from '../../../common/CommonStyles';
// import {
//     AntDesign,

// } from '@expo/vector-icons'
import {
    loadFromStorage,
    storage,
    CurrentUserProfile
} from "../../../common/storage";
import { DailyAttendanceStyle } from './DailyAttendanceStyle';
import Modal from 'react-native-modalbox';

import { GetCompanyByUserId } from "../../../services/CompanyService"

import { GetAttendanceFeed } from '../../../services/EmployeeTrackService';

import { DrawerContentStyle } from "../../MenuDrawer/DrawerContentStyle"
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
function StatusBarPlaceHolder()
{
    return (
        <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: '#F3F3F3',
        }}>
            <StatusBar/>
        </View>
    );
}
export default class DailyAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            statusCount: { TotalEmployee: 0, TotalCheckIn: 0, TotalCheckOut: 0 },
            refreshing: false,
            selectedId: 1,
            displayAbleEmployeeList: [],
            companyId: 0,
            slectedCompanyIndex: 0,
            selctedCompanyValue: '',
            companyList: [],

        }
    }
    handleBackButton = () => {
        BackHandler.exitApp()
        return true;
    }
    _onRefresh = async () => {
        this.setState({
            refreshing: true,
            selectedId: 1
        })
        setTimeout(function () {
            this.setState({
                refreshing: false,
            });

        }.bind(this), 2000);

        this.getAttendanceFeed(this.state.companyId);
    }
    goToDetail(item) {
        actions.push("DailyAttendanceDetails", { aItem: item });
    };
    setSelectedOption = (id) => {
        this.setState({ selectedId: id });
        switch (id) {
            case 1: //All
                this.setState({ displayAbleEmployeeList: this.state.employeeList });
                break;
            case 2: //checked in
                this.setState({ displayAbleEmployeeList: this.state.employeeList.filter(x => x.IsCheckedIn || x.IsCheckedOut) });
                break;
            case 3: //not attend
                this.setState({ displayAbleEmployeeList: this.state.employeeList.filter(x => x.NotAttend) });
                break;
        }
    };

    async  componentDidMount() {
        global.DrawerContentId = 1;
        const isIndexvalue = await AsyncStorage.getItem("isIndexvalue");
        if (isIndexvalue == "yes") {
            await this.getCompanyforIndex();
        } else {
            await this.getCompany();
        }
        const cName = await AsyncStorage.getItem("companyName");
        this.setState({ selctedCompanyValue: cName });
        const cId = await AsyncStorage.getItem("companyId");
        this.setState({ companyId: cId });
        this.getAttendanceFeed(cId);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    async  closeCompanyModal(index, value) {
        this.refs.CompanyModal.close();
        await AsyncStorage.setItem("companyId", index.toString());
        await AsyncStorage.setItem("companyName", value);

        // this.setState({ slectedCompanyIndex: index })
        this.setState({ selctedCompanyValue: value })
        this.getAttendanceFeed(index);
        await AsyncStorage.setItem("isIndexvalue", "yes");
    }

    renderCompanyList() {
        let content = this.state.companyList.map((catName, i) => {
            return (
                <TouchableOpacity style={{
                    paddingVertical: 7, borderBottomColor: '#D5D5D5',
                    borderBottomWidth: 2
                }} key={i}
                    onPress={() => { this.closeCompanyModal(catName.Value, catName.Text) }}>
                    <Text style={{
                        textAlign: 'center', fontWeight: 'bold',
                        fontSize: 20,
                        color: '#535353'
                    }}
                        key={catName.Value}>{catName.Text}</Text>
                </TouchableOpacity>
            )
        });
        return content;
    }

    getCompanyforIndex = async () => {
        try {
            var response = await loadFromStorage(storage, CurrentUserProfile);
            await GetCompanyByUserId(response.item.Id)
                .then(res => {
                    console.log('company...', res.result);
                    if (res.result === null) {
                        <AppLoading></AppLoading>
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
                    }
                })
                .catch(() => {
                    console.log("error occured");
                });
        } catch (error) {
            console.log(error);
        }
    }
    getCompany = async () => {
        try {
            var response = await loadFromStorage(storage, CurrentUserProfile);
            await GetCompanyByUserId(response.item.Id)
                .then(res => {
                    console.log('company...', res.result);
                    if (res.result === null) {
                        <AppLoading></AppLoading>
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
                        console.log(this.state.companyList, 'compaylist....')
                        AsyncStorage.setItem("companyId", this.state.companyList[0].Value.toString());
                        AsyncStorage.setItem("companyName", this.state.companyList[0].Text);
                        // this.setState({ selctedCompanyValue: this.state.companyList[0].Text })
                        // this.setState({ slectedCompanyIndex: this.state.companyList[0].Value })
                    }
                })
                .catch(() => {
                    console.log("error occured");
                });
        } catch (error) {
            console.log(error);
        }
    }


    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    goBack() {
        Actions.pop();
    }

    getAttendanceFeed = async (cId) => {
        await GetAttendanceFeed(cId)
            .then(res => {
                this.setState({
                    employeeList: res.result.EmployeeList,
                    displayAbleEmployeeList: res.result.EmployeeList,
                    statusCount: res.result.StatusCount
                });
                console.log(res.result.EmployeeList, 'emplist');

            }).catch(() => { console.log("error occured"); });
    }

    renderStatusList() {
        return (
            <View style={DailyAttendanceStyle.countBoxContainer}>
                <TouchableOpacity onPress={() => this.setSelectedOption(1)}>
                    <View style={DailyAttendanceStyle.countBoxColumn1}>
                        <Text
                            style={this.state.selectedId == 1 ?
                                DailyAttendanceStyle.countBoxColumn1NumberActive :
                                DailyAttendanceStyle.countBoxColumn1NumberInactive}>
                            {this.state.statusCount.TotalEmployee}
                        </Text>
                        <Text
                            style={this.state.selectedId == 1 ?
                                DailyAttendanceStyle.countBoxColumn1LabelActive :
                                DailyAttendanceStyle.countBoxColumn1LabelInactive}>
                            EMPLOYEES
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setSelectedOption(2)}>
                    <View style={DailyAttendanceStyle.countBoxColumn2}>
                        <Text
                            style={this.state.selectedId == 2 ?
                                DailyAttendanceStyle.countBoxColumn2NumberActive :
                                DailyAttendanceStyle.countBoxColumn2NumberInactive}>
                            {this.state.statusCount.TotalCheckIn}
                        </Text>
                        <Text
                            style={this.state.selectedId == 2 ?
                                DailyAttendanceStyle.countBoxColumn2LabelActive :
                                DailyAttendanceStyle.countBoxColumn2LabelInactive}>
                            CHECKED IN
                    </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setSelectedOption(3)}>
                    <View style={DailyAttendanceStyle.countBoxColumn3}>
                        <Text
                            style={this.state.selectedId == 3 ?
                                DailyAttendanceStyle.countBoxColumn3NumberActive :
                                DailyAttendanceStyle.countBoxColumn3NumberInactive
                            }
                        >
                            {this.state.statusCount.TotalNotAttend}
                        </Text>
                        <Text
                            style={this.state.selectedId == 3 ?
                                DailyAttendanceStyle.countBoxColumn3LabelActive :
                                DailyAttendanceStyle.countBoxColumn3LabelInactive}
                        >
                            NOT ATTEND
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        );

    }
    render() {
        return (
            <View style={DailyAttendanceStyle.container}>
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
                            style={[DrawerContentStyle.logoImage, {

                            }]}>
                            <TouchableOpacity
                                style={DrawerContentStyle.CompanyModalStyle}
                                onPress={() => this.refs.CompanyModal.open()}>
                                <Text
                                    style={DrawerContentStyle.CompanyModalTextStyle}>
                                    {this.state.selctedCompanyValue}

                                </Text>
                                <Iconic
                                    name="chevrons-down" size={14} color="#d6d6d6"
                                    style={DrawerContentStyle.CompanyModalIconStyle}>
                                </Iconic>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    style={
                        DailyAttendanceStyle.ListContainer
                    }>
                    {this.renderStatusList()}
                </View>
                <View
                    style={
                        DailyAttendanceStyle.FlatListContainer
                    }>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                        data={this.state.displayAbleEmployeeList}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.goToDetail(item)}>
                                <View style={
                                    DailyAttendanceStyle.FlatListTouchableOpacity
                                }>
                                    <View
                                        style={
                                            DailyAttendanceStyle.FlatListLeft
                                        }>
                                        <View style={{ paddingRight: 10, }}>
                                            {item.ImageFileName !== "" ?
                                                <Image resizeMode='cover' style={
                                                    DailyAttendanceStyle.ImageLocal
                                                } source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + item.ImageFileName }} /> : <Image style={
                                                    DailyAttendanceStyle.ImagestyleFromServer
                                                } resizeMode='cover' source={require('../../../assets/images/employee.png')} />}


                                            {item.IsCheckedOut ? (<Image resizeMode="contain"
                                                style={DailyAttendanceStyle.styleForonlineOfflineIcon}
                                                source={require('../../../assets/images/icon_gray.png')} />)
                                                : (item.IsCheckedIn ?
                                                    (<Image style={DailyAttendanceStyle.styleForonlineOfflineIcon
                                                    } resizeMode='contain' source={require('../../../assets/images/icon_green.png')} />)
                                                    : (<Image style={
                                                        DailyAttendanceStyle.styleForonlineOfflineIcon
                                                    } resizeMode='contain' source={require('../../../assets/images/icon_gray.png')} />))
                                            }
                                        </View>
                                        <View style={DailyAttendanceStyle.RightTextView}>
                                            <Text style={
                                                DailyAttendanceStyle.NameText
                                            }
                                            >
                                                {item.EmployeeName}
                                            </Text>
                                            <Text style={
                                                DailyAttendanceStyle.DesignationText
                                            }
                                            >
                                                {item.Designation}
                                            </Text>
                                            <Text style={
                                                DailyAttendanceStyle.DepartmentText
                                            }
                                            >
                                                {item.DepartmentName}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={DailyAttendanceStyle.TimeContainer}>
                                        <View
                                            style={
                                                DailyAttendanceStyle.TimeContent
                                            }>
                                            <Text
                                                style={
                                                    DailyAttendanceStyle.CheckintimeStyle
                                                }>
                                                {item.CheckInTimeVw !== "" ?
                                                    (
                                                        <Icon
                                                            name="arrowdown" size={10}
                                                            color="#07c15d"
                                                            style={DailyAttendanceStyle.AntDesignstyle}>
                                                        </Icon>
                                                    ) : ("")}
                                            </Text>
                                            <Text style={
                                                DailyAttendanceStyle.CheckinTimeText
                                            }>
                                                {item.CheckInTimeVw !== "" ? item.CheckInTimeVw : ("")}</Text>

                                        </View>

                                        <View
                                            style={
                                                DailyAttendanceStyle.CheckOutTimeView
                                            }>
                                            <Text
                                                style={
                                                    DailyAttendanceStyle.CheckOutTimetext
                                                }>
                                                {item.IsCheckedOut ?
                                                    (
                                                        <Icon
                                                            name="arrowup" size={10}
                                                            color="#a1d3ff"
                                                            style={
                                                                DailyAttendanceStyle.CheckOutTimeIconstyle
                                                            }>
                                                        </Icon>
                                                    ) : ("")}
                                            </Text>
                                            <Text style={
                                                DailyAttendanceStyle.CheckOutTimeText
                                            }>{item.IsCheckedOut ? item.CheckOutTimeVw : ("")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }>
                        }
                    </FlatList>
                </View>
                <Modal style={{
                    height: 350,
                    width: "75%",
                    borderRadius: 20,
                    backgroundColor: '#EBEBEB',
                }}
                    position={"center"} ref={"CompanyModal"} isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ alignItems: "flex-start" }}>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.CompanyModal.close()} style={{
                                marginLeft: 0, marginTop: 0,
                            }}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }}
                                    source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 20, }}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: "80%" }}>
                            <View style={{}} >
                                {this.renderCompanyList()}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        )
    }
}

