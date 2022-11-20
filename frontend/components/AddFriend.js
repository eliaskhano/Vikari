import React, { useMemo, useState, useEffect } from "react";
import { SelectList } from 'react-native-dropdown-select-list'

import {
  StyleSheet,
  View,
  Text,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import domain from "../domain";



function AddFriend(props) {
  const getId = async () => {
    return await AsyncStorage.getItem("token")
  }

  const [formattedOptions, setFormattedOptions] = useState([]);
  const [targetId, selectTarget] = useState(null)


  useEffect(() => {
    const call = async () => {
        const user_id = await getId();
        console.log(user_id)
    
        await axios.get(`${domain}/users-api/list/${user_id}/`)
        .then(res => {
            setFormattedOptions(res.data)
        })
    }
    call()
  }, [])


  const uploadFriend = async () => {
    const token = await AsyncStorage.getItem("token")
  

    const context = {
       target_id : targetId,
    }
   
    await axios.post(`${domain}/api/friend/add/${token}/`, context)
    .then(res => {
      Alert.alert(
        "Successful :)",
        "Friend added!",
        [
          {
            text: "Cancel",
            onPress: () => navigation.navigate('Home'),
            style: "cancel"
          },
          { text: "OK", onPress: () => navigation.navigate('Home') }
        ]
      );
    })
    .catch(e => {
      Alert.alert(
        "Error 404",
        "Something went wrong :(",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => navigation.navigate('Home') }
        ]
      );
    })
    
  }

  return (
    <View >
    
        <SelectList 
          setSelected={e => selectTarget(e)} 
          fontFamily='Arial'
          data={formattedOptions}  
          boxStyles={{borderRadius:0}} //override default styles
        />
        

        <Text  onPress={uploadFriend}>SUBMIT</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    //backgroundColor: "#7b27d8",
    alignItems: "center",
    //justifyContent: "center",
  },



  submitButton: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#460b87",
  },

  
});

export default AddFriend;