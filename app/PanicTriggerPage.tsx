import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const PanicTriggerPage = () => {
  const [countdown, setCountdown] = useState(5);
  const [canCancel, setCanCancel] = useState(true);
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const emergencySteps = [
    { icon: 'phone', text: 'Alerting emergency contacts...' },
    { icon: 'location-on', text: 'Sharing live location...' },
    { icon: 'videocam', text: 'Starting audio/video recording...' },
    { icon: 'visibility-off', text: 'Activating discreet mode...' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanCancel(false);
          setEmergencyTriggered(true);
          clearInterval(timer);
          startEmergencySequence();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startEmergencySequence = () => {
    let stepIndex = 0;
    const stepTimer = setInterval(() => {
      setCurrentStep(stepIndex);
      stepIndex++;
      if (stepIndex >= emergencySteps.length) {
        clearInterval(stepTimer);
        // After all steps complete, navigate back or show completion
        setTimeout(() => {
          router.push('/EmergencyPage');
        }, 2000);
      }
    }, 1500);
  };

  const handleCancelEmergency = () => {
    if (canCancel) {
      router.back();
    }
  };

  const getCountdownColor = () => {
    if (countdown <= 2) return '#EF4444';
    if (countdown <= 3) return '#F59E0B';
    return '#fff';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7C3AED" translucent={false} />
      
      <View style={styles.content}>
        {/* Countdown Circle */}
        <View style={styles.countdownContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Text style={[styles.countdownText, { color: getCountdownColor() }]}>
                {emergencyTriggered ? '!' : countdown}
              </Text>
            </View>
          </View>
        </View>

        {/* Cancel Button */}
        <TouchableOpacity 
          style={[styles.cancelButton, !canCancel && styles.cancelButtonDisabled]} 
          onPress={handleCancelEmergency}
          disabled={!canCancel}
        >
          <Text style={[styles.cancelButtonText, !canCancel && styles.cancelButtonTextDisabled]}>
            Cancel Emergency
          </Text>
        </TouchableOpacity>

        {/* Emergency Steps */}
        <View style={styles.stepsContainer}>
          {emergencySteps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={[
                styles.stepIcon, 
                (emergencyTriggered && index <= currentStep) && styles.stepIconActive
              ]}>
                <Icon 
                  name={step.icon} 
                  size={20} 
                  color={(emergencyTriggered && index <= currentStep) ? '#10B981' : '#9CA3AF'} 
                />
              </View>
              <Text style={[
                styles.stepText,
                (emergencyTriggered && index <= currentStep) && styles.stepTextActive
              ]}>
                {step.text}
              </Text>
            </View>
          ))}
        </View>

        {/* Warning Text */}
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            {canCancel 
              ? 'Emergency services will be contacted if not cancelled within the countdown'
              : 'Emergency sequence activated. Services have been notified.'
            }
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7C3AED',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  countdownText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cancelButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  cancelButtonText: {
    color: '#7C3AED',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButtonTextDisabled: {
    color: 'rgba(124, 58, 237, 0.5)',
  },
  stepsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepIconActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  stepTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  warningContainer: {
    position: 'absolute',
    bottom: 40,
    left: 32,
    right: 32,
  },
  warningText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PanicTriggerPage;
