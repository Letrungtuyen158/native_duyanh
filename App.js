import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/Homescreen";
import ViewAllScreen from "./Components/ViewAllScreen";
import EditScreen from "./Components/EditScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ViewAllScreen" component={ViewAllScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

