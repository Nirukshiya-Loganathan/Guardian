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
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  address: string;
  dateOfBirth: string;
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phoneNumber: '+1 (555) 123-4567',
    emergencyContact: '+1 (555) 987-6543',
    address: '123 Safe Street, Cityville',
    dateOfBirth: 'January 15, 1995',
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>({ ...profile });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/SettingsPage');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = () => {
    Alert.alert(
      'Save Changes',
      'Are you sure you want to save these changes?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: () => {
            setProfile({ ...editedProfile });
            setIsEditing(false);
            Alert.alert('Success', 'Profile updated successfully!');
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'You will be redirected to change your PIN/password.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: () => {
            console.log('Navigate to change password');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Delete account');
            router.push('/GuardianHomePage');
          },
        },
      ]
    );
  };

  const renderField = (
    label: string,
    value: string,
    field: keyof UserProfile,
    icon: string,
    multiline: boolean = false,
    keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default'
  ) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <Icon name={icon} size={20} color="#8B5CF6" />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      {isEditing ? (
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={editedProfile[field]}
          onChangeText={(text) => handleInputChange(field, text)}
          multiline={multiline}
          keyboardType={keyboardType}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
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
          <Icon name="person" size={20} color="#333" />
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <TouchableOpacity 
          onPress={isEditing ? handleSave : handleEdit} 
          style={styles.editButton}
        >
          <Icon name={isEditing ? "check" : "edit"} size={20} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Profile Picture Section */}
          <View style={styles.profilePictureSection}>
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePicture}>
                <Icon name="person" size={60} color="#8B5CF6" />
              </View>
              <TouchableOpacity style={styles.changePictureButton}>
                <Icon name="camera-alt" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.sectionCard}>
              {renderField('Full Name', profile.name, 'name', 'person')}
              {renderField('Email Address', profile.email, 'email', 'email', false, 'email-address')}
              {renderField('Phone Number', profile.phoneNumber, 'phoneNumber', 'phone', false, 'phone-pad')}
              {renderField('Date of Birth', profile.dateOfBirth, 'dateOfBirth', 'cake')}
              {renderField('Address', profile.address, 'address', 'location-on', true)}
            </View>
          </View>

          {/* Emergency Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Information</Text>
            <View style={styles.sectionCard}>
              {renderField('Emergency Contact', profile.emergencyContact, 'emergencyContact', 'emergency', false, 'phone-pad')}
            </View>
          </View>

          {/* Action Buttons */}
          {isEditing ? (
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actionSection}>
              <TouchableOpacity style={styles.actionButton} onPress={handleChangePassword}>
                <Icon name="lock" size={24} color="#8B5CF6" />
                <Text style={styles.actionButtonText}>Change Password</Text>
                <Icon name="chevron-right" size={24} color="#9CA3AF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
                <Icon name="delete" size={24} color="#EF4444" />
                <Text style={styles.dangerButtonText}>Delete Account</Text>
                <Icon name="chevron-right" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          )}
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
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  editButton: {
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
  profilePictureSection: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#8B5CF6',
  },
  changePictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 24,
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
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: '#666',
    paddingLeft: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginLeft: 28,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  actionSection: {
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  dangerButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 12,
    flex: 1,
  },
});

export default ProfilePage;
