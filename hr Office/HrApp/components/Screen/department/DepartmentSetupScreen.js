import React from 'react';
import { Platform, ToastAndroid, StatusBar, AsyncStorage, Alert, View, BackHandler, Text, FlatList, Image, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { FontAwesome } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import { NoticeStyle } from "../notice/NoticeStyle"
import { DepartmentSetupStyle } from './DepartmentSetupStyle'
import { GetDepartmentByCompanyId, CreateDepartment, updatedepartment } from "../../../services/DepartmentService";
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
function StatusBarPlaceHolder()
{
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
export default class DepartmentSetupScreen extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            CompanyId: 0,
            departmentList: [],
            DeptName: '',
            DeptId: '',
            companyList: [],
            numberofrefrash: 0,
            Dept: {
                DepartmentName: '',
            },

            refreshing: false,
        }
    }

    openModal6()
    {
        this.refs.modal6.open();
    }
    closeModal6()
    {
        if(this.state.Dept.DepartmentName==""){
            ToastAndroid.show('Department name can not be empty', ToastAndroid.TOP);
        }else{
            this.onFetchDepartmentRecords();
            this.refs.modal6.close();
        }
      
        
    }
    async onFetchDepartmentRecords()
    {
        console.log("trying Department create..");
        //  this.getCompany();
      
        try
        {
            if(this.state.companyId=="")
            {
                ToastAndroid.show("At first create a company.",ToastAndroid.SHORT);
                return;
            }
            
            let Departmentodel = {
                DepartmentName: this.state.Dept.DepartmentName,
                CompanyId: this.state.CompanyId,
            };
            console.log(Departmentodel);
            let response = await CreateDepartment(Departmentodel);
            if (response && response.isSuccess)
            {
                console.log('com', response);
                ToastAndroid.show('Department created successully', ToastAndroid.TOP);
                this.state.departmentList.push({ Value: response.result.Id, Text: response.result.DepartmentName })
                const depList = [];
                Object.assign(depList, this.state.departmentList);
                console.log('tttt', depList);
                this.setState(
                    { departmentList: depList }
                )

                console.log('dept', this.state.departmentList);
                // this.setState(Object.assign(this.state.Employee, { DepartmentId: this.state.departmentList[0].Value }));
                this.setState({ DepartmentId: this.state.departmentList[0].Value });
                this.setState({ PickerSelectedVal: this.state.departmentList[0].Value });
                this.setState({ DepartmentName: '' })
                // getDepartment();
                console.log('deptlist', this.state.departmentList);
            } else
            {
                ToastAndroid.show('error', ToastAndroid.TOP);
            }
        } catch (errors)
        {
            console.log(errors);
        }
   
    }

    handleBackButton = () => {
       
        this.goBack();
        return true;
     }
    goBack()
    {
        Actions.pop();
    }

    componentDidMount()
    {
        this.getDepartment()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillMount()
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    openModal3()
    {
        this.getCompany();
        this.refs.modal3.open()
    }

    _EditDept = async (item) =>
    {
        this.testmethos(item);
        this.refs.modalupdate.open();
    }

    testmethos = async (item) =>
    {
        this.setState({ DeptName: item.Text })
        this.setState({ DeptId: item.Value })

    }

    closemodalForupdate()
    {
        if (this.state.DeptName == "")
        {
            ToastAndroid.show('Field can not be empty', ToastAndroid.TOP);

        }
        else
        {
            this.refs.modalupdate.close();
            this.updateDept();
        }
    }
    updateDept = async () =>
    {
        if(this.state.DeptName!==""){
        try
        {
            let deparment = {
                Id: this.state.DeptId,
                CompanyId: this.state.CompanyId,
                DepartmentName: this.state.DeptName,
            };
            let response = await updatedepartment(deparment);
            console.log('deparment..', response);
            if (response && response.isSuccess)
            {
                this.getDepartment();
            } else
            {

                ToastAndroid.show('Invalid Input', ToastAndroid.TOP);

            }
        } catch (errors)
        {
            console.log(errors);
        }
    }else{
        ToastAndroid.show('Department can not be empty', ToastAndroid.TOP);
    }
    }

    getDepartment = async () =>
    {
        try
        {
            this.setState({ progressVisible: true })
            const cId = await AsyncStorage.getItem("companyId");

            this.setState({ CompanyId: cId })
            await GetDepartmentByCompanyId(cId)
                .then(res =>
                {

                    if (res.result !== null)
                    {

                        if (res.result.length > 0)
                        {
                            const depList = [];
                            res.result.forEach(function (item)
                            {
                                const ob = {
                                    'Text': item.DepartmentName,
                                    'Value': item.Id
                                }
                                depList.push(ob);
                            });
                            this.setState(
                                { departmentList: depList }
                            )
                            this.setState({ progressVisible: false })
                        }
                    } else
                    {
                        this.setState(
                            { departmentList: [] })
                        this.setState({ progressVisible: false })
                    }
                })
                .catch(() =>
                {
                    this.setState({ progressVisible: false })
                    console.log("error occured");
                });
        } catch (error)
        {
            this.setState({ progressVisible: false })
            console.log(error);
        }
    }

    render()
    {
        return (
            <View style={DepartmentSetupStyle.container}>
                <StatusBarPlaceHolder />
                <View style={NoticeStyle.headerBarforCompany}>

                    <View
                        style={NoticeStyle.backIcon}>
                        <TouchableOpacity
                            style={NoticeStyle.backIconTouch}
                            onPress={() => { Actions.pop() }}>
                            <Image resizeMode="contain" style={{ width: 20, height: 20, }}
                                source={require('../../../assets/images/left_arrow.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={NoticeStyle.headerTitle}>
                            <Text
                                style={NoticeStyle.headerTitleText}>
                                DEPARTMENT SETUP
                            </Text>
                        </View>
                    </View>

                    <View
                        style={NoticeStyle.createNoticeButtonContainer}>
                        <View
                            style={NoticeStyle.ApplyButtonContainer}>
                            <TouchableOpacity
                                onPress={() => this.openModal6()}
                                style={NoticeStyle.ApplyButtonTouch}>
                                <View style={NoticeStyle.plusButtonforCompany}>
                                    <FontAwesome
                                        name="plus" size={18} color="#ffffff">
                                    </FontAwesome>
                                </View>
                                <View style={NoticeStyle.ApplyTextButtonforNotice}>
                                    <Text style={NoticeStyle.ApplyButtonText}>
                                        NEW
                                 </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={DepartmentSetupStyle.FlatListContainer}>
                    {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, justifyContent: 'center', alignContent: 'center', }} />) : null}
                    <FlatList
                        data={this.state.departmentList}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) =>
                            <View style={DepartmentSetupStyle.flatlistLeftItemcontainer}>
                                <View style={DepartmentSetupStyle.DepartmentNameTextCon}>
                                    <Text style={DepartmentSetupStyle.DepartmentText}>{item.Text}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this._EditDept(item)}>
                                    <View style={DepartmentSetupStyle.EditContainer}>
                                        <Image style={DepartmentSetupStyle.EditImage} source={require('../../../assets/images/edit.png')}></Image>
                                        <Text style={DepartmentSetupStyle.EditText}>Edit</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>
                <Modal style={[DepartmentSetupStyle.modalforDept]} position={"center"} ref={"modal6"} isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    onOpened={() => this.setState({ floatButtonHide: true })}
                >
                    <View style={DepartmentSetupStyle.modalheaderContainer}>
                        <View style={DepartmentSetupStyle.Leftheader}></View>
                        <View style={DepartmentSetupStyle.RightHeader}>
                            <TouchableOpacity onPress={() => this.refs.modal6.close()} style={DepartmentSetupStyle.MenuBackTouch}>
                                <Image resizeMode="contain" style={DepartmentSetupStyle.modalCloseImage} source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={DepartmentSetupStyle.modelContent}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                            Add Department
                        </Text>
                    </View>
                    <View style={{ alignSelf: "center" }}>
                        <TextInput style={DepartmentSetupStyle.TextInputStyle} placeholder="Department Name"
                            placeholderTextColor="#cbcbcb"
                            returnKeyType="next" autoCorrect={false}
                            onChangeText={(ename) =>
                            {
                                this.setState(Object.assign(this.state.Dept, { DepartmentName: ename }));

                            }}
                        />
                        <TouchableOpacity style={DepartmentSetupStyle.AddTouch} onPress={() => this.closeModal6()} >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal style={DepartmentSetupStyle.ModalUpContainer}
                    position={"center"} ref={"modalupdate"}
                    isDisabled={this.state.isDisabled}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >
                    <View style={DepartmentSetupStyle.modalheaderContainer}>
                        <View style={DepartmentSetupStyle.Leftheader}>
                        </View>
                        <View style={DepartmentSetupStyle.RightHeader}>
                            <TouchableOpacity onPress={() => this.refs.modalupdate.close()}
                                style={DepartmentSetupStyle.MenuBackTouch}>
                                <Image resizeMode="contain" style={{  width:15 , height: 15,marginLeft:0,marginTop:15 }}
                                    source={require('../../../assets/images/close.png')}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={DepartmentSetupStyle.Deptlable}>
                        <View style={{}}>
                            <Text
                                style={DepartmentSetupStyle.DeptlableText}>
                                Department Name:
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={DepartmentSetupStyle.Editinput}
                                value={this.state.DeptName}
                                onChangeText={(txt) => this.setState({ DeptName: txt })}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={DepartmentSetupStyle.addPeopleBtn}
                        onPress={() => this.closemodalForupdate()} >
                        <Text
                            style={DepartmentSetupStyle.SaveText}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

