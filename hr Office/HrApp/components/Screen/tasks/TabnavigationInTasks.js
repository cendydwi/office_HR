import React, { Component } from 'react';
import { View, Image } from 'react-native';

import { Router, Stack, Scene, Drawer, SideMenu, } from 'react-native-router-flux';
import TaskListScreen  from './TaskList';
import TaskBoardScreen from './TaskBoard';
import CreateTask from './CreateTask';
import ViewTask from './ViewTask';
import TaskBordDetail from './TaskBordDetail';
import TaskListByGroupId from './TaskListByGroupId';
import LandingScreen from '../../../LandingScreen/LandingScreen';
import app from '../../../AppNavigator'


export default class TabnavigationInTasks extends Component
{

  render()
  {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>

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
            
            <Scene key="TaskListScreen" title="TASKS" hideNavBar={true}
              icon={({ focused }) => (
                focused ?
                  <Image source={require('../../../assets/images/list_s.png')} style={{ height: 20, width: 20, marginBottom:5,marginTop:15, }}></Image>
                  :
                  <Image source={require('../../../assets/images/list_a.png')} style={{ height: 20, width: 20, marginBottom:5,marginTop:15, }}></Image>
              )}>
              <Scene
                key="TaskListScreen"
                component={TaskListScreen}
                title="TASKS"
                initial
              />
            </Scene>

            <Scene key="TaskBoardScreen" title="BOARDS" hideNavBar={true} 
          //  tabBarLabel="Board"
            icon={({ focused }) => (
              focused ?
                <Image source={require('../../../assets/images/Board_s.png')} style={{ height: 20, width: 20, marginBottom:5,marginTop:15, }}></Image>
                :
                <Image source={require('../../../assets/images/Board.png')} style={{ height: 20, width: 20, marginBottom:5,marginTop:15,}}></Image>
            )}>
            
            <Scene
              key="TaskBoardScreen"
              component={TaskBoardScreen}
              title="Board"
              //titleStyle={{marginTop:10,}}
            />
          </Scene>


          </Scene>

          <Scene key="CreateTask" component={CreateTask} />
          <Scene key="ViewTask" component={ViewTask} />
          <Scene key="LandingScreen" component={LandingScreen} />
          <Scene key="TaskBordDetail" component={TaskBordDetail} />
          <Scene key="app" component={app} />
          <Scene key="TaskListByGroupId" component={TaskListByGroupId} />
          <Scene key="TaskListScreen" component={TaskListScreen} />


        </Scene>
      </Router>
    )
  }
}







