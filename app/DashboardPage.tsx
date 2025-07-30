import React from 'react';
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

const { width, height } = Dimensions.get('window');

const DashboardPage = () => {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/EmergencyPage');
    }
  };

  const handleJournal = () => {
    console.log('Navigate to Journal');
    router.push('/JournalPage');
  };

  const handleSupportServices = () => {
    console.log('Navigate to Support Services');
    // Navigate to Support Services page
  };

  const handleCommunityEducation = () => {
    console.log('Navigate to Community and Education');
    // Navigate to Community and Education page
  };

  const handleEmergency = () => {
    router.push('/EmergencyPage');
  };

  const handleSettings = () => {
    console.log('Navigate to Settings');
    // Navigate to Settings page
  };

  const handleSafetyTip = (tipType: string) => {
    console.log(`View safety tip: ${tipType}`);
    // Navigate to detailed safety tip page
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
          <Text style={styles.headerText}>Dashboard</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Main Action Buttons */}
          <View style={styles.mainButtons}>
            <TouchableOpacity style={styles.mainButton} onPress={handleJournal}>
              <Text style={styles.mainButtonText}>Journal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mainButton} onPress={handleSupportServices}>
              <Text style={styles.mainButtonText}>Support Services</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mainButton} onPress={handleCommunityEducation}>
              <Text style={styles.mainButtonText}>Community and Education</Text>
            </TouchableOpacity>
          </View>

          {/* Safety Tips Section */}
          <View style={styles.safetyTipsSection}>
            <Text style={styles.sectionTitle}>Safety Tips</Text>
            
            <View style={styles.safetyTipsContainer}>
              {/* Pettah, Colombo Tip */}
              <TouchableOpacity 
                style={styles.safetyTipCard} 
                onPress={() => handleSafetyTip('pettah')}
              >
                <View style={styles.tipIconContainer}>
                  <Icon name="location-on" size={24} color="#8B5CF6" />
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>Pettah, colombo</Text>
                  <Text style={styles.tipDescription}>
                    Be careful about your valuable stuff when you move around pettah
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Packing List Tip */}
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
        <TouchableOpacity style={styles.navItemActive}>
          <Icon name="home" size={24} color="#8B5CF6" />
          <Text style={styles.navTextActive}>Dashboard</Text>
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
  mainButtons: {
    marginBottom: 32,
    gap: 12,
  },
  mainButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 24,
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
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  safetyTipsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  safetyTipsContainer: {
    gap: 12,
  },
  safetyTipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  navItemActive: {
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
  navTextActive: {
    fontSize: 12,
    color: '#8B5CF6',
    marginTop: 4,
    fontWeight: '600',
  },
});

export default DashboardPage;
