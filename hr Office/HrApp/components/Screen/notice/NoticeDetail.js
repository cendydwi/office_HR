import React from 'react';
import
{
    Platform, StatusBar, StyleSheet, TouchableOpacity, Dimensions,
    View, Text, Modal, Image, ScrollView, ActivityIndicator, BackHandler,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import { getNoticedetail } from "../../../services/Notice";
import { NoticeStyle } from "./NoticeStyle"
import { CommonStyles } from '../../../common/CommonStyles';
import ImageViewer from 'react-native-image-zoom-viewer';

import
{
    Entypo,
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,

} from '@expo/vector-icons'


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
        Actions.pop();
    }
    componentDidMount()
    {
        this.getNoticeDetatil();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


    }

    componentWillMount()
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

    gotBack()
    {
        Actions.pop()
    }
    async getNoticeDetatil()
    {
        let NoticeId = this.props.aItem.Id;
        // alert(NoticeId);
        await getNoticedetail(NoticeId)
            .then(res =>
            {
                this.setState({ Details: res.result.Details })
                this.setState({ ImageFileName: res.result.ImageFileName })

            })
            .catch(() =>
            {
                console.log("error occured");
            });
    }
    render()
    {
        var { width, height } = Dimensions.get('window');
        const images = [{ url: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + this.state.ImageFileName, },];
        return (
            <View style={NoticeStyle.noticeDetailContainer}>
                <StatusBarPlaceHolder />
                <View
                    style={CommonStyles.HeaderContent}>
                    <View
                        style={CommonStyles.HeaderFirstView}>
                        <TouchableOpacity
                            style={CommonStyles.HeaderMenuicon}
                            onPress={() => { this.goBack() }}>
                            <Image resizeMode="contain" style={CommonStyles.HeaderMenuiconstyle}
                                source={require('../../../assets/images/left_arrow.png')}>
                            </Image>
                        </TouchableOpacity>
                        <View
                            style={CommonStyles.HeaderTextView}>
                            <Text
                                style={CommonStyles.HeaderTextstyle}>
                                NOTICE DETAIL
                            </Text>
                        </View>
                    </View>
                    
                </View>

                <View style={NoticeStyle.detailTextStyle}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>

                            <Text style={NoticeStyle.noticeDetailTextStyle}>
                                {this.state.Details}
                            </Text>

                        </View>

                        <TouchableOpacity style={{ paddding: 10, alignSelf: 'center', }}
                            onPress={() => this.ImageViewer()}>
                            <Image resizeMode='contain' style={{ height: 150, width: 150, }}
                                source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + this.state.ImageFileName }}>
                            </Image>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
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
                            style={{ alignItems: "flex-end",padding:10, }}
                            onPress={() => this.ShowModalFunction()}>
                            <Image resizeMode="contain" style={{ width: 15, height: 15 }}
                                // onPress={() => this.ShowModalFunction()}
                                source={require('../../../assets/images/close.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <ImageViewer imageUrls={images} >
                    </ImageViewer>
                </Modal>
            </View>
        );
    }
}

