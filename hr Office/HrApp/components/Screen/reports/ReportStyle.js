import { StyleSheet, Platform } from 'react-native';

export const ReportStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f6f7f9',
       
    },
    headerContainer: {
        flexDirection: 'row',
        height: 60,
        paddingTop: 0,
        backgroundColor: 'white',
        shadowColor: 'rgba(181,181,181,0.02)',
        shadowOffset: { width: 0, height: -2 },
       // elevation: 10,
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
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, justifyContent: 'center', alignContent: 'center',
    }, headerBar: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
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

    headerTitleText: {
        color: '#4E4E4E', marginTop: 1,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 16, textAlign: 'center',
    },
    headerTitle: {
        padding: 0, paddingLeft: 10,
        margin: 0, flexDirection: 'row',
    },

    summaryContiner: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingTop: 0,
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        margin: 10,
        elevation:2,
    },
    Summaryhead: {
        justifyContent: 'space-between', flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderBottomColor: '#f6f7f9', paddingBottom: 8, marginTop: 10,
    },
    SummryheadLeft: { alignItems: 'flex-start' },
    SummaryText: { color: '#4b4b4b', fontSize: 12, fontFamily: "Montserrat_Bold",fontSize:16, },
    CalanderIconContainer: { alignItems: 'flex-end', flexDirection: 'row', },
    monthText: { fontFamily: 'PRODUCT_SANS_BOLD', color: '#4b4b4b', fontSize: 12,fontSize:16, },
    valueContainer: { justifyContent: 'space-between', flexDirection: 'row', padding: 5, borderRadius: 10, },
    valueContainerFirst: { alignItems: 'flex-start', marginTop: 7, marginBottom: 5,elevation:2, },
    IconContainer: { flexDirection: 'row', paddingTop: 1, paddingBottom: 1, marginBottom: 5, },
    receiveText: { fontFamily: 'PRODUCT_SANS_REGULAR', color: '#3b875e', marginLeft: 5,fontSize:16, },
    depositeText: { fontFamily: 'PRODUCT_SANS_REGULAR', color: '#476182', marginLeft: 5,fontSize:16, },
    previousText: { fontFamily: 'PRODUCT_SANS_REGULAR', color: '#919191', marginLeft: 5,fontSize:16, },
    DeuBillTExt: { fontFamily: 'PRODUCT_SANS_REGULAR', color: '#c49602', marginLeft: 5,fontSize:16, },
    DeuBillTExttask: { fontFamily: 'PRODUCT_SANS_REGULAR', color: 'red', marginLeft: 5,fontSize:16, },

    FirstValueText: { fontFamily: 'PRODUCT_SANS_BOLD', color: '#3b875e',fontSize:16, },
    SecondValueText: { fontFamily: 'PRODUCT_SANS_BOLD', color: '#476182' ,fontSize:16,},
    ThirdValueText: { fontFamily: 'PRODUCT_SANS_BOLD', color: '#919191' ,fontSize:16,},
    FourthvalueText: { fontFamily: 'PRODUCT_SANS_BOLD', color: '#c49602',fontSize:16, },
    FourthvalueTexttask: { fontFamily: 'PRODUCT_SANS_BOLD', color: 'red',fontSize:16, },

    lastpartContiner: {
        justifyContent: 'space-between', flexDirection: 'row', padding: 5, borderTopWidth: 1, borderTopColor: '#f6f7f9', paddingBottom: 8,
    },
    neetodepositText: { color: '#c74444', fontSize: 12, fontFamily: "Montserrat_Bold" },
});
