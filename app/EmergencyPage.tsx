import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const EmergencyPage = () => {
  const [silentAlertEnabled, setSilentAlertEnabled] = useState(true);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/GuardianHomePage');
    }
  };

  const handlePanicButton = () => {
    // Handle panic button logic here
    console.log('Panic button pressed!');
    // This would typically send emergency alerts, GPS location, etc.
  };

  const handleQuickExit = () => {
    // Navigate to weather app quickly for safety
    router.push('/(tabs)');
  };

  const toggleSilentAlert = (enabled: boolean) => {
    setSilentAlertEnabled(enabled);
    console.log('Silent Alert:', enabled ? 'Enabled' : 'Disabled');
  };

  const handleDashboard = () => {
    // Navigate to dashboard
    router.push('/DashboardPage');
  };

  const handleSettings = () => {
    // Navigate to settings
    console.log('Navigate to Settings');
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
          <Text style={styles.headerText}>Emergency Assistance</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        
        {/* GPS Map Section */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Icon name="location-on" size={40} color="#8B5CF6" />
            <Text style={styles.mapText}>Live GPS Map View</Text>
          </View>
        </View>

        {/* Silent Alert Toggle */}
        <View style={styles.toggleSection}>
          <Text style={styles.toggleTitle}>Toggle Silent Alert</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              style={[
                styles.toggleOption, 
                silentAlertEnabled && styles.toggleOptionSelected
              ]}
              onPress={() => toggleSilentAlert(true)}
            >
              <Text style={[
                styles.toggleText,
                silentAlertEnabled && styles.toggleTextSelected
              ]}>
                Enabled
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.toggleOption, 
                !silentAlertEnabled && styles.toggleOptionSelected
              ]}
              onPress={() => toggleSilentAlert(false)}
            >
              <Text style={[
                styles.toggleText,
                !silentAlertEnabled && styles.toggleTextSelected
              ]}>
                Disabled
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.panicButton} onPress={handlePanicButton}>
            <Text style={styles.panicButtonText}>Panic Button</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickExitButton} onPress={handleQuickExit}>
            <Text style={styles.quickExitButtonText}>Quick Exit</Text>
          </TouchableOpacity>
        </View>
      </View>

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
        <TouchableOpacity style={styles.navItem} onPress={handleDashboard}>
          <Icon name="home" size={24} color="#666" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive}>
          <View style={styles.emergencyIconContainer}>
            <Icon name="warning" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.navTextActive}>Emergency</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  mapContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    height: 180,
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
  toggleSection: {
    marginBottom: 40,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleOptionSelected: {
    backgroundColor: '#f0f0f0',
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  toggleTextSelected: {
    color: '#333',
    fontWeight: '600',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  panicButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  panicButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  quickExitButton: {
    backgroundColor: '#4C1D95',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#4C1D95',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  quickExitButtonText: {
    color: '#fff',
    fontSize: 18,
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
    borderColor: '#8B5CF6',
    borderStyle: 'dashed',
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

export default EmergencyPage;
