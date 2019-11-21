
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const MyPanelStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    loaderIndicator: {
        position: 'absolute',
         left: 0, right: 0, 
         //bottom: 0, 
        top: 0, 
        //justifyContent: 'center', 
        alignContent: 'center',
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
    MainInfoBar: {
        flexDirection: 'column',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#f6f7f9',
        marginTop: -10,
        paddingBottom: 10,

    },
    MainInfoBarTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    MainInfoBarTopRowLeft: {
        justifyContent: 'flex-start',
        flexDirection: 'row', alignItems: 'center',
    },
    MainInfoBarTopRowRight: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 5
    },
    EditButtonContainer: {
        borderRadius: 30,
        width: 47,
        height: 50
    },
    TextInfoBar: {
        flexDirection: 'column',
        marginLeft: 10,
        padding: 2
    },
    UserNameTextStyle: {
        fontFamily: "OPENSANS_BOLD",
        fontSize: 14,
        textAlign: "left",
        color: "#19260c",
    },
    DesignationTextStyle: {
        fontFamily: "OPENSANS_REGULAR",
        fontSize: 11,
        textAlign: "left",
        color: "#8f8f8f",
    },
    DepartmentTextStyle: {
        fontFamily: "OPENSANS_REGULAR",
        fontSize: 11,
        textAlign: "left",
        color: "#b5b5b5",
    },
    TimeInfoBar: {
        backgroundColor: '#f8f9fb',
        width: "100%",
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    First2TimePanelView: {
        width: (width * 33) / 100,
        borderRightWidth: 1,
        borderRightColor: '#bababa',
        paddingHorizontal: 8,
        flexDirection: 'column',
    },
    Last1TimePanelView: {
        width: (width * 33) / 100,
        paddingHorizontal: 8,
        flexDirection: 'column',
    },
    AllTimePanelRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TimeStatusText: {
        fontFamily: "Montserrat_Medium",
        fontSize: 10,
        color: "#a8a8a8"
    },
    CheckedInText: {
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 17,
        color: "#076332"
    },
    CheckedOutText: {
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 17,
        color: "#437098"
    },
    WorkingTimeText: {
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 17,
        color: "#435c98"
    },
    ButtonBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        padding: 5,
        marginTop: 10,
    },
    ButtonContainer: {
        alignItems: 'center',
        width: (width * 33) / 100,
        height: 93
    },
    ButtonImage: {
        width: 99,
        height: 93,
    },
    TimeLineMainView: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginVertical: 10,
    },
    TimeLineHeaderBar: {
        backgroundColor: '#f5f7f9',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,
        marginTop: 3,
        borderBottomColor: "#bababa",
        borderBottomWidth: 0.4,
    },
    TimeLineHeaderText: {
        padding: 10,
        fontFamily: "PRODUCT_SANS_BOLD",
        fontSize: 17,
        textAlign: "left",
        color: "#404040"
    },
    TrackListText: {
        marginLeft: 5, color: '#7d7d7d',
        fontFamily: 'PRODUCT_SANS_REGULAR', width: 240,
        textAlign: 'justify'
    },
    TrackListRowVIew: {
        flexDirection: 'row', marginBottom: 0, height: 45
    },
    modalForEditProfile: {
        height: "70%",
        width: "85%",
        borderRadius: 20,

    },
    modelContent: {
        alignItems: 'center',
    },
    addPeopleBtn: {
        backgroundColor: '#319E67',
        padding: 15,
        width: 150,
        alignSelf: 'center',
        borderRadius: 20,
        marginVertical: 15,
        marginTop: 20
    },
});
