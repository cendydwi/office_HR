import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image } from 'react-native';
import Login from './components/Login';
import Register from './components/Register';
import DailyAttendance from './components/Screen/attendance/DailyAttendance';
import DailyAttendances from './components/Screen/UserScreen/attendance/DailyAttendance';
import DailyAttendanceDetails from './components/Screen/attendance/DailyAttendanceDetails';
import UserSpecificTasks from './components/Screen/attendance/UserSpecificTasks';
import UserSpecificLeave from './components/Screen/attendance/UserSpecificLeave';
import { Router, Stack, Scene, Drawer, ActionConst, Tabs } from 'react-native-router-flux';
import DrawerContent from './components/MenuDrawer/DrawerContent';
import AuthLoadingScreen from './login/AuthLoadingScreen';
import SettingScreen from './components/Screen/setting/Setting';
import DepartmentSetupScreen from './components/Screen/department/DepartmentSetupScreen';
import EmployeeSetupScreen from './components/Screen/employees/EmployeeSetupScreen';
import CreateEmployeeScreen from './components/Screen/employees/CreateEmployeeScreen';
import CompanysetupScreen from './components/Screen/company/CompanysetupScreen';
import ReportScreen from './components/Screen/reports/ReportScreen';
import TaskListScreen from './components/Screen/tasks/TaskList';
import CompleteTaskFilter from './components/Screen/tasks/CompleteTaskFilter';
import TaskBoardScreen from './components/Screen/Board/TaskBoard';
import ViewTask from './components/Screen/tasks/ViewTask';
import CreateTask from './components/Screen/tasks/CreateTask';
import CreateTaskForBoard from './components/Screen/Board/CreateTaskForBoard';
import TaskBordDetail from './components/Screen/Board/TaskBordDetail';
import ViewBoardTask from './components/Screen/Board/ViewBoardTask';

import LeaveList from './components/Screen/leaves/LeaveList';
import LeaveListUser from './components/Screen/UserScreen/leaves/LeaveList';
import LeaveApply from './components/Screen/UserScreen/leaves/LeaveApply';
import CreateNotice from './components/Screen/notice/CreateNotice'
import NoticeDetail from './components/Screen/notice/NoticeDetail'
import Notice from './components/Screen/notice/Notice';
import NoticeUser from './components/Screen/UserScreen/notice/Notice';
import NoticeDetailUser from './components/Screen/UserScreen/notice/NoticeDetail';
import DetailScreen from './components/Screen/reports/DetailScreen';
import MyPanel from './components/Screen/UserScreen/myPanel/MyPanel';

import MyTask from './components/Screen/UserScreen/tasks/MyTask';
import CreateByMe from './components/Screen/UserScreen/tasks/CreateByMe';
import ViewAssignToMe from './components/Screen/UserScreen/tasks/ViewAssignToMe';
import LeaderBoardScreen from './components/Screen/leaderboard/LeaderBoardScreen';



export default class AppNavigator extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="auth" component={AuthLoadingScreen} hideNavBar={true} />
          <Scene key="login" component={Login} title="Login" back={false} hideNavBar={true} />
          <Scene key="register" component={Register} title="Register" hideNavBar={true} />
          <Scene key="DrawerContent" component={DrawerContent} hideNavBar={true} />

          <Drawer
            key="drawer"
            drawerImage={{ uri: null }}
            contentComponent={DrawerContent}
            type={ActionConst.RESET}
            hideDrawerButton={false}
            hideNavBar={true}>

            <Scene key="DailyAttendance" component={DailyAttendance} hideNavBar={true} />
            <Scene key="DailyAttendances" component={DailyAttendances} hideNavBar={true} />
            <Scene key="auth" component={AuthLoadingScreen} hideNavBar={true} />
            <Scene key="SettingScreen" component={SettingScreen} hideNavBar={true} />
            <Scene key="ReportScreen" component={ReportScreen} hideNavBar={true} />
            <Scene key="TaskBoardScreen" component={TaskBoardScreen} hideNavBar={true} />
            <Scene key="MyPanel" component={MyPanel} hideNavBar={true} />
            <Scene key="LeaveList" component={LeaveList} hideNavBar={true} />
            <Scene key="LeaveListUser" component={LeaveListUser} hideNavBar={true} />
            <Scene key="LeaveApply" component={LeaveApply} hideNavBar={true} />
            <Scene key="Notice" component={Notice} hideNavBar={true} />
            <Scene key="CreateNotice" component={CreateNotice} hideNavBar={true} />
            <Scene key="NoticeUser" component={NoticeUser} hideNavBar={true} />
            <Scene key="LeaderBoard" component={LeaderBoardScreen} hideNavBar={true} />

            <Tabs
              key="DetailsContainer"
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
                    <Image source={require('./assets/images/pin_s.png')} resizeMode='contain' style={{ height: 20, width: 20, marginTop: 15 }}></Image>
                    :
                    <Image source={require('./assets/images/pin.png')} resizeMode='contain' style={{ height: 20, width: 20, marginTop: 15 }}></Image>
                )}>
                <Scene
                  key="DailyAttendanceDetails"
                  component={DailyAttendanceDetails}
                  title="Location"
                  initial
                />
              </Scene>
              <Scene key="UserSpecificTasks" title="Tasks" hideNavBar={true}
                icon={({ focused }) => (
                  focused ?
                    <Image source={require('./assets/images/list_s.png')} resizeMode='contain' style={{ height: 20, width: 20, marginBottom: 5, marginTop: 15, }}></Image>
                    :
                    <Image source={require('./assets/images/list_a.png')} resizeMode='contain' style={{ height: 20, width: 20, marginBottom: 5, marginTop: 15, }}></Image>
                )}>
                <Scene
                  key="UserSpecificTasks"
                  component={UserSpecificTasks}
                  title="Tasks"
                  initial
                />
              </Scene>
              <Scene key="UserSpecificLeave" title="Leave" hideNavBar={true}
                icon={({ focused }) => (
                  focused ?
                    <Image source={require('./assets/images/briefcase_s.png')} resizeMode='contain' style={{ height: 20, width: 20, marginBottom: 5, marginTop: 15, }}></Image>
                    :
                    <Image source={require('./assets/images/briefcase.png')} resizeMode='contain' style={{ height: 20, width: 20, marginBottom: 5, marginTop: 15, }}></Image>
                )}>
                <Scene
                  key="UserSpecificLeave"
                  component={UserSpecificLeave}

                  title="Leave"
                  initial
                />
              </Scene>
              
            </Tabs>
            <Tabs
              key="TabnavigationInTasks"
              tabs={true}
              tabBarStyle={{ backgroundColor: '#FFFFFF', }}
              tabStyle={{ flexDirection: 'row', }}
              labelStyle={{ fontSize: 14, marginTop: 12, marginRight: 60, }}
              activeBackgroundColor="white"
              activeTintColor="#26065c"
              inactiveBackgroundColor=" #FFFFFF"
              inactiveTintColor="#9e9e9e"
            >
              <Scene key="TaskListScreen" title="Pending" hideNavBar={true}
                icon={({ focused }) => (
                  focused ?
                    <Image source={require('./assets/images/list_s.png')} style={{ height: 20, width: 20, marginTop: 15, marginLeft: 25, }} resizeMode="contain"></Image>
                    :
                    <Image source={require('./assets/images/list_a.png')} style={{ height: 20, width: 20, marginTop: 15, marginLeft: 25, }} resizeMode="contain"></Image>
                )}>
                <Scene
                  key="TaskListScreen"
                  component={TaskListScreen}
                  title="Pending"
                  initial
                  titleStyle={{ color: "red" }}
                />
              </Scene>
              <Scene key="CompleteTaskFilter" title="Completed" hideNavBar={true}

                icon={({ focused }) => (
                  focused ?
                    <Image source={require('./assets/images/com.png')} resizeMode='contain' style={{ height: 20, width: 20, marginTop: 15, marginLeft: 5, }}></Image>
                    :
                    <Image source={require('./assets/images/com_a.png')} resizeMode='contain' style={{ height: 20, width: 20, marginTop: 15, marginLeft: 5, }}></Image>
                )}>
                <Scene
                  key="CompleteTaskFilter"
                  component={CompleteTaskFilter}
                  title="Completed"
                />
              </Scene>
            </Tabs>
                       {/* .....................User Part............ */}

                       <Tabs
              key="userTask"
              tabBarStyle={{ backgroundColor: '#FFFFFF', }}
              labelStyle={{ fontSize: 14, padding: 5 }}
              hideNavBar={true}
            >
              <Stack key="MyTask" title="Assigned to Me" hideNavBar={true}
                icon={({ focused }) => (
                  focused ?
                    <MaterialCommunityIcons name="account-arrow-left" size={23} color="#2c82a1"
                      style={{ marginTop: 10 }} />
                    :
                    <MaterialCommunityIcons name="account-arrow-left" size={23} color="#4a535b"
                      style={{ marginTop: 10 }} />
                )}>

                <Scene
                  key="MyTask"
                  component={MyTask}
                  title="Assigned to Me"
                  initial
                />

              </Stack>

              <Stack key="CreateByMe" title="Created By Me" hideNavBar={true}
                icon={({ focused }) => (
                  focused ?
                    <MaterialCommunityIcons name="card-bulleted-outline" size={30} color="#2c82a1"
                      style={{ marginTop: 10 }} />
                    :
                    <MaterialCommunityIcons name="card-bulleted-outline" size={30} color="#4a535b"
                      style={{ marginTop: 10 }} />
                )}>
                <Scene
                  key="CreateByMe"
                  component={CreateByMe}
                  title="Created By Me"
                />
              </Stack>
            </Tabs>

          </Drawer>

          <Scene key="ReportScreen" component={DepartmentSetupScreen} hideNavBar={true} />

          <Scene key="DepartmentSetupScreen" component={DepartmentSetupScreen} hideNavBar={true} />
          <Scene key="EmployeeSetupScreen" component={EmployeeSetupScreen} hideNavBar={true} />
          <Scene key="EmployeeCreateScreen" component={CreateEmployeeScreen} hideNavBar={true} />
          <Scene key="CompanysetupScreen" component={CompanysetupScreen} hideNavBar={true} />

          <Scene key="NoticeDetail" component={NoticeDetail} hideNavBar={true} />
          <Scene key="NoticeDetailUser" component={NoticeDetailUser} hideNavBar={true} />

          <Scene key="DetailScreen" component={DetailScreen} hideNavBar={true} />

          <Scene key="TaskListScreen" component={TaskListScreen} hideNavBar={true} />
          <Scene key="CompleteTaskFilter" component={CompleteTaskFilter} hideNavBar={true} />
          <Scene key="CreateTask" component={CreateTask} hideNavBar={true} />
          <Scene key="CreateTaskForBoard" component={CreateTaskForBoard} hideNavBar={true} />
          <Scene key="TaskBordDetail" component={TaskBordDetail} hideNavBar={true} />
          <Scene key="ViewBoardTask" component={ViewBoardTask} hideNavBar={true} />
          <Scene key="ViewTask" component={ViewTask} hideNavBar={true} />
          <Scene key="MyTask" component={MyTask} hideNavBar={true}/>
          <Scene key="ViewAssignToMe" component={ViewAssignToMe} hideNavBar={true} />

        </Stack>
      </Router>
    )
  }
}
