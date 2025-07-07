import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

import { TempleWithDistance } from '../types/Temple';
import { colors } from '../theme/theme';

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;
type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;

interface Props {
  navigation: MapScreenNavigationProp;
  route: MapScreenRouteProp;
}

const { width, height } = Dimensions.get('window');

export default function MapScreen({ navigation, route }: Props) {
  const { temples, userLocation } = route.params;
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (temples.length > 0 && mapRef.current) {
      // Calculate region to show all temples
      const coordinates = temples
        .filter(temple => temple.latitude && temple.longitude)
        .map(temple => ({
          latitude: temple.latitude!,
          longitude: temple.longitude!,
        }));

      if (userLocation) {
        coordinates.push(userLocation);
      }

      if (coordinates.length > 0) {
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    }
  }, [temples, userLocation]);

  const handleMarkerPress = (temple: TempleWithDistance) => {
    navigation.navigate('TempleDetails', { temple });
  };

  const getInitialRegion = (): Region => {
    if (temples.length > 0 && temples[0].latitude && temples[0].longitude) {
      return {
        latitude: temples[0].latitude,
        longitude: temples[0].longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };
    }
    
    // Default to center of US if no temple coordinates
    return {
      latitude: 39.8283,
      longitude: -98.5795,
      latitudeDelta: 10,
      longitudeDelta: 10,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={getInitialRegion()}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={true}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            pinColor={colors.secondary}
          />
        )}

        {/* Temple Markers */}
        {temples
          .filter(temple => temple.latitude && temple.longitude)
          .map((temple) => (
            <Marker
              key={temple.id}
              coordinate={{
                latitude: temple.latitude!,
                longitude: temple.longitude!,
              }}
              pinColor={colors.primary}
              onPress={() => handleMarkerPress(temple)}
            >
              <Callout style={styles.callout}>
                <View style={styles.calloutContent}>
                  <Title style={styles.calloutTitle}>{temple.city}</Title>
                  <Paragraph style={styles.calloutAddress}>
                    {temple.address}
                  </Paragraph>
                  {temple.phone && (
                    <Paragraph style={styles.calloutPhone}>
                      📞 {temple.phone}
                    </Paragraph>
                  )}
                  <Paragraph style={styles.calloutDistance}>
                    {temple.distance.toFixed(1)} miles away
                  </Paragraph>
                  <Button
                    mode="contained"
                    onPress={() => handleMarkerPress(temple)}
                    style={styles.calloutButton}
                    labelStyle={styles.calloutButtonLabel}
                  >
                    View Details
                  </Button>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <Card style={styles.legendCard}>
          <Card.Content style={styles.legendContent}>
            <View style={styles.legendItem}>
              <View style={[styles.legendMarker, { backgroundColor: colors.secondary }]} />
              <Paragraph style={styles.legendText}>Your Location</Paragraph>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendMarker, { backgroundColor: colors.primary }]} />
              <Paragraph style={styles.legendText}>BAPS Temples</Paragraph>
            </View>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height - 100, // Account for header and legend
  },
  callout: {
    width: 250,
    padding: 0,
  },
  calloutContent: {
    padding: 12,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 4,
  },
  calloutAddress: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  calloutPhone: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  calloutDistance: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  calloutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 2,
  },
  calloutButtonLabel: {
    fontSize: 12,
    color: 'white',
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  legendCard: {
    elevation: 4,
  },
  legendContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});