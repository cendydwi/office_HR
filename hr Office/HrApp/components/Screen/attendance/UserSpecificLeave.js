import React from 'react';

import
{
    Platform, StatusBar, Dimensions, RefreshControl,
    TouchableOpacity, View, Text, FlatList, ScrollView,
    ActivityIndicator, AsyncStorage, BackHandler, Image
}
    from 'react-native';

import { Actions } from 'react-native-router-flux';

import * as actions from '../../../common/actions';

import { GetUserLeaves, LeaveApproved, LeaveRejected } from '../../../services/Leave';

import call from 'react-native-phone-call'
import { LeaveListStyle } from '../leaves/LeaveListStyle';

import { SearchBar } from 'react-native-elements';


import { CommonStyles } from '../../../common/CommonStyles';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
function StatusBarPlaceHolder()
{
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
export default class UserSpecificLeave extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            leaveList: [],
            progressVisible: true,
            refreshing: false,
            companyId: "",
            userId: global.aItemUserId,
        }
        this.arrayholder = [];
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

    componentWillUnmount()
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    call = () => {
        //handler to make a call
        const args = {
            number: global.phoneNumber,
            prompt: false,
        };
        call(args).catch(console.error);
    }
    handleBackButton()
    {
        Actions.DailyAttendance();
        return true;
    }

    renderHeader = () =>
    {
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
                    value={this.state.value}
                />
            </ScrollView>
        );
    };

    searchFilterFunction = text =>
    {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item =>
        {
            const itemData = `${item.EmployeeName.toUpperCase()} ${item.EmployeeName.toUpperCase()} ${item.EmployeeName.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            leaveList: newData,
        });
    };
    async componentDidMount()
    {
        const cId = await AsyncStorage.getItem("companyId");
        this.setState({ companyId: cId });
        this.getLeaveList(this.state.userId, true);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }
    getLeaveList = async (userId, isProgress) =>
    {
        try
        {
            this.setState({ progressVisible: isProgress });
            await GetUserLeaves(global.aItemUserId)
                .then(res =>
                {
                    this.setState({ leaveList: res.result, progressVisible: false });
                    this.arrayholder = res.result;
                    console.log(res.result, 'leaveresultlist.............')
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

    leaveApprove = async (item) =>
    {
        const uId = await AsyncStorage.getItem("userId");
        await LeaveApproved(item.Id, uId)
            .then(res =>
            {
                this.getLeaveList(this.state.companyId, true);
            })
            .catch(() =>
            {
                this.setState({ progressVisible: false });
                console.log("error occured");
            });
    }

    leaveReject = async (item) =>
    {
        await LeaveRejected(item.Id)
            .then(res =>
            {
                this.getLeaveList(this.state.companyId, true);
            })
            .catch(() =>
            {
                this.setState({ progressVisible: false });
                console.log("error occured");
            });

        this.getLeaveList(this.state.companyId, true);
    }

    render()
    {
        var { width, height } = Dimensions.get('window');
        return (
            <View style={LeaveListStyle.container}>
                <StatusBarPlaceHolder />
                <View
                    style={CommonStyles.HeaderContent}>
                    <View
                        style={CommonStyles.HeaderFirstView}>
                        <TouchableOpacity
                            style={CommonStyles.HeaderMenuicon}
                            onPress={() => { this.handleBackButton() }}>
                            <Image resizeMode="contain" style={CommonStyles.HeaderMenuiconstyle}
                                source={require('../../../assets/images/left_arrow.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={CommonStyles.HeaderTextView}>
                            <Text
                                style={CommonStyles.HeaderTextstyle}>
                                {global.aItemEmployeeName}
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={this.call}
                            style={{
                                padding: 8, paddingVertical: 2,
                               
                            }}>
                            <Image style={{ width: 20, height: 20,alignItems:'center',marginTop:5, }}
                                resizeMode='contain'
                                source={require('../../../assets/images/call.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ flex: 1, }}>

                    {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={LeaveListStyle.loaderIndicator} />) : null}

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1, padding: 10, }}>

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
                                                Name:
                                    </Text>
                                            <Text style={LeaveListStyle.leaveFrom}>
                                                From:
                                    </Text>
                                        </View>

                                        <View style={LeaveListStyle.leaveReasonContainer}>
                                            <Text
                                                style={LeaveListStyle.leaveReasonText}>
                                                {item.EmployeeName}
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
                                                Cause:
                                        </Text>
                                            <Text
                                                style={LeaveListStyle.leaveToText}>
                                                To:
                                        </Text>
                                        </View>

                                        <View
                                            style={LeaveListStyle.detailsContainer}>
                                            <Text
                                                style={LeaveListStyle.detailsText}>
                                                {item.LeaveReason}
                                            </Text>
                                            <Text
                                                style={LeaveListStyle.detailsTextInner}>
                                                {item.ToDateVw}
                                            </Text>
                                        </View>

                                        <View
                                            style={LeaveListStyle.causeContainer1}>
                                            <Text style={LeaveListStyle.causeText}>
                                                Leave Type:
                                        </Text>
                                            <Text style={LeaveListStyle.causeText1}>
                                                {item.LeaveType}
                                            </Text>
                                        </View>


                                        {(item.ApprovedBy != null && item.ApprovedBy != '') ?
                                            <View
                                                style={LeaveListStyle.approvedByContainer}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text
                                                        style={LeaveListStyle.approvedByText}>
                                                        Approved By:
                                     </Text>
                                                    <Text
                                                        style={LeaveListStyle.approvedByText1}>
                                                        {item.ApprovedBy}

                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text
                                                        style={LeaveListStyle.approvedAtText}>
                                                        Approved At:
                                        </Text>
                                                    <Text
                                                        style={LeaveListStyle.approvedAtText1}>
                                                        {item.ApprovedAtVw}
                                                    </Text>
                                                </View>
                                            </View>
                                            : null}

                                        {(!item.IsApproved && !item.IsRejected) ?
                                            <View
                                                style={LeaveListStyle.buttonContainer}>
                                                <View style={LeaveListStyle.foraligmentitem}>
                                                    <TouchableOpacity
                                                        onPress={() => this.leaveApprove(item)}
                                                        style={LeaveListStyle.buttonTouchable}>
                                                        <Text style={LeaveListStyle.approveText}>
                                                            APPROVE
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={() => this.leaveReject(item)}
                                                        style={LeaveListStyle.rejectButtonTouchable}>
                                                        <Text
                                                            style={LeaveListStyle.rejectText}>
                                                            REJECT
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={LeaveListStyle.statusDate1}>
                                                    {item.LeaveInDays} Days
                                                </Text>
                                            </View>
                                            :
                                            <View
                                                style={LeaveListStyle.statusButton}>
                                                <View
                                                    style={LeaveListStyle.statusButtonInner}>
                                                    {item.IsApproved == true ?
                                                        (<Text style={{ color: 'green', }}>
                                                            Approved
                                                        </Text>)
                                                        : (item.IsRejected == true ?
                                                            (<Text style={{ color: 'red', }}>
                                                                Rejecected
                                                            </Text>)
                                                            : (<Text style={{ color: '#f1b847', }}>
                                                                Pending
                                                            </Text>))}

                                                </View>

                                                <Text
                                                    style={LeaveListStyle.statusDate}>
                                                    {item.LeaveInDays} Days
                                                </Text>
                                            </View>
                                        }
                                    </View>
                                }
                                ListHeaderComponent={this.renderHeader()}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

