import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

interface EmergencyContact {
  id: string;
  name: string;
  phoneNumber: string;
  relationship: string;
  priority: 'high' | 'medium' | 'low';
  isActive: boolean;
}

const EmergencyContactsPage = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Mom',
      phoneNumber: '+1 (555) 123-4567',
      relationship: 'Mother',
      priority: 'high',
      isActive: true,
    },
    {
      id: '2',
      name: 'Best Friend',
      phoneNumber: '+1 (555) 987-6543',
      relationship: 'Friend',
      priority: 'high',
      isActive: true,
    },
    {
      id: '3',
      name: 'Sister',
      phoneNumber: '+1 (555) 456-7890',
      relationship: 'Sister',
      priority: 'medium',
      isActive: true,
    },
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newContact, setNewContact] = useState<Partial<EmergencyContact>>({
    name: '',
    phoneNumber: '',
    relationship: '',
    priority: 'medium',
    isActive: true,
  });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/SettingsPage');
    }
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phoneNumber || !newContact.relationship) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const contact: EmergencyContact = {
      id: Date.now().toString(),
      name: newContact.name!,
      phoneNumber: newContact.phoneNumber!,
      relationship: newContact.relationship!,
      priority: newContact.priority as 'high' | 'medium' | 'low',
      isActive: true,
    };

    setContacts(prev => [...prev, contact]);
    setIsAddModalVisible(false);
    setNewContact({
      name: '',
      phoneNumber: '',
      relationship: '',
      priority: 'medium',
      isActive: true,
    });
    Alert.alert('Success', 'Emergency contact added successfully!');
  };

  const handleDeleteContact = (id: string) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this emergency contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setContacts(prev => prev.filter(contact => contact.id !== id));
          },
        },
      ]
    );
  };

  const toggleContactStatus = (id: string) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id
          ? { ...contact, isActive: !contact.isActive }
          : contact
      )
    );
  };

  const handleTestContact = (contact: EmergencyContact) => {
    Alert.alert(
      'Test Emergency Alert',
      `Send a test emergency message to ${contact.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Test',
          onPress: () => {
            Alert.alert('Test Sent', `Test emergency message sent to ${contact.name}`);
          },
        },
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'remove';
      case 'low':
        return 'keyboard-arrow-down';
      default:
        return 'remove';
    }
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
          <Icon name="contacts" size={20} color="#333" />
          <Text style={styles.headerText}>Emergency Contacts</Text>
        </View>
        <TouchableOpacity onPress={() => setIsAddModalVisible(true)} style={styles.addButton}>
          <Icon name="add" size={24} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Instructions */}
          <View style={styles.instructionsCard}>
            <Icon name="info" size={24} color="#8B5CF6" />
            <View style={styles.instructionsText}>
              <Text style={styles.instructionsTitle}>Emergency Contacts</Text>
              <Text style={styles.instructionsDescription}>
                These contacts will be notified automatically when you activate panic mode. 
                Ensure phone numbers are correct and test regularly.
              </Text>
            </View>
          </View>

          {/* Contacts List */}
          <View style={styles.contactsList}>
            {contacts.map((contact) => (
              <View key={contact.id} style={styles.contactCard}>
                <View style={styles.contactHeader}>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactRelationship}>{contact.relationship}</Text>
                  </View>
                  <View style={styles.contactMeta}>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(contact.priority) + '20' }]}>
                      <Icon name={getPriorityIcon(contact.priority)} size={16} color={getPriorityColor(contact.priority)} />
                      <Text style={[styles.priorityText, { color: getPriorityColor(contact.priority) }]}>
                        {contact.priority.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.contactDetails}>
                  <Icon name="phone" size={16} color="#666" />
                  <Text style={styles.contactPhone}>{contact.phoneNumber}</Text>
                </View>

                <View style={styles.contactActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleTestContact(contact)}
                  >
                    <Icon name="send" size={18} color="#8B5CF6" />
                    <Text style={styles.actionButtonText}>Test</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.toggleButton]}
                    onPress={() => toggleContactStatus(contact.id)}
                  >
                    <Icon 
                      name={contact.isActive ? "toggle-on" : "toggle-off"} 
                      size={18} 
                      color={contact.isActive ? "#10B981" : "#9CA3AF"} 
                    />
                    <Text style={[
                      styles.actionButtonText,
                      { color: contact.isActive ? "#10B981" : "#9CA3AF" }
                    ]}>
                      {contact.isActive ? 'Active' : 'Inactive'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteContact(contact.id)}
                  >
                    <Icon name="delete" size={18} color="#EF4444" />
                    <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Emergency Services */}
          <View style={styles.emergencyServicesSection}>
            <Text style={styles.sectionTitle}>Emergency Services</Text>
            <View style={styles.emergencyServiceCard}>
              <View style={styles.serviceItem}>
                <Icon name="local-hospital" size={24} color="#EF4444" />
                <Text style={styles.serviceName}>Emergency Services</Text>
                <Text style={styles.serviceNumber}>911</Text>
              </View>
              <View style={styles.serviceItem}>
                <Icon name="support-agent" size={24} color="#8B5CF6" />
                <Text style={styles.serviceName}>Crisis Hotline</Text>
                <Text style={styles.serviceNumber}>1-800-CRISIS</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Emergency Contact</Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name *</Text>
                <TextInput
                  style={styles.input}
                  value={newContact.name}
                  onChangeText={(text) => setNewContact(prev => ({ ...prev, name: text }))}
                  placeholder="Enter contact name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  value={newContact.phoneNumber}
                  onChangeText={(text) => setNewContact(prev => ({ ...prev, phoneNumber: text }))}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Relationship *</Text>
                <TextInput
                  style={styles.input}
                  value={newContact.relationship}
                  onChangeText={(text) => setNewContact(prev => ({ ...prev, relationship: text }))}
                  placeholder="e.g., Mother, Friend, Sister"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Priority Level</Text>
                <View style={styles.priorityOptions}>
                  {['high', 'medium', 'low'].map((priority) => (
                    <TouchableOpacity
                      key={priority}
                      style={[
                        styles.priorityOption,
                        newContact.priority === priority && styles.priorityOptionSelected
                      ]}
                      onPress={() => setNewContact(prev => ({ ...prev, priority: priority as any }))}
                    >
                      <Text style={[
                        styles.priorityOptionText,
                        newContact.priority === priority && styles.priorityOptionTextSelected
                      ]}>
                        {priority.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setIsAddModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalSaveButton}
                onPress={handleAddContact}
              >
                <Text style={styles.modalSaveText}>Add Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  addButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  instructionsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsText: {
    flex: 1,
    marginLeft: 12,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  instructionsDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactsList: {
    gap: 16,
    marginBottom: 32,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactRelationship: {
    fontSize: 14,
    color: '#666',
  },
  contactMeta: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  contactDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  contactPhone: {
    fontSize: 16,
    color: '#666',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    gap: 4,
  },
  toggleButton: {
    backgroundColor: '#F0FDF4',
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  emergencyServicesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  emergencyServiceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  serviceName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 12,
  },
  serviceNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalForm: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  priorityOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  priorityOptionSelected: {
    backgroundColor: '#EDE9FE',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  priorityOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  priorityOptionTextSelected: {
    color: '#8B5CF6',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  modalSaveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
  },
  modalSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default EmergencyContactsPage;
