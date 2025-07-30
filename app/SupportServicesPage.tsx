import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Linking,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface NearbyResource {
  id: string;
  name: string;
  address: string;
  icon: string;
  phone: string;
  description: string;
  hours: string;
  distance: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  type: string;
  phone: string;
  description: string;
}

const SupportServicesPage = () => {
  const [selectedResource, setSelectedResource] = useState<NearbyResource | null>(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const nearbyResources: NearbyResource[] = [
    {
      id: '1',
      name: 'Medical Center',
      address: '123 Main St.',
      icon: 'local-hospital',
      phone: '+1234567890',
      description: 'Emergency medical care and health services',
      hours: '24/7 Emergency Care',
      distance: '0.5 miles'
    },
    {
      id: '2',
      name: 'Shelter',
      address: '456 Elm St.',
      icon: 'home',
      phone: '+1234567891',
      description: 'Safe temporary housing and support services',
      hours: 'Mon-Sun: 8AM-8PM',
      distance: '1.2 miles'
    },
    {
      id: '3',
      name: 'Legal Aid',
      address: '789 Oak St.',
      icon: 'gavel',
      phone: '+1234567892',
      description: 'Free legal assistance and advocacy',
      hours: 'Mon-Fri: 9AM-5PM',
      distance: '0.8 miles'
    },
    {
      id: '4',
      name: 'Counseling Services',
      address: '321 Pine St.',
      icon: 'psychology',
      phone: '+1234567893',
      description: 'Professional counseling and therapy services',
      hours: 'Mon-Fri: 9AM-6PM',
      distance: '1.5 miles'
    }
  ];

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: '911',
      type: 'Emergency Services',
      phone: '911',
      description: 'Police, Fire, and Medical Emergency Services'
    },
    {
      id: '2',
      name: 'Domestic Violence Hotline',
      type: 'Crisis Support',
      phone: '1-800-799-7233',
      description: '24/7 confidential support for domestic violence survivors'
    },
    {
      id: '3',
      name: 'Friend/Family Member',
      type: 'Personal Contact',
      phone: '+1234567894',
      description: 'Your trusted emergency contact'
    }
  ];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/DashboardPage');
    }
  };

  const handleCall = (phoneNumber: string) => {
    Alert.alert(
      'Make Call',
      `Do you want to call ${phoneNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`).catch(err => {
              console.error('Error making phone call:', err);
              Alert.alert('Error', 'Could not make phone call');
            });
          }
        }
      ]
    );
  };

  const handleResourceDetails = (resource: NearbyResource) => {
    setSelectedResource(resource);
    setShowResourceModal(true);
  };

  const handleEmergencyContact = (contact: EmergencyContact) => {
    Alert.alert(
      contact.name,
      contact.description,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Now', 
          onPress: () => handleCall(contact.phone),
          style: 'default'
        }
      ]
    );
  };

  const handleGetDirections = (address: string) => {
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(err => {
      console.error('Error opening maps:', err);
      Alert.alert('Error', 'Could not open directions');
    });
  };

  const handleSafetyTip = (tipType: string) => {
    const tips = {
      'packing': {
        title: 'Emergency Packing List',
        content: `Essential items to keep ready:
• Important documents (ID, passport, insurance)
• Emergency cash and credit cards
• Medications and medical records
• Change of clothes and personal items
• Phone charger and backup battery
• List of important phone numbers
• Keys (house, car, work)
• Children's items if applicable`
      },
      'communication': {
        title: 'Communication Safety',
        content: `Stay connected safely:
• Use code words with trusted contacts
• Have multiple ways to communicate
• Keep devices charged
• Use secure messaging apps
• Have backup communication plans`
      },
      'location': {
        title: 'Location Safety',
        content: `Stay location-aware:
• Share location with trusted contacts
• Know multiple exit routes
• Identify safe spaces nearby
• Trust your instincts about places
• Have transportation backup plans`
      }
    };

    const tip = tips[tipType as keyof typeof tips] || tips.packing;
    Alert.alert(tip.title, tip.content);
  };

  const handleHome = () => {
    router.push('/DashboardPage');
  };

  const handleEmergency = () => {
    router.push('/EmergencyPage');
  };

  const handleSettings = () => {
    router.push('/SettingsPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Icon name="security" size={20} color="#333" />
          <Text style={styles.headerText}>Support</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Map Section */}
          <View style={styles.mapSection}>
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <Icon name="location-on" size={40} color="#8B5CF6" />
                <Text style={styles.mapText}>Nearby Support Services</Text>
              </View>
            </View>
          </View>

          {/* Nearby Resources */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nearby Resources</Text>
            
            <View style={styles.resourcesContainer}>
              {nearbyResources.map((resource) => (
                <TouchableOpacity 
                  key={resource.id} 
                  style={styles.resourceCard}
                  onPress={() => handleResourceDetails(resource)}
                >
                  <View style={styles.resourceInfo}>
                    <View style={styles.resourceIconContainer}>
                      <Icon name={resource.icon} size={24} color="#8B5CF6" />
                    </View>
                    <View style={styles.resourceDetails}>
                      <Text style={styles.resourceName}>{resource.name}</Text>
                      <Text style={styles.resourceAddress}>{resource.address}</Text>
                      <Text style={styles.resourceDistance}>📍 {resource.distance}</Text>
                      <Text style={styles.resourceHours}>🕐 {resource.hours}</Text>
                    </View>
                  </View>
                  <View style={styles.resourceActions}>
                    <TouchableOpacity 
                      style={styles.actionIconButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleCall(resource.phone);
                      }}
                    >
                      <Icon name="phone" size={20} color="#10B981" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.actionIconButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleGetDirections(resource.address);
                      }}
                    >
                      <Icon name="directions" size={20} color="#3B82F6" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Emergency Contacts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            
            <View style={styles.emergencyContactsContainer}>
              {emergencyContacts.map((contact) => (
                <TouchableOpacity 
                  key={contact.id} 
                  style={styles.emergencyContactCard}
                  onPress={() => handleEmergencyContact(contact)}
                >
                  <View style={styles.emergencyContactInfo}>
                    <Text style={styles.emergencyContactName}>{contact.name}</Text>
                    <Text style={styles.emergencyContactType}>{contact.type}</Text>
                  </View>
                  <View style={styles.emergencyContactAction}>
                    <Icon name="phone" size={20} color="#EF4444" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Safety Tips */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Safety Tips</Text>
            
            <TouchableOpacity 
              style={styles.safetyTipCard} 
              onPress={() => handleSafetyTip('packing')}
            >
              <View style={styles.tipIconContainer}>
                <Icon name="backpack" size={24} color="#8B5CF6" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Packing List</Text>
                <Text style={styles.tipDescription}>
                  Prepare a bag with essentials for quick escape.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusContent}>
          <View style={styles.statusLeft}>
            <View style={styles.safeIndicator} />
            <View>
              <Text style={styles.statusTitle}>Safe</Text>
              <Text style={styles.statusSubtitle}>Risk Level: Low</Text>
            </View>
          </View>
          <View style={styles.statusIcons}>
            <Icon name="mic" size={20} color="#fff" />
            <Icon name="location-on" size={20} color="#fff" style={{ marginLeft: 8 }} />
            <Icon name="directions-walk" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={handleHome}>
          <Icon name="home" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleEmergency}>
          <View style={styles.emergencyIconContainer}>
            <Icon name="warning" size={24} color="#666" />
          </View>
          <Text style={styles.navText}>Emergency</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleSettings}>
          <Icon name="settings" size={24} color="#666" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Resource Detail Modal */}
      <Modal
        visible={showResourceModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowResourceModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowResourceModal(false)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Resource Details</Text>
            <TouchableOpacity onPress={() => selectedResource && handleCall(selectedResource.phone)}>
              <Icon name="phone" size={24} color="#10B981" />
            </TouchableOpacity>
          </View>
          
          {selectedResource && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.resourceDetailHeader}>
                <View style={styles.resourceDetailIcon}>
                  <Icon name={selectedResource.icon} size={32} color="#8B5CF6" />
                </View>
                <Text style={styles.resourceDetailName}>{selectedResource.name}</Text>
              </View>
              
              <View style={styles.resourceDetailInfo}>
                <View style={styles.infoItem}>
                  <Icon name="location-on" size={20} color="#6B7280" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Address</Text>
                    <Text style={styles.infoValue}>{selectedResource.address}</Text>
                  </View>
                </View>
                
                <View style={styles.infoItem}>
                  <Icon name="schedule" size={20} color="#6B7280" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Hours</Text>
                    <Text style={styles.infoValue}>{selectedResource.hours}</Text>
                  </View>
                </View>
                
                <View style={styles.infoItem}>
                  <Icon name="straighten" size={20} color="#6B7280" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Distance</Text>
                    <Text style={styles.infoValue}>{selectedResource.distance}</Text>
                  </View>
                </View>
                
                <View style={styles.infoItem}>
                  <Icon name="phone" size={20} color="#6B7280" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Phone</Text>
                    <Text style={styles.infoValue}>{selectedResource.phone}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.resourceDescription}>
                <Text style={styles.descriptionTitle}>About this service</Text>
                <Text style={styles.descriptionText}>{selectedResource.description}</Text>
              </View>
              
              <View style={styles.resourceActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.callAction]}
                  onPress={() => handleCall(selectedResource.phone)}
                >
                  <Icon name="phone" size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Call Now</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.directionsAction]}
                  onPress={() => handleGetDirections(selectedResource.address)}
                >
                  <Icon name="directions" size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
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
    paddingBottom: 20,
  },
  mapSection: {
    marginBottom: 32,
  },
  mapContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  mapText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  resourcesContainer: {
    gap: 12,
  },
  resourceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resourceIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resourceDetails: {
    flex: 1,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  resourceAddress: {
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyContactsContainer: {
    gap: 12,
  },
  emergencyContactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyContactInfo: {
    flex: 1,
  },
  emergencyContactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  emergencyContactType: {
    fontSize: 14,
    color: '#666',
  },
  emergencyContactAction: {
    width: 40,
    height: 40,
    backgroundColor: '#FEE2E2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyTipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  statusBar: {
    backgroundColor: '#9F7AEA',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    marginRight: 12,
  },
  statusTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusSubtitle: {
    color: '#E9D5FF',
    fontSize: 12,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  emergencyIconContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'solid',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  // Enhanced resource card styles
  resourceDistance: {
    fontSize: 12,
    color: '#8B5CF6',
    marginTop: 2,
  },
  resourceHours: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  resourceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionIconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resourceDetailHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  resourceDetailIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resourceDetailName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  resourceDetailInfo: {
    marginVertical: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  resourceDescription: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  callAction: {
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  directionsAction: {
    backgroundColor: '#3B82F6',
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SupportServicesPage;
