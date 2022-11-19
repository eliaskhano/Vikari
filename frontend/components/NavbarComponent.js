import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from "react-native";
import { TabActions, useNavigation } from '@react-navigation/native';
import {useState} from "react"
import { Button, IconButton} from "@react-native-material/core"
import { StyleSheet } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {ChooseMovieComponent} from "./ChooseMovieComponent"

function NavbarComponent(props) {
  const navigation = useNavigation();   
  const [userId, setUserId] = useState(null);
  

  return (
    <View style={styles.navbar}>
        <IconButton
        style={styles.btn}
        onPress={() => navigation.navigate("ChooseMovie")}
        icon={props => <Icon name="youtube-tv" size={40} color="black"/>}
        />
        <IconButton
        style={styles.btn}
        onPress={() => navigation.navigate("Home")}
        icon={props => <Icon name="format-list-bulleted" size={40} color="black"/>}
        />
        <IconButton
        style={styles.btn}
        onPress={() => navigation.navigate("Login")}
        icon={props => <Icon name="account-multiple-plus" size={40} color="black"/>}
        />
        
    </View>
    );
}


const styles = StyleSheet.create({
    navbar:{
        flexDirection: "row",        
        padding: 20
    },
    btn:{
        flex: 1,
        widht: "33%",
    },
    
});

export default NavbarComponent;