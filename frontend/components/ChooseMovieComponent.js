import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react"
import { StyleSheet,  } from "react-native";
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import NavbarComponent from "./NavbarComponent";
import domain from '../domain'
import { useGetPublicMoviesQuery } from "../services/mainApi";

export default function ChooseMovieComponent(props) {
    const navigation = useNavigation();   
    const { data, isFetching } = useGetPublicMoviesQuery();

    const [lastWatchedMovie, setLastWatchedMovie] = useState([])

    const getId = async () => {
        return await AsyncStorage.getItem("token")
    }
    const getUserData = async () => {
        return await AsyncStorage.getItem("userData")
    }


    useEffect(() => {
        const func = async() => {
            const user_id = await getId()
            const userData = await getUserData()
            console.log(JSON.parse(userData))
            await axios.get(`${domain}/api/movies/private/${user_id}/`)
            .then(res => {
                setPrivate(res.data)
            })
        }
        func() 

    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.selectorGroup}>
                
                {/* <Card style={{marginTop: 0, margin: 20}}>
                
                    {item?.show_banners[0] !== undefined && (
                        <Card.Cover source={{ uri: item?.show_banners[0] }} />
                    )}

                    <Card.Content>
                        <Title style={{marginTop: 20}}>
                            <Text style={{color: "red"}}>{item.rating_avg}/100</Text> 
                        </Title>
                        <Title>
                            {item.display}
                        </Title>
                        <Paragraph>Card content</Paragraph>
                    </Card.Content>
                
                </Card> */}

                {/* <Text style={styles.selector}>Still watching...</Text>
                <Text style={styles.selector} onPress={() => navigation.navigate("Search")}>Search new show</Text> */}
            </View>
            <NavbarComponent style={styles.navbar}/>
        </View>
    );
}


const styles= StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#535353"

    },
    selector:{
      margin: "10%",
      backgroundColor: "grey",
      padding: "11%",
      fontFamily: "Avenir-Book",
      fontSize: 22,
      borderRadius: 20,
    }, 
})