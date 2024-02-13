import "react-native-gesture-handler";

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { CalculoDeIvaScreen } from "./src/screens/CalculoDeIvaScreen";
import { ConfiguracionesScreen } from "./src/screens/ConfiguracionesScreen";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#B4CF7A", // Color de fondo del encabezado
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen name="CÁLCULO DE IVA" component={CalculoDeIvaScreen} />
      <Drawer.Screen name="CONFIGURACIONES" component={ConfiguracionesScreen} />
    </Drawer.Navigator>
  );
}

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
