import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Maps"
        onPress={() => navigation.navigate("Locations")}
      />

      <Button
        title="Go to Diabatic"
        onPress={() => navigation.navigate("Diabatic")}
      />

      <Button
        title="Go to Retinopathy"
        onPress={() => navigation.navigate("Retinopathy")}
      />

      <Button
        title="Go to Hospital Clinical Trails"
        onPress={() => navigation.navigate("ClinicalTrails")}
      />
    </View>
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
