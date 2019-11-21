import React, { Component } from 'react';
import LoginForm from './Screen/loginForm';
import
{
    KeyboardAvoidingView, StyleSheet, Platform,
    Dimensions, View, Image, StatusBar, ScrollView
} from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
function StatusBarPlaceHolder()
{
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
var { width, height } = Dimensions.get('window');

export default class Login extends Component
{
    render()
    {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
                <StatusBarPlaceHolder />
                <View style={[styles.logoContainer,]}>
                    <Image
                        style={{
                            // width: 275, height: 255,
                            flex: 1,
                            margin: 10,
                            width: "90%",
                        }}
                        resizeMode="contain"
                        source={require('../assets/images/Component331.png')}>
                    </Image>
                </View>
                <View style={{
                    flex: 1,
                    // marginTop: -(height * 10) / 100,
                    // justifyContent: "flex-start",
                    // width: "100%",
                }}>
                    <LoginForm phoneno={this.props.phoneno} />
                </View>
            </KeyboardAvoidingView >

        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
    },
    logoContainer: {
        marginTop: (height * 5) / 100,
        flex: 1,
        width: "100%",
        resizeMode: "contain",
        alignItems: "center"
    },
})
