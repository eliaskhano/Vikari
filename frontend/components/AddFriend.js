import React, { useMemo, useState, useEffect } from "react";
import { SelectList } from 'react-native-dropdown-select-list'

import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  TouchableHighlight,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useGetUserListQuery } from "../services/mainApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import domain from "../domain";



function AddFriend(props) {
  const getId = async () => {
    return await AsyncStorage.getItem("token")
  }

  const [formattedOptions, setFormattedOptions] = useState([]);
  const [targetId, selectTarget] = useState(null)
  const [following, setFollowing] = useState(Boolean)


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


  const uploadReview = async () => {
    const token = await AsyncStorage.getItem("token")
    console.log(token)

    const context = {
       user : parseInt(token),
       movie : movieId, 
       rating : rating[0] 
    }
    console.log(context)
   
    await axios.post(`${domain}/api/movies/watching/`, context)
    .then(res => {
      console.log(res.data)
    })
    .catch(e => {
      console.log(e)
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