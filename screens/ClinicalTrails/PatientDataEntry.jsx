import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import FontAwesome from "@expo/vector-icons/FontAwesome";
export default function PatientDataEntryWithOCR({ navigation }) {
  const [patientData, setPatientData] = useState({
    name: "",
    gender: "",
    age: "",
    diabetesType: "",
    diagnosisYear: "",
    bloodPressure: "",
    hbA1c: "",
    avgGlucose: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = () => {
    // Perform form validation
    if (!patientData.name || !patientData.age || !patientData.diabetesType) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    // Submit patient data to backend or next screen
    try {
      navigation.navigate("ResultScreen", {
        patientData,
      });
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        "Failed to submit patient data. Please check your network connection."
      );
    }
  };

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const performOCR = (file) => {
    setImageLoading(true);
    let myHeaders = new Headers();
    myHeaders.append("apikey", "FEmvQr5uj99ZUvk3essuYb6P5lLLBS20");
    myHeaders.append("Content-Type", "multipart/form-data");

    let raw = file;
    let requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        populateFormFields(result["all_text"]);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setImageLoading(false);
      });
  };

  const populateFormFields = (extractedText) => {
    const lines = extractedText.split("\n");
    const extractedData = {};

    lines.forEach((line) => {
      const [key, value] = line.split(":").map((item) => item.trim());
      if (key && value) {
        const formattedKey = key.toLowerCase().replace(/\s+/g, "");
        extractedData[formattedKey] = value;
      }
    });

    setPatientData({
      name: extractedData.name || "",
      gender: extractedData.gender || "",
      age: extractedData.age || "",
      diabetesType: extractedData.diabetestype || "",
      diagnosisYear: extractedData.diagnosisyear || "",
      bloodPressure: extractedData.bloodpressure || "",
      hbA1c: extractedData.hba1c || "",
      avgGlucose: extractedData.avgGlucose || "",
    });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Patient Data Entry with OCR</Text>

        {/* Image Picker UI */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImageGallery}>
          <View style={styles.imagePlaceholder}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.imagePickerText}>
                <FontAwesome name="photo" size={24} color="#ccc" /> Select file
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity style={styles.cameraButton} onPress={pickImageCamera}>
          <Text style={styles.cameraButtonText}>
            <FontAwesome name="camera" size={20} color="007BFF" /> Open Camera &
            Take Photo
          </Text>
        </TouchableOpacity>

        {imageLoading && <ActivityIndicator size="large" color="#0000ff" />}

        {/* Patient Data Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Patient Name"
            value={patientData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  
  imagePicker: {
    width: "80%",
    height: 150,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePickerText: {
    fontSize: 16,
    color: "#999",
  },
  orText: {
    fontSize: 16,
    color: "#999",
    marginVertical: 10,
  },
  cameraButton: {
    width: "80%",
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: "#E0F7FA",
    alignItems: "center",
    marginBottom: 20,
  },
  cameraButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
