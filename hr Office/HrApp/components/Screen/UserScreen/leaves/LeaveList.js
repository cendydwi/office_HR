import React, { Component } from 'react';

import
{
    Platform, StatusBar, Dimensions, RefreshControl,
    TouchableOpacity, View, Text, FlatList, Image, ScrollView,
    ActivityIndicator, AsyncStorage, BackHandler, Alert,
} from 'react-native';


import
{
    DailyAttendanceCombo, MyPanelCombo,
    MyTaskCombo, LeaveListCombo,
    BillsCombo, ExpensesCombo, NoticeCombo,
    drawerSelectedOption
} from '../../../MenuDrawer/DrawerContent';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { Actions } from 'react-native-router-flux';

import { GetLeaveList } from '../../../../services/UserService/Leave';

import { LeaveListStyle } from './LeaveListStyle';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class LeaveList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            leaveList: [],
            progressVisible: true,
            refreshing: false,
            userId: "",
            // selectedId: '',
        }
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

        this.getLeaveList(this.state.userId, false);
    };
    goBack()
    {
        DailyAttendanceCombo();
    }
    async componentDidMount()
    {

        global.DrawerContentId = 4;
        const uId = await AsyncStorage.getItem("userId");
        this.setState({ userId: uId });
        this.getLeaveList(uId, true);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount()
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () =>
    { 
        BackHandler.exitApp()       
        return true;
    }
    getLeaveList = async (userId, isProgress) =>
    {
        try
        {
            this.setState({ progressVisible: isProgress });
            await GetLeaveList(userId)
                .then(res =>
                {
                    this.setState({ leaveList: res.result, progressVisible: false });
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

    render()
    {
        var { width, height } = Dimensions.get('window');
        return (
            <View style={LeaveListStyle.container}>
               
                <View
                    style={LeaveListStyle.HeaderContent}>
                    <View
                        style={LeaveListStyle.HeaderFirstView}>
                        <TouchableOpacity
                            style={LeaveListStyle.HeaderMenuicon}
                            onPress={() => { Actions.drawerOpen(); }}>
                            <Image resizeMode="contain" style={LeaveListStyle.HeaderMenuiconstyle}
                                source={require('../../../../assets/images/menu_b.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={LeaveListStyle.HeaderTextView}>
                            <Text
                                style={LeaveListStyle.HeaderTextstyle}>
                                LEAVE LIST
                            </Text>
                        </View>
                    </View>
                    <View
                        style={LeaveListStyle.ApplyButtonContainer}>
                        <TouchableOpacity
                            onPress={() => Actions.LeaveApply()}
                            style={LeaveListStyle.ApplyButtonTouch}>
                            <View style={LeaveListStyle.plusButton}>
                                <FontAwesome
                                    name="plus" size={18} color="#ffffff">
                                </FontAwesome>
                            </View>
                            <View style={LeaveListStyle.ApplyTextButton}>
                                <Text style={LeaveListStyle.ApplyButtonText}>
                                    LEAVE
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1,marginTop:5, }}>

                    {this.state.progressVisible == true ? (<ActivityIndicator size="large"
                        color="#1B7F67" style={LeaveListStyle.loaderIndicator} />) : null}

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1,
                            // padding: 10, 
                             }}>

                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this._onRefresh.bind(this)}
                                    />
                                }
                                data={this.state.leaveList}
                                keyExtractor={(x, i) => i.toString()}
                                renderItem={({ item }) =>
                                    <View
                                        style={LeaveListStyle.listContainer}
                                    >
                                        <View style={LeaveListStyle.listInnerContainer}>
                                            <Text style={LeaveListStyle.leaveType}>

                                                Cause:
                                            </Text>
                                            <Text style={LeaveListStyle.leaveFrom}>
                                                From:

                                            </Text>
                                        </View>

                                        <View style={LeaveListStyle.leaveReasonContainer}>
                                            <Text
                                                style={[LeaveListStyle.leaveReasonText,
                                                { fontFamily: 'Montserrat_SemiBold' }]}>

                                                {item.LeaveReason}
                                            </Text>
                                            <Text
                                                style={LeaveListStyle.reasonFromDate}>
                                                {item.FromDateVw}


                                            </Text>
                                        </View>                                   
                                        <View
                                            style={LeaveListStyle.causeContainer}>
                                            <Text
                                                style={LeaveListStyle.causeText}>

                                                Leave Type:
                                            </Text>
                                            <Text
                                                style={LeaveListStyle.leaveToText}>
                                                To:
                                            </Text>
                                        </View>

                                        <View
                                            style={LeaveListStyle.detailsContainer}>
                                            <Text
                                                style={LeaveListStyle.reasonFromDate}>
                                                {item.LeaveType}

                                            </Text>
                                            <Text
                                                style={LeaveListStyle.detailsTextInner}>
                                                {item.ToDateVw}
                                            </Text>
                                        </View>




                                        {(item.ApprovedBy != null && item.ApprovedBy != '') ?
                                            <View
                                                style={LeaveListStyle.approvedByContainer}>
                                                <Text
                                                    style={LeaveListStyle.approvedByText}>
                                                    Approved By: {item.ApprovedBy}
                                                </Text>
                                                <Text
                                                    style={LeaveListStyle.approvedAtText}>
                                                    Approved At: {item.ApprovedAtVw}
                                                </Text>
                                            </View>
                                            : null}

                                        <View
                                            style={LeaveListStyle.statusButton}>
                                            <View
                                                style={LeaveListStyle.statusButtonInner}>

                                                {item.IsApproved == true ?
                                                    (<Text style={{ color: 'green', }}>
                                                        Approved
                                                    </Text>) :
                                                    (item.IsRejected == true
                                                        ? (<Text style={{ color: 'red', }}>
                                                           Rejected
                                                        </Text>) :
                                                        (<Text style={{ color: '#f1b847', }}>
                                                            Pending
                                                        </Text>))}

                                            </View>
                                            <View style={LeaveListStyle.daysBox}>
                                                <Text
                                                    style={LeaveListStyle.statusDate}>
                                                    {item.LeaveInDays} Days

                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                }
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

