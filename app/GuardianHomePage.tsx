import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './_layout';

const { width, height } = Dimensions.get('window');

const HomePage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCreateAccount = () => {
    // Navigate to create account screen
    console.log('Navigate to Create Account');
    if (navigation) {
      navigation.navigate('RegistrationPage');
    } else {
      console.error("Navigation object is undefined in GuardianHomePage.");
      // Optionally, add an alert or other user feedback here
    }
  };

  const handleLogin = () => {
    // Navigate to login screen
    console.log('Navigate to Login');
    if (navigation) {
      navigation.navigate('LoginPage');
    } else {
      console.error("Navigation object is undefined in GuardianHomePage.");
      // Optionally, add an alert or other user feedback here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f4ff" />

      {/* Header */}
      <View style={styles.header}>
      <Image
            source={require('../assets/images/logo.png')} // Update path as needed
            style={styles.logo1}
            resizeMode="contain"
          />
        <Text style={styles.headerTitle}>Guardian</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')} // Update path as needed
            style={styles.logo}
            resizeMode="contain"
          />
        
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome!</Text>
          <Text style={styles.welcomeSubtitle}>
            Choose how you want to continue
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={handleCreateAccount}
            activeOpacity={0.8}
          >
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Terms Section */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing you are agree to our{' '}
            <Text style={styles.termsLink}>Terms of Services</Text>
            {' & '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f4ff',
  },
  logo1: {
    width: 50,
    height: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 5, // Reduced margin to bring title closer to logo
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    paddingTop: 40, // Increased padding to move content down
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 230,
    height: 230,
    marginBottom: -60,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b46c1',
    letterSpacing: 2,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonsContainer: {
    marginBottom: 40,
  },
  createAccountButton: {
    backgroundColor: '#6b46c1',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#6b46c1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6b46c1',
  },
  loginButtonText: {
    color: '#6b46c1',
    fontSize: 16,
    fontWeight: '600',
  },
  termsContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#6b46c1',
    textDecorationLine: 'underline',
  },
});

export default HomePage;
