import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react"
import { StyleSheet,  } from "react-native";
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import NavbarComponent from "./NavbarComponent";
import domain from '../domain'
import { useGetPublicMoviesQuery } from "../services/mainApi";

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ChooseMovieComponent(props) {
    const navigation = useNavigation();   
    const { data, isFetching } = useGetPublicMoviesQuery();
    const [item, setItem] = useState({})
    const [userData, setUserData] = useState({})

    const [lastWatchedMovie, setLastWatchedMovie] = useState([])

    const getId = async () => {
        return await AsyncStorage.getItem("token")
    }
    const getUserData = async () => {
        return await AsyncStorage.getItem("userData")
    }


    useEffect(() => {
        const func = async() => {
            const tempData = await getUserData()
            setUserData(JSON.parse(tempData))
            setItem(JSON.parse(tempData)?.show_currently_watching)
        }
        func() 

    }, [])

    console.log(userData?.show_currently_watching)
    return (
        <View style={styles.container}>
            <View style={styles.selectorGroup}>
             
                <Text style={styles.selector} onPress={() => navigation.navigate("Search")}>Search new show</Text>
            </View>
            <NavbarComponent style={styles.navbar}/>
        </View>
    );
}


const styles= StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#535353"

    },
    selector:{
      margin: "10%",
      backgroundColor: "grey",
      padding: "11%",
      fontFamily: "Avenir-Book",
      fontSize: 22,
      borderRadius: 20,
    }, 
})