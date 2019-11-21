
import React from 'react';
import {
    Platform, StatusBar, Dimensions, RefreshControl, TouchableOpacity,
    View, Text, FlatList, Image, ScrollView, ActivityIndicator,
    AsyncStorage, Alert, BackHandler,
} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../common/actions';
import { NoticeStyle } from './NoticeStyle';
import { getNotice } from '../../../services/Notice';
import apiConfig from "../../../services/api/config";
import { CommonStyles } from '../../../common/CommonStyles';
import { SearchBar } from 'react-native-elements';
import {
    FontAwesome,
} from '@expo/vector-icons';
import {
    AdMobBanner
  } from 'expo-ads-admob';

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


export default class Notice extends React.Component {
    constructor() {
        super();
        this.state = {
            noticeList: [],
            companyId: 0,
            refreshing: false,
        }
        this.arrayholder = [];
    }
    goBack() {
        Actions.pop();
    }

    goToDetail(item) {
        console.log(item, '.............item');
        actions.push("NoticeDetail", { aItem: item });
    };

    goToCreateNotice() {
        actions.push("CreateNotice", {});
    }
    _onRefresh = async () => {
        this.setState({ refreshing: true });
        setTimeout(function () {
            this.setState({
                refreshing: false,
            });

        }.bind(this), 2000);

        this.getNoticeList(this.state.companyId, false);
    }
    async componentDidMount() {
        const cId = await AsyncStorage.getItem("companyId");
        this.setState({ companyId: cId });
        this.getNoticeList(cId, true);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


    }

    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        BackHandler.exitApp()
        return true;
    }

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.PostingDate.toUpperCase()} ${item.Details.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            noticeList: newData,
        });
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                style={{ position: 'absolute', zIndex: 1, marginBottom: 0 }}
                lightTheme
                containerStyle={{ backgroundColor: '#f6f7f9', }}
                inputContainerStyle={{ backgroundColor: 'white', }}
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />

        );
    };
    getNoticeList = async (companyId, isProgress) => {
        try {
            this.setState({ progressVisible: isProgress });
            await getNotice(companyId)
                .then(res => {
                    this.setState({ noticeList: res.result, progressVisible: false });
                    this.arrayholder = res.result;
                    console.log(res.result, '.....noticeresult');
                })
                .catch(() => {
                    this.setState({ progressVisible: false });
                    console.log("error occured");
                });

        } catch (error) {
            this.setState({ progressVisible: false });
            console.log(error);
        }
    }

    render() {
        return (
            <View style={NoticeStyle.container}>
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
                                Notice Board
                            </Text>
                        </View>
                    </View>
                    <View
                        style={NoticeStyle.createNoticeButtonContainer}>
                        <View
                            style={NoticeStyle.ApplyButtonContainer}>
                            <TouchableOpacity
                                onPress={() => this.goToCreateNotice()}
                                style={NoticeStyle.ApplyButtonTouch}>
                                <View style={NoticeStyle.plusButton}>
                                    <FontAwesome
                                        name="plus" size={18} color="#ffffff">
                                    </FontAwesome>
                                </View>
                                <View style={NoticeStyle.ApplyTextButton}>
                                    <Text style={NoticeStyle.ApplyButtonText}>
                                        NOTICE
                                </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{ flex: 1, }}>
                    {this.state.progressVisible == true ? (<ActivityIndicator size="large" color="#1B7F67" style={NoticeStyle.loaderIndicator} />) : null}
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }>
                        <View style={{ flex: 1, padding: 10, }}>
                            <FlatList
                                data={this.state.noticeList}
                                keyExtractor={(x, i) => i.toString()}
                                renderItem={({ item }) =>

                                    <TouchableOpacity onPress={() => this.goToDetail(item)}>
                                        <View
                                            style={NoticeStyle.listContainer}>
                                            {item.ImageFileName === "" ?
                                                <View style={NoticeStyle.listDivider}>
                                                    <View style={NoticeStyle.noticepart}>
                                                        <Text style={{}}>{item.Details}</Text>
                                                    </View>

                                                </View> : <View style={{
                                                    justifyContent: 'space-between', flexDirection: 'row',
                                                    borderBottomColor: 'white', borderBottomWidth: 2, paddingBottom: 10,
                                                }}>
                                                    <View style={{
                                                        alignItems: 'flex-start', width: '80%',
                                                        color: '#1a1a1a', fontSize: 10, fontFamily: 'OPENSANS_REGULAR'
                                                    }}>
                                                        <Text style={{}}>{item.Details}</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'flex-end', width: '20%', }}>
                                                        <View style={{
                                                            borderRadius: 5,

                                                        }}>

                                                            {item.ImageFileName !== "" ?
                                                                <Image resizeMode="cover"
                                                                    style={NoticeStyle.noticelistImage} source={{ uri: "http://medilifesolutions.blob.core.windows.net/resourcetracker/" + item.ImageFileName }} /> : <Text></Text>}
                                                        </View>
                                                    </View>
                                                </View>}
                                            <View style={NoticeStyle.dateContainer}>
                                                <View style={{ alignItems: 'flex-start', }}>
                                                    <Text
                                                        style={NoticeStyle.postedtextStyle}>
                                                        Posted Date
                                                </Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', }}>
                                                    <Text style={NoticeStyle.createDateStyle}>

                                                        {item.CreateDate}
                                                    </Text>
                                                </View>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                }
                                ListHeaderComponent={this.renderHeader()}
                            />
                        </View>
                    </ScrollView>
                </View>
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID={apiConfig.bannerUnitId}
                    onDidFailToReceiveAdWithError={this.bannerError} />
            </View>
        );
    }
}
