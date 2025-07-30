import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  Image, // Added Image import
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const LoginPage = () => {
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login with PIN:', pin);
    // Navigate to main app after successful login
    // navigation.navigate('Dashboard');
  };

  const handleHelp = () => {
    // Handle help logic here
    console.log('Help pressed');
    // navigation.navigate('Help');
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back(); // Go back if there's a previous screen
    } else {
      router.push('/GuardianHomePage'); // Navigate to home if no previous screen
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
         
          <Icon name="security" size={20} color="#8B5CF6" />
          <Text style={styles.headerText}>Guardian</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        
        {/* Face ID Icon */}
        <View style={styles.faceIdContainer}>
          <View style={styles.faceIdIcon}>
            <View style={styles.faceFrame}>
              <View style={styles.faceCorner} />
              <View style={[styles.faceCorner, styles.topRight]} />
              <View style={[styles.faceCorner, styles.bottomLeft]} />
              <View style={[styles.faceCorner, styles.bottomRight]} />
              <View style={styles.faceFeatures}>
                <View style={styles.eyes}>
                  <View style={styles.eye} />
                  <View style={styles.eye} />
                </View>
                <View style={styles.mouth} />
              </View>
            </View>
          </View>
        </View>

        {/* Enter PIN Button */}
        <TouchableOpacity style={styles.pinButton} onPress={() => {}}>
          <Text style={styles.pinButtonText}>Enter PIN</Text>
        </TouchableOpacity>

        {/* Help Button */}
        <TouchableOpacity style={styles.helpButton} onPress={handleHelp}>
          <Text style={styles.helpButtonText}>Help</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    paddingHorizontal: 24,
    paddingTop: 40, // Increased padding to move content down
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 48,
  },
  faceIdContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  faceIdIcon: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceFrame: {
    width: 80,
    height: 80,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceCorner: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderColor: '#333',
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    left: 'auto',
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 0,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 0,
  },
  bottomLeft: {
    bottom: 0,
    top: 'auto',
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
  },
  faceFeatures: {
    alignItems: 'center',
  },
  eyes: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  eye: {
    width: 4,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginHorizontal: 6,
  },
  mouth: {
    width: 16,
    height: 8,
    borderBottomWidth: 2,
    borderColor: '#333',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  pinButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  pinButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  helpButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  helpButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerLogo: { // Added style for header logo
    width: 30,
    height: 30,
    marginRight: 8,
  },
});

export default LoginPage;