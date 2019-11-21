import { StyleSheet,Platform } from 'react-native';

export const CommonStyles = StyleSheet.create({
    HeaderContent: {
        ...Platform.select({
            ios: {
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                flexDirection: 'row',
                padding: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderColor: '#fff',
              
                //elevation: 10,
                height: 60,
            },
            android: {
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                flexDirection: 'row',
                padding: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderColor: '#fff',

                elevation: 10,
                height: 60,
            },
        }),
    },
    HeaderFirstView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    HeaderMenuicon: {
        alignItems: 'center', padding: 10,
    },
    HeaderMenuLeft: {
        justifyContent: 'flex-end', marginRight: 0,
        marginLeft: 0, flexDirection: 'row',
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
});
