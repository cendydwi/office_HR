import React from 'react';
import { Platform, StatusBar, Dimensions, RefreshControl, 
    TouchableOpacity, View, Text, FlatList, Image, ScrollView,
     ActivityIndicator,AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import { GetLeaveList, LeaveApproved, LeaveRejected } from '../../../services/Leave';
import apiConfig from "../../../services/api/config";
import { LeaveListStyle } from './LeaveListStyle';
import { SearchBar } from 'react-native-elements';
import { CommonStyles } from '../../../common/CommonStyles';

import {
    AdMobBanner
  } from 'expo-ads-admob';

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
export default class LeaveList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            leaveList: [],
            progressVisible: true,
            refreshing: false
        }
        this.arrayholder = [];
    }
    _onRefresh = async () =>{
        this.setState({ refreshing: true});
        setTimeout(function ()
        {
            this.setState({
                refreshing: false,
                userId:"",
                companyId:0,
            });

        }.bind(this), 2000);

        this.getLeaveList(this.state.companyId,false);
    };
    goBack()
    {
        Actions.pop();
    }


    renderHeader = () => {
        return ( 
          <SearchBar
            placeholder="Type Here..."
            style={{ position: 'absolute', zIndex: 1 }}
            lightTheme
            containerStyle={{backgroundColor:'#f6f7f9',}}
            inputContainerStyle={{ backgroundColor: 'white',}}
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
          
        );
      };
      
    searchFilterFunction = text => {
        this.setState({
          value: text,
        });
    
        const newData = this.arrayholder.filter(item => {
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
        const cId= await AsyncStorage.getItem("companyId");
        this.setState({companyId:cId});
        this.getLeaveList(cId,true);
       
    }
    getLeaveList = async (companyId,isProgress) => {
        try {
            this.setState({ progressVisible: isProgress });
            await GetLeaveList(companyId)
                .then(res =>
                {
                    this.setState({ leaveList: res.result , progressVisible: false});
                    this.arrayholder=res.result;
                    console.log(res.result,'leaveresultlist.............')
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

    leaveApprove = async (item) => {
        const uId= await AsyncStorage.getItem("userId");
        await LeaveApproved(item.Id,uId)
                .then(res =>
                {
                    this.getLeaveList(this.state.companyId,true);
                })
                .catch(() =>
                {
                    this.setState({ progressVisible: false });
                    console.log("error occured");
                });
    }

    leaveReject = async (item) => {
        await LeaveRejected(item.Id)
        .then(res =>
        {
            this.getLeaveList(this.state.companyId,true);
        })
        .catch(() =>
        {
            this.setState({ progressVisible: false });
            console.log("error occured");
        });

        this.getLeaveList(this.state.companyId,true);
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
                            onPress={() => { Actions.drawerOpen(); }}>
                            <Image resizeMode="contain" style={CommonStyles.HeaderMenuiconstyle}
                                source={require('../../../assets/images/menu_b.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                             style={CommonStyles.HeaderTextView}>
                            <Text
                                style={CommonStyles.HeaderTextstyle}>
                              LEAVE REQUESTS
                            </Text>
                        </View>
                    </View>
                </View>               
                <View style={{ flex: 1, }}>
                   
                    {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={LeaveListStyle.loaderIndicator} />) : null}
                   
                    <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flex: 1, }}>
                   
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
                        <View style={{flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:.4,padding:8,paddingLeft:0}}>
                            
                            <Text style={{fontFamily: 'Montserrat_SemiBold',fontSize:14}}>{item.EmployeeName}</Text>
                        </View>
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
                        ListHeaderComponent={this.renderHeader()}
                    />
                    </View>
                    </ScrollView>
                </View>
                <AdMobBanner
                bannerSize="fullBanner"
                adUnitID={apiConfig.bannerUnitId}
                onDidFailToReceiveAdWithError={this.bannerError} />
            </View>
        );
    }
}

