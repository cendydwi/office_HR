import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const TaskStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f6f7f9',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        backgroundColor: '#f6f7f9',
    },
    CreateTaskHeaderContainer: {
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
    createTaskButtonContainer: {
        justifyContent: 'flex-end', marginRight: 0,
        marginLeft: 0, flexDirection: 'row',
        alignItems: 'center',
    },
    createTaskButtonTouch: {
        flexDirection: 'row', alignItems: 'center', padding: 3,
    },
    plusButton: {
        backgroundColor: "#355FB7",
        alignItems: 'center',
        padding: 6,
        paddingHorizontal: 9,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
    },
    ApplyButtonText: {
        // fontWeight: 'bold',
        fontSize: 12, color: '#ffffff',
        fontFamily: 'Montserrat_Bold',
    },
    ApplyTextButton: {
        backgroundColor: "#4570cb",
        alignItems: 'center',
        padding: 7,
        paddingHorizontal: 9,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
    },
    taskStatusContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 5,
        marginLeft: -2,
        alignItems: 'center', marginTop: -4,
        backgroundColor: '#f5f7fb',
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
        backgroundColor: "#ffffff",
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
        alignItems: 'center',
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
        fontFamily: "PRODUCT_SANS_BOLD",
        textAlign: "center", color: "#141414",
        fontSize: 16, marginTop: 3,
    },
    viewTaskTitle: {
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
        borderBottomWidth: 2,
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
    viewTaskStatusContainer: {
        justifyContent: 'flex-start', flexDirection: 'column',
        marginBottom: 3,
    },
    viewTaskStatusLabel: {
        opacity: 0.3, fontSize: 13,
        fontFamily: "PRODUCT_SANS_BOLD",
        textAlign: "left", color: "#848f98",
        marginBottom: 5, marginLeft: 12,
    },
    viewTaskStatusCheckboxContainer: {
        width: (width * 45) / 100,
        flex: 1,
        borderRadius: 5, backgroundColor: "#f1b847",
        flexDirection: 'row', alignSelf:'center',
        justifyContent: 'center', paddingVertical: 5,
    },
    viewTaskStatusText: {
        marginLeft: 8, justifyContent: 'center',
        fontFamily: "Montserrat_Bold",
        fontSize: 12, textAlign: "left", color: "#ffffff"
    },
    viewTaskDueDateContainer: {
        justifyContent: 'flex-end', flexDirection: 'column',
        marginBottom: 3,
    },
    viewTaskDueDateLabel: {
        justifyContent: 'flex-end', opacity: 0.3,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 13, textAlign: "right",
        color: "#1a1a1a", marginBottom: 5,
        marginRight: "25%",
    },
    viewTaskDueDateValueContainer: {
        width: (width * 45) / 100,
        borderRadius: 5, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
        padding: 5, backgroundColor: "#f6f7f9",
    },
    viewTaskDueDateValue: {
        marginLeft: 8, fontFamily: "Montserrat_Bold",
        fontSize: 12, textAlign: "left", color: "#1a1a1a"
    },
    viewTaskAssignToContainer: {
        flex: 1, flexDirection: 'row',
        alignItems: 'center', marginHorizontal: 10
    },
    viewTaskAssignToInnerContainer: {
        flex: 1, borderRadius: 4,
        padding: 7, backgroundColor: '#4375d9',
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
        borderBottomColor: '#f6f7f9', borderBottomWidth: 2,
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
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        top: 0, justifyContent: 'center',
        alignContent: 'center',
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
        marginBottom: 10, marginLeft: 5,
    },
    createTaskTitleLabel1: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#848f98",
        marginBottom: 10, marginLeft:5,
    },
    createTaskTitleTextBox: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#4a535b",
        flex: 1, flexWrap: 'wrap', paddingHorizontal: 7,
        paddingVertical: 5, borderRadius: 8,
        backgroundColor: "#f5f7fb",
    },
    titleInputRow: {
        margin: 10, flexDirection: 'column',
    },
    descriptionInputRow: {
        margin: 10, flexDirection: 'column',
        height: (height * 30) / 100,
    },
    createTaskDescriptionTextBox: {
        textAlignVertical: "top", fontFamily: "OPENSANS_REGULAR",
        fontSize: 13, textAlign: "left",
        color: "#4a535b",
        flex: 1,
        flexWrap: 'wrap',
        // height: "15%",
        paddingHorizontal: 7, paddingVertical: 6,
        backgroundColor: "#f5f7fb", borderRadius: 8,
    },
    assignePeopleContainer: {
        flex: 1, margin: 10, flexDirection: 'row', marginLeft: 20, marginTop: 12,
        alignItems: 'center', justifyContent: 'space-between', marginBottom: 12,
    },
    assigneePeopleTextBox: {
        fontFamily: "Montserrat_Bold", fontSize: 13,
        textAlign: "left", color: "#4a535b",
        flex: 1, paddingHorizontal: 7,
    },
    assignePeopleContainer1: {
        flex: 1, margin: 10, flexDirection: 'row', marginLeft: 20, marginTop: 12,
        alignItems: 'center', justifyContent: 'space-between',
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
        flex: 1, marginBottom: 7, flexDirection: 'row', alignItems: 'center', marginTop: 3, width: "50%",
    },
    createTaskDueDateIcon: {
        borderRadius: 4, padding: 7, backgroundColor: "#f1f3f5",
        flexDirection: 'row', flex: 1, alignItems: 'center',
    },
    createTaskDueDateText: {
        fontFamily: "Montserrat_Bold", fontSize: 12,
        textAlign: "left", color: "#4a535b"
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
