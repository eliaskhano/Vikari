import { View, Button, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react"
import { StyleSheet } from "react-native";
import NavbarComponent from "./NavbarComponent";


export default function HomeComponent(props) {
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/icon.png")}/>

      <NavbarComponent style={styles.navbar}/>


    </View>
  );
}


const styles= StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#7d27d8",
    justifyContent: "space-between"
    
  },
  image:{
    flex: 4,
    marginLeft: "33%",
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "40%",
  },
  navbar:{
    flex: 1
  }
})