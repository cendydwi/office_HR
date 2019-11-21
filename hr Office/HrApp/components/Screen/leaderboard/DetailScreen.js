
import React from 'react';
import { ToastAndroid, Platform, StatusBar, Picker, Dimensions, RefreshControl, TouchableOpacity, View, Text, FlatList, Image, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ReportStyle } from './ReportStyle';
import { CommonStyles } from '../../../common/CommonStyles';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import { GetMonthlyAttendanceDetails } from '../../../services/Report'

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


export default class DetailScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            workingDetailList:[],
            companyId:0,
            progressVisible: false,
        }
    }
    goBack() {
        Actions.pop();
    }
    componentDidMount(){
        this.GetAllEmployeeAttendanceDetail();
    }
    GetAllEmployeeAttendanceDetail = async () =>
    {
        try
        {
            const cId = await AsyncStorage.getItem("companyId");
            this.setState({ companyId: cId });
            this.setState({ progressVisible: true });
            await GetMonthlyAttendanceDetails(this.props.detailItem.UserId,cId,this.props.year,this.props.month)
                .then(res =>
                {
                    this.setState({ workingDetailList: res.result});
                    this.setState({ progressVisible: false });
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



    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <View style={ReportStyle.container}>
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
                              Attandance of {this.props.detailItem.EmployeeName}
                            </Text>
                        </View>

                    </View>
                </View>



                <ScrollView showsVerticalScrollIndicator={false}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={this._onRefresh.bind(this)}
                //     />
                // }

                >
                    <View style={ReportStyle.summaryContiner}>
                        <View style={ReportStyle.Summaryhead}>
                            <View style={ReportStyle.SummryheadLeft}>
                                <Text style={ReportStyle.SummaryText}>Year : {this.props.year}</Text>
                            </View>
                            <View style={ReportStyle.CalanderIconContainer}>
                                <FontAwesome
                                    name="calendar"
                                    size={15}
                                    style={{
                                        marginRight: 6,
                                        alignSelf: 'center'
                                    }}
                                    color="#6a6a6a"
                                />
                                <Text style={ReportStyle.monthText}>{this.props.month}</Text>
                            </View>
                        </View>
                        <View style={ReportStyle.valueContainer}>
                            <View style={ReportStyle.valueContainerFirst}>
                                <View style={ReportStyle.IconContainer}>
                                    <Entypo
                                        name="controller-stop" size={18} color="#553e6b"
                                        style={{

                                        }}>
                                    </Entypo>
                                    <Text style={ReportStyle.receiveText}>Total Office Hours</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <Entypo
                                        name="controller-stop" size={18} color="#3b875e"
                                        style={{

                                        }}>
                                    </Entypo>
                                    <Text style={ReportStyle.depositeText}>Completed Hours</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Entypo
                                        name="controller-stop" size={18} color="#919191"
                                        style={{

                                        }}>
                                    </Entypo>
                                    <Text style={ReportStyle.previousText}>Over/Due Times </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo
                                        name="controller-stop" size={18} color="#c49602"
                                        style={{

                                        }}>
                                    </Entypo>
                                    <Text style={ReportStyle.DeuBillTExt}>Present (Days)  </Text>
                                </View>

                            </View>
                            <View style={{ alignItems: 'flex-end', marginTop: 7, }}>
                                <View style={{ marginBottom: 2, }}>
                                    <Text style={ReportStyle.FirstValueText}>{this.props.detailItem.TotalOfficeHour} hrs</Text>
                                </View>
                                <View style={{ marginBottom: 15, }}>
                                    <Text style={ReportStyle.SecondValueText}>{this.props.detailItem.TotalStayTime} hrs</Text>
                                </View>
                                <View style={{ marginBottom: 5, }}>
                                    <Text style={ReportStyle.ThirdValueText}>{this.props.detailItem.OvertimeOrDueHour} hrs</Text>
                                </View>
                                <View>
                                    <Text style={ReportStyle.FourthvalueText}>{this.props.detailItem.TotalPresent} Days</Text>
                                </View>

                            </View>

                        </View>

                    </View>

                    <View style={{ margin: 10, }}>
                {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={ReportStyle.loaderIndicator} />) : null}

                    <FlatList

                    data={this.state.workingDetailList}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) =>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                             
                        
                            <View style={{ alignItems: 'flex-start', backgroundColor: "white", width: (width * 20) / 100, borderRadius: 10, marginBottom: 10, height: 70 }}>
                                <View style={{ alignSelf: 'center', backgroundColor: '#6b7787', width: (width * 20) / 100, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                    <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'PRODUCT_SANS_REGULAR' }}>{item.AttendancceDayName}</Text>
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                {
                                    !item.IsLeave? 
                                    <Text style={{ fontSize: 35, textAlign: 'center', fontFamily: 'PRODUCT_SANS_REGULAR' }}>{item.AttendancceDayNumber}</Text>
                                :
                                <Text style={{ fontSize: 35, color:"red",textAlign: 'center', fontFamily: 'PRODUCT_SANS_REGULAR' }}>{item.AttendancceDayNumber}</Text>
                            }
                                </View>
                            </View>

                            <View
                                style={{
                                    alignItems: 'flex-end',
                                    backgroundColor: 'white',
                                    height: 70,
                                    width: (width * 70) / 100,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    borderBottomColor: '#553e6b',

                                }}>
                                <View
                                    style={{
                                        borderRightWidth: 1, borderRightColor: 'gray',paddingLeft:17,

                                        width: (width * 28) / 100, flexDirection: "column", alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                        }}>

                                        {
                                            !item.IsLeave? 
                                        <AntDesign
                                            name="arrowdown" size={16} color="#07c15d"
                                            style={{
                                                marginTop: 3,
                                            }}>
                                        </AntDesign>
                                        :null}

                                        {
                                            !item.IsLeave? 
                                        <Text
                                            style={{
                                                fontSize: 14, textAlign: "right", color: "#076332", fontFamily: "PRODUCT_SANS_BOLD"
                                            }}>
                                           {item.CheckInTimeVw}

                                    </Text>
                                        :
                                        <Text
                                        style={{
                                            fontSize: 14, textAlign: "right", color: "red", fontFamily: "PRODUCT_SANS_BOLD"
                                        }}>
                                       {item.CheckInTimeVw}

                                </Text>
                                    }
                                    </View>
                                   {
                                       !item.IsLeave?
                                    <View
                                        style={{
                                            alignItems: 'flex-end',
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 9, color: "#a8a8a8", fontFamily: 'Montserrat_Medium', textAlign: 'center'
                                            }}>
                                            CHECKED IN
                                        </Text>
                                    </View>
                                        :null}
                                </View>
                                <View
                                    style={{
                                        borderRightWidth: 1, borderRightColor: 'gray',
                                        width: (width * 25) / 100, flexDirection: "column", alignItems: 'center',
                                    }}>
                                    {
                                        !item.IsLeave? 
                                    <View
                                        style={{
                                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                        }}>
                                       
                                        <AntDesign
                                            name="arrowup"
                                            size={16}
                                            color="red"
                                            style={{
                                                marginTop: 3,
                                            }}>
                                        </AntDesign>
                                        <Text
                                            style={{
                                                fontSize: 14, textAlign: "right",
                                                color: "red"
                                            }}>


                                           {item.CheckOutTimeVw}

                                    </Text>
                                    </View>
                                        :null}
                                        
                                    <View
                                        style={{ alignItems: 'center', }}>
                                        <Text
                                            style={{
                                                fontSize: 9,
                                                textAlign: "right",
                                                color: "#a8a8a8"
                                            }}>
                                             CHECKED OUT
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderRightColor: 'gray',
                                        width: (width * 30) / 100,
                                        // flexDirection: "column",
                                        //alignItems: 'center',
                                        // alignSelf:'center'
                                        paddingLeft:10,
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            // justifyContent: 'center',
                                            // alignItems: 'center',
                                        }}>
                                        <Entypo
                                            name="stopwatch" size={13} color="#a1b1ff"
                                            style={{
                                                marginTop: 2,
                                                marginRight: 2,
                                            }}>
                                        </Entypo>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                textAlign: "center",
                                                color: "#437098"
                                            }}>
                                           {item.OfficeStayHour}
                                    </Text>
                                    </View>
                                    <View
                                        style={{}}>
                                        <Text
                                            style={{
                                                fontSize: 9,
                                                textAlign: "left",
                                                color: "#a8a8a8"
                                            }}>
                                                 WORKING TIME
                                          
                                        </Text>
                                    </View>
                                </View>
                            </View>


                        </View>
                     
                    }/>
                     
                    </View>

                </ScrollView>


            </View>
        );
    }
}
