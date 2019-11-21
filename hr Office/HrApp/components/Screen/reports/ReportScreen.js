
import React from 'react';
import {  Platform, StatusBar, Picker,  TouchableOpacity, View, Text, FlatList, Image,  ActivityIndicator, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import { ReportStyle } from './ReportStyle';
import ModalSelector from 'react-native-modal-selector';

import { GetAllEmployeeAttendanceWithMonth } from '../../../services/Report'
import { CommonStyles } from '../../../common/CommonStyles';
import { DailyAttendanceStyle } from "../attendance/DailyAttendanceStyle"
import moment from 'moment';

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


export default class ReportScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            yearList: [
                { label: '2019', key: '2019' },
                { label: '2020', key: '2020' },
                { label: '2021', key: '2021' },
                { label: '2022', key: '2022' },
                { label: '2023', key: '2023' },
                { label: '2024', key: '2024' },
                { label: '2025', key: '2025' },
                { label: '2026', key: '2026' },
                { label: '2027', key: '2027' },
                { label: '2028', key: '2028' },
                { label: '2029', key: '2029' },
                { label: '2030', key: '2030' },
              ],
              monthList: [
                { label: 'January', key: '1' },
                { label: 'February', key: '2' },
                { label: 'March', key: '3' },
                { label: 'April', key: '4' },
                { label: 'May', key: '5' },
                { label: 'June', key: '6' },
                { label: 'July', key: '7' },
                { label: 'August', key: '8' },
                { label: 'September', key: '9' },
                { label: 'October', key: '10' },
                { label: 'November', key: '11' },
                { label: 'December', key: '12' },
            ],
            VistNumber: moment(new Date()).format("MMMM"),
            year: moment(new Date()).format("YYYY"),
            workingReportList: [],
            companyId: 0,
            progressVisible: false,
        }
    }


    componentDidMount() {
        this.GetAllEmployeeAttendanceWithMonth();
    }
    goBack() {
        Actions.pop();
    }
    selectedItem = async (itemValue) => {
        this.setState({ VistNumber: itemValue })
        this.GetAllEmployeeAttendanceWithMonth();

    }
    GetAllEmployeeAttendanceWithMonth = async () => {
        try {
            const cId = await AsyncStorage.getItem("companyId");
            this.setState({ companyId: cId });
            this.setState({ progressVisible: true });
            await GetAllEmployeeAttendanceWithMonth(cId, this.state.VistNumber, this.state.year)
                .then(res => {
                    this.setState({ workingReportList: res.result });
                    this.setState({ progressVisible: false });

                })
                .catch(() => {
                    this.setState({ progressVisible: false });
                    console.log("error occured");
                });

        } catch (error) {
            this.setState({ progressVisible: false });
            console.log(error);
        }
    }


    selectedItemYear = async (itemValue) => {
        this.setState({ year: itemValue })
        this.GetAllEmployeeAttendanceWithMonth();
    }
    goToDetail(item) {
        actions.push("DetailScreen", { detailItem: item, month: this.state.VistNumber, year: this.state.year })
        //  Actions.DetailScreen();
    }
    renderDropDownMonth() {
        if (Platform.OS === 'android') {
          return (
            <Picker
            selectedValue={this.state.VistNumber}
            itemStyle={{ borderWidth: 1, borderColor: 'red', fontSize: 12, fontWeight: '500', padding: 0, borderColor: '#798187', borderRadius: 10, borderWidth: 1 }}
            style={{ height: 50, width: 130, borderWidth: 1, marginTop: -15, padding: 0, borderColor: '#798187', borderRadius: 10, }}
            onValueChange={(itemValue, itemIndex) =>
                this.selectedItem(itemValue)
            }>
            <Picker.Item label={this.state.VistNumber} value={this.state.VistNumber} />
            {this.state.monthList.map((item, key) => {
                return <Picker.Item value={item.key} label={item.label} key={key} />
            })}
        </Picker>
          )
        } else {
          return (
            <ModalSelector
              style={CommonStyles.ModalSelectorStyle}
              data={this.state.monthList}
              initValue={this.state.selectedMonth}
              onChange={(option) => {
                const newUser = option.key
                this.selectedItem(newUser)
              }}
            />
          )
        }
      }
      renderDropDownYear() {
        if (Platform.OS === 'android') {
          return (
            <Picker
                            selectedValue={this.state.year}
                            itemStyle={{ borderWidth: 1, borderColor: 'red', fontSize: 12, padding: 0, borderColor: 'black', borderRadius: 10, borderWidth: 1 }}
                            style={{ height: 50, width: 100, borderWidth: 1, marginTop: -15, padding: 0, borderColor: 'black', borderRadius: 10, }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.selectedItemYear(itemValue)
                            }>
                            {this.state.yearList.map((item, key) => { return <Picker.Item value={item.key} label={item.label} key={key} /> })}
                        </Picker>
          )
        } else {
          return (
            <ModalSelector
              style={CommonStyles.ModalSelectorStyle}
              data={this.state.yearList}
              initValue={this.state.year}
              onChange={(option) => {
                const newUser = option.key
                this.selectedItemYear(newUser)
              }}
            />
          )
        }
      }
    render() {
        return (
            <View style={ReportStyle.container}>
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
                                ATTENDANCE REPORT
                            </Text>
                        </View>

                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10, marginBottom: 0, padding: 10, paddingBottom: 0, }}>
                    <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
                        <Text style={{ color: '#d2d6d9', fontFamily: 'PRODUCT_SANS_BOLD', fontSize: 16 }}>Month:</Text>
                       {this.renderDropDownMonth()}

                    </View>
                    <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
                        <Text style={{ color: '#d2d6d9', fontFamily: 'PRODUCT_SANS_BOLD', fontSize: 16 }}>Year:</Text>
                       {this.renderDropDownYear()}
                    </View>
                </View>
                {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={ReportStyle.loaderIndicator} />) : null}
                <FlatList

                    data={this.state.workingReportList}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => this.goToDetail(item)}>
                            <View style={
                                DailyAttendanceStyle.FlatListTouchableOpacitywork
                            }>
                                <View
                                    style={
                                        DailyAttendanceStyle.FlatListLeft
                                    }>
                                    <View style={{ paddingRight: 10, }}>
                                        {item.ImageFileName !== "" ?
                                            <Image resizeMode="contain" style={
                                                DailyAttendanceStyle.ImageLocal
                                            } source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + item.ImageFileName }} /> : <Image style={
                                                DailyAttendanceStyle.ImagestyleFromServer
                                            } resizeMode='contain' source={require('../../../assets/images/employee.png')} />}



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
                                <View style={DailyAttendanceStyle.TimeContainerwork}>
                                    <View
                                        style={
                                            DailyAttendanceStyle.TimeContentwork
                                        }>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text
                                                style={
                                                    [DailyAttendanceStyle.CheckintimeStyle, { color: '#c49602' }]
                                                }>
                                                Present:
                                                </Text>

                                            <Text
                                                style={
                                                    [DailyAttendanceStyle.CheckintimeStyle, { color: '#c49602' }]
                                                }>
                                                {item.TotalPresent} d
                                            </Text>
                                        </View>
                                        <Text style={
                                            DailyAttendanceStyle.CheckinTimeText
                                        }>
                                            {item.CheckInTimeVw !== "" ? item.CheckInTimeVw : ("")}

                                        </Text>

                                    </View>

                                    <View
                                        style={
                                            DailyAttendanceStyle.CheckOutTimeView
                                        }>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text
                                                style={
                                                    [DailyAttendanceStyle.CheckOutTimetext, { color: '#3b875e' }]
                                                }>
                                                Completed:
                                            </Text>
                                            <Text
                                                style={
                                                    [DailyAttendanceStyle.CheckOutTimetext, { color: '#3b875e' }]
                                                }>
                                                {item.TotalStayTime} h
                                            </Text>
                                        </View>
                                        <Text style={
                                            DailyAttendanceStyle.CheckOutTimeText
                                        }></Text>
                                    </View>

                                    <View
                                    style={
                                        DailyAttendanceStyle.CheckOutTimeView
                                    }>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text
                                            style={
                                                [DailyAttendanceStyle.CheckOutMissingTimeText, { color: '#FF0000' }]
                                            }>
                                            No Checked Out:
                                        </Text>
                                        <Text
                                            style={
                                                [DailyAttendanceStyle.CheckOutMissingTimeText, { color: '#FF0000' }]
                                            }>
                                            {item.TotalCheckedOutMissing} d
                                        </Text>
                                    </View>
                                    <Text style={
                                        DailyAttendanceStyle.CheckOutMissingTimeText
                                    }></Text>
                                </View>

                                </View>
                            </View>
                            <View style={{ borderBottomColor: '#edeeef', borderBottomWidth: 1, marginLeft: "24%", marginRight: 10, }}></View>
                        </TouchableOpacity>
                    }>
                    }
                    </FlatList>

                    
            </View>
        );
    }
}
