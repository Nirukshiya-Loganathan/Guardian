import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const PrivacyPolicyPage = () => {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/SettingsPage');
    }
  };

  const policySection = (title: string, content: string[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {content.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>
          {paragraph}
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Icon name="privacy-tip" size={20} color="#333" />
          <Text style={styles.headerText}>Privacy Policy</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Introduction */}
          <View style={styles.introSection}>
            <Icon name="security" size={40} color="#8B5CF6" />
            <Text style={styles.introTitle}>Your Privacy is Our Priority</Text>
            <Text style={styles.introDescription}>
              Guardian is designed with privacy and safety at its core. We understand the sensitive nature of personal safety apps and are committed to protecting your information.
            </Text>
            <Text style={styles.lastUpdated}>Last Updated: December 2024</Text>
          </View>

          {/* Privacy Principles */}
          <View style={styles.principlesSection}>
            <Text style={styles.sectionTitle}>Our Privacy Principles</Text>
            <View style={styles.principleCard}>
              <Icon name="storage" size={24} color="#10B981" />
              <View style={styles.principleContent}>
                <Text style={styles.principleTitle}>Local Storage Only</Text>
                <Text style={styles.principleDescription}>
                  All your data stays on your device. We don't store personal information on external servers.
                </Text>
              </View>
            </View>
            <View style={styles.principleCard}>
              <Icon name="no-accounts" size={24} color="#8B5CF6" />
              <View style={styles.principleContent}>
                <Text style={styles.principleTitle}>No User Accounts</Text>
                <Text style={styles.principleDescription}>
                  We don't create user accounts or profiles that could be compromised or tracked.
                </Text>
              </View>
            </View>
            <View style={styles.principleCard}>
              <Icon name="lock" size={24} color="#EF4444" />
              <View style={styles.principleContent}>
                <Text style={styles.principleTitle}>End-to-End Encryption</Text>
                <Text style={styles.principleDescription}>
                  Your journal entries and personal data are encrypted on your device.
                </Text>
              </View>
            </View>
          </View>

          {/* Detailed Sections */}
          {policySection("Information We Collect", [
            "Guardian collects minimal information necessary for the app to function safely and effectively:",
            "• Emergency contact information you provide",
            "• Location data (only when you explicitly enable it)",
            "• Journal entries and associated metadata",
            "• App usage patterns for improving safety features",
            "• Device information for app optimization",
            "All information is stored locally on your device and encrypted for your protection."
          ])}

          {policySection("How We Use Your Information", [
            "Your information is used solely to provide safety features:",
            "• Sending emergency alerts to your designated contacts",
            "• Providing location-based safety recommendations",
            "• Securing your journal entries with encryption",
            "• Improving app performance and safety features",
            "• Connecting you with nearby support services",
            "We never sell, rent, or share your personal information with third parties for marketing purposes."
          ])}

          {policySection("Data Storage and Security", [
            "Your safety depends on secure data handling:",
            "• All data is stored locally on your device using industry-standard encryption",
            "• No personal information is transmitted to external servers without your explicit consent",
            "• Emergency contacts are only accessed during actual emergency situations",
            "• You can delete all app data at any time from your device settings",
            "• Biometric data (fingerprints, face recognition) never leaves your device"
          ])}

          {policySection("Location Information", [
            "Location data is critical for safety features but handled with extreme care:",
            "• Location is only accessed when you enable location services",
            "• GPS data is shared only during emergency situations with your emergency contacts",
            "• You can disable location sharing at any time in app settings",
            "• Location history is not stored long-term on your device",
            "• No location data is shared with advertising or analytics companies"
          ])}

          {policySection("Emergency Situations", [
            "During emergencies, certain privacy protections may be temporarily modified to ensure your safety:",
            "• Emergency contacts will receive your location and alert message",
            "• Local emergency services may be contacted based on your settings",
            "• Journal entries may be exported if you choose to share them for legal purposes",
            "• Audio recordings or photos taken during emergencies are stored securely",
            "All emergency data sharing requires your prior consent through app settings."
          ])}

          {policySection("Your Rights and Controls", [
            "You have complete control over your data:",
            "• View all data stored by the app in your device settings",
            "• Delete all app data permanently at any time",
            "• Export your journal entries for legal or personal use",
            "• Modify or delete emergency contacts whenever needed",
            "• Control which features access your location or contacts",
            "• Disable or uninstall the app without data retention"
          ])}

          {policySection("Third-Party Services", [
            "Guardian integrates with minimal third-party services for essential functionality:",
            "• Device operating system for biometric authentication",
            "• SMS and calling services for emergency notifications",
            "• Maps services for location and nearby resources (when enabled)",
            "• No social media integration or advertising networks",
            "All third-party integrations are clearly disclosed and can be disabled."
          ])}

          {policySection("Children's Privacy", [
            "Guardian is designed for adults and users 18 years and older:",
            "• We do not knowingly collect information from users under 18",
            "• Parents or guardians should supervise any use by minors",
            "• Special safety considerations apply for users under 18",
            "• Contact us if you believe a minor has used the app inappropriately"
          ])}

          {policySection("Changes to This Policy", [
            "We may update this privacy policy to reflect changes in the app or legal requirements:",
            "• You will be notified of significant changes through the app",
            "• Continued use of the app indicates acceptance of policy changes",
            "• Previous versions of the policy are available upon request",
            "• Changes will never reduce your privacy protections without explicit consent"
          ])}

          {policySection("Contact Us", [
            "If you have questions about this privacy policy or your data:",
            "• Email: privacy@guardian-app.com",
            "• Phone: 1-800-GUARDIAN (1-800-482-7342)",
            "• Mail: Guardian Privacy Team, 123 Safety Street, Protection City, PC 12345",
            "• Response time: Within 48 hours for privacy-related inquiries",
            "We are committed to addressing your privacy concerns promptly and thoroughly."
          ])}

          {/* Important Notice */}
          <View style={styles.importantNotice}>
            <Icon name="warning" size={24} color="#EF4444" />
            <View style={styles.noticeContent}>
              <Text style={styles.noticeTitle}>Important Safety Notice</Text>
              <Text style={styles.noticeText}>
                This app is designed to assist in dangerous situations, but should not be your only safety plan. 
                Always contact emergency services (911) if you are in immediate danger.
              </Text>
            </View>
          </View>

          {/* Legal Footer */}
          <View style={styles.legalFooter}>
            <Text style={styles.legalText}>
              © 2024 Guardian Safety App. All rights reserved.
            </Text>
            <Text style={styles.legalText}>
              This privacy policy is governed by the laws of [Your Jurisdiction].
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 25,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  introSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  introDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  principlesSection: {
    marginBottom: 32,
  },
  principleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  principleContent: {
    flex: 1,
    marginLeft: 12,
  },
  principleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  principleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  importantNotice: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  noticeContent: {
    flex: 1,
    marginLeft: 12,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    color: '#EF4444',
    lineHeight: 20,
  },
  legalFooter: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  legalText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default PrivacyPolicyPage;
