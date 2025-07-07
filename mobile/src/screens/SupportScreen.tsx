import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/theme';

export default function SupportScreen() {
  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsite = (url: string) => {
    Linking.openURL(url);
  };

  const supportTeam = [
    {
      name: 'Anssh Prajapati',
      email: 'ansshprajapati11@gmail.com',
      role: 'Lead Developer',
    },
    {
      name: 'Pujan Patel',
      email: 'pujanpatel.2004@gmail.com',
      role: 'Backend Developer',
    },
    {
      name: 'Shail Patel',
      email: 'shailpatel.2003@gmail.com',
      role: 'Frontend Developer',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Title style={styles.title}>Support & Contact</Title>
          <Paragraph style={styles.subtitle}>
            Get help with the BAPS Temple Finder app or learn more about BAPS.
          </Paragraph>
        </View>

        {/* About BAPS */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>About BAPS</Title>
            <Paragraph style={styles.aboutText}>
              BAPS Swaminarayan Sanstha is a spiritual, volunteer-driven faith dedicated to 
              improving society through individual growth by fostering the Hindu ideals of 
              faith, unity, and selfless service.
            </Paragraph>
            <Paragraph style={styles.aboutText}>
              Founded in 1907, BAPS has centers in over 40 countries around the world, 
              serving communities through spiritual guidance, cultural preservation, 
              and humanitarian activities.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => handleWebsite('https://baps.org')}
              style={styles.websiteButton}
              icon="web"
            >
              Visit baps.org
            </Button>
          </Card.Content>
        </Card>

        {/* Development Team */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Development Team</Title>
            <Paragraph style={styles.teamDescription}>
              This app was developed by a dedicated team of volunteers. 
              For technical support or questions about the app, please contact:
            </Paragraph>
            
            {supportTeam.map((member, index) => (
              <View key={index}>
                <View style={styles.teamMember}>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberRole}>{member.role}</Text>
                  </View>
                  <Button
                    mode="outlined"
                    onPress={() => handleEmail(member.email)}
                    style={styles.contactButton}
                    icon="email"
                    compact
                  >
                    Contact
                  </Button>
                </View>
                {index < supportTeam.length - 1 && <Divider style={styles.divider} />}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* App Information */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>App Information</Title>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version:</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Platform:</Text>
              <Text style={styles.infoValue}>React Native (Expo)</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Features:</Text>
              <Text style={styles.infoValue}>Temple Search, Maps, GPS Location</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Feedback */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Feedback & Suggestions</Title>
            <Paragraph style={styles.feedbackText}>
              We welcome your feedback and suggestions to improve this app. 
              Please reach out to any member of our development team with your thoughts.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => handleEmail('ansshprajapati11@gmail.com')}
              style={styles.feedbackButton}
              icon="comment"
            >
              Send Feedback
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Paragraph style={styles.footerText}>
            Made with dedication for the BAPS community
          </Paragraph>
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
  card: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  websiteButton: {
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  teamDescription: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  teamMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  contactButton: {
    borderColor: colors.primary,
  },
  divider: {
    marginVertical: 4,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    width: 80,
  },
  infoValue: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  feedbackText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  feedbackButton: {
    backgroundColor: colors.secondary,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});