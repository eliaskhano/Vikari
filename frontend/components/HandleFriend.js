import React, { useMemo, useState, useEffect } from "react";
import { SelectList } from 'react-native-dropdown-select-list'
import { Slider } from '@miblanchard/react-native-slider';

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
import { useGetOptionsQuery } from "../services/mainApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import domain from "../domain";



function HandleFriend(props) {
  const { data: options, isFetching } = useGetOptionsQuery();
  const [formattedOptions, setFormattedOptions] = useState([]);
  const [movieId, selectMovie] = useState(null)
  const [rating, setRating] = useState(50)

  useEffect(() => {
    if (!isFetching) {
      setFormattedOptions(options)
    }
  }, [isFetching])


  const uploadReview = async () => {
    const token = await AsyncStorage.getItem("token")
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
          setSelected={e => selectMovie(e)} 
          fontFamily='Arial'
          data={formattedOptions}  
          boxStyles={{borderRadius:0}} //override default styles
        />
        
        <Slider
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={rating}
            onValueChange={value => setRating(value)}
        />

        <Text  onPress={uploadReview}>SUBMIT</Text>
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

export default HandleFriend;