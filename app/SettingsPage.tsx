import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

interface SettingsSection {
  id: string;
  title: string;
  icon: string;
  type: 'navigation' | 'toggle' | 'action';
  value?: boolean;
  description?: string;
}

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    locationSharing: true,
    silentMode: false,
    biometricLogin: true,
    autoEmergency: false,
    soundAlerts: true,
  });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/DashboardPage');
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNavigation = (page: string) => {
    console.log(`Navigate to ${page}`);
    switch (page) {
      case 'profile':
        router.push('/ProfilePage');
        break;
      case 'emergency-contacts':
        router.push('/EmergencyContactsPage');
        break;
      case 'privacy':
        router.push('/PrivacyPolicyPage');
        break;
      case 'help':
        router.push('/HelpPage');
        break;
      case 'about':
        console.log('Show about info');
        break;
      default:
        console.log('Unknown navigation:', page);
    }
  };

  const handleLogout = () => {
    console.log('Logout user');
    router.push('/GuardianHomePage');
  };

  const securitySettings: SettingsSection[] = [
    {
      id: 'biometric',
      title: 'Biometric Login',
      icon: 'fingerprint',
      type: 'toggle',
      value: settings.biometricLogin,
      description: 'Use fingerprint or face recognition to login'
    },
    {
      id: 'silent',
      title: 'Silent Mode',
      icon: 'volume-off',
      type: 'toggle',
      value: settings.silentMode,
      description: 'Disable sounds for safety in dangerous situations'
    },
    {
      id: 'emergency-contacts',
      title: 'Emergency Contacts',
      icon: 'contacts',
      type: 'navigation',
      description: 'Manage your emergency contact list'
    }
  ];

  const alertSettings: SettingsSection[] = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      icon: 'notifications',
      type: 'toggle',
      value: settings.notifications,
      description: 'Receive safety alerts and notifications'
    },
    {
      id: 'location',
      title: 'Location Sharing',
      icon: 'location-on',
      type: 'toggle',
      value: settings.locationSharing,
      description: 'Share location with emergency contacts'
    },
    {
      id: 'auto-emergency',
      title: 'Auto Emergency Alert',
      icon: 'warning',
      type: 'toggle',
      value: settings.autoEmergency,
      description: 'Automatically send alerts when in danger'
    },
    {
      id: 'sound',
      title: 'Sound Alerts',
      icon: 'volume-up',
      type: 'toggle',
      value: settings.soundAlerts,
      description: 'Play sounds for emergency notifications'
    }
  ];

  const accountSettings: SettingsSection[] = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: 'person',
      type: 'navigation',
      description: 'Manage your personal information'
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: 'privacy-tip',
      type: 'navigation',
      description: 'View our privacy policy and terms'
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help',
      type: 'navigation',
      description: 'Get help using the Guardian app'
    },
    {
      id: 'about',
      title: 'About Guardian',
      icon: 'info',
      type: 'navigation',
      description: 'App version and information'
    }
  ];

  const renderSettingItem = (item: SettingsSection, onPress: () => void) => (
    <TouchableOpacity key={item.id} style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIconContainer}>
          <Icon name={item.icon} size={24} color="#8B5CF6" />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.description && (
            <Text style={styles.settingDescription}>{item.description}</Text>
          )}
        </View>
      </View>
      <View style={styles.settingRight}>
        {item.type === 'toggle' ? (
          <Switch
            value={item.value || false}
            onValueChange={() => toggleSetting(item.id as keyof typeof settings)}
            trackColor={{ false: '#E5E7EB', true: '#C7D2FE' }}
            thumbColor={item.value ? '#8B5CF6' : '#9CA3AF'}
          />
        ) : (
          <Icon name="chevron-right" size={24} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
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
          <Icon name="settings" size={20} color="#333" />
          <Text style={styles.headerText}>Settings</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Security Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security & Privacy</Text>
            <View style={styles.sectionCard}>
              {securitySettings.map(item => 
                renderSettingItem(item, () => {
                  if (item.type === 'toggle') {
                    toggleSetting(item.id as keyof typeof settings);
                  } else {
                    handleNavigation(item.id);
                  }
                })
              )}
            </View>
          </View>

          {/* Alert Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alerts & Notifications</Text>
            <View style={styles.sectionCard}>
              {alertSettings.map(item => 
                renderSettingItem(item, () => {
                  if (item.type === 'toggle') {
                    toggleSetting(item.id as keyof typeof settings);
                  } else {
                    handleNavigation(item.id);
                  }
                })
              )}
            </View>
          </View>

          {/* Account Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account & Support</Text>
            <View style={styles.sectionCard}>
              {accountSettings.map(item => 
                renderSettingItem(item, () => handleNavigation(item.id))
              )}
            </View>
          </View>

          {/* Logout Button */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Icon name="logout" size={24} color="#EF4444" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* App Version */}
          <View style={styles.versionSection}>
            <Text style={styles.versionText}>Guardian Safety App</Text>
            <Text style={styles.versionNumber}>Version 1.0.0</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  settingRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  versionSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  versionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  versionNumber: {
    fontSize: 14,
    color: '#666',
  },
});

export default SettingsPage;
