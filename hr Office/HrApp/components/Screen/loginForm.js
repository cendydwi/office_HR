import React, { Component } from 'react';
import
{
    AsyncStorage, StyleSheet, NetInfo, Text,
    View, ActivityIndicator, Dimensions, TextInput,
    TouchableOpacity, AppState, BackHandler, Alert,
    Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../common/actions';
import { Login, GetUserClaim } from '../../services/AccountService';
import
{
    saveToStorage,
    storage,
    CurrentUserProfile
} from '../../common/storage';
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';


var { width, height } = Dimensions.get('window');

export default class LoginForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            userName: this.props.phoneno,
            password: "",
            alertMessage: "",
            loading: false,
        };
        console.log('ph', this.props.phoneno);
    }

    handleBackButton = () =>
    {
        BackHandler.exitApp()
        return true;
    }
    changeUsrNameHandler = (text) =>
    {
        this.setState({ userName: text });
    };
    changePassNameHandler = (text) =>
    {
        this.setState({ password: text });
    };

    signUp()
    {
        Actions.register();
    }
    componentDidMount()
    {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillMount()
    {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount()
    {
        this.setState({ userName: '' })
    }
    async  onPressSubmitButton()
    {
        if (await NetInfo.isConnected.fetch())
        {
            if (this.state.userName != "" && this.state.password != "")
            {
                this.setState({ loading: true });
                this.onFetchLoginRecords();
            } else
            {
                this.setState({ alertMessage: "Please input all field" });
                this.isConfirm();
            }
        } else
        {
            Alert.alert(
                "No Internet ",
                "Enable Wifi or Mobile Data",
                [
                    { text: 'OK', },
                ],
                { cancelable: false }
            )
        }
    }
    async onFetchLoginRecords()
    {
        console.log("trying login..");
        try
        {
            let UserModel = {
                UserName: this.state.userName,
                Password: this.state.password,
            };
            // if(await !NetInfo.isConnected.fetch()){  
            //     alert("test...");
            //     // this.setState({alertHeading:"Invalid Phonenumber!"})
            //     throw "Please Connect Internet";
            // }
            let response = await Login(UserModel);
            console.log('logins', response);
            if (response && response.isSuccess)
            {
                if (response.result.Success)
                {
                    await AsyncStorage.setItem("userToken", response.result.Token);
                    await AsyncStorage.setItem("userId", response.result.UserKey);
                    await AsyncStorage.setItem("companyId", response.result.CompanyId.toString());

                    await this.getUserClaim(response.result.UserKey);
                  
                    this.setState({ loading: false });
                } else
                {
                    this.setState({ loading: false });
                    this.setState({ alertMessage: "User name or password is wrong" });
                    this.isConfirm();
                }
            } else
            {
                this.setState({ loading: false });
                this.setState({ alertMessage: "User name or password is wrong" });
                this.isConfirm();
            }
        } catch (errors)
        {

            console.log(errors);
        }
    }
    getUserClaim = async (userKey) =>
    {
        try
        {
            await GetUserClaim(userKey)
                .then(res =>
                {
                    const ob = res.result;
                    console.log('empInfo', ob);
                    if (ob != null)
                    {
                        saveToStorage(storage, CurrentUserProfile, ob);
                        Actions.auth();
                    }
                })
                .catch(() =>
                {
                    console.log("error occured");
                });
        } catch (error)
        {
            console.log(error);
        }
    }
    
    openConfirm = (show) =>
    {
        this.setState({ showConfirm: show });
    }

    optionYes = () =>
    {
        this.openConfirm(false);
    }

    optionNo = () =>
    {
        this.openConfirm(false);
    }
    isConfirm()
    {
        this.openConfirm(true);
    }
    render()
    {
        return (
            <View style={styles.container}>
                {this.state.loading ? (<ActivityIndicator size="large" color="#1B7F67" style={{ left: 0, right: 0, bottom: 0, top: 0, justifyContent: 'center', alignContent: 'center', }} />) : null}

                <View style={[styles.TextInputView, { marginBottom: 10 }]}>
                    <Entypo name="old-mobile" size={20} color="#4b4b4b"
                        style={styles.InputIcon} />
                    <TextInput style={styles.TextInput}
                        keyboardType="numeric"
                        placeholder="Your Mobile Number"
                        placeholderTextColor="#bcbcbc"
                        underlineColorAndroid="transparent"
                        returnKeyType="next" autoCorrect={false}
                        onChangeText={this.changeUsrNameHandler}
                        value={this.state.userName}
                        onSubmitEditing={() => this.refs.txtPassword.focus()}
                    />
                </View>
                <View style={styles.TextInputView}>
                    <Feather name="lock" size={20} color="#4b4b4b"
                        style={styles.InputIcon} />
                    <TextInput style={styles.TextInput}
                        placeholder="Your Password"
                        keyboardType="numeric"
                        placeholderTextColor="#bcbcbc"
                        underlineColorAndroid="transparent"
                        onChangeText={this.changePassNameHandler}
                        returnKeyType="go" secureTextEntry autoCorrect={false}
                        ref={"txtPassword"}
                    />
                </View>

                <TouchableOpacity style={styles.LoginButton}
                    onPress={() => this.onPressSubmitButton(this.state.userName,
                        this.state.password)}>
                    <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>

                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.TextStyle}>
                            LOGIN
                    </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', marginRight: 10, }}>
                        <Entypo name="chevron-right" size={20} color="#ffffff" />
                    </View>
                </TouchableOpacity>

                <View style={[styles.LoginButton, style = { backgroundColor: '#ffffff', }]}>

                    <TouchableOpacity
                        onPress={this.signUp}
                        style={{
                            alignItems: 'center',
                            width: (width * 66) / 100,
                            height: "100%",
                            justifyContent: 'center',
                            backgroundColor: '#f1f4f6',
                            borderRadius: 5,
                        }}>

                        <Text style={[styles.TextStyle, style = { color: "#6d6d6d" }]}>
                            REGISTER
                        </Text>
                    </TouchableOpacity>
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require('../../assets/images/RegCall.png')}>
                    </Image>

                </View>





                <ConfirmDialog
                    title="Message"
                    message={this.state.alertMessage}
                    onTouchOutside={() => this.openConfirm(false)}
                    visible={this.state.showConfirm}
                    positiveButton={
                        {
                            title: "OK",
                            onPress: this.optionYes,
                            titleStyle: {
                                color: "black",
                                colorDisabled: "aqua",
                            }
                        }
                    }
                />
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    TextInputView: {
        width: (width * 80) / 100,
        height: 45,
        backgroundColor: '#f1f4f6',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    InputIcon: {
        justifyContent: "flex-start",
        marginHorizontal: 10,
    },
    TextInput: {
        flex: 1,
        color: "#3D6AA5",
        paddingRight: 3,
    },
    LoginButton: {
        backgroundColor: '#316fde',
        borderRadius: 5,
        height: 45,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: (width * 80) / 100,
    },
    TextStyle: {
        fontSize: 13,
        fontFamily: "Montserrat_Bold",
        color: "#ffffff"
    },
})
