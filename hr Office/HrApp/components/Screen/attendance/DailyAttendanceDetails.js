import React from 'react';
import {
    Platform, StatusBar, Dimensions,
    TouchableOpacity, View, Text,
    Image, ScrollView,
    BackHandler,
    RefreshControl,
    FlatList, StyleSheet,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Timeline from 'react-native-timeline-flatlist'
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import { DailyAttendanceStyle } from './DailyAttendanceStyle';
import {
    GetMyTodayAttendance,
    GetMovementDetails
} from '../../../services/EmployeeTrackService';

import { CommonStyles } from '../../../common/CommonStyles';

import call from 'react-native-phone-call'

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

export default class DailyAttendanceDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: 1,
            DepartmentName: "",
            Designation: "",
            EmployeeName: "",
            UserId: "",
            Latitude: 0,
            Longitude: 0,
            LogLocation: '',
            EmpTrackList: [],
            data: [],
        }
    }
    call = () => {
        //handler to make a call
        const args = {
            number: global.phoneNumber,
            prompt: false,
        };
        call(args).catch(console.error);
    }

    async componentDidMount() {
        global.aItemUserId = this.props.aItem.UserId;
        this.getEmpTrackInfo();
        this.getEmpInfo();
        global.phoneNumber = this.props.aItem.PhoneNumber;
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        Actions.DailyAttendance();
        return true;
    }

    getEmpTrackInfo = async () => {
        try {
            await GetMovementDetails(global.aItemUserId)
                .then(res => {
                    this.setState({
                        EmpTrackList: res.result,
                    });
                    console.log(res.result, 'emptacklist###################')
                    res.result.map((userData) => {
                        var title = '';
                        var color = '';
                        if (userData.IsCheckInPoint) {
                            title = "Checked In";
                            color = "green"
                        } else if (userData.IsCheckOutPoint) {
                            title = "Checked Out";
                            color = "red"
                        } else {
                            title = "Checked point";
                            color = "gray"
                        }
                        var myObj = {
                            "time": userData.LogTimeVw,    
                            "title": title,  
                            "description": userData.LogLocation,  
                            "circleColor": color
                        };
                        this.state.data.push(myObj);

                    });
                    console.log(this.state.data, 'location@@@@@@@@@@@@@@@@@@');
                    this.setState({
                        Longitude: res.result[res.result.length - 1].Longitude,
                        Latitude: res.result[res.result.length - 1].Latitude,
                        LogLocation: res.result[res.result.length - 1].LogLocation,
                    });

                    const tcount = 60 * res.result.length - 60;
                    this.setState({ svgLinHeight: tcount === 0 ? 60 : tcount });
                })
                .catch((ex) => {
                    console.log(ex, "GetMovementDetails error occured");
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    goBack() {
        // Actions.NoticeDetail();
        actions.push("DailyAttendance");

    };

    getEmpInfo = async () => {
        try {

            await GetMyTodayAttendance(global.aItemUserId)
                .then(res => {
                    console.log(res.result, "getEmpInfo");
                    this.setState({ EmployeeName: res.result.EmployeeName, });
                    this.setState({ DepartmentName: res.result.DepartmentName, });
                    this.setState({ Designation: res.result.Designation, });
                    global.aItemEmployeeName = res.result.EmployeeName;

                })
                .catch(() => {
                    console.log("error occured");
                });

        } catch (error) {
            console.log(error);
        }
    }
    _onRefresh = async () => {
        this.setState({ refreshing: true });
        setTimeout(function () {
            this.setState({
                refreshing: false,
            });

        }.bind(this), 2000);
        this.getEmpTrackInfo();
    };
    renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 0, height: 45 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ color: '#313131' }}>
                        {item.LogTimeVw}
                    </Text>
                </View>
                <Text style={{
                    marginLeft: 5, color: '#7d7d7d',
                    fontFamily: 'PRODUCT_SANS_REGULAR', width: 240,
                    textAlign: 'justify'
                }}>
                    Checked In at {item.LogLocation}
                </Text>
            </View>
        );
    }



    renderTrackList() {
        return (
            <View style={styles.container}>
                <Timeline
                    style={styles.list}
                    data={this.state.data}
                    circleSize={20}
                    circleColor={"circleColor"}
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13,marginTop:5, }}
                    descriptionStyle={{ color: 'gray' }}
                    options={{
                        style: { paddingTop: 5 }
                    }}
                    innerCircle={'dot'}
                />
            </View>
        );
    }
    render() {
        var { width, height } = Dimensions.get('window');
        return (
            <View style={DailyAttendanceStyle.container}>
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
                                {this.state.EmployeeName}

                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={this.call}
                            style={{
                                padding: 8, paddingVertical: 2,

                            }}>
                            <Image style={{ width: 20, height: 20, alignItems: 'center', marginTop: 5, }}
                                resizeMode='contain'
                                source={require('../../../assets/images/call.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>


                <StatusBar hidden={false} backgroundColor="rgba(0, 0, 0, 0.2)" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{margin:10}}>
                            <MapView
                                
                                provider={PROVIDER_GOOGLE}
                                style={{
                                    height: (height * 40) / 100,
                                }}
                                region={{
                                    latitude: this.state.Latitude,
                                    longitude: this.state.Longitude,
                                    latitudeDelta: 0.001200,
                                    longitudeDelta: 0.001200 * .60
                                }}
                            // camera={{
                            //     zoom: 90, center: {
                            //         latitude: this.state.Latitude,
                            //         longitude: this.state.Longitude,
                            //     }
                            // }}
                            >
                                <MapView.Marker coordinate={{
                                    latitude: this.state.Latitude,
                                    longitude: this.state.Longitude,
                                }} title={this.state.EmployeeName + " Last Location"} description={this.state.LogLocation} />
                            </MapView>
                        </View>
                      
                        <View
                            style={{
                                flexDirection: 'column',
                                backgroundColor: '#f5f7f9',
                            }}>
                            <View
                                style={{
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    backgroundColor: '#f5f7f9',
                                    borderBottomColor: '#f4f4f4',
                                    borderBottomWidth: 0.8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 18,
                                }}>
                                <Image resizeMode="contain" style={{ width: 20, height: 20, paddingHorizontal: 5 }}
                                    source={require('../../../assets/images/goal.png')}>
                                </Image>
                                <Text
                                    style={{
                                        padding: 10,
                                        fontFamily: "OPENSANS_BOLD",
                                        fontSize: 17,
                                        textAlign: "left",
                                        color: "#19260c"
                                    }}
                                >
                                    Timeline
                                </Text>
                            </View>
                            <View style={{ backgroundColor: '#ffffff' }}>
                                <View style={{ flexDirection: 'column' }}>
                                    {this.renderTrackList()}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,paddingTop:0,

        backgroundColor: 'white'
    },
    list: {
        flex: 1,
         marginTop: 20,
    },
});