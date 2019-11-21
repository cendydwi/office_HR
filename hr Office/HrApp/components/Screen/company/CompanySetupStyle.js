import { StyleSheet } from 'react-native';
export const CompanySetupStyle = StyleSheet.create({
    FlatListContainer: { flex: 1, marginTop: 10, },
    FlatListItemContainer: {
        padding: 15,
        borderWidth: 0,
        backgroundColor: '#ffffff',
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 2,
    },
    ListPart: { alignItems: 'flex-start', marginLeft: 10 },
    companyText: { fontSize: 17, fontWeight: '500', color: '#4a4a4a', marginBottom: 2, },
    locationIcon: { height: 15, width: 15, marginTop: 4, marginRight: 5 },
    locationText: { flex: 1, flexWrap: 'wrap', fontSize: 14, marginLeft: 5, color: '#4a4a4a', },
    phoneIcon: { height: 15, width: 15, marginTop: 4, marginRight: 5 },
    phoneText: {
        flex: 1,
        flexWrap: 'wrap', fontSize: 14, marginLeft: 5, color: '#4a4a4a'
    },
    editCotainer: { alignItems: 'flex-end', marginRight: 20, },
    editImage: { height: 30, width: 30, alignSelf: "flex-end", marginTop: 6 },
    editText: { color: "#58687a", fontSize: 12, marginRight: 2, marginTop: 3, fontWeight: '500' },
    container: {
        flex: 1,
        backgroundColor: '#f6f7f9',
    },
    addPeopleBtn: {
        backgroundColor: '#319E67',
        padding: 15,
        width: 150,
        alignSelf: 'center',
        borderRadius: 20,
        marginVertical: 15,
        marginBottom:50,
        // marginTop: "10%"
    },
    addPeopleBtncom: {
        backgroundColor: '#319E67',
        padding: 15,
        width: 150,
        alignSelf: 'center',
        borderRadius: 20,
        marginVertical: 15,
        marginTop: "7%"
    },
    addPeopleBtn1: {
        backgroundColor: '#319E67',
        padding: 15,
        width: 150,
        borderRadius: 20,

    },
    horizontalLine: {
        borderRightColor: '#c3c4c6',
        borderBottomWidth: StyleSheet.hairlineWidth,
        //height:200,
        width: 100,
        marginTop: 10
    },
    addPeopleImg: {
        width: 50,
        height: 50,
        marginVertical: 6
    },
    modal2: {
        height: "70%",
        width: "85%",
        borderRadius: 20,

    },
    modalforCreateCompany: {
        height: "75%",
        width: "80%",
        borderRadius: 20,
        backgroundColor: '#EBEBEB',

    },
    dblModelContent: {
        paddingVertical: 20,
    },
    modal3: {
        height: "85%",
        width: "83%",
        borderRadius: 20,
       // flex:1,
        // justifyContent: 'center',
        //alignItems: 'center',
    },
    dbblModalText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#535353'
    },
    modalForEditProfile: {
        height: "80%",
        width: "85%",
        borderRadius: 20,

    },
    modelContent: {
        alignItems: 'center',
        marginBottom: 15,
    },
    inputstyle: {
        width: 250,
        height: 40,
        backgroundColor: '#ddd',
        color: '#2c2930',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 4,
    },
    inputstylecom: {
        width: 75,
        height: 30,
        backgroundColor: '#ddd',
        color: '#2c2930',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 8,
    },
    addCompanyinputBox: {
        width: "85%",
        height: "12%",
        backgroundColor: '#ebebeb',
        color: '#2c2930',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 8,
    },
    modalHeader: { justifyContent: "space-between", flexDirection: "column" },
    modalheaderLeft: { alignItems: "flex-start" },
    modalheaderRight: { alignItems: "flex-end" },
    closeTouchable: {
        marginLeft: 0, marginTop: 0, 
    },
    lablecompanyName: { fontSize: 14, marginLeft: 25, marginBottom: 5, color: 'gray' },
    lableAddress: { fontSize: 14, marginLeft: 25, marginBottom: 5, color: 'gray' },
    labelphone: { fontSize: 14, marginLeft: 25, marginBottom: 5, color: 'gray' },
    labelContainerMax: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
    },
    lablemax: { marginLeft: 20, justifyContent: "flex-start" },
    TextinputTouch: { marginRight: 18, justifyContent: "flex-end" },
    SaveStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
    canleaveText: { marginLeft: 20, justifyContent: "flex-start" },

})