import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Chip,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

import { TempleService } from '../services/TempleService';
import { TempleWithDistance } from '../types/Temple';
import { colors } from '../theme/theme';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const [zipcode, setZipcode] = useState('');
  const [temples, setTemples] = useState<TempleWithDistance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const handleZipcodeSearch = async () => {
    if (!zipcode.trim()) {
      Alert.alert('Error', 'Please enter a zip code');
      return;
    }

    if (!TempleService.validateZipcode(zipcode)) {
      Alert.alert('Error', 'Please enter a valid 5-digit US zip code');
      return;
    }

    setIsLoading(true);
    try {
      const results = await TempleService.searchTemples({ zipcode: zipcode.trim() });
      setTemples(results);
      
      if (results.length === 0) {
        Alert.alert('No Results', 'No temples found near this zip code');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to search temples. Please try again.');
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    setIsLocationLoading(true);
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to find nearby temples');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const results = await TempleService.searchTemples({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      setTemples(results);
      
      if (results.length === 0) {
        Alert.alert('No Results', 'No temples found near your location');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get your location. Please try again.');
      console.error('Location error:', error);
    } finally {
      setIsLocationLoading(false);
    }
  };

  const handleViewOnMap = () => {
    if (temples.length > 0) {
      navigation.navigate('Map', { temples });
    }
  };

  const handleTemplePress = (temple: TempleWithDistance) => {
    navigation.navigate('TempleDetails', { temple });
  };

  const handleSupportPress = () => {
    navigation.navigate('Support');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Find Your Nearest BAPS Mandir</Text>
          <Text style={styles.subtitle}>
            Enter your zip code or use your current location to discover temples near you
          </Text>
        </View>

        {/* Search Section */}
        <Card style={styles.searchCard}>
          <Card.Content>
            <TextInput
              label="Zip Code"
              value={zipcode}
              onChangeText={setZipcode}
              mode="outlined"
              placeholder="Enter zip code (e.g., 10001)"
              keyboardType="numeric"
              maxLength={5}
              style={styles.input}
              disabled={isLoading || isLocationLoading}
            />
            
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleZipcodeSearch}
                loading={isLoading}
                disabled={isLoading || isLocationLoading}
                style={[styles.button, styles.primaryButton]}
                labelStyle={styles.buttonLabel}
              >
                Search Temples
              </Button>
              
              <Text style={styles.orText}>or</Text>
              
              <Button
                mode="contained"
                onPress={handleLocationSearch}
                loading={isLocationLoading}
                disabled={isLoading || isLocationLoading}
                style={[styles.button, styles.secondaryButton]}
                labelStyle={styles.buttonLabel}
                icon="crosshairs-gps"
              >
                Use My Location
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Results Section */}
        {temples.length > 0 && (
          <View style={styles.resultsSection}>
            <View style={styles.resultsHeader}>
              <Title style={styles.resultsTitle}>
                Found {temples.length} Temple{temples.length !== 1 ? 's' : ''}
              </Title>
              <Button
                mode="outlined"
                onPress={handleViewOnMap}
                icon="map"
                style={styles.mapButton}
              >
                View on Map
              </Button>
            </View>

            {temples.map((temple) => (
              <TouchableOpacity
                key={temple.id}
                onPress={() => handleTemplePress(temple)}
              >
                <Card style={styles.templeCard}>
                  <Card.Content>
                    <View style={styles.templeHeader}>
                      <Title style={styles.templeTitle}>{temple.city}</Title>
                      <Chip style={styles.distanceChip}>
                        {temple.distance.toFixed(1)} mi
                      </Chip>
                    </View>
                    <Paragraph style={styles.templeAddress}>
                      {temple.address}
                    </Paragraph>
                    {temple.phone && (
                      <Paragraph style={styles.templePhone}>
                        📞 {temple.phone}
                      </Paragraph>
                    )}
                    {temple.operatingHours && (
                      <Paragraph style={styles.templeHours}>
                        🕐 {temple.operatingHours}
                      </Paragraph>
                    )}
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Support Button */}
        <View style={styles.footer}>
          <Button
            mode="text"
            onPress={handleSupportPress}
            style={styles.supportButton}
          >
            Support & Contact
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  searchCard: {
    margin: 16,
    elevation: 4,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginVertical: 8,
    paddingVertical: 4,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    color: colors.textSecondary,
    marginVertical: 8,
    fontSize: 14,
  },
  resultsSection: {
    margin: 16,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    color: colors.secondary,
    fontSize: 18,
  },
  mapButton: {
    borderColor: colors.primary,
  },
  templeCard: {
    marginBottom: 12,
    elevation: 2,
  },
  templeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  templeTitle: {
    fontSize: 18,
    color: colors.secondary,
    flex: 1,
  },
  distanceChip: {
    backgroundColor: colors.primary,
  },
  templeAddress: {
    color: colors.textSecondary,
    marginBottom: 4,
  },
  templePhone: {
    color: colors.textSecondary,
    marginBottom: 4,
  },
  templeHours: {
    color: colors.textSecondary,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  supportButton: {
    color: colors.secondary,
  },
});