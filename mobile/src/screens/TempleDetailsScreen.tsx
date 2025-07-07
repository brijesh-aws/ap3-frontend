import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
  Chip,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

import { TempleWithDistance } from '../types/Temple';
import { colors } from '../theme/theme';

type TempleDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'TempleDetails'>;
type TempleDetailsRouteProp = RouteProp<RootStackParamList, 'TempleDetails'>;

interface Props {
  navigation: TempleDetailsNavigationProp;
  route: TempleDetailsRouteProp;
}

export default function TempleDetailsScreen({ navigation, route }: Props) {
  const { temple } = route.params;

  const handleCall = () => {
    if (temple.phone) {
      const phoneNumber = temple.phone.replace(/[^\d]/g, '');
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const handleEmail = () => {
    if (temple.email) {
      Linking.openURL(`mailto:${temple.email}`);
    }
  };

  const handleDirections = () => {
    if (temple.latitude && temple.longitude) {
      const url = `https://maps.apple.com/?daddr=${temple.latitude},${temple.longitude}&dirflg=d`;
      Linking.openURL(url);
    } else {
      // Fallback to address search
      const address = encodeURIComponent(temple.address);
      const url = `https://maps.apple.com/?q=${address}&dirflg=d`;
      Linking.openURL(url);
    }
  };

  const handleViewOnMap = () => {
    navigation.navigate('Map', { 
      temples: [temple],
      userLocation: undefined
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Card */}
        <Card style={styles.headerCard}>
          <Card.Content>
            <View style={styles.headerContent}>
              <Title style={styles.title}>{temple.city}</Title>
              {'distance' in temple && (
                <Chip style={styles.distanceChip}>
                  {temple.distance.toFixed(1)} mi away
                </Chip>
              )}
            </View>
            <Paragraph style={styles.subtitle}>BAPS Swaminarayan Mandir</Paragraph>
          </Card.Content>
        </Card>

        {/* Address Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>📍 Address</Text>
            </View>
            <Paragraph style={styles.address}>{temple.address}</Paragraph>
            
            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={handleDirections}
                style={[styles.actionButton, styles.primaryButton]}
                icon="directions"
              >
                Get Directions
              </Button>
              <Button
                mode="outlined"
                onPress={handleViewOnMap}
                style={[styles.actionButton, styles.outlineButton]}
                icon="map"
              >
                View on Map
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Contact Information */}
        {(temple.phone || temple.email) && (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>📞 Contact Information</Text>
              </View>
              
              {temple.phone && (
                <TouchableOpacity onPress={handleCall} style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Phone:</Text>
                  <Text style={styles.contactValue}>{temple.phone}</Text>
                </TouchableOpacity>
              )}
              
              {temple.fax && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Fax:</Text>
                  <Text style={styles.contactValue}>{temple.fax}</Text>
                </View>
              )}
              
              {temple.email && (
                <TouchableOpacity onPress={handleEmail} style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Email:</Text>
                  <Text style={[styles.contactValue, styles.emailLink]}>{temple.email}</Text>
                </TouchableOpacity>
              )}
              
              <View style={styles.buttonRow}>
                {temple.phone && (
                  <Button
                    mode="contained"
                    onPress={handleCall}
                    style={[styles.actionButton, styles.primaryButton]}
                    icon="phone"
                  >
                    Call
                  </Button>
                )}
                {temple.email && (
                  <Button
                    mode="outlined"
                    onPress={handleEmail}
                    style={[styles.actionButton, styles.outlineButton]}
                    icon="email"
                  >
                    Email
                  </Button>
                )}
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Operating Hours */}
        {(temple.operatingHours || temple.operatingDays) && (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>🕐 Hours & Schedule</Text>
              </View>
              
              {temple.operatingDays && (
                <View style={styles.scheduleItem}>
                  <Text style={styles.scheduleLabel}>Operating Days:</Text>
                  <Text style={styles.scheduleValue}>{temple.operatingDays}</Text>
                </View>
              )}
              
              {temple.operatingHours && (
                <View style={styles.scheduleItem}>
                  <Text style={styles.scheduleLabel}>Hours:</Text>
                  <Text style={styles.scheduleValue}>{temple.operatingHours}</Text>
                </View>
              )}
            </Card.Content>
          </Card>
        )}

        {/* About BAPS */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🏛️ About BAPS</Text>
            </View>
            <Paragraph style={styles.aboutText}>
              BAPS Swaminarayan Sanstha is a spiritual, volunteer-driven faith dedicated to 
              improving society through individual growth by fostering the Hindu ideals of 
              faith, unity, and selfless service.
            </Paragraph>
            <Button
              mode="text"
              onPress={() => Linking.openURL('https://baps.org')}
              style={styles.learnMoreButton}
            >
              Learn More at baps.org
            </Button>
          </Card.Content>
        </Card>
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
  headerCard: {
    margin: 16,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  distanceChip: {
    backgroundColor: colors.primary,
  },
  card: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
  },
  address: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  outlineButton: {
    borderColor: colors.primary,
  },
  contactItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    width: 80,
  },
  contactValue: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  emailLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  scheduleItem: {
    flexDirection: 'row',
    paddingVertical: 6,
    alignItems: 'flex-start',
  },
  scheduleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    width: 120,
  },
  scheduleValue: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  aboutText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  learnMoreButton: {
    alignSelf: 'flex-start',
  },
});