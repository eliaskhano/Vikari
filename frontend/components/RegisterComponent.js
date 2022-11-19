import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

const REGISTER_URL = "http://127.0.0.1:8000/users-api/register/";

function RegisterComponent(props) {
  const navigation = useNavigation();     
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUserHandler = async () => {

    const context = {
        username: userName,
        email: email,
        password: password
    }

    await axios.post(REGISTER_URL, context)
    .then(res => {
        console.log(res.data)
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
          placeholder="Email"
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={(email) => setEmail(email)}
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

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText} onPress={registerUserHandler}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e7bbfc",
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    fontFamily: "Avenir-Book"
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
    backgroundColor: "#FFFFFF",
  },
});

export default RegisterComponent;