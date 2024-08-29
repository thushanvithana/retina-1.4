import React from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import RNSpeedometer from "react-native-speedometer";

export default function RetinopathyResult({ route, navigation }) {
  const { prediction, responseData } = route.params;

  console.log(prediction);
  // Assuming "1" and 1 are positive, and "0" or 0 are negative
  const isPositive = prediction === "Positive" || prediction === 1;

  // Correctly map the prediction to the speedometer value
  const speedometerValue = isPositive ? 100 : 0; // 100 for positive, 0 for negative

  console.log("Prediction:", prediction);
  console.log("Is Positive:", isPositive);
  console.log("Speedometer Value:", speedometerValue);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Retinopathy Prediction Result Summary</Text>
      <Text style={styles.predictionText}>Prediction: {prediction}</Text>

      <RNSpeedometer
        value={speedometerValue}
        size={200}
        maxValue={100}
        labels={[
          {
            name: "Negative",
            labelColor: "#14eb6e",
            activeBarColor: "#14eb6e",
            range: [0, 50], // Adjust the range as per your logic
          },
          {
            name: "Positive",
            labelColor: "#ff2900",
            activeBarColor: "#ff2900",
            range: [51, 100], // Adjust the range as per your logic
          },
        ]}
      />

      {responseData && (
        <View style={styles.responseDataContainer}>
          <Text style={styles.subheading}>Inputed Data:</Text>
          {Object.entries(responseData).map(([key, value]) => (
            <Text key={key} style={styles.dataItem}>
              {key}: {Array.isArray(value) ? value[0] : value}
            </Text>
          ))}
        </View>
      )}

      {isPositive ? (
        <Button
          title="Find Immediate Retinopathy Clinic"
          onPress={() => navigation.navigate("Locations")}
        />
      ) : (
        <Button
          title="Go to Health Tips Page"
          onPress={() => navigation.navigate("HealthTips")}
        />
      )}

      <Button
        title="Calculate Next Screening"
        onPress={() => navigation.navigate("NextScreening")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  predictionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  responseDataContainer: {
    width: "100%",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dataItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});
