import React, { Component } from 'react';
import {
    loadFromStorage,
    storage,
    CurrentUserProfile
} from "../../../common/storage";
import AdminTodayAttendance from '../attendance/AdminTodayAttendance';
import DailyAttendances  from '../UserScreen/attendance/DailyAttendance';
export default class DailyAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: 'admin'
        }
    }

    async  componentDidMount() {
        var userDetails = await loadFromStorage(storage, CurrentUserProfile);
        this.setState({ userType: userDetails.item.UserType })
        global.userType=userDetails.item.UserType;
    };

    render() {
        if(this.state.userType=='admin'){
            return (<AdminTodayAttendance/>);
        }
        else{
            return (<DailyAttendances/>)
        }
     };
}