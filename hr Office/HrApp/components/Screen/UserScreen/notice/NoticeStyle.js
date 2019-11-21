import { StyleSheet, Platform } from 'react-native';

export const NoticeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7f9',
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
    loaderIndicator: {
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, justifyContent: 'center', alignContent: 'center',
    },
    detailTextStyle: { padding: 10, marginTop: 16, flex: 1, marginHorizontal: 6, },
    noticeDetailTextStyle: {

        fontFamily: "OPENSANS_REGULAR",
        fontSize: 16,
        textAlign: "left",
        color: "#636363",
        padding: 10,

    },
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
        //color: '#c5cbcf',
        fontSize: 14,
         fontFamily: 'PRODUCT_SANS_BOLD'
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
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#ffffff', marginBottom:5,marginTop:5,
        borderRadius: 5, padding: 15,elevation: 2,
    },
    listDivider: {
        justifyContent: 'space-between', flexDirection: 'row',
        borderBottomColor: '#edeeef', borderBottomWidth: 1, paddingBottom: 10,
    },
    noticepart: {
        alignItems: 'flex-start',
        color: '#1a1a1a', fontSize: 10, fontFamily: 'OPENSANS_REGULAR'
    },
    imagePart: {
        alignItems: 'flex-end',
        width: '20%',
    },
    NoticeItemDetailText: {
        color: '#1a1a1a',
        fontSize: 10,
        fontFamily: 'OPENSANS_REGULAR'
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
    headerTextRight: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    ImagemodalContainer: {
        height: 180,
        width: 250,
        borderRadius: 20,
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
    closeImage: {
        width:15 , height: 15,marginRight:17,marginTop:15
    },
});
