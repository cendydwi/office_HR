
import React from 'react';

import
{
    Platform, StatusBar, Dimensions, RefreshControl,
    TouchableOpacity, View, Text, FlatList, Image, ScrollView,
    ActivityIndicator, AsyncStorage, BackHandler
} from 'react-native';

import { Constants } from 'expo';

import { Actions } from 'react-native-router-flux';

import * as actions from '../../../common/actions';

import { FinanceStyle } from '../finance/FinanceStyle';


import { DailyAttendanceStyle } from './DailyAttendanceStyle';

import InvoiceList from '../finance/InvoiceListComponent';

import { GetMyInvoiceList } from '../../../services/FinancialService'

import { SearchBar } from 'react-native-elements';
import call from 'react-native-phone-call'

import { CommonStyles } from '../../../common/CommonStyles';
import
{
    Entypo,
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,

} from '@expo/vector-icons'

import
{
    GetTrackingByUserIdAndTodayDate, GetMyTodayAttendance,
    GetMovementDetails
} from '../../../services/EmployeeTrackService';


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


export default class UserSpecificBills extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            companyId: 0,
            invoiceDataList: [],
            progressVisible: true,
            refreshing: false,
            userId: global.aItemUserId,
        }
        this.arrayholder = [];
    }

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


    _onRefresh = async () =>
    {
        this.setState({ refreshing: true });
        setTimeout(function ()
        {
            this.setState({
                refreshing: false,

            });

        }.bind(this), 2000);

        this.GetInvoiceList(this.state.userId, false);
    };

    async componentDidMount()
    {
        const cId = await AsyncStorage.getItem("companyId");
        this.setState({ companyId: cId });
        this.GetInvoiceList(this.state.userId, true);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }
    GetInvoiceList = async (userId, isProgress) =>
    {
        try
        {
            this.setState({ progressVisible: isProgress });
            await GetMyInvoiceList(global.aItemUserId)
                .then(res =>
                {
                    this.setState({ invoiceDataList: res.result, progressVisible: false });
                    this.arrayholder = res.result;
                    console.log(res.result, 'invoiceDataList.............')
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

    searchFilterFunction = text =>
    {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item =>
        {
            const itemData = `${item.InvoiceNo.toUpperCase()} ${item.CreatedByName.toUpperCase()} ${item.Title.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            invoiceDataList: newData,
        });
    };

    renderHeader = () =>
    {
        return (
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

        );
    };

    render()
    {
        return (
            <View style={FinanceStyle.container}>
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



                <InvoiceList itemList={this.state.invoiceDataList} headerRenderer={this.renderHeader()} />
            </View>
        );
    }
}
