import React, { Component } from 'react';
import
{
    StyleSheet, ActivityIndicator, Text, View, TextInput,
    TouchableOpacity, Alert, NetInfo, Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CreateAccount, CheckExistPhone } from "../../services/AccountService";
import { Loading } from '../../common/loading';
import RadioButton from 'radio-button-react-native';
import { ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';

import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';

var { width } = Dimensions.get('window');

export default class RegisterForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: 'Male',
            UserFullName: '',
            UserName: '',
            CompanyName: '',
            PhoneNumber: '',
            Email: '',
            Password: '',
            Password_confirmation: '',
            error: '',
            loading: false,
            successMessage: "",
            phonecheck: false,
            emailerror: false,
            alertHeading: "",
            passwordmatch: false,
            passwordSixCharacter: false,
        };
    }
    signIn()
    {
        Actions.login();
    }
    onPressSighUpButton = async () =>
    {
        if (await NetInfo.isConnected.fetch())
        {
            if (this.state.UserFullName != "" && this.state.PhoneNumber != "" && this.state.Email != "" && this.state.Password != "" && this.state.Password_confirmation != "")
            {
                this.onFetchLoginRecords();
            } else
            {
                Alert.alert(
                    "",
                    "Please fill up all field ",
                    [
                        { text: 'OK', },
                    ],
                    { cancelable: false }
                )
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
    handleOnPress(value)
    {
        this.setState({ value: value })
    }
   
    async onFetchLoginRecords()
    {

        try
        {
          
            if (this.state.emailerror == true)
            {
                this.setState({ alertHeading: "Invalid Email!" })
                throw "Please provide valid email";
            }
            if (this.state.passwordmatch == true)
            {
                this.setState({ alertHeading: "Password does not match!" })
                throw "Please provide same password";
            }
            if (this.state.passwordSixCharacter == true)
            {
                this.setState({ alertHeading: "Password length minimum 6 characters!" })
                throw "Please provide 6 characters password";
            }
            let data = {
                UserFullName: this.state.UserFullName, UserName: this.state.PhoneNumber, CompanyName: this.state.CompanyName
                , PhoneNumber: this.state.PhoneNumber, Password: this.state.Password
                , Password_confirmation: this.state.Password_confirmation
                , Email: this.state.Email, UserType: 'admin'
                , Gender: this.state.value

            };

            this.setState({ loading: true });
            let response = await CreateAccount(data);
            console.log('rege', response);
            if (response && response.isSuccess)
            {
                this.setState({ successMessage: response.result.message });
                this.isConfirm();
            } else
            {
                if (response)
                {
                    alert("Registration failed.");
                }
            }
            this.setState({ loading: false });
        } catch (errors)
        {
            this.setState({ loading: false });
            Alert.alert(
                this.state.alertHeading,
                errors,
                [
                    { text: 'OK', },
                ],
                { cancelable: false }
            )
          
        }
    }

    changeEmailHandler = () =>
    {
        const email = this.state.Email;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.setState({ emailerror: false });
        if (reg.test(email) === false)
        {
            console.log("Email is Not Correct");
            this.setState({ emailerror: true });
            Alert.alert(
                "Invalid Email!",
                "Please Provide Valid Email",
                [
                    { text: 'OK', },
                ],
                { cancelable: false }
            )
        }
        else
        {

        }
    };

    changePasswordHandler = () =>
    {
        const Password = this.state.Password;
        const Password_confirmation = this.state.Password_confirmation;
        this.setState({ passwordmatch: false, });

        if (Password != Password_confirmation)
        {
            this.setState({ passwordmatch: true });
            Alert.alert(
                "",
                "Password does not Match",
                [
                    { text: 'OK', },
                ],
                { cancelable: false }
            )
        }
        else
        {

        }
    };

    changePasswordSixCharacterHandler = () =>
    {
        const Password = this.state.Password;
        this.setState({ passwordSixCharacter: false, });

        if (Password.length < 6)
        {
            this.setState({ passwordSixCharacter: true });
            Alert.alert(
                "",
                "Password Minimum length 6 Character",
                [
                    { text: 'OK', },
                ],
                { cancelable: false }
            )
        }
        else
        {

        }
    };

    openConfirm = (show) =>
    {
        this.setState({ showConfirm: show });
    }

    optionYes = () =>
    {
        this.openConfirm(false);
        console.log('phr', this.state.PhoneNumber);
        Actions.login({ phoneno: this.state.PhoneNumber });
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
        const { UserFullName, UserName, PhoneNumber, Password, Password_confirmation, Email, error, loading } = this.state;
        return (

            <View style={styles.container}>

                <View style={[styles.TextInputView, { marginBottom: 10 }]}>
                    <Entypo name="user" size={20} color="#4b4b4b"
                        style={styles.InputIcon} />
                    <TextInput style={styles.TextInput}
                        placeholder="Your Name"
                        placeholderTextColor="#cbcbcb"
                        keyboardType="default"
                        returnKeyType="next" autoCorrect={false}
                        placeholderTextColor="#bcbcbc"
                        underlineColorAndroid="transparent"
                        onChangeText={uname => this.setState({ UserFullName: uname })}
                        onSubmitEditing={() => this.refs.txtPhoneNumber.focus()}
                    />
                </View>
                <View style={[styles.TextInputView, { marginBottom: 10 }]}>
                    <Entypo name="old-mobile" size={20} color="#4b4b4b"
                        style={styles.InputIcon} />
                    <TextInput style={styles.TextInput}
                        placeholder="Your Mobile Number"
                        placeholderTextColor="#cbcbcb" keyboardType="number-pad"
                        returnKeyType="next" autoCorrect={false}

                        onChangeText={mnumber => this.setState({ PhoneNumber: mnumber })}
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.txtEmmail.focus()}
                        ref={"txtPhoneNumber"}
                    />
                </View>
                <View style={[styles.TextInputView, { marginBottom: 10 }]}>
                    <Feather name="at-sign" size={20} color="#4b4b4b"
                        style={styles.InputIcon} />
                    <TextInput style={styles.TextInput}
                        placeholder="Your Email"
                        placeholderTextColor="#cbcbcb" keyboardType="default"
                        returnKeyType="next" autoCorrect={false}

                        onChangeText={Email => this.setState({ Email: Email })}
                       
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.txtNewPassword.focus()}
                        ref={"txtEmmail"}
                        onBlur={() => this.changeEmailHandler()}
                    />
                </View>
                {this.state.loading ? (<ActivityIndicator size="large" color="#1B7F67"
                    style={styles.ActivityIndicatorStyle} />) : null}

                <View style={[styles.TextInputView, { marginBottom: 10 }]}>
                    <Feather name="lock" size={20} color="#4b4b4b"
                        style={styles.InputIcon} />
                    <TextInput style={styles.TextInput}
                        placeholder="New Password"
                        placeholderTextColor="#cbcbcb" HorizontalTextAlignment="center"
                        returnKeyType="next" secureTextEntry
                        autoCorrect={false}
                        keyboardType="number-pad"
                        onChangeText={Password => this.setState({ Password: Password })}
                        onSubmitEditing={() => this.refs.txtConPassword.focus()}
                        ref={"txtNewPassword"}
                        onBlur={() => this.changePasswordSixCharacterHandler()}
                    />
                </View>
                {/* <Text style={{ width: 300, color: '#ddd' }}>Password must be with numaric, small and capital mix</Text> */}
                <View style={[styles.TextInputView, { marginBottom: 10 }]}>
                    <Feather name="lock" size={20} color="#4b4b4b"
                        style={styles.InputIcon} />
                    <TextInput style={styles.TextInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#cbcbcb"
                        returnKeyType="go" secureTextEntry autoCorrect={false}
                        keyboardType="number-pad"
                        onChangeText={cPassword => this.setState({ Password_confirmation: cPassword })}
                        ref={"txtConPassword"}
                        onBlur={() => this.changePasswordHandler()}
                    />
                </View>
                <View style={styles.RadioBtnView}>
                    <Text style={{ fontSize: 13, color: 'gray' }}>Gender:  </Text>
                    <RadioButton
                        innerCircleColor='green' currentValue={this.state.value}
                        value={"Male"} onPress={this.handleOnPress.bind(this)}>
                        <Text style={styles.RadioBtnText}>Male</Text>
                    </RadioButton>

                    <RadioButton
                        innerCircleColor='green' currentValue={this.state.value}
                        value={"Female"} onPress={this.handleOnPress.bind(this)}>
                        <Text style={styles.RadioBtnText}>Female</Text>
                    </RadioButton>

                    <RadioButton innerCircleColor='green' currentValue={this.state.value} value={"Other"} onPress={this.handleOnPress.bind(this)}>
                        <Text style={styles.RadioBtnText}>Other</Text>
                    </RadioButton>
                </View>
                {/* <View style={{ alignItems: "center", paddingVertical: 20 }}>
                    <Text style={styles.signupagreeTxt}>by signing up you agree to the</Text>
                    <Text style={styles.termsServiceTxt}>terms of service <Text style={{ color: '#c6c7c7' }}>and</Text> privacy policy</Text>
                </View> */}
                {/* <TouchableOpacity style={styles.buttonRegisterContainer} >
                    <Text style={styles.registerButtonText} onPress={this.onPressSighUpButton}>Submit</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.LoginButton}
                    onPress={this.onPressSighUpButton}>
                    <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>

                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.TextStyle}>
                            CREATE ACCOUNT
                    </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', marginRight: 10, }}>
                        <Entypo name="chevron-right" size={20} color="#ffffff" />
                    </View>
                </TouchableOpacity>

                <View style={styles.signInTxt}>
                    <Text style={{ color: '#c6c7c7' }}>Need to </Text>
                    <TouchableOpacity onPress={this.signIn}>
                        <Text> Sign In</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#c6c7c7' }}>?</Text>
                </View>
                <Loading showProgress={this.state.loading} />
                <ConfirmDialog
                    title="Registration Successfull"
                    message={this.state.successMessage}
                    onTouchOutside={() => this.openConfirm(false)}
                    visible={this.state.showConfirm}
                    positiveButton={
                        {
                            title: "OK",
                            onPress: this.optionYes,
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
        marginTop: 30,
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
        backgroundColor: "#73b53b",
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
    inputBox: {
        width: 300,
        height: 60,
        backgroundColor: '#ebebeb',
        color: '#2c2930',
        paddingHorizontal: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 10
    },
    horizontalLineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    horizontalLine: {
        borderBottomColor: '#c3c4c6',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: 250,
        marginTop: 10
    },
    logoBottomText: {
        color: '#bababa',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        width: 250
    },
    buttonContainer: {
        backgroundColor: '#3e325a',
        borderRadius: 20,
        paddingVertical: 13,
        marginVertical: 20,
        width: 200,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonRegisterContainer: {
        backgroundColor: '#fff',
        paddingVertical: 11,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#3e325a',
        borderRadius: 30,
        width: 160
    },
    registerButtonText: {
        color: '#3e325a',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    signInTxt: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 15,
        flexDirection: 'row'
    },
    RadioBtnText: {
        textAlign: "center", color: '#6C7272',
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        marginTop: 2,
        marginLeft: 3,
        marginRight: 4,
    },
    RadioBtnView: {
        flexDirection: "row", marginVertical: 10,
        alignItems: 'center',
    },
    ActivityIndicatorStyle: {
        position: 'absolute', left: 0, right: 0,
        bottom: 0, top: 0, justifyContent: 'center',
        alignContent: 'center',
    },
})
