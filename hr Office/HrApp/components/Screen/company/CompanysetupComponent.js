import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CompanyLists from './CompanySetupRowComponent';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const CompanysetupComponent = (props) => (  
    <View style={styles.container}>
        <FlatList
                data={props.itemList}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({ item }) => <CompanyLists  itemData={item}/>
            } 
            />

    </View>
);

export default CompanysetupComponent;