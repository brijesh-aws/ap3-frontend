import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [zipcode, setZipcode] = React.useState('');
  const [temples, setTemples] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const searchTemples = async () => {
    if (!zipcode.trim()) {
      Alert.alert('Error', 'Please enter a zip code');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/temples/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zipcode: zipcode.trim() }),
      });

      const data = await response.json();
      setTemples(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch temples. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🕉️ BAPS Temple Finder</Text>
        <Text style={styles.subtitle}>Find the nearest BAPS temple</Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <Text style={styles.label}>Enter ZIP Code:</Text>
        <TextInput
          style={styles.input}
          value={zipcode}
          onChangeText={setZipcode}
          placeholder="e.g., 12345"
          keyboardType="numeric"
          maxLength={5}
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={searchTemples}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Searching...' : 'Find Temples'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      <ScrollView style={styles.results}>
        {temples.length > 0 ? (
          <>
            <Text style={styles.resultsTitle}>Found {temples.length} temples:</Text>
            {temples.map((temple: any, index: number) => (
              <View key={index} style={styles.templeCard}>
                <Text style={styles.templeCity}>{temple.city}</Text>
                <Text style={styles.templeAddress}>{temple.address}</Text>
                {temple.distance && (
                  <Text style={styles.templeDistance}>
                    {temple.distance.toFixed(1)} miles away
                  </Text>
                )}
                {temple.phone && (
                  <Text style={styles.templePhone}>📞 {temple.phone}</Text>
                )}
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.noResults}>
            Enter a ZIP code to find nearby BAPS temples
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF6B00',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  searchSection: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  results: {
    flex: 1,
    padding: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  templeCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  templeCity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D2691E',
    marginBottom: 5,
  },
  templeAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  templeDistance: {
    fontSize: 12,
    color: '#FF6B00',
    fontWeight: '600',
    marginBottom: 5,
  },
  templePhone: {
    fontSize: 14,
    color: '#333',
  },
  noResults: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
  },
});