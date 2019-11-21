import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const LeaveApplyStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    renderLeaveArrayListTextStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#535353'
    },
    headerTitle: {
        alignItems: 'flex-start', flexDirection: 'row'
    },
    headerText: {
        fontWeight: 'bold', fontSize: 20, color: '#141414', marginTop: 3,
    },
    loaderIndicator: {
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, justifyContent: 'center', alignContent: 'center',
    },
    headerTextRight: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    mainBodyStyle: {
        padding: 10,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    mainBodyTopStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    fromTextStyle: {
        width: (width * 50) / 100,
        justifyContent: 'flex-start',
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#cfcfcf"
    },
    datePickerRowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    datePickerLeftStyle: {
        width: (width * 50) / 100,
        justifyContent: 'flex-start',
    },
    datePickerWidth: {
        width: (width * 40) / 100,
    },
    datePickerLeftdateInput: {
        borderRadius: 8,
        backgroundColor: "#f5f7fb",
        height: 30,
        width: '100%',
        marginRight: 25,
    },
    datePickerLeftdateText: {
        color: "#848f98",
        fontFamily: "Montserrat_SemiBold",
        fontWeight: "bold",
        fontStyle: "normal",
    },
    datePickerRightStyle: {
        width: (width * 50) / 100,
        justifyContent: 'flex-end',
    },
    toTextStyle: {
        width: (width * 50) / 100,
        justifyContent: 'flex-end',
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#cfcfcf"
    },
    leaveTypeRowStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 5,
        paddingLeft: 10,

        width: (width * 50) / 100,
    },
    leaveTypeRowTextStyle: {
        width: (width * 50) / 100,
        justifyContent: 'flex-start',
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#cfcfcf",
    },
    leaveDropDownRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
    },
    leaveDropDownStyle: {
        width: (width * 50) / 100,
        height: 37,
        alignItems: 'center',
        backgroundColor: "#f5f7fb",
        justifyContent: 'flex-start',
        borderRadius: 8,
        padding: 0,
        paddingLeft: 10,
        margin: 0,
        marginTop: 4,
        flexDirection: 'row',
    },
    leaveDropDownText: {
        width: (width * 40) / 100,
        justifyContent: 'flex-start',
        color: "#848f98",
        fontFamily: 'PRODUCT_SANS_BOLD',
        fontSize: 16,
        marginTop: 1,
        borderRightColor: "#ffffff",
        borderRightWidth: 1.5,
    },
    leaveDropDownIconStyle: {
        marginTop: 4,
        marginLeft: 4,
        justifyContent: 'flex-end',
        backgroundColor: "#f5f7fb",
    },
    leaveCauseRow: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 5,
        paddingLeft: 10,
    },
    leaveCauseText: {
        width: (width * 50) / 100,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#cfcfcf",
    },
    leaveTextInputRow: {
        padding: 5,
        height: (height * 35) / 100,
    },
    leaveCauseTextInputStyle: {
        textAlignVertical: "top",
        fontFamily: "OPENSANS_REGULAR",
        fontSize: 13,
        textAlign: "left",
        height: "40%",
        paddingHorizontal: 7,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#f5f7fb',
        color: '#2c2930',
        padding: 5,
    },
    leaveRequestRow: {
        justifyContent: 'flex-end',
    },
    leaveRequestTouchStyle: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center', height: 50, flexDirection: 'row',
        backgroundColor: "#902ca8"
    },
    leaveRequestTouchText: {
        justifyContent: 'center',
        fontSize: 18,
        textAlign: "center",
        color: "#ffffff",
        fontFamily: "PRODUCT_SANS_BOLD",
    },
    dateInput: {
        borderRadius: 8,
        backgroundColor: "#f5f7fb",
        height: 30,
        width: '100%',
        marginRight: 25,
    },
    dateText: {
        color: "#848f98",
        fontFamily: "Montserrat_SemiBold",
        fontWeight: "bold",
        fontStyle: "normal",
    },
    leaveTypeModalMainStyle: {
        height: "60%",
        width: "75%",
        borderRadius: 20,
        backgroundColor: '#EBEBEB',
    },
    causeText: {
        width: "60%",
        justifyContent: 'flex-start',
        opacity: 0.3,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#1a1a1a"
    },
});
