import React, { useMemo, useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Slider } from "@miblanchard/react-native-slider";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";

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

function SearchComponent(props) {
  const { data: options, isFetching } = useGetOptionsQuery();
  const [formattedOptions, setFormattedOptions] = useState([]);
  const [movieId, selectMovie] = useState(null);
  const [rating, setRating] = useState(50);

  useEffect(() => {
    if (!isFetching) {
      setFormattedOptions(options);
    }
  }, [isFetching]);

  const uploadReview = async () => {
    const token = await AsyncStorage.getItem("token");
    const context = {
      user: parseInt(token),
      movie: movieId,
      rating: rating[0],
    };
    console.log(context);

    await axios
      .post(`${domain}/api/movies/watching/`, context)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <SelectList
        setSelected={(e) => selectMovie(e)}
        fontFamily="Avenir-Book"
        data={formattedOptions}
        boxStyles={{ borderRadius: 0, backgroundColor: "white" }} //override default styles
        dropdownStyles= {{ backgroundColor: "white"}}
      />

      <View style={styles.slider}>
        <View style={{ flex: 0.7 }}>
          <IconButton
            style={styles.btn}
            onPress={() => navigation.navigate("Search")}
            icon={(props) => (
              <Icon name="emoticon-sad" size={40} color="black" />
            )}
          />
        </View>

        <View style={{ flex: 4 }}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={rating}
            onValueChange={(value) => setRating(value)}
            thumbImage="https://picsum.photos/200/300"
          />
        </View>

        <View style={{ flex: 1 }}>
          <IconButton
            style={styles.btn}
            onPress={() => navigation.navigate("Search")}
            icon={(props) => (
              <Icon name="emoticon-happy" size={40} color="black" />
            )}
          />
        </View>
      </View>

      <View style={styles.button}>
        <Button color="#FFFFFF" onPress={uploadReview} title="SUBMIT"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5ccff",
    padding: 20,
    paddingTop: 40,
 
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

  slider: {
    marginLeft: 15,
    marginTop: 50,
    //allign horizontal
    flexDirection: "row",
    //allign vertical
  },

  button: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#460b87",
  },
});

export default SearchComponent;