import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface HelpSection {
  id: string;
  title: string;
  icon: string;
  content: string[];
  tips?: string[];
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const HelpPage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/SettingsPage');
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const helpSections: HelpSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: 'play-circle-filled',
      content: [
        'Complete your registration with a secure PIN or biometric login',
        'Add emergency contacts who will be notified in crisis situations',
        'Customize your safety preferences in Settings',
        'Test your emergency contacts to ensure they receive alerts',
        'Familiarize yourself with the panic button and quick exit features'
      ],
      tips: [
        'Choose a PIN that\'s memorable but not obvious to others',
        'Add at least 3 emergency contacts for redundancy',
        'Keep your location sharing enabled for emergency assistance'
      ]
    },
    {
      id: 'emergency-features',
      title: 'Emergency Features',
      icon: 'warning',
      content: [
        'Panic Button: Immediately sends alerts to all emergency contacts with your location',
        'Quick Exit: Instantly switch to weather app to hide Guardian from view',
        'Silent Mode: Disable sounds and vibrations for discrete operation',
        'GPS Tracking: Share real-time location with trusted contacts',
        'Auto Emergency: Automatically detect dangerous situations'
      ],
      tips: [
        'Practice using the panic button in safe situations',
        'Ensure GPS/location services are always enabled',
        'Test quick exit to verify it works smoothly'
      ]
    },
    {
      id: 'journal-feature',
      title: 'Secure Journal',
      icon: 'book',
      content: [
        'Document incidents, threats, or concerning situations',
        'Add photos, voice recordings, and location data as evidence',
        'Export journal entries for legal or support purposes',
        'All entries are encrypted and stored securely on your device',
        'Use tags to categorize entries (incident, legal, personal)'
      ],
      tips: [
        'Document incidents as soon as possible while details are fresh',
        'Include specific dates, times, and locations',
        'Keep journal entries factual and detailed'
      ]
    },
    {
      id: 'support-services',
      title: 'Support Services',
      icon: 'support-agent',
      content: [
        'Find nearby shelters, legal aid, and counseling services',
        'Quick access to medical centers and emergency services',
        'Direct calling to domestic violence hotlines',
        'Community resources and educational materials',
        'Safety tips and escape planning guidance'
      ],
      tips: [
        'Save important phone numbers in your regular contacts too',
        'Research local resources when traveling to new areas',
        'Keep emergency cash and important documents ready'
      ]
    },
    {
      id: 'privacy-safety',
      title: 'Privacy & Safety',
      icon: 'security',
      content: [
        'All data is stored locally on your device - never on external servers',
        'Use biometric login or complex PIN for app access',
        'Enable app hiding through quick exit to weather app',
        'No data is shared without your explicit consent',
        'Delete app data remotely if device is compromised'
      ],
      tips: [
        'Regularly update your PIN or biometric settings',
        'Don\'t share your PIN with anyone',
        'Clear browser history after reading safety resources'
      ]
    }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'What happens when I press the panic button?',
      answer: 'The panic button immediately sends emergency alerts with your current location to all active emergency contacts. It also optionally contacts emergency services depending on your settings.'
    },
    {
      id: '2',
      question: 'Can someone see I have this app installed?',
      answer: 'Guardian is designed to be discrete. You can quickly exit to a weather app, and the app icon can be hidden among other apps. The app name doesn\'t reveal its safety purpose.'
    },
    {
      id: '3',
      question: 'What if I don\'t have internet connection?',
      answer: 'Basic emergency features work without internet. SMS alerts to emergency contacts will still be sent via cellular network. However, location sharing and some support services require internet.'
    },
    {
      id: '4',
      question: 'How do I add or remove emergency contacts?',
      answer: 'Go to Settings > Emergency Contacts to manage your contact list. You can add, edit, or delete contacts, and test alerts to ensure they work properly.'
    },
    {
      id: '5',
      question: 'Is my journal data secure?',
      answer: 'Yes, all journal entries are encrypted and stored only on your device. The data is never uploaded to external servers unless you choose to export it for legal purposes.'
    },
    {
      id: '6',
      question: 'What should I do if someone discovers the app?',
      answer: 'Use the quick exit feature immediately to switch to the weather app. If necessary, you can delete the app and reinstall it later. Consider it part of your safety plan.'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Icon name="help" size={20} color="#333" />
          <Text style={styles.headerText}>Help & Support</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Icon name="favorite" size={40} color="#8B5CF6" />
            <Text style={styles.welcomeTitle}>We're Here to Help</Text>
            <Text style={styles.welcomeDescription}>
              Guardian is designed to keep you safe. Learn how to use all features effectively and get the most protection from your safety app.
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickActionCard}>
                <Icon name="phone" size={24} color="#EF4444" />
                <Text style={styles.quickActionText}>Call 911</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionCard}>
                <Icon name="support-agent" size={24} color="#8B5CF6" />
                <Text style={styles.quickActionText}>Crisis Hotline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionCard}>
                <Icon name="chat" size={24} color="#10B981" />
                <Text style={styles.quickActionText}>Live Chat</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Help Sections */}
          <View style={styles.helpSectionsContainer}>
            <Text style={styles.sectionTitle}>How to Use Guardian</Text>
            {helpSections.map((section) => (
              <View key={section.id} style={styles.helpSectionCard}>
                <TouchableOpacity 
                  style={styles.helpSectionHeader}
                  onPress={() => toggleSection(section.id)}
                >
                  <View style={styles.helpSectionTitleContainer}>
                    <Icon name={section.icon} size={24} color="#8B5CF6" />
                    <Text style={styles.helpSectionTitle}>{section.title}</Text>
                  </View>
                  <Icon 
                    name={expandedSection === section.id ? "expand-less" : "expand-more"} 
                    size={24} 
                    color="#666" 
                  />
                </TouchableOpacity>
                
                {expandedSection === section.id && (
                  <View style={styles.helpSectionContent}>
                    {section.content.map((item, index) => (
                      <View key={index} style={styles.helpContentItem}>
                        <Icon name="check-circle" size={16} color="#10B981" />
                        <Text style={styles.helpContentText}>{item}</Text>
                      </View>
                    ))}
                    
                    {section.tips && (
                      <View style={styles.tipsSection}>
                        <Text style={styles.tipsTitle}>💡 Pro Tips:</Text>
                        {section.tips.map((tip, index) => (
                          <Text key={index} style={styles.tipText}>• {tip}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* FAQ Section */}
          <View style={styles.faqSection}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {faqs.map((faq) => (
              <View key={faq.id} style={styles.faqCard}>
                <TouchableOpacity 
                  style={styles.faqHeader}
                  onPress={() => toggleFAQ(faq.id)}
                >
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Icon 
                    name={expandedFAQ === faq.id ? "expand-less" : "expand-more"} 
                    size={24} 
                    color="#666" 
                  />
                </TouchableOpacity>
                
                {expandedFAQ === faq.id && (
                  <View style={styles.faqContent}>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Contact Support */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Still Need Help?</Text>
            <View style={styles.contactCard}>
              <Icon name="email" size={24} color="#8B5CF6" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Contact Support</Text>
                <Text style={styles.contactDescription}>
                  Email us at support@guardian-app.com or call our 24/7 helpline
                </Text>
              </View>
            </View>
          </View>

          {/* Emergency Notice */}
          <View style={styles.emergencyNotice}>
            <Icon name="warning" size={24} color="#EF4444" />
            <Text style={styles.emergencyText}>
              If you're in immediate danger, call 911 or your local emergency services right away.
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
  welcomeSection: {
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
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  welcomeDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  helpSectionsContainer: {
    marginBottom: 32,
  },
  helpSectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  helpSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  helpSectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  helpSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  helpSectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  helpContentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  helpContentText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  tipsSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    lineHeight: 18,
  },
  faqSection: {
    marginBottom: 32,
  },
  faqCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  faqContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactSection: {
    marginBottom: 32,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emergencyNotice: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  emergencyText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});

export default HelpPage;
