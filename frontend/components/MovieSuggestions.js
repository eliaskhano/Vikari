import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, View, Text, Switch, ScrollView } from "react-native";
import domain from "../domain";

import { useGetPublicMoviesQuery } from "../services/mainApi";
import { Icon } from "@react-native-material/core";

function MovieSuggestions() {
  const { data, isFetching } = useGetPublicMoviesQuery();

  const [showPublic, setShowPublic] = useState(true);

  const [publicMovies, setPublic] = useState([]);
  const [privateMovies, setPrivate] = useState([]);

  const getId = async () => {
    return await AsyncStorage.getItem("token");
  };

  useEffect(() => {
    const func = async () => {
      const user_id = await getId();
      await axios
        .get(`${domain}/api/movies/private/${user_id}/`)
        .then((res) => {
          setPrivate(res.data);
        });
    };
    func();
  }, []);

  useEffect(() => {
    if (!isFetching) {
      setPublic(data);
    }
  }, [isFetching]);

  return (
    <View>
      <View style={styles.switch}>
        <Switch
          trackColor={{ false: "#7d27d8", true: "#7d27d8" }}
          thumbColor={showPublic ? "#7d27d8" : "#f5ccff"}
          ios_backgroundColor="#f5ccff"
          onValueChange={() => {
            setShowPublic(!showPublic);
          }}
          value={!showPublic}
        />
        <Text style={styles.switchText}>
          {" "}
          {showPublic
            ? "What the world is watching"
            : "What your friends are watching"}{" "}
        </Text>
      </View>

      <ScrollView style={styles.scroll}>
        {showPublic
          ? publicMovies?.map((item) => (
              <Card style={{ marginTop: 0, margin: 20 }} key={item?.id}>
                {item?.show_banners[0] !== undefined && (
                  <Card.Cover source={{ uri: item?.show_banners[0] }} />
                )}

                <Card.Content>
                  <Title style={{ marginTop: 20 }}>
                    <Text style={{ color: "red" }}>{item.rating_avg}/100</Text>
                  </Title>
                  <Title>{item.display}</Title>
                 
                </Card.Content>
              </Card>
            ))
          : privateMovies?.map((item) => (
              <Card key={item?.display} style={{ marginTop: 0, margin: 20 }}>
                {item?.show_banners[0] !== undefined && (
                  <Card.Cover source={{ uri: item?.show_banners[0] }} />
                )}

                <Card.Content>
                  <Title style={{ marginTop: 20 }}>
                    <Text style={{ color: "red" }}>
                      {item.rating_friends}/100
                    </Text>
                  </Title>

                  <Title>{item.display}</Title>
                  <Paragraph>{item?.show_friends?.join(", ")}</Paragraph>
                </Card.Content>
              </Card>
            ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  switch: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
  },
  switchText: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 17,
    fontWeight: "bold",
    fontfamily: "Avenir-Book",
  },
  scroll: {
    //   backgroundColor: "#7d27d8",

    width: "100%",
  },
  navbar: {
    flex: 1,
  },
});

export default MovieSuggestions;
