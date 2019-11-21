import React from 'react';
import
{
    Platform, StatusBar, BackHandler,
    AsyncStorage, Alert, View,
    Text, Image, ScrollView, ToastAndroid,
    TouchableOpacity, TextInput
} from 'react-native';
import * as Font from 'expo-font'
import Modal from 'react-native-modalbox';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { SettingStyle } from './SettingStyle'
import
{
    loadFromStorage,
    storage,
    CurrentUserProfile
} from "../../../common/storage";
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import { CommonStyles } from '../../../common/CommonStyles';
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
            />
        </View>
    );
}
export default class SettingScreen extends React.Component
{
    constructor(props)
    {
        super(props);
       
        this.state = {
            
            ImageFileName: "",
            Name: '',
            Phone: '',
            Email: '',
            userId: ''
        }
    }

    modalchangepassword()
    {

        this.refs.modalchangepassword.open()
    }
    closemodalchangepassword()
    {
        this.setState({ progressVisible: true })
        if (this.state.oldpassword == "" && this.state.newpassword == "" && this.state.confirmpassword == "")
        {
            alert("Field can not be empty")
        }
        else if (this.state.newpassword != this.state.confirmpassword)
        {
            alert("Password does not match");
        }
        else
        {
            this.changepassword();
        }
    }
    async changepassword()
    {
        console.log("trying changepassword..");
        var response = await loadFromStorage(storage, CurrentUserProfile);
        this.setState({ userId: response.item.Id })
        try
        {
            let UserModel = {
                CurrentPassword: this.state.oldpassword,
                NewPassword: this.state.newpassword,
                UserId: this.state.userId,
            };
            let response = await ChangePasswords(UserModel);
            if (response && response.isSuccess)
            {
                AsyncStorage.removeItem("userToken");
                Actions.login();
                this.setState({ progressVisible: false })
            } else
            {
                this.setState({ progressVisible: false })
                alert("Password Not Updated. Please try again");
            }
        } catch (errors)
        {
            console.log(errors);

        }
    }
    handleBackButton = () =>
    {
        BackHandler.exitApp()
        return true;
    }

    componentDidMount()
    {
        this._bootstrapAsync();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        // await this.setState({ userId: storageOb.item.Id });
    }
    componentWillMount()
    {
        
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    openModal2()
    {
        Actions.CompanysetupScreen();
    }
    gotoExpense()
    {
        Actions.Expenses();
    }
    gotoIncome()
    {
        Actions.Incomes();
    }
    openmodalforEmpList()
    {
        Actions.EmployeeSetupScreen();
    }
    _bootstrapAsync = async () =>
    {
        var response = await loadFromStorage(storage, CurrentUserProfile);
        await this.setState({ Name: response.item.UserFullName });
        await this.setState({ Phone: response.item.PhoneNumber });
        await this.setState({ Email: response.item.Email });

        console.log(response, '...............');
    }
    openModal3()
    {
        Actions.DepartmentSetupScreen();
    }
    render()
    {

        const logOut = () =>
        {
            Alert.alert(
                'Log Out'

                ,
                'Log Out From The App?', [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    style: 'ok',
                     onPress:async () =>
                    {
                        await AsyncStorage.clear();
                        Actions.login();
                    }
                },], {
                    cancelable: false
                }
            )
            return true;
        };
        const Soon = () =>
        {
          
        };
        return (
            <View style={SettingStyle.container}>
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
                                SETTINGS
                            </Text>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={SettingStyle.profileContainer}>
                        <View style={SettingStyle.settingImageCotainer}>
                            <Image
                                style={SettingStyle.porfileImage}
                                source={require('../../../assets/images/employee.png')}
                                resizeMode='cover'
                            />
                            <View style={{}}>
                                <Text
                                    style={SettingStyle.profileName}>
                                    {this.state.Name}
                                </Text>
                                <Text
                                    style={SettingStyle.profilePhone}>
                                    {this.state.Phone}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={SettingStyle.middleViewContainer}>
                        <View style={SettingStyle.view1}>
                            <TouchableOpacity onPress={() => this.openModal2()}>
                                <View style={SettingStyle.view2}>
                                    <View
                                        style={SettingStyle.view3}>
                                        <Image style={SettingStyle.view1Image}
                                            source={require('../../../assets/images/s_1.png')}>
                                        </Image>
                                        <Text
                                            style={SettingStyle.text1}>
                                            Company Setup
                                        </Text>
                                    </View>
                                    <View style={SettingStyle.ChevronRightStyle}>
                                        <FontAwesome name="chevron-right"
                                            size={18}
                                            color="#cccccc"
                                            style={{
                                                marginRight: 20
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={SettingStyle.view1}>
                            <TouchableOpacity onPress={() => this.openModal3()}>
                                <View style={SettingStyle.view2}>
                                    <View
                                        style={SettingStyle.view3}>
                                        <Image
                                            style={SettingStyle.view1Image}
                                            source={require('../../../assets/images/s_2.png')}>
                                        </Image>
                                        <Text
                                            style={SettingStyle.text1}>
                                            Department Setup
                                        </Text>
                                    </View>
                                    <View style={SettingStyle.ChevronRightStyle}>
                                        <FontAwesome name="chevron-right"
                                            size={18}
                                            color="#cccccc"
                                            style={{
                                                marginRight: 20
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={SettingStyle.view1}>
                            <TouchableOpacity onPress={() => this.openmodalforEmpList()}>
                                <View style={SettingStyle.view2}>
                                    <View style={SettingStyle.view3}>
                                        <Image style={SettingStyle.view1Image}
                                            source={require('../../../assets/images/s_3.png')}>
                                        </Image>
                                        <Text style={SettingStyle.text1}>
                                            Employee Setup
                                     </Text>
                                    </View>
                                    <View style={SettingStyle.ChevronRightStyle}>
                                        <FontAwesome name="chevron-right"
                                            size={18}
                                            color="#cccccc"
                                            style={{
                                                marginRight: 20
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={SettingStyle.viewchangePass}>
                            <TouchableOpacity
                                //  onPress={() => this.modalchangepassword()}>
                                onPress={Soon}>
                                <View style={SettingStyle.view2}>
                                    <View style={SettingStyle.view3}>
                                        <Image
                                            style={SettingStyle.view1Image}
                                            source={require('../../../assets/images/s_4.png')}>
                                        </Image>
                                        <Text
                                            style={SettingStyle.text1}>
                                            Change Password
                                    </Text>
                                    </View>
                                    <View style={SettingStyle.ChevronRightStyle}>
                                        <FontAwesome name="chevron-right"
                                            size={18}
                                            color="#cccccc"
                                            style={{
                                                marginRight: 20
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={SettingStyle.lastViewContainer}>
                      
                      
                        <View style={SettingStyle.viewchangePass}>
                            <TouchableOpacity onPress={logOut}>
                                <View style={SettingStyle.view2}>
                                    <View style={SettingStyle.view3}>
                                        <Image
                                            style={SettingStyle.view1Image}
                                            source={require('../../../assets/images/s_5.png')}>
                                        </Image>
                                        <Text
                                            style={SettingStyle.text1}>
                                            Logout
                                    </Text>
                                    </View>
                                    <View style={SettingStyle.ChevronRightStyle}>
                                        <FontAwesome name="chevron-right"
                                            size={18}
                                            color="#cccccc"
                                            style={{
                                                marginRight: 20
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                  
                   
                    <Modal style={[SettingStyle.modal3]} position={"center"}
                        ref={"modalchangepassword"} isDisabled={this.state.isDisabled}
                        onOpened={() => this.setState({ floatButtonHide: true })}>
                        <View style={{ justifyContent: "space-between", flexDirection: "column" }}>
                            <View style={{ alignItems: "flex-start" }}></View>
                            <View style={{ alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={() => this.refs.modalchangepassword.close()}
                                    style={SettingStyle.changepassmodalToucah}>
                                    <Image resizeMode="contain"
                                        style={{ width: 30, height: 30, }}
                                        source={require('../../../assets/images/close.png')}>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={SettingStyle.modelContent}>
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                                Change Password
                            </Text>
                            <View
                                style={SettingStyle.horizontalLine}
                            />
                            <Image resizeMode="contain" style={SettingStyle.addPeopleImg}
                                source={require('../../../assets/images/key.png')}>
                            </Image>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <TextInput style={SettingStyle.inputBoxchagePass}
                                placeholder="Old Password"
                                placeholderTextColor="#cbcbcb"
                                returnKeyType="next" autoCorrect={false}
                                secureTextEntry
                                onSubmitEditing={() => this.refs.txtnewpass.focus()}
                                onChangeText={(text) => this.setState({ oldpassword: text })}
                            />
                            <TextInput style={SettingStyle.inputBoxchagePass}
                                placeholder="New Password"
                                placeholderTextColor="#cbcbcb"
                                returnKeyType="next" autoCorrect={false}
                                secureTextEntry
                                ref={"txtnewpass"}
                                onSubmitEditing={() => this.refs.txtcomfirmpass.focus()}
                                onChangeText={(text) => this.setState({ newpassword: text })}
                            />
                            <TextInput style={SettingStyle.inputBoxchagePass}
                                placeholder="Confirm New Password"
                                placeholderTextColor="#cbcbcb"
                                returnKeyType="go" autoCorrect={false}
                                secureTextEntry
                                onChangeText={(text) => this.setState({ confirmpassword: text })}
                                ref={"txtcomfirmpass"}
                            />
                            <TouchableOpacity style={SettingStyle.addPeopleBtnchangpass}
                                onPress={() => this.closemodalchangepassword()} >
                                <Text style={SettingStyle.changePassModalSave}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </ScrollView>
            </View >
        );
    }
}

