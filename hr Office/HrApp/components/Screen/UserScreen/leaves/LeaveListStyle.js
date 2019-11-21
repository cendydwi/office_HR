import { StyleSheet, Platform } from 'react-native';

export const LeaveListStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7f9',
    },
    ApplyButtonContainer: {
        justifyContent: 'flex-end', marginRight: 0,
        marginLeft: 0, flexDirection: 'row',
        alignItems: 'center',
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
    loaderIndicator: {
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 0,
        justifyContent: 'center', alignContent: 'center',
    },
    daysBox: {
        alignItems: 'center',
        justifyContent: 'center', backgroundColor: "#f4f5f6",
        borderWidth: 0.5, padding: 4, borderRadius: 10,
    },
    listContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 2,
        paddingBottom: 2,
        padding: 15,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#ffffff',
        margin: 10,
        elevation:2,
    },
    listInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2
    },
    leaveType: {
        width: "60%",
        justifyContent: 'flex-start',
        opacity: 0.3,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#1a1a1a"
    },
    leaveFrom: {
        justifyContent: 'flex-end',
        opacity: 0.3,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#1a1a1a"
    },
    leaveReasonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leaveReasonText: {
        width: "60%",
        justifyContent: 'flex-start',
        fontFamily: "Montserrat_Bold",
        fontSize: 14,
        textAlign: "left",
        color: "#1a1a1a",
        fontFamily: 'Montserrat_SemiBold'
    },
    reasonFromDate: {
        justifyContent: 'flex-end',
        fontFamily: "Montserrat_Bold",
        fontSize: 12,
        textAlign: "left",
        color: "#1a1a1a"
    },
    causeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2,
        paddingVertical: 5,
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
    leaveToText: {
        justifyContent: 'flex-end',
        opacity: 0.3,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#1a1a1a"
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
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
    plusButton: {
        backgroundColor: "#600B74",
        alignItems: 'center',
        padding: 6,
        paddingHorizontal: 9,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
    },
    ApplyButtonText: {
        // fontWeight: 'bold',
        fontSize: 12, color: '#ffffff',
        fontFamily: "Montserrat_Bold",
    },
    ApplyTextButton: {
        backgroundColor: "#902ca8",
        alignItems: 'center',
        padding: 7,
        paddingHorizontal: 9,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
    },
    ApplyButtonTouch: {
        flexDirection: 'row', alignItems: 'center',
        // height: 1, 
    },
    detailsText: {
        width: "60%",
        justifyContent: 'flex-start',
        fontFamily: "PRODUCT_SANS_REGULAR",
        fontSize: 14,
        textAlign: "left",
        color: "#1a1a1a"
    },
    detailsTextInner: {
        justifyContent: 'flex-end',
        fontFamily: "Montserrat_Bold",
        fontSize: 12,
        textAlign: "left",
        color: "#1a1a1a"
    },
    approvedByContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
        paddingVertical: 5,
        borderTopWidth: 0.4,
        borderTopColor: "black",
    },
    approvedByText: {
        // width: "60%",
        justifyContent: 'flex-start',
        // flex: 1,
        flexWrap: 'wrap',
        opacity: 0.3,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#1a1a1a"
    },
    approvedAtText: {
        // flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        opacity: 0.3,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#1a1a1a",
        marginTop: 5,
    },
    statusButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0.4,
        borderTopColor: "black",
        paddingTop: 5,
        paddingBottom: 8,
        alignItems: 'center',
    },
    statusButtonInner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: "60%",
        padding: 5,
    },
    statusDate: {
        justifyContent: 'flex-end',
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        paddingLeft: 3,
        textAlign: "center",
        color: "#929292",
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: "60%",
    },
    buttonTouchable: {
        width: 82.3,
        height: 22.4,
        borderRadius: 5,
        backgroundColor: "#1e8555",
        justifyContent: 'center'
    },
    approveText: {
        fontFamily: "Montserrat_Bold",
        fontSize: 10,
        textAlign: "center",
        color: "#ffffff"
    },
    rejectButtonTouchable: {
        width: 82.3,
        height: 22.4,
        borderRadius: 5,
        backgroundColor: "#c24a4a",
        justifyContent: 'center',
        marginLeft: 4,
    },
    rejectText: {
        fontFamily: "Montserrat_Bold",
        fontSize: 10,
        textAlign: "center",
        color: "#ffffff"
    },

});
