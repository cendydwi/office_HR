import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TaskLists from './TaskListRowCompoent';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});




const TaskListComponent = (props) => (

    <View style={styles.container}>
        <FlatList
            data={props.itemList}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) => <TaskLists itemData={item} />
            }
            ListHeaderComponent={props.headerRenderer}

        />

    </View>
);

export default TaskListComponent;
