import React, { useMemo, useState, useEffect } from "react";

import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableHighlight,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useGetOptionsQuery } from "../services/mainApi";

const dummyData = {
  fields: [
    {
      title: "bla",
      o_title: "bla",
      display: "The Office-2015",
      show_banners: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
      rating_avg: 12.0,
      rating_mal: 10,
      genre: "horror",
    },
  ],
};

function SearchComponent(props) {
  const { data: options, isFetching } = useGetOptionsQuery();
  const [searchResults, setSearch] = useState([]);

  const { clampedScroll } = props;

  const [textInputFocussed, setTextInputFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchResults = () => {
    if (!isFetching) {
      const filteredSearch = options?.filter((item) =>
        item?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      console.log(filteredSearch.length);
      console.log(options.length);
      setSearch(filteredSearch);
    }
  };

  return (
    <View style={{flex:1}}>
      <TextInput
        defaultsValue={"top gun maverick"}
        placeholder={"Search Movie"}
        style={styles.searchInput}
        onFocus={() => setTextInputFocused(true)}
        onBlur={() => setTextInputFocused(false)}
        onChangeText={(e) => setSearchTerm(e)}
        returnKeyType="search"
        onSubmitEditing={() => updateSearchResults()}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        /* style={{
          position: "absolute",
          backgroundColor: "#FFFFFF",
          top: StatusBar.currentHeight + 50,
          left: 0,
          zIndex: 9999,
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 0,
          marginBottom: 0,
          maxHeight: 600,
        }}
        */
      >
        {searchResults?.map((item, index) => {
          return (
            <View key={index}>
              <Text> {item.title} </Text>
            </View>
          );
        })}
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {},
});

export default SearchComponent;
