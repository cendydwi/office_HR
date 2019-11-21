import { StyleSheet, Platform } from 'react-native';

export const NoticeStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
    },

    loaderIndicator: {
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, justifyContent: 'center', alignContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        height: 60,
        paddingTop: 0,
        backgroundColor: 'white',
        shadowColor: 'rgba(181,181,181,0.02)',
        shadowOffset: { width: 0, height: -2 },
        elevation: 10,
        shadowRadius: 8,
        shadowOpacity: 0.3,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    headerTitle: {
        alignItems: 'flex-start', flexDirection: 'row'
    },
    headerText: {
        fontWeight: 'bold', fontSize: 20, color: '#141414', marginTop: 3,
    },

    headerBar: {
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#fff',
        shadowColor: "#fff",
        shadowRadius: 3,
        shadowColor: "black",
        shadowOpacity: 0.7,
        shadowOffset: { width: 0, height: -5 },
        elevation: 10,
        height: 60,
    },
    headerBarforCompany: {
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#fff',
        shadowColor: "#fff",
        shadowRadius: 3,
        shadowColor: "black",
        shadowOpacity: 0.7,
        shadowOffset: { width: 10, height: -5 },
       // elevation: 10,
        height: 60,
    },
    backIcon: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIconTouch: {
        padding: 10,
        flexDirection: 'row', alignItems: 'center'
    },
    headerTitle: {
        backgroundColor: 'white',
        padding: 0, paddingLeft: 10,
        margin: 0, flexDirection: 'row',
    },
    headerTitleText: {
        color: '#4E4E4E', marginTop: 1,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 16, textAlign: 'center',
    },
    createNoticeButtonContainer: {
        justifyContent: 'flex-end', marginRight: 0,
        marginLeft: 0, flexDirection: 'row',
        alignItems: 'center',
    },
    createNoticeButtonTouch: {
        flexDirection: 'row', alignItems: 'center', padding: 3,
    },



    createNoticeDescriptionLabel: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#848f98",
        marginBottom: 10, marginLeft: 20,
    },
    createNoticeDescriptionTextBox: {
        textAlignVertical: "top", fontFamily: "OPENSANS_REGULAR",
        fontSize: 13, textAlign: "left",
        color: "#4a535b", flex: 1, flexWrap: 'wrap',
        height: "40%",
        paddingHorizontal: 7, paddingVertical: 6,
        backgroundColor: "#f5f7fb", borderRadius: 8,
    },
    createNoticeSaveButtonContainer: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center', height: 50, flexDirection: 'row',
        backgroundColor: "#d9ad1e",
    },
    createNoticeSaveButtonText: {
        fontFamily: "Montserrat_Bold", fontSize: 15,
        textAlign: "center", color: "#ffffff"
    },
    modalfordept: {
        height: 300,
        width: "75%",
        borderRadius: 20,
        backgroundColor: '#EBEBEB',

    },
    createnoticeheaderflexEndd: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    createnoticecontainer: { flex: 1 },
    selectContainer: {
        margin: 10,
        flexDirection: 'row',
        height: 90,
    },
    opencemarTouchableopacity: {
        backgroundColor: '#929fbf', flex: 1, marginRight: 5,
        flexDirection: 'row', alignSelf: 'center', padding: 17,
        marginLeft: 0, borderRadius: 5,
    },
    opencemarastle: { height: 41, width: 41, },
    selectContainerview: {
        padding: 5,
        marginLeft: 9,
    },
    selectText: {
        color: "#ffffff", fontSize: 10,
        fontFamily: 'Montserrat_SemiBold'
    },
    addPhotoText1: {
        color: "#ffffff", fontSize: 10,
        fontFamily: 'Montserrat_SemiBold'
    },
    openDeptTouhableOpacity: {
        // backgroundColor: '#99c1d4',
        flex: 1, marginLeft: 5,
        flexDirection: 'row', alignSelf: 'center', padding: 17,
        marginLeft: 8, borderRadius: 5,
    },
    imageGroup: { height: 41, width: 41, },
    seleectDeptContainer: { padding: 5, marginLeft: 9, },
    selectDeptText: {
        color: "#ffffff", fontSize: 10,
        fontFamily: 'Montserrat_SemiBold'
    },
    inputTextContainer: {
        flexDirection: 'column',
        flex: 2,
    },
    inputText: {
        textAlignVertical: "top",
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 3,
        height: 200,
        backgroundColor: '#f5f7fb',
        color: '#2c2930',
        padding: 0,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    ImageTouchableOpacity: {
        width: 80,
        height: 80,
        borderRadius: 10,
        margin: 10
    },
    uploadImageStyle: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },

    ImagemodalContainer: {
        height: 180,
        width: 250,
        borderRadius: 20,
    },
    modalClose: {
        marginLeft: 0,
        marginTop: 0,
        
    },
    closeImage: {
        width:15 , height: 15,marginRight:17,marginTop:15 
    },
    addPhotoText: {
        color: '#000000',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '500'
    },
    cemaraImageContainer: {
        flexDirection: 'row',
        padding: 15, justifyContent: 'space-between',
        paddingTop: 20,
    },
    takePhotoText: { textAlign: 'center', marginTop: 4, color: '#7a7a7a', fontSize: 10 },
    departListText: {
        color: '#141414',
        fontSize: 16,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f7fb',
        padding: 5, fontWeight: '500'
    },
    DoneTouchableopacity: {
        backgroundColor: '#3D3159',
        padding: 15,
        width: 100,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: "3%",
        alignItems: 'center'

    },
    noticeDetailContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    noticeDetailHeaderContainer: {

        flexDirection: 'row',
        height: 60,
        paddingTop: 0,
        backgroundColor: '#ece3a9',
        shadowColor: 'rgba(181,181,181,0.02)',
        shadowOffset: { width: 0, height: -2 },
        elevation: 10,
        shadowRadius: 8,
        shadowOpacity: 0.3,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    noticeDetailTextStyle: {

        fontFamily: "OPENSANS_REGULAR",
        fontSize: 16,
        textAlign: "left",
        color: "#636363"

    },
    arrowcontainer: {
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    arrowImage: {
        width: 25,
        height: 25
    },
    titleText: {
        fontWeight: 'bold', fontSize: 20,
        color: '#141414', marginTop: 3,
    },
    headerFlexEnd: { alignItems: 'flex-end', marginRight: 10, },
    detailTextStyle: { padding: 10, marginTop: 16, flex: 1, marginHorizontal: 6, },
    noticelistImage: {
        ...Platform.select({
            ios: {
                width: 40, height: 40, padding: 10,
            },
            android: {
                width: 40, height: 40, padding: 10,
            },
        }),
    },
    createDateStyle: {
        // marginBottom: 5, 
        textAlign: 'right',
        // color: '#c5cbcf',
        fontSize: 14, fontFamily: 'PRODUCT_SANS_BOLD'
    },
    postedtextStyle: {
        // marginBottom: 5,
        textAlign: 'right',
        // color: '#c5cbcf',
        fontSize: 14, fontFamily: 'PRODUCT_SANS_BOLD'
    },
    dateContainer: {
        flexDirection: 'row', justifyContent:
            'space-between', paddingTop: 10,
            borderTopWidth:1,
            borderTopColor:"#f6f7f9"
    },
    listContainer: {
        flex: 1, flexWrap: 'wrap',
        backgroundColor: '#ffffff', marginBottom:5,marginTop:5,
        borderRadius: 5, padding: 15,elevation: 2,
    },
    listDivider: {
        justifyContent: 'space-between', flexDirection: 'row',
        borderBottomColor: 'white', borderBottomWidth: 2, paddingBottom: 10,
    },
    noticepart: {
        alignItems: 'flex-start',
        color: '#1a1a1a', fontSize: 10, fontFamily: 'OPENSANS_REGULAR'
    },
    ApplyButtonContainer: {
        justifyContent: 'flex-end', marginRight: 0,
        marginLeft: 0, flexDirection: 'row',
        alignItems: 'center',
    },

    ApplyButtonTouch: {
        flexDirection: 'row', alignItems: 'center',
        // height: 1, 
    },

    plusButton: {
        // backgroundColor: "#600B74",
        backgroundColor: '#9d8127',
        alignItems: 'center',
        padding: 6,
        paddingHorizontal: 9,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
    },
    plusButtonforCompany: {
        // backgroundColor: "#600B74",
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        padding: 6,
        paddingHorizontal: 9,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
    },

    ApplyTextButton: {
        // backgroundColor: "#902ca8",
        backgroundColor: '#cea41d',
        alignItems: 'center',
        padding: 7,
        paddingHorizontal: 9,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
    },
    ApplyTextButtonforNotice: {
        // backgroundColor: "#902ca8",
        backgroundColor: '#363E4A',
        alignItems: 'center',
        padding: 7,
        paddingHorizontal: 9,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
    },

    ApplyButtonText: {
        // fontWeight: 'bold',
        fontSize: 12, color: '#ffffff',
        fontFamily: "Montserrat_Bold",
    },


});
