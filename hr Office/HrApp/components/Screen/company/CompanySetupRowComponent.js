import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const _EditCom = async (item) => {
    methodforcom(item);
    this.refs.modalcomupdate.open();
}
const methodforcom = async (item) => {
    this.setState({ ComName: item.Text })
    this.setState({ ComId: item.Value })
    this.setState({ Address: item.Address })
    this.setState({ phone: item.phone })
    this.setState({ MaximumOfficeHours: item.MaximumOfficeHours })
    this.setState({ OfficeOutTime: item.OfficeOutTime })
}
var { width } = Dimensions.get('window');
const CompanySetupRowComponent = (props) => (
    <View style={{
        padding: 15, borderWidth: 0,
         backgroundColor: '#ffffff', 
         marginBottom: 5, marginLeft: 10, marginRight: 10, borderRadius: 15, justifyContent: 'space-between', flexDirection: 'row',
        borderColor: "white",
        flexDirection: 'row',
        borderColor: '#fff',
        shadowColor: "#fff",
        shadowRadius: 3,
        shadowColor: "black",
        shadowOpacity: 0.7,
        shadowOffset: { width: 10, height: -5 },
        elevation: 2,
    }}>
        <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: '500', color: '#4a4a4a', marginBottom: 2, }}>
                {props.itemData.Text}
            </Text>
            <View style={{ flexDirection: 'row', width: (width * 50) / 100, }}>
                <Image resizeMode="contain" style={{ height: 15, width: 15, marginTop: 4, marginRight: 5 }} source={require('../../../assets/images/Path_87.png')}></Image>
                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 14, margingLeft: 5, color: '#4a4a4a', }}>
                    {props.itemData.Address}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', width: (width * 50) / 100, }}>
                <Image style={{ height: 15, width: 15, marginTop: 4, marginRight: 5 }} source={require('../../../assets/images/Path_86.png')}></Image>
                <Text style={{
                    flex: 1,
                    flexWrap: 'wrap', fontSize: 14, margingLeft: 5, color: '#4a4a4a'
                }}>
                    {props.itemData.phone}
                </Text>
            </View>
        </View>
        <TouchableOpacity onPress={() => _EditCom(props.itemData)} style={{ marginTop: 5, }}>
            <View style={{ alignItems: 'flex-end', marginRight: 20, }}>
                <Image style={{ height: 30, width: 30, alignSelf: "flex-end", marginTop: 6 }} source={require('../../../assets/images/edit.png')}></Image>
                <Text style={{ color: "#58687a", fontSize: 12, marginRight: 2, marginTop: 3, fontWeight: '500' }}>EDIT</Text>
            </View>
        </TouchableOpacity>
    </View>
);

export default CompanySetupRowComponent;
