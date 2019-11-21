import { StyleSheet,Platform } from 'react-native';

export const EmpCreateScreenStyle = StyleSheet.create({
    HeaderContent: {
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#fff',
        shadowRadius: 3,
        shadowColor: "black",
        shadowOpacity: 0.7,
        shadowOffset: { width: 10, height: -5 },
       // elevation: 10,
        height: 60,
    },
    createEmployeeLabel: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#848f98",
        marginBottom:5, marginLeft: 20, marginTop: 12
    },
    createEmpTextBox: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        textAlign: "left", color: "#4a535b",
        flex: 1, flexWrap: 'wrap', paddingHorizontal: 10,
        paddingVertical:7, borderRadius: 8,
        backgroundColor: "#f5f7fb", margin: 10,marginTop:3,
    },
    ModalSelectorStyle: {
        fontFamily: "PRODUCT_SANS_BOLD", fontSize: 13,
        flex: 1, flexWrap: 'wrap', paddingHorizontal: 10,
        color: "#4a535b",
        paddingVertical:7, borderRadius: 8,
        backgroundColor: "#f5f7fb", margin: 10,marginTop:3,
    },
});
