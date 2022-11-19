import { View, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

function HomeComponent(props) {
  const navigation = useNavigation();   
  return (
    <View>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

export default HomeComponent;