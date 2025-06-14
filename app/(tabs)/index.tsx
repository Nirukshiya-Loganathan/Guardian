import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const openGuardianApp = () => {
    Linking.openURL('guardian://'); // Deep link or external app
  };

  return (
    <LinearGradient
      colors={['#6C5CE7', '#DCD6F7']}
      style={styles.container}
    >
      <Text style={styles.appTitle}>Weatherly</Text>
      <Text style={styles.welcome}>Welcome to your daily forecast</Text>
      <Text style={styles.subtext}>Stay ahead with real-time weather updates</Text>

      <TouchableOpacity style={styles.cloudButton} onPress={openGuardianApp}>
        <Image
          source={require('@/assets/images/cloud.png')}
          style={styles.cloudIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.getStartedButton}>
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  appTitle: {
    fontSize: 42,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  welcome: {
    fontSize: 22,
    color: '#F3F0FF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#EAE6FF',
    marginBottom: 40,
    textAlign: 'center',
  },
  cloudButton: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  cloudIcon: {
    width: 90,
    height: 90,
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 25,
  },
  getStartedText: {
    color: '#6C5CE7',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
