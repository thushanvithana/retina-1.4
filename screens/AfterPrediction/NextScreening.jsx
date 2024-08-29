import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function NextScreening({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.screeningCard}>
        <Text style={styles.screeningTitle}>Next screening</Text>
        <Text style={styles.screeningInterval}>Screening interval</Text>
        <Text style={styles.intervalValue}>11 months</Text>
        <Text style={styles.dateTitle}>Date</Text>
        <Text style={styles.dateValue}>03/2025</Text>
      </View>

      
      <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  screeningCard: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  screeningTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  screeningInterval: {
    fontSize: 16,
    color: '#fff',
  },
  intervalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  dateTitle: {
    fontSize: 16,
    color: '#fff',
  },
  dateValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  primaryText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 30,
  },
  code: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  doneButton: {
    backgroundColor: '#00ADEF',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 60,
  },
  doneButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});
