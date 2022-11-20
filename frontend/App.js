import { StyleSheet, Text, View } from "react-native";
import {
  MovieSuggestions,
  SearchComponent,
  HomeComponent,
  LoginComponent,
  ChooseMovieComponent,
  RegisterComponent,
} from "./components";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./store";
import { Provider } from "react-redux";
import AddFriend from "./components/AddFriend";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Login" component={LoginComponent} />
          <Stack.Screen name="Home" component={HomeComponent} />
          <Stack.Screen name="Register" component={RegisterComponent} />
          <Stack.Screen name="ChooseMovie" component={ChooseMovieComponent} />
          <Stack.Screen name="Search" component={SearchComponent} />
          <Stack.Screen name="AddFriend" component={AddFriend} />
          <Stack.Screen name="MovieSuggestions" component={MovieSuggestions} />

          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
