import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const DailyAttendanceStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6f9',
        flexDirection: 'column',
    },
    HeaderContent: {
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
        elevation: 10,
        height: 60,
    },
    HeaderFirstView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: 5, alignItems: 'center',
    },
    HeaderMenuicon: {
        alignItems: 'center', padding: 10,
    },
    HeaderMenuLeft: {
        alignItems: 'center',
    },
    HeaderMenuLeftStyle: {
        alignItems: 'center',
        height: 40, width: 75,
    },
    HeaderMenuiconstyle: {
        width: 20, height: 20,
    },
    HeaderTextView:
    {
        backgroundColor: 'white', padding: 0,
        marginLeft: 17, margin: 0,
        flexDirection: 'row', alignItems: 'center',
    },
    HeaderTextstyle: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 16,
        textAlign: "left", color: "#2a2a2a",
    },
    ListContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 5,
        marginLeft: -2,
        backgroundColor: "#f5f7fb",
    },
    FlatListContainer: {
        backgroundColor: '#f5f6f8',
        flex: 4,
        paddingHorizontal: 5,
    },
    FlatListTouchableOpacity: {
        padding: 8,
        paddingBottom: 13,
        borderWidth: 0,
        backgroundColor: '#fff',
        margin: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 2,
    },
    FlatListLeft: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    ImageLocal: {
        ...Platform.select({
            ios: {
                width: 60, height: 60, borderRadius: 30
            },
            android: {
                width: 60, height: 60, borderRadius: 30
            },
        }),
    },
    ImagestyleFromServer: {
        ...Platform.select({
            ios: {
                width: 60, height: 60, borderRadius: 30
            },
            android: {
                width: 60, height: 60, borderRadius: 30
            },
        }),
    },
    styleForonlineOfflineIcon: {
        ...Platform.select({
            ios: {
                width: 20,
                height: 20,
                marginLeft: -5,
                marginTop: -30,
            },
            android: {
                width: 20,
                height: 20,
                marginLeft: -5,
                marginTop: -30,
            },
        }),
    },
    RightTextView: {
        flexDirection: 'column', marginTop: 3,
    },
    NameText: {
       fontFamily: "OPENSANS_BOLD",
        fontSize: 14,
        textAlign: "left",
        color: "#19260c",
    },
    DesignationText: {
        fontSize: 12,
       fontFamily: "OPENSANS_REGULAR",
        textAlign: "left",
        color: "#8f8f8f"
    },
    DepartmentText: {
        fontSize: 12,
       fontFamily: "OPENSANS_REGULAR",
        textAlign: "left",
        color: "#b5b5b5"
    },
    TimeContainer: {
        alignItems: 'flex-end', marginRight: 10, marginTop: 4
    },
    TimeContent: {
        flexDirection: 'row',
        borderBottomColor: '#437098',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 3,
    },
    CheckintimeStyle: {
        paddingRight: 8,
        marginTop: 2
    },
    AntDesignstyle: {
        paddingRight: 2,
    },
    CheckinTimeText: {
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 11,
        textAlign: "left",
        color: "#076332"
    },
    CheckOutTimeView: {
        flexDirection: 'row',
        padding: 3,
    },
    CheckOutTimetext: {
        paddingRight: 8,
        marginTop: 2
    },
    CheckOutTimeIconstyle: {
        paddingRight: 2,
    },
    CheckOutTimeText: {
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 11, textAlign: "left", color: "#717171"
    },
    countBoxContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 5,
        marginLeft: -2,
        backgroundColor: "#f5f7fb",
    },
    countBoxColumn1: {
        padding: 5,
        width: (width * 33) / 100,
        height: 41.1,
        backgroundColor: "#f5f7fb",
        justifyContent: 'center',
        borderRightColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
        marginBottom: 3,
        borderRightWidth: 2,
    },
    countBoxColumn1NumberActive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 20,
        textAlign: "center",
        color: "#3ab875",
        justifyContent: 'center'
    },
    countBoxColumn1NumberInactive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 20,
        fontStyle: "normal",
        textAlign: "center",
        color: "#bbc3c7",
    },
    countBoxColumn1LabelActive: {
        color: "#3ab875",
       fontFamily: "Montserrat_Bold",
        fontSize: 10,
        fontStyle: "normal",
        textAlign: "left",
        paddingTop: 8,
        paddingLeft: 2,
        justifyContent: 'flex-start',
    },
    countBoxColumn1LabelInactive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 10,
        fontStyle: "normal",
        textAlign: "left",
        color: "#bbc3c7",
        paddingTop: 8,
        paddingLeft: 2,
        justifyContent: 'flex-start',
    },


    countBoxColumn2: {
        width: (width * 33) / 100,
        height: 41.1,
        padding: 5,
        borderRightWidth: 2,
        borderRightColor: '#ffffff',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#f5f7fb",
        marginTop: 3,
        marginBottom: 3
    },
    countBoxColumn2NumberActive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 20,
        color: '#6f9fc9',
        textAlign: 'center',
        justifyContent: 'center',
        paddingLeft: 2,
        fontStyle: "normal",
        textAlign: "center",
    },
    countBoxColumn2NumberInactive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 20,
        color: '#bbc3c7',
        textAlign: 'center',
        justifyContent: 'center',
        paddingLeft: 2,
        fontStyle: "normal",
        textAlign: "center",
    },
    countBoxColumn2LabelActive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 10,
        fontStyle: "normal",
        textAlign: "left",
        paddingTop: 8,
        paddingLeft: 2,
        justifyContent: 'center',
        color: "#6f9fc9",
    },
    countBoxColumn2LabelInactive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 10,
        fontStyle: "normal",
        textAlign: "left",
        paddingTop: 8,
        paddingLeft: 2,
        justifyContent: 'center',
        color: "#bbc3c7",
    },

    countBoxColumn3: {
        padding: 5,
        width: (width * 33) / 100,
        height: 41.1,
        // backgroundColor: "#cddeee",
        backgroundColor: "#f5f7fb",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
        marginBottom: 3
    },
    countBoxColumn3NumberActive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 20,
        // fontWeight: "bold",
        fontStyle: "normal",
        // lineHeight: 37,
        // letterSpacing: 0,
        textAlign: "center",
        justifyContent: 'center',
        color: "#e2b24e",
    },
    countBoxColumn3NumberInactive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 20,
        // fontWeight: "bold",
        fontStyle: "normal",
        // lineHeight: 37,
        // letterSpacing: 0,
        textAlign: "center",
        justifyContent: 'center',
        color: "#bbc3c7",
    },
    countBoxColumn3LabelActive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 10,
        // fontWeight: "bold",
        fontStyle: "normal",
        // lineHeight: 7,
        // letterSpacing: 0.5,
        textAlign: "left",
        color: "#e2b24e",
        paddingTop: 8,
        paddingLeft: 1,
        justifyContent: 'center',
    },
    countBoxColumn3LabelInactive: {
       fontFamily: "Montserrat_Bold",
        fontSize: 10,
        // fontWeight: "bold",
        fontStyle: "normal",
        // lineHeight: 7,
        // letterSpacing: 0.5,
        textAlign: "left",
        color: "#bbc3c7",
        paddingTop: 8,
        paddingLeft: 1,
        justifyContent: 'center',
    }

})



