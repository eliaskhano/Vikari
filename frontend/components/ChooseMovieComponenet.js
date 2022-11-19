import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react"
import { StyleSheet } from "react-native";
import NavbarComponent from "./NavbarComponent";


export default function HomeComponent(props) {
  const navigation = useNavigation();   
  const [userId, setUserId] = useState(null);
  

  return (
    <View style={styles.container}>

        <Text style={styles.time}>21:70</Text>

        <NavbarComponent style={styles.navbar}/>


    </View>
  );
}


const styles= StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center"


    },
    time:{
        fontSize: 100,
        
    }
  

})