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
  Modal,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface JournalEntry {
  id: string;
  title: string;
  tag: string;
  tagType: 'incident' | 'legal' | 'personal';
  description: string;
  user: string;
  date: string;
}

const JournalPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Unexpected Late-Night Caller',
      tag: 'Incident',
      tagType: 'incident',
      description: 'On March 2, 2025, around 11:30 PM, someone knocked on my door repeatedly. I couldn\'t identify who it was & see more...',
      user: 'User A',
      date: 'March 2, 2025'
    },
    {
      id: '2',
      title: 'Harassing Text Messages',
      tag: 'Legal',
      tagType: 'legal',
      description: 'Over the past week, I\'ve received multiple threatening text messages from an unknown number. The sender see more...',
      user: 'User B',
      date: 'March 1, 2025'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [newEntry, setNewEntry] = useState({
    title: '',
    description: '',
    tagType: 'incident' as 'incident' | 'legal' | 'personal'
  });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/DashboardPage');
    }
  };

  const handleAddDocument = () => {
    setShowAddModal(true);
  };

  const handleExportForLegal = async () => {
    try {
      const exportData = entries.map(entry => ({
        title: entry.title,
        date: entry.date,
        description: entry.description,
        tag: entry.tag,
        user: entry.user
      }));
      
      const exportText = `GUARDIAN JOURNAL EXPORT - LEGAL USE
Generated on: ${new Date().toLocaleDateString()}

${exportData.map((entry, index) => `
ENTRY ${index + 1}
Title: ${entry.title}
Date: ${entry.date}
Category: ${entry.tag}
User: ${entry.user}
Description: ${entry.description}
${'='.repeat(50)}
`).join('')}

This document was exported from Guardian app for legal purposes.
All entries are chronologically ordered and include metadata.`;

      await Share.share({
        message: exportText,
        title: 'Guardian Journal Export - Legal Use'
      });
    } catch (error) {
      Alert.alert('Export Error', 'Could not export journal entries. Please try again.');
    }
  };

  const handleEntryPress = (entryId: string) => {
    const entry = entries.find(e => e.id === entryId);
    if (entry) {
      setSelectedEntry(entry);
      setShowEntryModal(true);
    }
  };

  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.description.trim()) {
      Alert.alert('Missing Information', 'Please fill in both title and description.');
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      description: newEntry.description,
      tag: newEntry.tagType.charAt(0).toUpperCase() + newEntry.tagType.slice(1),
      tagType: newEntry.tagType,
      user: 'Current User',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({ title: '', description: '', tagType: 'incident' });
    setShowAddModal(false);
    Alert.alert('Success', 'Document added successfully to your secure journal.');
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

  const getTagColor = (tagType: string) => {
    switch (tagType) {
      case 'incident':
        return '#EF4444';
      case 'legal':
        return '#F59E0B';
      case 'personal':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getUserColor = (user: string) => {
    // Generate a consistent color based on user name
    const colors = ['#8B5CF6', '#EF4444', '#10B981', '#F59E0B', '#3B82F6'];
    const hash = user.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
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
          <Text style={styles.headerText}>Secure Journal Interface</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Document Entries Section */}
          <View style={styles.entriesSection}>
            <Text style={styles.sectionTitle}>Document Entries</Text>
            
            <View style={styles.entriesContainer}>
              {entries.map((entry) => (
                <TouchableOpacity 
                  key={entry.id}
                  style={styles.entryCard} 
                  onPress={() => handleEntryPress(entry.id)}
                >
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTitle}>{entry.title}</Text>
                    <View style={[styles.tag, { backgroundColor: getTagColor(entry.tagType) }]}>
                      <Text style={styles.tagText}>{entry.tag}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.entryDescription}>{entry.description}</Text>
                  
                  <View style={styles.entryFooter}>
                    <View style={styles.userInfo}>
                      <View style={[styles.userAvatar, { backgroundColor: getUserColor(entry.user) }]}>
                        <Text style={styles.userInitial}>{entry.user.charAt(entry.user.length - 1)}</Text>
                      </View>
                      <Text style={styles.userName}>{entry.user}</Text>
                    </View>
                  </View>
                  
                  {entry.id !== entries[entries.length - 1].id && <View style={styles.separator} />}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddDocument}>
              <Text style={styles.buttonText}>Add a document</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.exportButton} onPress={handleExportForLegal}>
              <Text style={styles.buttonText}>Export for Legal Use</Text>
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

      {/* Add Document Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Document</Text>
            <TouchableOpacity onPress={handleSaveEntry}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Document Title</Text>
              <TextInput
                style={styles.titleInput}
                placeholder="Enter a descriptive title..."
                value={newEntry.title}
                onChangeText={(text) => setNewEntry(prev => ({ ...prev, title: text }))}
                multiline
              />
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categoryContainer}>
                {(['incident', 'legal', 'personal'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.categoryButton,
                      newEntry.tagType === type && styles.categoryButtonSelected
                    ]}
                    onPress={() => setNewEntry(prev => ({ ...prev, tagType: type }))}
                  >
                    <Text style={[
                      styles.categoryText,
                      newEntry.tagType === type && styles.categoryTextSelected
                    ]}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.descriptionInput}
                placeholder="Describe the incident, provide details, times, locations, witnesses, etc. This information will be securely stored and can be exported for legal use."
                value={newEntry.description}
                onChangeText={(text) => setNewEntry(prev => ({ ...prev, description: text }))}
                multiline
                numberOfLines={8}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.securityNotice}>
              <Icon name="security" size={20} color="#8B5CF6" />
              <Text style={styles.securityText}>
                All entries are encrypted and stored securely on your device only.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* View Entry Modal */}
      <Modal
        visible={showEntryModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowEntryModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowEntryModal(false)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Document Details</Text>
            <TouchableOpacity onPress={() => {
              if (selectedEntry) {
                Share.share({
                  message: `${selectedEntry.title}\n\nDate: ${selectedEntry.date}\nCategory: ${selectedEntry.tag}\n\n${selectedEntry.description}`,
                  title: selectedEntry.title
                });
              }
            }}>
              <Icon name="share" size={24} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          
          {selectedEntry && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.entryDetailHeader}>
                <Text style={styles.entryDetailTitle}>{selectedEntry.title}</Text>
                <View style={[styles.tag, { backgroundColor: getTagColor(selectedEntry.tagType) }]}>
                  <Text style={styles.tagText}>{selectedEntry.tag}</Text>
                </View>
              </View>
              
              <View style={styles.entryDetailMeta}>
                <View style={styles.metaItem}>
                  <Icon name="schedule" size={16} color="#666" />
                  <Text style={styles.metaText}>{selectedEntry.date}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="person" size={16} color="#666" />
                  <Text style={styles.metaText}>{selectedEntry.user}</Text>
                </View>
              </View>
              
              <View style={styles.entryDetailContent}>
                <Text style={styles.entryDetailDescription}>{selectedEntry.description}</Text>
              </View>
              
              <View style={styles.entryActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="edit" size={20} color="#8B5CF6" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="delete" size={20} color="#EF4444" />
                  <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>Delete</Text>
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
  entriesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  entriesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryCard: {
    padding: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  entryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  entryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  userInitial: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  userName: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 16,
  },
  actionButtons: {
    gap: 12,
  },
  addButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  exportButton: {
    backgroundColor: '#6B46C1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#6B46C1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  // Modal Styles
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
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputSection: {
    marginVertical: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextSelected: {
    color: '#8B5CF6',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  securityText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  // Entry Detail Modal Styles
  entryDetailHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  entryDetailTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  entryDetailMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  entryDetailContent: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  entryDetailDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  entryActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B5CF6',
  },
});

export default JournalPage;
