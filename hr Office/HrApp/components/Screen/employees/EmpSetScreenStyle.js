import { StyleSheet,Platform } from 'react-native';

export const EmpSetScreenStyle = StyleSheet.create({
    renderCboListStyle: {
        paddingVertical: 7,
        borderBottomColor: '#D5D5D5',
        borderBottomWidth: 2
    },
    FlatlistMainView: {
        padding: 12,
        borderWidth: 0, backgroundColor: 'white',
        marginBottom: 5, marginLeft: 10, marginRight: 10,
        borderRadius: 10, borderColor: 'gray',
        justifyContent: 'space-between',
        flexDirection: 'row',
       elevation: 2,
    },
    FlLeftside: {
        alignItems: 'flex-start', alignItems: 'center',
        flexDirection: 'row', padding: 8
    },
    imageradious:{
        ...Platform.select({
            ios: {
                width: 60, height: 60, borderRadius: 30
            },
            android: {
                width: 60, height: 60, borderRadius: 300,
            },
        }),
    },
    FlRightSide: {
        alignItems: 'flex-end', alignItems: 'flex-start',
        flexDirection: 'column', justifyContent: 'center',
    },
    FlRightSideRow: {
        alignItems: 'flex-start', marginBottom: 3,
        paddingRight: 15, flexDirection: 'row'
    },
    ModalSelectorStyle: {
        width: "75%",
        height: "89%",
        borderRadius: 5,
        backgroundColor: '#ebebeb',
        marginVertical: 0,
        marginLeft: "7.5%",
        marginTop: 4,
    },
    ModalForDeptSelectionIos: {
        marginLeft: 6, borderRadius: 5, marginLeft: 2,
        borderRadius: 10, backgroundColor: '#ddd',
        width: 20, height: 20, padding: 5, marginTop: 10,
        backgroundColor: '#ddd', width: 25,
        padding: 5, height: 38,
        marginTop: 4,
    },
    ModalForDeptSelectionAndroid: {
        marginLeft: 7, borderRadius: 10,
        marginTop: 5, padding: 5,
        backgroundColor: '#ddd', justifyContent: 'center',
        height: 38, width: 25
    },
    EmpText:
    {
        fontSize: 12, color: '#8f8f8f'
    },
    EmpSettingText: {
        fontSize: 14, color: '#8E6F71',
    },
    EmpSettingImage: {
        height: 20, width: 20, marginRight: 5,
    },
    ModalCloseBtn: {
        marginLeft: 0, marginTop: 0,
       
    },
    ActivityIndicatorStyle: {
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 0,
        justifyContent: 'center', alignContent: 'center',
    },
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
        marginVertical: 10,
        justifyContent: 'flex-end',
        // marginTop: "10%"
    },
    RadioBtnFirst: {
        textAlign: "right", fontSize: 16,
        color: '#6C7272', fontWeight: '500', marginTop: 0,
        marginRight: 5, marginLeft: 2
    },
    RadioBtnLast: {
        textAlign: "right", fontSize: 16,
        color: '#6C7272', fontWeight: '500',
        marginTop: 0, marginLeft: 2
    },
    RadioBtnView: {
        flexDirection: "row", marginTop: 5,
        alignItems: 'center', alignSelf: 'center'
    },
    ModalAddEmpLastRow: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    AutoCheckRow: {
        alignItems: 'flex-start', marginLeft: '10%',
        marginTop: 10,
    },
    AutoCheckText: {
        fontSize: 18, color: '#6C7272',
        fontWeight: '500'
    },
    CheckpointSliderViewAndroid:
    {
        alignItems: 'flex-end', padding: 10,
        flexDirection: 'row'
    },
    CheckpointSliderViewIos: {
        alignItems: 'flex-end', padding: 10, flexDirection: 'row',
    },
    CheckpointSliderIosText: {
        fontSize: 18, color: '#6C7272', fontWeight: '500', marginTop: -10
    },
    CheckpointSliderAndroidText: {
        fontSize: 18, color: '#6C7272', fontWeight: '500'
    },
    AddEmployeeModalStyle: {
        height: "80%",
        width: "88%",
        borderRadius: 20,
        // justifyContent: 'center',
        //alignItems: 'center',
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
    modal31: {
        height: "50%",
        width: "83%",
        borderRadius: 20,
        // justifyContent: 'center',
        //alignItems: 'center',
    },
    inputBox: {
        width: "85%",
        height: "9%",
        backgroundColor: '#ebebeb',
        color: '#2c2930',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 8,

    },
    addPeopleBtn1: {
        backgroundColor: '#319E67',
        padding: 15,
        width: 150,
        borderRadius: 20,

    },
    modal2: {
        height: "75%",
        width: "85%",
        borderRadius: 20,
elevation:2,
    },
    modalforCreateCompany: {
        height: "70%",
        width: "75%",
        borderRadius: 20,
        backgroundColor: '#EBEBEB',

    },
    modalforCreateCompany1: {
        height: 350,
        width: "75%",
        borderRadius: 20,
        backgroundColor: '#EBEBEB',

    },
    dblModelContent: {
        paddingVertical: 20,
    },
    modal6: {
        height: 200,
        width: 300,
        borderRadius: 20,

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
        marginTop: 10,
        marginBottom: 5,
    },
    addCopyBtn: {
        backgroundColor: '#4FB96F',
        padding: 15,
        width: 150,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 40
    },
    inputstyle: {
        width: 240,
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
        width: 100,
        height: 30,
        backgroundColor: '#ddd',
        color: '#2c2930',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 8,
    },
    modalforDept: {
        height: "40%",
        width: "83%",
        borderRadius: 20,
    },
    addPeopleImg: {
        width: 200,
        height: 100,
        marginVertical: 20
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalUserFirstView: {
        justifyContent: "space-between",
        flexDirection: "column"
    },
    modalUserTuachableOpacity: {
        marginLeft: 0,
        marginTop: 0,
      
    },
    modalUserTextvaluecontainer: {
        alignSelf: 'center',
        width: 250
    },
    modalUserUserName: {
        color: '#367C4A',
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalUserUservalue: {
        color: '#504C4B',
        paddingVertical: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalUserGeneratedPass: {
        color: '#367C4A',
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalUserGenratedpassvalue: {
        color: '#504C4B',
        paddingVertical: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    testCopy: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalforDeptTuachable: {
        marginLeft: 0,
        marginTop: 0,
       
    },
    modalfordeptaddDept: {
        width: 180,
        height: 40,
        backgroundColor: '#ebebeb',
        color: '#2c2930',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 8,

    },
    modalEmpEdit: {
        marginLeft: 0,
        marginTop: 0,
        borderRadius: 30,
    },
    modalEmpEditdatabaseImage: {
        ...Platform.select({
            ios: {
                width: 100, height: 100, borderRadius: 50
            },
            android: {
                width: 100,
                height: 100,
                marginVertical: 5,
                borderRadius: 600,
                alignSelf: 'center'
            },
        }),
    },
    modalEmpEditlocalImage: {
        ...Platform.select({
            ios: {
                width: 100, height: 100, borderRadius: 50
            },
            android: {
                width: 100,
                height: 100,
                marginVertical: 5,
                borderRadius: 600,
                alignSelf: 'center'
            },
        }),
    },
    modalEmpEditTextBox: {
        width: 240,
        height: 40,
        backgroundColor: '#ddd',
        color: '#2c2930',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 8,
    },
    modalEmpEditSave: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }

});
