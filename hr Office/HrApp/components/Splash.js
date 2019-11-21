import React,{Component} from 'react'
import {StyleSheet,Text,View} from 'react-native'
export default class Splash extends Component{
    render (){
        return(
            <View style={styles.container}>
            <Text style={styles.title}> Hello this is splash</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#f4f5f7',
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
title:{
    fontWeight:'bold',
    fontSize:18,
    color:'black'
}
})