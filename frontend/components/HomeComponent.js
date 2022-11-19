import { View, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react"
import { StyleSheet } from "react-native";
import NavbarComponent from "./NavbarComponent";


export default function HomeComponent(props) {
  const navigation = useNavigation();   
  const [userId, setUserId] = useState(null);
  

  return (
    <View style={styles.container}>

      <NavbarComponent style={styles.navbar}/>


    </View>
  );
}


const styles= StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#7d27d8",
    alignItems: "center",
    flexDirection: ""
    
  },
  navbar:{
   backgroundColor: "green" 
  }

})