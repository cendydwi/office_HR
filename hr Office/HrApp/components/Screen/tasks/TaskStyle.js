import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
export const TaskStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f6f7f9',
        flexDirection: 'column',
    },
    descriptionInputRow: {
        margin: 10, flexDirection: 'column',
        height: (height * 30) / 100,
    },
    headerContainer: {
        flexDirection: 'row',
        height: 60,
        paddingTop: 0,
        backgroundColor: '#fff',
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

    headerText: {
        fontWeight: 'bold', fontSize: 20, color: '#141414', marginTop: 3,
    },

    headerBar: {
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
        elevation: 10,
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
    createTaskButtonContainer: {
        justifyContent: 'flex-end', marginRight: 0,
        marginLeft: 0, flexDirection: 'row',
        alignItems: 'center',
    },
    createTaskButtonTouch: {
        flexDirection: 'row', alignItems: 'center', padding: 3,
    },
    taskStatusContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 5,
        marginLeft: -2,
        alignItems: 'center', marginTop: -4,
        backgroundColor: '#f6f7f9',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    onProgress: {
        color: "#f5f7fb"
        // padding: 5,
        // width: "30%",
        // height: 41.1,
        // borderRightColor: '#ffffff',
        // backgroundColor: "#f5f7fb",
        // justifyContent: 'center',
        // flexDirection: 'row',
        // alignItems: 'center',
        // marginTop: 3,
        // marginBottom: 3,
        // borderRightWidth: 2,
    },
    completed: {
        padding: 5,
        width: "30%",
        height: 41.1,
        borderRightWidth: 2,
        borderRightColor: '#ffffff',
        backgroundColor: "#f5f7fb",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
        marginBottom: 3
    },
    cancelled: {
        height: 41.1,
        padding: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#f5f7fb",
        marginTop: 3,
        marginBottom: 3
    },
    progressActiveNotClicked: {
        fontFamily: "Montserrat_Bold",
        fontSize: 12,

        textAlign: "left",
        color: "#bbc3c7",
        paddingTop: 8,
        paddingLeft: 2,
        justifyContent: 'flex-start',
    },
    progressActiveClicked: {
        color: "#3ab875",
        fontFamily: "Montserrat_Bold",
        fontSize: 12,

        textAlign: "left",
        paddingTop: 8,
        paddingLeft: 2,
        justifyContent: 'flex-start',
    },
    completeActiveNotClicked: {
        fontFamily: "Montserrat_Bold", fontSize: 12,

        textAlign: "left",
        paddingTop: 8,
        paddingLeft: 2,
        justifyContent: 'center',
        color: "#bbc3c7",
    },
    completeActiveClicked: {
        fontFamily: "Montserrat_Bold", fontSize: 12,
        textAlign: "left",
        paddingTop: 8, paddingLeft: 2,
        justifyContent: 'center', color: "#6f9fc9",
    },
    cancelActiveClicked: {
        fontFamily: "Montserrat_Bold", fontSize: 12, textAlign: "left",
        color: "#e2b24e", paddingTop: 8, paddingLeft: 1, justifyContent: 'center',
    },
    cancelActiveNotClicked: {
        fontFamily: "Montserrat_Bold", fontSize: 12, textAlign: "left",
        color: "#bbc3c7", paddingTop: 8, paddingLeft: 1, justifyContent: 'center',
    },
    flatlistContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 5,
        padding: 13,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        flexWrap: 'wrap',
        backgroundColor: "#f6f7f9",
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1,
        flexWrap: 'wrap',
        padding: 2,
        paddingTop: 5,
        marginBottom: 15,
    },
    taskHeaderText: {
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 14,
        textAlign: "left",
        color: "#505050",
    },
    taskBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2,
        alignItems: 'center',
        flex: 1,
        flexWrap: 'wrap',
    },
    taskBodyLeft: {
        justifyContent: 'flex-start',
        flex: 1,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    taskBodyText: {
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 12,
        textAlign: "left",
        color: "#878787",
        marginLeft: 2,
    },
    taskBodyRight: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        flexWrap: 'wrap',
    },
    taskFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        borderTopColor: "#f6f7f9",
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
    },
    taskFooterLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: "50%",
        // alignItems: 'flex-start'
        alignItems: 'center',

    },
    taskFooterText: {
        paddingLeft: 10,
        justifyContent: 'flex-end',
        fontFamily: "Montserrat_Bold",
        fontSize: 10,
        textAlign: "left",
        // color: "#b2955a",//orange
        color: "#3d8851",//Green
        // color: "#823e3e",//Red

    },
    taskFooterRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    taskFooterDateText: {
        fontFamily: "Montserrat_Bold",
        fontSize: 11,
        textAlign: "left",
        color: "#878787"
    },
    viewTaskContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    viewTaskInnerContainer: {
        flexDirection: 'row', height: 60, paddingTop: 0,
        backgroundColor: '#ffffff',
        shadowColor: 'rgba(181,181,181,0.02)',
        shadowOffset: { width: 0, height: -2 },
        elevation: 10, shadowRadius: 8,
        shadowOpacity: 0.3, alignItems: 'center',
        paddingHorizontal: 10, justifyContent: 'space-between',
        borderBottomRightRadius: 10, borderBottomLeftRadius: 10,
    },
    viewTaskHeader: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 16,
        textAlign: "center", color: "#141414", marginTop: 4,
    },
    viewTaskTitle: {
        width: "100%", flexDirection: 'column',
        justifyContent: 'flex-start',
        marginHorizontal: 5, marginLeft: 1,
        marginRight: 1.5, marginTop: -4,
        paddingVertical: 15, padding: 10,
        backgroundColor: '#ffffff',
    },
    viewTaskTitle1: {
        width: "100%", flexDirection: 'column',
        justifyContent: 'flex-start',
        marginHorizontal: 5, marginLeft: 1,
        marginRight: 1.5, marginTop: -4,
        paddingVertical: 15, padding: 10,
        backgroundColor: '#ffffff',
    },
    viewTaskTitleText: {
        paddingVertical: 8,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 16, textAlign: "left",
        color: "#505050", borderBottomColor: '#f6f7f9',
        borderBottomWidth: 1,
    },
    viewTaskDescription: {
        paddingVertical: 8, color: "#505050",
        fontFamily: "PRODUCT_SANS_REGULAR",
        fontSize: 16, textAlign: "left",
    },
    viewTaskBodyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', padding: 2,
        marginHorizontal: 8, marginVertical: 8,

    },
    viewTaskBodyContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', padding: 2,
        marginHorizontal: 8,
    },
    viewTaskStatusContainer: {
        justifyContent: 'flex-start', flexDirection: 'column',
        marginBottom: 3, width: "48%"
    },
    viewTaskStatusLabel: {
        opacity: 0.3, fontSize: 13,
        fontFamily: "PRODUCT_SANS_BOLD",
        textAlign: "left", color: "#848f98",
        marginBottom: 5, marginLeft: 12,
    },
    viewTaskStatusCheckboxContainer: {
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 5,
    },
    viewTaskStatusText: {
        marginLeft: 8, justifyContent: 'center',
        fontFamily: "Montserrat_Bold",
        fontSize: 12, textAlign: "left", color: "#ffffff",
        padding: 2,
    },
    viewTaskDueDateContainer: {
        justifyContent: 'flex-end', flexDirection: 'column', marginBottom: 3, width: "50%",
    },
    viewTaskDueDateLabel: {
        justifyContent: 'flex-end', opacity: 0.3,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 13, textAlign: "right",
        color: "#1a1a1a", marginBottom: 5,
        marginRight: "25%",
    },
    viewTaskDueDateValueContainer: {
        borderRadius: 5, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
        padding: 5, backgroundColor: "#f6f7f9", marginRight: 7,
    },
    viewTaskDueDateValue: {
        marginLeft: 8, fontFamily: "Montserrat_Bold",
        fontSize: 12, textAlign: "left", color: "#1a1a1a"
    },
    viewTaskAssignToContainer: {
        flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 10
    },
    viewTaskAssignToInnerContainer: {
        flex: 1,
        borderRadius: 4, padding: 7, backgroundColor: '#4375d9',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewTaskAssignToLeftIcon: {
        flex: 1, flexWrap: 'wrap',
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#ffffff"
    },
    viewTaskAssignToBottom: {
        flex: 1,
        borderRadius: 4, padding: 7, backgroundColor: '#ffffff',
        alignItems: 'center',
        flexDirection: 'row', marginLeft: 10,
        justifyContent: 'center',
    },
    viewTaskAttachmentContainer: {
        width: "95%",
        borderRadius: 4, backgroundColor: "#ffffff",
        alignItems: 'center', justifyContent: 'space-between',
        // padding: 8,
        paddingVertical: 7,
        marginTop: 4, marginBottom: 4,
        marginHorizontal: 10, flexDirection: 'row',
        borderBottomColor: '#f6f7f9', borderBottomWidth: 1,
    },
    viewTaskAttachmentInnerContainer: {
        justifyContent: 'flex-start', flexDirection: 'row',
        marginLeft: 18, alignItems: 'center',
    },
    viewTaskAttachmentLeftIcon: {
        fontFamily: "Montserrat_Bold", fontSize: 12,
        textAlign: "left", color: "#4a535b", marginLeft: 6,
    },
    viewTaskAttachmentPlusIcon: {
        justifyContent: 'flex-end', flexDirection: 'row',
        alignItems: 'center', padding: 5,
    },
    loaderIndicator: {
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, justifyContent: 'center', alignContent: 'center',
    },
    createTaskSaveButtonContainer: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center', height: 50, flexDirection: 'row',
        backgroundColor: "#4570cb",
    },
    createTaskSaveButtonText: {
        fontFamily: "Montserrat_Bold", fontSize: 15,
        textAlign: "center", color: "#ffffff"
    },
    createTaskTitleLabel: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#848f98",
        marginBottom: 10, marginLeft: 20, marginTop: 5
    },
    createTaskTitleLabelExpenses: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#848f98",
        marginBottom:5, marginLeft: 20, marginTop: 12
    },
    createTaskTitleLabel1: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#848f98",
        marginBottom: 10, marginLeft: 15, marginTop: 15
    },
    createTaskTitleLabel11: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#848f98",
        marginBottom: 10, marginLeft: 5, marginTop: 5
    },
    createTaskTitleTextBox: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#4a535b",
        flex: 1, flexWrap: 'wrap', paddingHorizontal: 7,
        paddingVertical: 5, borderRadius: 8,
        backgroundColor: "#f5f7fb",
    },
    createTaskTitleTextBox1: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 16,
        textAlign: "left", color: "#4a535b",
        flex: 1, flexWrap: 'wrap', paddingHorizontal: 7,
        paddingVertical: 8, borderRadius: 8,
        backgroundColor: "#f5f7fb", marginLeft: 10, marginRight: 10,
    },
    createTaskTitleTextBoxEx: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#4a535b",
        flex: 1, flexWrap: 'wrap', paddingHorizontal: 10,
        paddingVertical:7, borderRadius: 8,
        backgroundColor: "#f5f7fb", margin: 10,marginTop:3,
    },
    createTaskDescriptionLabel: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#848f98",
        marginBottom: 10, marginLeft: 20,
    },
    createTaskDescriptionTextBox: {
        textAlignVertical: "top", fontFamily: "OPENSANS_REGULAR",
        fontSize: 13, textAlign: "left",
        color: "#4a535b", flex: 1, flexWrap: 'wrap',
        height: 200,
        paddingHorizontal: 7, paddingVertical: 6,
        backgroundColor: "#f5f7fb", borderRadius: 8,
    },
    createTaskDescriptionTextBox1: {
        textAlignVertical: "top", fontFamily: "OPENSANS_REGULAR",
        fontSize: 13, textAlign: "left",
        color: "#4a535b", flex: 1, flexWrap: 'wrap',
        height: 150,
        paddingHorizontal: 7, paddingVertical: 6,
        backgroundColor: "#f5f7fb", borderRadius: 8,
        marginTop: 10,
    },
    assignePeopleContainer: {
        flex: 1, margin: 10, flexDirection: 'row', marginLeft: 20,
        alignItems: 'center', justifyContent: 'space-between',
    },
    emptyView: {
        height: 50
    },
    assigneePeopleTextBox: {
        fontFamily: "Montserrat_Bold", fontSize: 13,
        textAlign: "left", color: "#4a535b",
        flex: 1, paddingHorizontal: 7,
    },
    assigneePeopleTextBoxDivider: {
        backgroundColor: "#ffffff", borderTopColor: '#dee1e5',
        borderTopWidth: .3, width: "50%",
        marginLeft: 10, marginTop: -10,
    },
    createTaskAttachmentContainer: {
        flex: 1, margin: 10, flexDirection: 'column',
        justifyContent: 'space-between',
    },
    backarrow: { marginLeft: 0 },
    createTaskAttachmentInnerContainer: {
        flex: 1, marginBottom: 7, flexDirection: 'row', alignItems: 'center'
    },
    createTaskAttachmentLeft: {
        borderRadius: 4, padding: 7, backgroundColor: "#f1f3f5",
        flexDirection: 'row', flex: 1,
    },
    createTaskAttachmentLabel: {
        fontFamily: "Montserrat_Bold", fontSize: 12,
        textAlign: "left", color: "#4a535b"
    },
    createTaskSetLocationIcon: {
        borderRadius: 4, padding: 7, backgroundColor: "#f1f3f5",
        flexDirection: 'row', flex: 1, marginLeft: 10,
    },
    createTaskSetLocationText: {
        fontFamily: "Montserrat_Bold", fontSize: 12,
        textAlign: "left", color: "#4a535b"
    },
    createTaskDueDateContainer: {
        flex: 1, marginBottom: 7, flexDirection: 'row', alignItems: 'center', marginTop: 3,
    },
    createTaskDueDateIcon: {
        borderRadius: 4, padding: 7, backgroundColor: "#f1f3f5",
        flexDirection: 'row', flex: 1,
    },
    createTaskDueDateText: {
        fontFamily: "Montserrat_Bold", fontSize: 12,
        textAlign: "left", color: "#4a535b"
    },

    taskBoardContainer: {
        flex: 1,
        // padding: 10,
    },
    scrollContainerView: {
        flex: 1, marginHorizontal: 5, marginVertical: 5
    },
    colorSelectModal: {
        height: 300,
        width: "83%",
        borderRadius: 20,
    },
    modalforViewContainerView: {
        justifyContent: "space-between", flexDirection: "column"
    },
    flexstartView: {
        alignItems: "flex-start"
    },
    flexEnd: {
        alignItems: "flex-end"
    },
    closemodalImage: {
        width:15 , height: 15,marginRight:17,marginTop:15,
    },
    titleText: {
        color: '#848f98', fontFamily: 'PRODUCT_SANS_BOLD', marginLeft: 30
    },
    creaatebordContent: { alignSelf: "center" },
    radioButtonContainer: { flexDirection: 'row', padding: 25, },
    radioButtonText: {
        textAlign: "right",
        fontSize: 16, color: '#6C7272',
        fontWeight: '500', marginTop: 0,
        marginRight: 5, marginLeft: 2
    },
    createTouchableOpacity: {

        backgroundColor: '#3D3159',
        padding: 10,
        width: 100,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: "3%",
        alignItems: 'center',

    },
    createText: {
        color: 'white',
        fontWeight: 'bold'
    },
    modalClose: {
        marginLeft: 0, marginTop: 0,
    }, modelContent: {
        alignItems: 'center'
    },
    boardInput: {
        width: 240,
        height: 40,
        backgroundColor: '#ebebeb',
        color: '#2c2930',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 8,
    },
    createtaskcontainer: {
        flex: 1, backgroundColor: '#ffffff', flexDirection: 'column',
    },
    createtaskBackimage: { width: 25, height: 25 },
    createTasktitleView: { alignItems: 'center' },
    cteateflexEnd: { alignItems: 'flex-end', marginRight: 10, },
    descriptioncontainerView: { flex: 1, margin: 10, flexDirection: 'column', },
    Viewforavoid: {
        borderRadius: 4, padding: 7,
        flexDirection: 'row', flex: 1, marginLeft: 10,
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
    dbblModalText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#535353'
    },
});
