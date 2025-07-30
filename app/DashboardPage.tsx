import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface SafetyAlert {
  id: string;
  type: 'warning' | 'info' | 'emergency';
  title: string;
  message: string;
  location?: string;
  time: string;
}

interface QuickStats {
  journalEntries: number;
  emergencyContacts: number;
  safetyScore: number;
  lastLocationUpdate: string;
}

const DashboardPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [silentMode, setSilentMode] = useState(false);
  
  const [quickStats, setQuickStats] = useState<QuickStats>({
    journalEntries: 12,
    emergencyContacts: 3,
    safetyScore: 87,
    lastLocationUpdate: '2 min ago'
  });

  const [safetyAlerts, setSafetyAlerts] = useState<SafetyAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High Crime Area',
      message: 'You are near an area with recent safety incidents. Stay alert.',
      location: 'Downtown District',
      time: '5 min ago'
    },
    {
      id: '2',
      type: 'info',
      title: 'Safe Zone',
      message: 'You are in a well-monitored area with good lighting.',
      location: 'University Campus',
      time: '15 min ago'
    }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: '1', action: 'Journal entry added', time: '2 hours ago', icon: 'book' },
    { id: '2', action: 'Emergency contact updated', time: '1 day ago', icon: 'contacts' },
    { id: '3', action: 'Safety tip completed', time: '2 days ago', icon: 'check-circle' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
      setQuickStats(prev => ({
        ...prev,
        lastLocationUpdate: 'Just now'
      }));
    }, 1000);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/EmergencyPage');
    }
  };

  const handleQuickEmergency = () => {
    Alert.alert(
      'Emergency Alert',
      'This will immediately send alerts to your emergency contacts. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Alert', 
          style: 'destructive',
          onPress: () => {
            router.push('/PanicTriggerPage');
          }
        }
      ]
    );
  };

  const handleJournal = () => {
    router.push('/JournalPage');
  };

  const handleSupportServices = () => {
    router.push('/SupportServicesPage');
  };

  const handleCommunityEducation = () => {
    router.push('/CommunityEducationPage');
  };

  const handleEmergency = () => {
    router.push('/EmergencyPage');
  };

  const handleSettings = () => {
    router.push('/SettingsPage');
  };

  const handleSafetyTip = (tipType: string) => {
    console.log(`View safety tip: ${tipType}`);
  };

  const toggleLocationSharing = () => {
    setLocationEnabled(!locationEnabled);
    Alert.alert(
      locationEnabled ? 'Location Disabled' : 'Location Enabled',
      locationEnabled 
        ? 'Location sharing has been disabled. Emergency contacts will not receive your location.'
        : 'Location sharing enabled. Emergency contacts can now track your location during emergencies.'
    );
  };

  const toggleSilentMode = () => {
    setSilentMode(!silentMode);
  };

  const getRiskLevelColor = () => {
    switch (riskLevel) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#10B981';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return 'warning';
      case 'info': return 'info';
      case 'emergency': return 'emergency';
      default: return 'info';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      case 'emergency': return '#EF4444';
      default: return '#3B82F6';
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
          <Icon name="security" size={20} color="#333" />
          <Text style={styles.headerText}>Dashboard</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={toggleSilentMode} style={styles.headerAction}>
            <Icon 
              name={silentMode ? "volume-off" : "volume-up"} 
              size={20} 
              color={silentMode ? "#EF4444" : "#666"} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleLocationSharing} style={styles.headerAction}>
            <Icon 
              name={locationEnabled ? "location-on" : "location-off"} 
              size={20} 
              color={locationEnabled ? "#10B981" : "#EF4444"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}</Text>
            <Text style={styles.welcomeSubtext}>Stay safe and stay connected</Text>
            <Text style={styles.currentTime}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>

          {/* Quick Emergency Button */}
          <TouchableOpacity style={styles.emergencyButton} onPress={handleQuickEmergency}>
            <Icon name="emergency" size={32} color="#fff" />
            <View style={styles.emergencyButtonText}>
              <Text style={styles.emergencyButtonTitle}>Quick Emergency</Text>
              <Text style={styles.emergencyButtonSubtitle}>Tap to send immediate alert</Text>
            </View>
          </TouchableOpacity>

          {/* Safety Status Card */}
          <View style={styles.safetyStatusCard}>
            <View style={styles.safetyStatusHeader}>
              <View style={styles.safetyStatusLeft}>
                <View style={[styles.statusIndicator, { backgroundColor: getRiskLevelColor() }]} />
                <View>
                  <Text style={styles.safetyStatusTitle}>Safety Status</Text>
                  <Text style={[styles.riskLevel, { color: getRiskLevelColor() }]}>
                    Risk Level: {riskLevel.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.safetyScore}>{quickStats.safetyScore}%</Text>
            </View>
            <View style={styles.safetyStatusDetails}>
              <Text style={styles.locationText}>
                📍 Location updated {quickStats.lastLocationUpdate}
              </Text>
              <Text style={styles.contactsText}>
                👥 {quickStats.emergencyContacts} emergency contacts active
              </Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStatsSection}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Icon name="book" size={24} color="#8B5CF6" />
                <Text style={styles.statNumber}>{quickStats.journalEntries}</Text>
                <Text style={styles.statLabel}>Journal Entries</Text>
              </View>
              <View style={styles.statCard}>
                <Icon name="contacts" size={24} color="#10B981" />
                <Text style={styles.statNumber}>{quickStats.emergencyContacts}</Text>
                <Text style={styles.statLabel}>Emergency Contacts</Text>
              </View>
              <View style={styles.statCard}>
                <Icon name="shield" size={24} color="#F59E0B" />
                <Text style={styles.statNumber}>{quickStats.safetyScore}%</Text>
                <Text style={styles.statLabel}>Safety Score</Text>
              </View>
            </View>
          </View>

          {/* Safety Alerts */}
          {safetyAlerts.length > 0 && (
            <View style={styles.alertsSection}>
              <Text style={styles.sectionTitle}>Safety Alerts</Text>
              {safetyAlerts.map((alert) => (
                <View key={alert.id} style={styles.alertCard}>
                  <View style={styles.alertHeader}>
                    <Icon 
                      name={getAlertIcon(alert.type)} 
                      size={20} 
                      color={getAlertColor(alert.type)} 
                    />
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <Text style={styles.alertTime}>{alert.time}</Text>
                  </View>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  {alert.location && (
                    <Text style={styles.alertLocation}>📍 {alert.location}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Main Action Buttons */}
          <View style={styles.mainButtons}>
            <Text style={styles.sectionTitle}>Safety Tools</Text>
            
            <TouchableOpacity style={styles.mainButton} onPress={handleJournal}>
              <View style={styles.buttonContent}>
                <Icon name="book" size={24} color="#fff" />
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.mainButtonText}>Secure Journal</Text>
                  <Text style={styles.buttonSubtext}>Document incidents safely</Text>
                </View>
                <Icon name="chevron-right" size={20} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mainButton} onPress={handleSupportServices}>
              <View style={styles.buttonContent}>
                <Icon name="support-agent" size={24} color="#fff" />
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.mainButtonText}>Support Services</Text>
                  <Text style={styles.buttonSubtext}>Find nearby help and resources</Text>
                </View>
                <Icon name="chevron-right" size={20} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mainButton} onPress={handleCommunityEducation}>
              <View style={styles.buttonContent}>
                <Icon name="school" size={24} color="#fff" />
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.mainButtonText}>Community & Education</Text>
                  <Text style={styles.buttonSubtext}>Connect and learn together</Text>
                </View>
                <Icon name="chevron-right" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Recent Activity */}
          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <Icon name={activity.icon} size={20} color="#8B5CF6" />
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Safety Tips Section */}
          <View style={styles.safetyTipsSection}>
            <Text style={styles.sectionTitle}>Daily Safety Tips</Text>
            
            <View style={styles.safetyTipsContainer}>
              <TouchableOpacity 
                style={styles.safetyTipCard} 
                onPress={() => handleSafetyTip('location')}
              >
                <View style={styles.tipIconContainer}>
                  <Icon name="location-on" size={24} color="#8B5CF6" />
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>Location Awareness</Text>
                  <Text style={styles.tipDescription}>
                    Always be aware of your surroundings and trust your instincts
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.safetyTipCard} 
                onPress={() => handleSafetyTip('communication')}
              >
                <View style={styles.tipIconContainer}>
                  <Icon name="phone" size={24} color="#8B5CF6" />
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>Stay Connected</Text>
                  <Text style={styles.tipDescription}>
                    Keep your phone charged and maintain regular contact with trusted people
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.safetyTipCard} 
                onPress={() => handleSafetyTip('escape')}
              >
                <View style={styles.tipIconContainer}>
                  <Icon name="exit-to-app" size={24} color="#8B5CF6" />
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>Escape Planning</Text>
                  <Text style={styles.tipDescription}>
                    Have multiple exit routes planned and keep important documents ready
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
            <View style={[styles.safeIndicator, { backgroundColor: getRiskLevelColor() }]} />
            <View>
              <Text style={styles.statusTitle}>
                {riskLevel === 'low' ? 'Safe' : riskLevel === 'medium' ? 'Caution' : 'Alert'}
              </Text>
              <Text style={styles.statusSubtitle}>Risk Level: {riskLevel}</Text>
            </View>
          </View>
          <View style={styles.statusIcons}>
            <Icon 
              name={silentMode ? "volume-off" : "mic"} 
              size={20} 
              color="#fff" 
            />
            <Icon 
              name={locationEnabled ? "location-on" : "location-off"} 
              size={20} 
              color="#fff" 
              style={{ marginLeft: 8 }} 
            />
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -32,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAction: {
    padding: 8,
    marginLeft: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  welcomeSection: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  currentTime: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  emergencyButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emergencyButtonText: {
    flex: 1,
    marginLeft: 16,
  },
  emergencyButtonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  emergencyButtonSubtitle: {
    fontSize: 14,
    color: '#FEE2E2',
  },
  safetyStatusCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  safetyStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  safetyStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  safetyStatusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  riskLevel: {
    fontSize: 14,
    fontWeight: '500',
  },
  safetyScore: {
    fontSize: 32,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  safetyStatusDetails: {
    marginTop: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  contactsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  quickStatsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  alertsSection: {
    marginBottom: 20,
  },
  alertCard: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    flex: 1,
    marginLeft: 8,
  },
  alertTime: {
    fontSize: 12,
    color: '#92400E',
  },
  alertMessage: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 4,
  },
  alertLocation: {
    fontSize: 12,
    color: '#92400E',
    fontStyle: 'italic',
  },
  mainButtons: {
    marginBottom: 20,
  },
  mainButton: {
    backgroundColor: '#8B5CF6',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#DDD6FE',
  },
  activitySection: {
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  safetyTipsSection: {
    marginBottom: 20,
  },
  safetyTipsContainer: {
    gap: 12,
  },
  safetyTipCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  statusBar: {
    backgroundColor: '#8B5CF6',
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeIndicator: {
    width: 12,
    height: 12,
    backgroundColor: '#10B981',
    borderRadius: 6,
    marginRight: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statusSubtitle: {
    fontSize: 12,
    color: '#DDD6FE',
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
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    backgroundColor: '#FEE2E2',
    padding: 4,
    borderRadius: 8,
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
