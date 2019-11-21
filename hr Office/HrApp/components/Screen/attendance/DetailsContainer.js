import React, { Component } from 'react';
import { View, Image, AsyncStorage } from 'react-native';

import { Router, Stack, Scene, Drawer, SideMenu, } from 'react-native-router-flux'
import DailyAttendanceDetails from './DailyAttendanceDetails';
import TaskList from '../tasks/TaskList';
import DailyAttendance from './DailyAttendance';
import LeaveList from '../leaves/LeaveList';
import LandingScreen from '../../../LandingScreen/LandingScreen';
import app from '../../../AppNavigator';

export default class DetailsContainer extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      itemlist: {},
      UserId: null,
    }
  }
  async componentDidMount()
  {
    await AsyncStorage.setItem("AttendanceUserId", this.props.aItem.UserId);
    console.log("UserId", this.props.aItem.UserId);
    this.setState({ itemlist: this.props.aItem });
  }

  render()
  {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>

          <Scene
            key="tabbar"
            tabs={true}
            tabBarStyle={{ backgroundColor: '#FFFFFF', }}
            labelStyle={{ fontSize: 14, padding: 5 }}
            activeBackgroundColor="white"
            activeTintColor="#26065c"
            inactiveBackgroundColor=" #FFFFFF"
            inactiveTintColor="#9e9e9e"
          >

            <Scene key="DailyAttendanceDetails" title="Location" hideNavBar={true}
              icon={({ focused }) => (
                focused ?
                  <Image source={require('../../../assets/images/pin_s.png')} style={{ height: 20, width: 20, marginTop: 15 }}></Image>
                  :
                  <Image source={require('../../../assets/images/pin.png')} style={{ height: 20, width: 20, marginTop: 15 }}></Image>
              )}>
              <Scene
                key="DailyAttendanceDetails"
                component={DailyAttendanceDetails}
                title="Location"
                initial
              />
            </Scene>

           

            <Scene key="LeaveList" title="LEAVES" hideNavBar={true}
              icon={({ focused }) => (
                focused ?
                  <Image source={require('../../../assets/images/briefcase_s.png')} style={{ height: 20, width: 20, marginBottom: 5, marginTop: 15, }}></Image>
                  :
                  <Image source={require('../../../assets/images/briefcase.png')} style={{ height: 20, width: 20, marginBottom: 5, marginTop: 15, }}></Image>
              )}>
              <Scene
                key="LeaveList"
                component={LeaveList}
                title="TASKS"
                initial
              />
            </Scene>

          </Scene>

          <Scene key="LandingScreen" component={LandingScreen} />

          <Scene key="DailyAttendance" component={DailyAttendance} />


          <Scene key="app" component={app} />
        </Stack>
      </Router>
    )
  }
}







