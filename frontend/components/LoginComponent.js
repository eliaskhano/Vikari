import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  
} from "react-native";


const LOGIN_URL = "http://localhost:8000/users-api/login/";


function LoginComponent(props) {
  const navigation = useNavigation();     
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginUserHandler = async () => {

    const context = {
        username: userName,
        password: password
    }

    await axios.post(LOGIN_URL, context)
    .then(async res => {
        await AsyncStorage.setItem('userData', JSON.stringify(res.data.data.userData))
        await AsyncStorage.setItem("token", res.data.data.key.toString())

        navigation.navigate('Home')


    })
    .catch(e => {
      console.log(e)
      Alert.alert(
        "Error 404",
        "Wrong credentials :(",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    })

  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/favicon.png")} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#000000"
          onChangeText={(username) => setUserName(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.registerButton} onPress={() => navigation.navigate('Register')}>Not registered yet?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText} onPress={loginUserHandler}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7b27d8",
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    fontFamily: "Avenir-Book",
    color: "#FFFFFF",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontFamily: "Avenir-Book" 
  },

  registerButton: {
    height: 30,
    marginBottom: 26,
    fontFamily: "Avenir-Book"
  },

  loginButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#460b87",
  },
});

export default LoginComponent;
