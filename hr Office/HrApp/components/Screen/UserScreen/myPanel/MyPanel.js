import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';

import Modal from 'react-native-modalbox';
import Timeline from 'react-native-timeline-flatlist'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
// import Geocoder from 'react-native-geocoding';

import Geocoder from 'react-native-geocoder';

//import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { MyPanelStyle } from './MyPanelStyle';

import {
    loadFromStorage,
    storage,
    CurrentUserProfile
} from "../../../../common/storage";

const options = {
    title: 'Select',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
import {
    Platform, PermissionsAndroid,
    ScrollView, Text, View, Image,
    NetInfo, StatusBar, ActivityIndicator,
    ToastAndroid, RefreshControl, Alert, TextInput,
    TouchableOpacity, BackHandler, AsyncStorage, StyleSheet,
}
    from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Geolocation from 'react-native-geolocation-service';
//import { Location, Permissions, Constants, Svg, ImagePicker, } from 'expo';

import {
    CheckIn, CheckOut, CheckPoint,
    GetMyTodayAttendance,
    GetMovementDetails,
} from '../../../../services/UserService/EmployeeTrackService';

import { UpdateEmployee } from '../../../../services/UserService/AccountService'

import { NoticeStyle } from '../../notice/NoticeStyle'


import {
    DailyAttendanceCombo,
} from '../../../MenuDrawer/DrawerContent';

// const { Circle, Line, } = Svg;

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

export default class MyPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressVisible: false,
            refreshing: false,
            gps: false,
            svgLinHeight: 60 * 0 - 60,
            touchabledisable: false,
            errorMessage: "",
            location: "",
            touchabledisablepointcheckin: false,
            touchabledisablepoint: false,
            touchabledisablepointcheckout: false,
            attendanceModel: null,
            EmpTrackList: [],
            AttendanceDateVw: "",
            CheckInTimeVw: "",
            CheckOutTimeVw: "",
            DepartmentName: "",
            Designation: "",
            EmployeeName: "",
            IsCheckedIn: false,
            IsCheckedOut: false,
            OfficeStayHour: "",
            Status: "",
            image: null,
            UserId: "",
            Latitude: null,
            Longitude: null,
            LogLocation: null,
            // DeviceName: Constants.deviceName,
            DeviceOSVersion: Platform.OS === 'ios' ? Platform.systemVersion : Platform.Version,
            CompanyId: "",
            Reason: "",
            ImageFileName: "",
            mobile: '',
            name: '',
            gmail: '',
            Imageparam: "resourcetracker",
            ImageFileId: "",
            EmployeeId: 0,
            data: [],
            location: null,
            currentLongitude: 'unknown',//Initial Longitude
            currentLatitude: 'unknown',//Initial Latitude
            myApiKey: "AIzaSyAuojF8qZ_EOF1uLSddHckbEAKtbbwA2uY",
          pointcheck:"",
        }
    }
    _onRefresh = async () => {
        this.setState({ refreshing: true });
        setTimeout(function () {
            this.setState({
                refreshing: false,
            });

        }.bind(this), 2000);
        //s this._getLocationAsyncforgps();
        this.getMyTodayAttendance(this.state.UserId);
    };
    closeModalEditProfile() {
        this.updateEmployeeRecords();
    }
    openModalEditProfile() {
        this.refs.modalEditEmp.open()
    }
    openmodalForImage() {
        this.refs.modalForImage.open();
    }
    openmodalForprofileImg() {
        this._takePhoto();
    }

    _takePhoto = async () => {
        this.refs.modalForImage.close()
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            // aspect: [4, 4],
            //quality: .2,
            height: 250,
            width: 250,
        });
        console.log(pickerResult, '.......................')
        if (pickerResult.cancelled == false) {
            this.handleUploadPhoto(pickerResult)
        }
    };

    handleUploadPhoto = async (pickerResult) => {

        const userToken = await AsyncStorage.getItem("userToken");
        console.log(pickerResult.uri, '...............send')
        var data = new FormData();
        data.append('my_photo', {
            uri: pickerResult.uri,
            name: 'my_photo.jpg',
            type: 'image/jpg'
        })
        this.setState({ progressVisible: true });
        fetch("https://medilifesolutions.com/api/AzureFileStorageApi/Upload?containerName=" + this.state.Imageparam, {
            headers: {
                'Authorization': `bearer ${userToken}`,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method: "POST",
            body: data
        })
            .then(response => response.json())
            .then(response => {
                console.log("upload succes", response);
                this.setState({ image: "https://medilifesolutions.blob.core.windows.net/resourcetracker/" + response.ReturnCode });
                this.setState({ ImageFileName: response.ReturnCode });
                this.setState({ progressVisible: false });
                ToastAndroid.show('Uploaded successfully', ToastAndroid.TOP);
                console.log(response.ReturnCode, 'return..............');
                //this.updateEmployeeRecords();
                this.setState({ photo: null });
            })
            .catch(error => {
                console.log("upload error", error);
                ToastAndroid.show('Upload Fail', ToastAndroid.TOP);
            });
    };
    
    _pickImage = async () => {
        this.refs.modalForImage.close()
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            //aspect: [4, 4],
            quality: 1,
            height: 250,
            width: 250,
        });
        if (pickerResult.cancelled == false) {
            this.handleUploadPhoto(pickerResult)
        }
    };
    async updateEmployeeRecords() {
        let data = {
            UserFullName: this.state.EmployeeName,
            DesignationName: this.state.Designation,
            Id: this.state.EmployeeId,
            ImageFileName: this.state.ImageFileName,
            ImageFileId: this.state.ImageFileId,
        };
        console.log('data...', data);
        try {
            let response = await UpdateEmployee(data);
            this.setState({ successMessage: response.result.message });
            if (response && response.isSuccess) {
                this.refs.modalEditEmp.close()
                this.getMyTodayAttendance(this.state.UserId);
                console.log(response.result, '.....update.....')
            } else {
                alert(response.result);
                Alert.alert(
                    "",
                    response.result.message,
                    [
                        { text: 'OK', },
                    ],
                    { cancelable: false }
                )

            }
        } catch (errors) {
            Alert.alert(
                "",
                "data does not saved",
                [
                    { text: 'OK', },
                ],
                { cancelable: false }
            )

        }
    }

    async componentDidMount() {
        global.DrawerContentId = 3;

        const uId = await AsyncStorage.getItem("userId");
        this.setState({ UserId: uId });
        const comId = await AsyncStorage.getItem("companyId");
        var response = await loadFromStorage(storage, CurrentUserProfile);
        console.log(response, 'Response.............for............Emp')
        await this.setState({ name: response.item.UserFullName });
        await this.setState({ mobile: response.item.PhoneNumber });
        await this.setState({ gmail: response.item.Email });

        this.setState({ CompanyId: comId });

        // this.getEmpTrackingTodayList();

        this.getMyTodayAttendance(uId);

        // this._getLocationAsyncforgps();

       // this.interval = setInterval(() => this.getCheckPoint(), 3000000);


        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }



    getData(currentLatitude, currentLongitude) {
        var pos = {
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
        };
        Location.reverseGeocodeAsync(pos).then(res => {
            let addressformate = res[0].street +", "+ res[0].city+", "+ res[0].country
            if(this.state.pointcheck=="CheckIn"){
                this. createCheckingIn(currentLatitude, currentLongitude,addressformate);
            }else if(this.state.pointcheck=="CheckPoint"){
                this.createCheckPoint(currentLatitude, currentLongitude,addressformate);                
            }else{
                this.createCheckOut(currentLatitude, currentLongitude,addressformate);                
            }
            this.setState({

                LogLocation: addressformate,
               
            });
            console.log(res, 'position ready');
            // alert(res[0].formattedAddress);
        })
            .catch(error => alert(error));
    }



    componentWillUnmount() {
        clearInterval(this.interval);
        Geolocation.clearWatch(this.watchID);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    }
    handleBackButton = () => {
        BackHandler.exitApp()
        return true;
    }
    goBack() {
        DailyAttendanceCombo();
    }
    getMyTodayAttendance = async (cId) => {

        this.setState({ progressVisible: true });
        await GetMyTodayAttendance(cId)
            .then(res => {
                this.setState({ attendanceModel: res.result, });
                this.setState({ EmployeeName: res.result.EmployeeName, });
                this.setState({ DepartmentName: res.result.DepartmentName, });
                this.setState({ Designation: res.result.Designation, });
                this.setState({ CheckInTimeVw: res.result.CheckInTimeVw, });
                this.setState({ CheckOutTimeVw: res.result.CheckOutTimeVw, });
                this.setState({ OfficeStayHour: res.result.OfficeStayHour, });
                this.setState({ IsCheckedIn: res.result.IsCheckedIn, });
                this.setState({ IsCheckedOut: res.result.IsCheckedOut, });
                this.setState({ Status: res.result.Status, });
                this.setState({ EmployeeId: res.result.EmployeeId, });
                this.setState({ ImageFileName: res.result.ImageFileName, });
                console.log("attendanceModel", res.result);
                console.log('IsCheckedIn', this.state.IsCheckedIn);
                this.setState({ progressVisible: false });
            }).catch(() => {
                this.setState({ progressVisible: false });
                console.log("GetMyTodayAttendance error occured");
            });
        this.setState({ progressVisible: true });
        await GetMovementDetails(cId)
            .then(res => {
                // this.setState({data: null });
                this.setState({ EmpTrackList: res.result });
                if (this.state.data.length != 0) {
                    this.setState({ data: [] });
                }
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
                })
                console.log(this.state.data, 'location@@@@@@@@@@@@@@@@@@');
                this.setState({ progressVisible: false });
                console.log('EmpTrackList........', this.state.EmpTrackList);
            }).catch(() => {
                this.setState({ progressVisible: false });
                console.log("GetMovementDetails error occured");
            });
    }

    getLoction = async () => {
       // var that = this;
        //Checking for the permission just after component loaded
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
            ToastAndroid.show(errorMessage, ToastAndroid.TOP);
        } else {
            await this._getLocationAsync();
        }
    }

    callLocation(that) {
        //alert("callLocation Called");
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                console.log(position, 'test positions')
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                this.setState({
                    UserId: this.state.UserId,
                    Latitude: currentLatitude,
                    Longitude: currentLongitude,
                    // LogLocation: emplocation.name + "," + emplocation.street + "," + emplocation.city,
                    DeviceName: this.state.DeviceName,
                    DeviceOSVersion: this.state.DeviceOSVersion,
                    CompanyId: this.state.CompanyId,
                    Reason: this.state.Reason,
                });
                console.log(this.state.Latitude, 'test positions...........')
                console.log(this.state.Longitude, 'test positions...........')

                //getting the Latitude from the location json
                that.setState({ currentLongitude: currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({ currentLatitude: currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text

            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            ToastAndroid.show(errorMessage, ToastAndroid.TOP);
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
       await Location.getCurrentPositionAsync({
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 0,
            distanceFilter: 10
        }).then((position)=>{
                console.log(position, 'test positions');
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                this.setState({ Latitude: currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                this.setState({ Longitude: currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
                this.getData(currentLatitude, currentLongitude);
        });

  
        // var pos = {
        //     latitude: location.coords.latitude,
        //     longitude: location.coords.longitude,
        // };
        // let location2 = await Location.reverseGeocodeAsync(pos);
        // let emplocation = location2[0];
        // const currentLongitude = JSON.stringify(location.coords.longitude);
        // const currentLatitude = JSON.stringify(location.coords.latitude);
        // console.log(emplocation, 'emplocation.....emp');
        // this.setState({
        //     UserId: this.state.UserId,
        //     Latitude: currentLatitude,
        //     Longitude: currentLongitude,
        //     LogLocation: emplocation.name + "," + emplocation.street + "," + emplocation.city,
        //     DeviceName: this.state.DeviceName,
        //     DeviceOSVersion: this.state.DeviceOSVersion,
        //     CompanyId: this.state.CompanyId,
        //     Reason: this.state.Reason,
        // });
        // this.getData(currentLatitude, currentLongitude)
    };
    _getLocationAsyncforgps = async () => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                alert(hoice)
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
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
                    timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13, marginTop: 5, }}
                    descriptionStyle={{ color: 'gray' }}
                    options={{
                        style: { paddingTop: 5 }
                    }}
                    innerCircle={'dot'}
                />
            </View>
        )
    }

    async createCheckingIn(Latitude,Longitude,loglocation) {
        try {
            const TrackingModel = {
                UserId: this.state.UserId,
                Latitude: Latitude,
                Longitude: Longitude,
                LogLocation: loglocation,
                DeviceName: this.state.DeviceName,
                DeviceOSVersion: this.state.DeviceOSVersion,
                CompanyId: this.state.CompanyId
            };

            this.state.progressVisible = true;
            const response = await CheckIn(TrackingModel);
            if (response && response.isSuccess) {
                console.log("createCheckingIn response", response)
                // this.getEmpTrackingTodayList();
                this.getMyTodayAttendance(this.state.UserId);
                this.state.progressVisible = false

            } else {
                ToastAndroid.show('Something went wrong', ToastAndroid.TOP);
                this.state.progressVisible = false;
            }
        } catch (errors) {
            console.log("createCheckingIn Errors", errors);
            this.state.progressVisible = false;
        }
    }

    createCheckPoint = async (Latitude,Longitude,loglocation) => {
        try {
            this.setState({ progressVisible: true });
            const TrackingModel = {
                UserId: this.state.UserId,
                Latitude: Latitude,
                Longitude: Longitude,
                LogLocation: loglocation,
                DeviceName: this.state.DeviceName,
                DeviceOSVersion: this.state.DeviceOSVersion,
                CompanyId: this.state.CompanyId
            };
            console.log("TrackingModel response", TrackingModel)


            const response = await CheckPoint(TrackingModel);
            if (response && response.isSuccess) {
                console.log("createCheckPoint response", response)

                //  this.getEmpTrackingTodayList();
                this.getMyTodayAttendance(this.state.UserId);

                this.state.progressVisible = false;
            } else {
                ToastAndroid.show('Something went wrong', ToastAndroid.TOP);
                this.state.progressVisible = false;
            }
        } catch (errors) {
            console.log("createCheckPoint Errors", errors);
            this.state.progressVisible = false;
        }
    }

    async createCheckOut(Latitude,Longitude,loglocation) {
        try {
            const TrackingModel = {
                UserId: this.state.UserId,
                Latitude: Latitude,
                Longitude: Longitude,
                LogLocation: loglocation,
                DeviceName: this.state.DeviceName,
                DeviceOSVersion: this.state.DeviceOSVersion,
                CompanyId: this.state.CompanyId
            };

            const response = await CheckOut(TrackingModel)
            this.state.progressVisible = true;
            console.log("CheckOut TrackingModel", TrackingModel);

            if (response && response.isSuccess) {

                console.log("createCheckOut response", response)
                //  this.getEmpTrackingTodayList();
                this.getMyTodayAttendance(this.state.UserId);
                this.state.progressVisible = false;

            } else {
                ToastAndroid.show('Something went wrong', ToastAndroid.TOP);
                this.state.progressVisible = false;
            }
        } catch (errors) {
            console.log("createCheckOut Errors", errors);
            this.state.progressVisible = false;
        }
    }

    getCheckIn = async () => {
       
        this.setState({ pointcheck:"CheckIn"});
        this.setState({ touchabledisablepointcheckin: true, });
        // if (await NetInfo.isConnected.fetch()) {
        this.setState({
            touchabledisable: true,
            progressVisible: true
        });
        console.log('check for getCheckIn', this.state.IsCheckedIn);


        if (this.state.IsCheckedOut === false) {
            if (this.state.IsCheckedIn === false) {


                this.setState({ progressVisible: true, });

                await this.getLoction();
                
                this.setState({ touchabledisablepointcheckin: false, });
            } else {
                this.setState({ progressVisible: false });
                this.setState({ touchabledisablepointcheckin: false, });
                ToastAndroid.show('You have already checked in today', ToastAndroid.TOP);
            }
        } else {
            this.setState({ progressVisible: false });
            this.setState({ touchabledisablepointcheckin: false, });
            ToastAndroid.show('You have already checked out today', ToastAndroid.TOP);
        }

        // } else {
        //     ToastAndroid.show("No Internet Detected", ToastAndroid.TOP);
        // }
    }

    getCheckOut = async () => {

        this.setState({ pointcheck:"CheckOut"});
        this.setState({ touchabledisablepointcheckout: true, });

        this.setState({
            touchabledisable: true,
            progressVisible: true
        });
        console.log('check for getCheckOut', this.state.IsCheckedOut);

        if (this.state.IsCheckedOut == false) {
            if (this.state.IsCheckedIn === true && this.state.IsCheckedOut == false) {
                this.setState({
                    progressVisible: false,
                });
                await this.getLoction();
               
            } else {
                this.setState({ progressVisible: false });
                this.setState({ touchabledisablepointcheckout: false, });
                ToastAndroid.show('You have not checked in today', ToastAndroid.TOP);
            }
        } else {
            this.setState({ progressVisible: false });
            this.setState({ touchabledisablepointcheckout: false, });
            ToastAndroid.show('You have already checked out today', ToastAndroid.TOP);
        }

    }

    getCheckPoint = async () => {
        this.setState({ pointcheck:"CheckPoint"});

        this.setState({ touchabledisablepoint: true, });
        this.setState({
            progressVisible: true
        });
        this.setState({
            touchabledisable: true,
        });
        console.log('check for getCheckPoint', this.state.IsCheckedIn);
        if (this.state.IsCheckedOut === false) {
            if (this.state.IsCheckedIn === true && this.state.IsCheckedOut == false) {

                this.getLoction();
                // console.log("clicked");
                this.setState({
                    progressVisible: false
                });
                this.setState({ touchabledisablepoint: false, });

            } else {
                this.setState({ progressVisible: false });
                ToastAndroid.show('You have not checked in today', ToastAndroid.TOP);
                this.setState({
                    progressVisible: false
                });
                this.setState({ touchabledisablepoint: false, });
            }
        } else {
            this.setState({ progressVisible: false });
            ToastAndroid.show('You have already checked out today', ToastAndroid.TOP);
            this.setState({
                progressVisible: false
            });
            this.setState({ touchabledisablepoint: false, });
        }


    }


    renderTimeStatusList() {
        return (
            <View
                style={MyPanelStyle.TimeInfoBar}>
                <View
                    style={MyPanelStyle.First2TimePanelView}>

                    <View
                        style={MyPanelStyle.AllTimePanelRow}>
                        <Text>
                            {this.state.CheckInTimeVw ?
                                (<AntDesign name="arrowdown"
                                    size={18} color="#07c15d"
                                    style={{ marginTop: 3, }}
                                />) : (<Text
                                    style={MyPanelStyle.TimeStatusText}>
                                    NOT YET
                                    </Text>)
                            }
                        </Text>
                        <Text
                            style={MyPanelStyle.CheckedInText}>
                            {this.state.CheckInTimeVw}
                        </Text>
                    </View>
                    <View style={MyPanelStyle.AllTimePanelRow}>
                        <Text
                            style={MyPanelStyle.TimeStatusText}>
                            CHECKED IN
                        </Text>
                    </View>
                </View>
                <View
                    style={MyPanelStyle.First2TimePanelView}>
                    <View style={MyPanelStyle.AllTimePanelRow}>
                        <Text>
                            {this.state.OfficeStayHour ?
                                (<Entypo name="stopwatch"
                                    size={17} color="#a1b1ff"
                                    style={{
                                        marginTop: 2,
                                        marginRight: 2,
                                    }}
                                />) : (<Text
                                    style={MyPanelStyle.TimeStatusText}>
                                    NOT YET
                                    </Text>)
                            }
                        </Text>
                        <Text
                            style={MyPanelStyle.WorkingTimeText}>
                            {this.state.OfficeStayHour}
                        </Text>
                    </View>
                    <View style={MyPanelStyle.AllTimePanelRow}>
                        <Text
                            style={MyPanelStyle.TimeStatusText}>
                            WORKING TIME
                        </Text>
                    </View>
                </View>
                <View
                    style={MyPanelStyle.Last1TimePanelView}>
                    <View
                        style={MyPanelStyle.AllTimePanelRow}>
                        <Text>
                            {this.state.OfficeStayHour ?
                                (<AntDesign name="arrowup"
                                    size={18}
                                    style={{ marginTop: 3, }}
                                    color="#a1d3ff"
                                />) : (<Text
                                    style={MyPanelStyle.TimeStatusText}>
                                    NOT YET
                                    </Text>)
                            }
                        </Text>
                        <Text style={MyPanelStyle.CheckedOutText}>
                            {this.state.CheckOutTimeVw}
                        </Text>
                    </View>
                    <View style={MyPanelStyle.AllTimePanelRow}>
                        <Text
                            style={MyPanelStyle.TimeStatusText}>
                            CHECKED OUT
                            </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={MyPanelStyle.container}>
                <StatusBarPlaceHolder />
                <View
                    style={MyPanelStyle.HeaderContent}>
                    <View
                        style={MyPanelStyle.HeaderFirstView}>
                        <TouchableOpacity
                            style={MyPanelStyle.HeaderMenuicon}
                            onPress={() => { Actions.drawerOpen(); }}>
                            <Image resizeMode="contain" style={MyPanelStyle.HeaderMenuiconstyle}
                                source={require('../../../../assets/images/menu_b.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={MyPanelStyle.HeaderTextView}>
                            <Text
                                style={MyPanelStyle.HeaderTextstyle}>
                                MY PANEL
                            </Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }>
                    <View
                        style={MyPanelStyle.MainInfoBar}>
                        <View
                            style={MyPanelStyle.MainInfoBarTopRow}>
                            <View style={MyPanelStyle.MainInfoBarTopRowLeft}>
                                {this.state.ImageFileName !== "" ? (
                                    <Image resizeMode='cover' style={
                                        {
                                            ...Platform.select({
                                                ios: {
                                                    width: 80,
                                                    height: 80,
                                                    marginRight: 10,
                                                    borderRadius: 40,
                                                },
                                                android: {
                                                    width: 80,
                                                    height: 80,
                                                    // elevation: 10 ,
                                                    borderRadius: 40,
                                                },
                                            }),
                                        }
                                    } source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + this.state.ImageFileName }} />) :

                                    (<Image style={
                                        {
                                            ...Platform.select({
                                                ios: {
                                                    width: 80,
                                                    height: 80,
                                                    marginRight: 10,
                                                    borderRadius: 40,
                                                },
                                                android: {
                                                    width: 80,
                                                    height: 80,
                                                    // elevation: 10 ,
                                                    borderRadius: 600,
                                                },
                                            }),
                                        }
                                    } resizeMode='contain' source={require('../../../../assets/images/employee.png')} />)}
                                <View
                                    style={MyPanelStyle.TextInfoBar}>
                                    <Text style={MyPanelStyle.UserNameTextStyle}>
                                        {this.state.EmployeeName}
                                    </Text>
                                    <Text style={MyPanelStyle.DesignationTextStyle}>
                                        {this.state.Designation}
                                    </Text>
                                    <Text style={MyPanelStyle.DepartmentTextStyle}>
                                        {this.state.DepartmentName}
                                    </Text>
                                </View>
                            </View>
                            <View style={MyPanelStyle.MainInfoBarTopRowRight}>
                                <TouchableOpacity
                                    onPress={() => this.openModalEditProfile()}
                                    style={MyPanelStyle.EditButtonContainer}>
                                    <Image
                                        resizeMode='contain'
                                        source={require('../../../../assets/images/editprofie.png')}
                                        style={{ width: 47, height: 50 }}>
                                    </Image>
                                </TouchableOpacity>
                            </View >
                        </View>
                    </View>
                    <View>

                        {this.renderTimeStatusList()}
                    </View>
                    <View
                        style={MyPanelStyle.ButtonBar}>
                        <TouchableOpacity
                            disabled={this.state.touchabledisablepointcheckin}
                            onPress={() => this.getCheckIn()}
                            style={MyPanelStyle.ButtonContainer}>
                            <Image
                                resizeMode='contain'
                                source={require('../../../../assets/images/checkin.png')}
                                style={MyPanelStyle.ButtonImage}>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={this.state.touchabledisablepoint}
                            onPress={() => this.getCheckPoint()}
                            style={MyPanelStyle.ButtonContainer}>
                            <Image
                                resizeMode='contain'
                                source={require('../../../../assets/images/checkpoint.png')}
                                style={MyPanelStyle.ButtonImage}>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.touchabledisablepointcheckout}
                            onPress={() => this.getCheckOut()}
                            style={MyPanelStyle.ButtonContainer}>
                            <Image
                                resizeMode='contain'
                                source={require('../../../../assets/images/checkout.png')}
                                style={MyPanelStyle.ButtonImage}>
                            </Image>
                        </TouchableOpacity>
                    </View >

                    <View
                        style={MyPanelStyle.TimeLineMainView}>
                        <View
                            style={MyPanelStyle.TimeLineHeaderBar}>
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: 19.8,
                                    height: 19.8,
                                }}
                                source={require('../../../../assets/images/goal.png')}>
                            </Image>
                            <Text
                                style={MyPanelStyle.TimeLineHeaderText}>
                                Timeline
                            </Text>
                        </View>
                        {this.state.progressVisible == true ?
                            (<ActivityIndicator size="large" color="#1B7F67"
                                style={MyPanelStyle.loaderIndicator} />) : null}
                        <View style={{}}>

                            {this.renderTrackList()}
                        </View>
                    </View>
                </ScrollView>

                <Modal style={[MyPanelStyle.modalForEditProfile]} position={"center"} ref={"modalEditEmp"} isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >

                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <View style={{ alignItems: "flex-start" }}>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => this.refs.modalEditEmp.close()} style={{
                                marginLeft: 0, marginTop: 0,
                            }}>
                                <Image resizeMode="contain" style={{ width: 15, height: 15, marginRight: 17, marginTop: 15 }} source={require('../../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={MyPanelStyle.modelContent}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                                EDIT PROFILE
                        </Text>
                            {this.state.image == null ? (this.state.ImageFileName != "" ? (<Image style={{
                                ...Platform.select({
                                    ios: {
                                        width: 100, height: 100, borderRadius: 50
                                    },
                                    android: {
                                        width: 100,
                                        height: 100,
                                        marginVertical: 12,
                                        borderRadius: 50,
                                        alignSelf: 'center'
                                    },
                                }),
                            }} resizeMode='cover' source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + this.state.ImageFileName }} />) : (<Image style={{
                                ...Platform.select({
                                    ios: {
                                        width: 100, height: 100, borderRadius: 50
                                    },
                                    android: {
                                        width: 100,
                                        height: 100,
                                        marginVertical: 12,
                                        borderRadius: 50,
                                        alignSelf: 'center'
                                    },
                                }),
                            }} resizeMode='contain' source={require('../../../../assets/images/employee.png')} />)) : (<Image style={{
                                ...Platform.select({
                                    ios: {
                                        width: 100, height: 100, borderRadius: 50
                                    },
                                    android: {
                                        width: 100,
                                        height: 100,
                                        marginVertical: 12,
                                        borderRadius: 600,
                                        alignSelf: 'center'
                                    },
                                }),
                            }} resizeMode='contain' source={{ uri: this.state.image }} />)}

                        </View>

                        <View style={{
                            marginTop: -60,
                            marginLeft: "27%",
                        }}>
                            <TouchableOpacity onPress={() => this.openmodalForImage()}>
                                <Image resizeMode="contain" style={{
                                    width: 40,
                                    height: 40,

                                }} source={require('../../../../assets/images/photo_camera.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        {this.state.progressVisible == true ?
                            (<ActivityIndicator size="large" color="#1B7F67"
                                style={MyPanelStyle.loaderIndicator} />) : null}
                        <View style={{ width: "100%" }}>

                            <TextInput
                                style={{ height: 40, margin: 15, padding: 5, backgroundColor: "#f1f4f6", borderRadius: 10, }}
                                value={this.state.EmployeeName}
                                placeholder="Name"
                                placeholderTextColor="#dee1e5"
                                autoCapitalize="none"
                                onChangeText={text => this.setState({ EmployeeName: text })}
                            >
                            </TextInput>
                            <TextInput
                                style={{ height: 40, margin: 15, padding: 5, marginTop: 0, backgroundColor: "#f1f4f6", borderRadius: 10, }}
                                value={this.state.mobile}
                                placeholder="Phone"
                                editable={false}
                                placeholderTextColor="#dee1e5"
                                autoCapitalize="none"
                            >
                            </TextInput>
                            <TextInput
                                style={{ height: 40, margin: 10, marginTop: 0, padding: 5, backgroundColor: "#f1f4f6", borderRadius: 10, }}
                                value={this.state.Designation}
                                placeholder="Gmail"
                                placeholderTextColor="#dee1e5"
                                autoCapitalize="none"
                                onChangeText={text => this.setState({ Designation: text })}
                            >
                            </TextInput>
                        </View>
                    </View>
                    <TouchableOpacity style={MyPanelStyle.addPeopleBtn} onPress={() => this.closeModalEditProfile()} >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Save</Text>
                    </TouchableOpacity>
                </Modal>
                <Modal
                    style={NoticeStyle.ImagemodalContainer}
                    position={"center"}
                    ref={"modalForImage"}
                    isDisabled={this.state.isDisabled}
                    backdropPressToClose={true}
                    swipeToClose={false}
                >
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>
                        <View
                            style={{ alignItems: "flex-start" }}>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity
                                onPress={() => this.refs.modalForImage.close()}
                                style={NoticeStyle.modalClose}>
                                <Image
                                    resizeMode="contain"
                                    style={NoticeStyle.closeImage}
                                    source={require('../../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={NoticeStyle.addPhotoText}>Add Photos</Text>
                        </View>
                        <View style={NoticeStyle.cemaraImageContainer}>
                            <TouchableOpacity onPress={() => this._takePhoto()} style={{ alignItems: "center", paddingLeft: 35 }}>
                                <Image resizeMode='contain' style={{ height: 36, width: 36, }} source={require('../../../../assets/images/photo_camera_black.png')}></Image>
                                <Text style={NoticeStyle.takePhotoText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._pickImage()} style={{ alignItems: 'center', paddingRight: 35 }}>
                                <Image resizeMode='contain' style={{ height: 36, width: 36, }} source={require('../../../../assets/images/Gallary.png')}></Image>
                                <Text style={NoticeStyle.takePhotoText}>From Gallary</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20, paddingTop: 0,

        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
});