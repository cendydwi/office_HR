import React from 'react';

import
{
    Platform, StatusBar, StyleSheet, TouchableOpacity,
    Dimensions, View, Text, Modal, Image,
    ScrollView, ActivityIndicator, BackHandler
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { getNoticedetail } from "../../../../services/UserService/Notice";

import { NoticeStyle } from "./NoticeStyle"

import ImageViewer from 'react-native-image-zoom-viewer';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
export default class NoticeDetail extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            Details: '',
            ImageFileName: '',
            isModelVisible: false,
        }
    }
    handleBackButton = () =>
    {
        this.goBack();
        return true;
    }
    goBack()
    {
        Actions.Notice();
    }

    componentDidMount()
    {
        this.getNoticeDetatil(this.props.aItem.Id);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount()
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    ImageViewer()
    {
        this.setState({ isModelVisible: true })
    }
    ShowModalFunction(visible)
    {
        this.setState({ isModelVisible: false });
    }
    async getNoticeDetatil(NoticeId)
    {

        await getNoticedetail(NoticeId)
            .then(res =>
            {
                this.setState({ Details: res.result.Details })
                this.setState({ ImageFileName: res.result.ImageFileName })

                console.log(this.state.Details, 'detail....')

            })
            .catch(() =>
            {
                console.log("error occured");
            });
    }

    render()
    {
        const images = [{ url: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + this.state.ImageFileName, },];

        return (
            <View style={NoticeStyle.noticeDetailContainer}>
                <StatusBarPlaceHolder />
                <View style={NoticeStyle.headerContainer}>
                    <View style={NoticeStyle.headerTitle}>
                        <TouchableOpacity
                            onPress={() => this.goBack()}
                        >
                            <MaterialIcons name="chevron-left" size={35} color="#BEC3C8" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text
                            style={NoticeStyle.headerText}>
                            VIEW NOTICE
                        </Text>
                    </View>
                    <View style={NoticeStyle.headerTextRight}>
                    </View>
                </View>



                <ScrollView>

                    <Text style={NoticeStyle.noticeDetailTextStyle}>
                        {this.state.Details}
                    </Text>



                    <TouchableOpacity style={{ paddding: 10, alignSelf: 'center', }}
                        onPress={() => this.ImageViewer()}>
                        <Image resizeMode='contain' style={{ height: 150, width: 150, }}
                            source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + this.state.ImageFileName }}>
                        </Image>
                    </TouchableOpacity>
                </ScrollView>

                <Modal
                    visible={this.state.isModelVisible}
                    transparent={false}
                    onRequestClose={() => this.ShowModalFunction()}>
                    <View
                        style={{
                            width: "100%",
                            padding: 5,
                            backgroundColor: 'black',
                            justifyContent: 'space-between',
                        }}>
                        <View style={{ alignItems: "flex-start", }}>

                        </View>
                        <TouchableOpacity
                            style={{ alignItems: "flex-end",padding:5, }}
                            onPress={() => this.ShowModalFunction()}>
                            <Image resizeMode="contain" style={{width: 15, height: 15, marginRight: 12, marginTop: 10 }}
                                // onPress={() => this.ShowModalFunction()}
                                source={require('../../../../assets/images/close.png')}>
                            </Image>
                        </TouchableOpacity>

                    </View>

                    <ImageViewer imageUrls={images} />
                </Modal>
            </View>
        );
    }
}

