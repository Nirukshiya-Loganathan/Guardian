import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image, // Added Image import
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    pin: '',
    email: '',
    phoneNumber: '',
    securityQuestion: 'What is your favorite book?',
    securityAnswer: '',
    emergencyContact: '',
  });
  const [biometricType, setBiometricType] = useState('Fingerprint');

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Registration data:', formData);
    // Navigate to main app after successful registration
    // navigation.navigate('Dashboard');
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
      <StatusBar barStyle="dark-content" backgroundColor="#f8f4ff" translucent={false} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          
          <Icon name="security" size={20} color="#8B5CF6" />
          <Text style={styles.headerText}>Guardian Registration</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Create PIN Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Create PIN or Gesture</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your secret PIN or gesture"
              value={formData.pin}
              onChangeText={(value) => handleInputChange('pin', value)}
              secureTextEntry
            />
            <Text style={styles.helperText}>This will be your login method</Text>
          </View>

          {/* Email Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>Optional for registration</Text>
          </View>

          {/* Phone Number Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
              keyboardType="phone-pad"
            />
            <Text style={styles.helperText}>Optional for registration</Text>
          </View>

          {/* Security Question Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security Question</Text>
            <View style={styles.securityQuestionContainer}>
              <TouchableOpacity 
                style={[
                  styles.questionOption, 
                  formData.securityQuestion === 'What is your favorite book?' && styles.questionOptionSelected
                ]}
                onPress={() => handleInputChange('securityQuestion', 'What is your favorite book?')}
              >
                <Text style={[
                  styles.questionText,
                  formData.securityQuestion === 'What is your favorite book?' && styles.questionTextSelected
                ]}>
                  What is your favorite book?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.questionOption, 
                  formData.securityQuestion === 'In which city were you born?' && styles.questionOptionSelected
                ]}
                onPress={() => handleInputChange('securityQuestion', 'In which city were you born?')}
              >
                <Text style={[
                  styles.questionText,
                  formData.securityQuestion === 'In which city were you born?' && styles.questionTextSelected
                ]}>
                  In which city were you born?
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your answer"
              value={formData.securityAnswer}
              onChangeText={(value) => handleInputChange('securityAnswer', value)}
            />
            <Text style={styles.helperText}>For backup access</Text>
          </View>

          {/* Biometric Login Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Enable Biometric Login</Text>
            <View style={styles.biometricContainer}>
              <TouchableOpacity 
                style={[
                  styles.biometricOption, 
                  biometricType === 'Fingerprint' && styles.biometricOptionSelected
                ]}
                onPress={() => setBiometricType('Fingerprint')}
              >
                <Text style={[
                  styles.biometricText,
                  biometricType === 'Fingerprint' && styles.biometricTextSelected
                ]}>
                  Fingerprint
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.biometricOption, 
                  biometricType === 'Face ID' && styles.biometricOptionSelected
                ]}
                onPress={() => setBiometricType('Face ID')}
              >
                <Text style={[
                  styles.biometricText,
                  biometricType === 'Face ID' && styles.biometricTextSelected
                ]}>
                  Face ID
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.helperText}>Secure and convenient login</Text>
          </View>

          {/* Emergency Contact Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter emergency contact information"
              value={formData.emergencyContact}
              onChangeText={(value) => handleInputChange('emergencyContact', value)}
              multiline
            />
            <Text style={styles.helperText}>Optional during setup</Text>
          </View>

          {/* Register Button */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingVertical: 20,
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f8f4ff',
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
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
  helperText: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },
  securityQuestionContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  questionOption: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  questionOptionSelected: {
    backgroundColor: '#EDE9FE',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  questionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  questionTextSelected: {
    color: '#7C3AED',
    fontWeight: '500',
  },
  biometricContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  biometricOption: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  biometricOptionSelected: {
    backgroundColor: '#EDE9FE',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  biometricText: {
    fontSize: 14,
    color: '#666',
  },
  biometricTextSelected: {
    color: '#7C3AED',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  registerButtonText: {
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

export default RegistrationPage;