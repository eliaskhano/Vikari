import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react"
import { StyleSheet } from "react-native";
import NavbarComponent from "./NavbarComponent";


export default function ChooseMovieComponent(props) {
  const navigation = useNavigation();   
  const [userId, setUserId] = useState(null);
  

  return (
    <View style={styles.container}>

        <View style={styles.selecotrGroup}>
            <Text style={styles.selector}>Still watching...</Text>
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
      margin: 20,
      backgroundColor: "grey",
      padding: "25%",
      fontFamily: "Avenir-Book",
      fontSize: 22,
      borderRadius: 20,
    },
    selecotrGroup:{
      marginTop: "20%",
    },
    
})