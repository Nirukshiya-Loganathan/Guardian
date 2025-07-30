# Guardian - Women's Safety App 🛡️

Guardian is a comprehensive personal safety application designed specifically for women in dangerous situations. The app provides discreet emergency assistance, secure documentation, community support, and quick escape features.

## 🚨 Key Safety Features

### Emergency Response
- **Panic Button**: Instantly alerts emergency contacts with GPS location
- **Quick Exit**: Seamlessly switches to weather app to hide Guardian from view
- **Silent Mode**: Disables sounds and vibrations for discreet operation
- **Auto Emergency**: Detects dangerous situations and sends automatic alerts
- **GPS Tracking**: Real-time location sharing with trusted contacts

### Secure Documentation
- **Encrypted Journal**: Document incidents with photos, audio, and location data
- **Legal Export**: Export evidence for legal proceedings or support services
- **Secure Storage**: All data encrypted and stored locally on device
- **Incident Tagging**: Categorize entries for easy organization

### Support Network
- **Emergency Contacts**: Manage prioritized contact list with testing capabilities
- **Support Services**: Find nearby shelters, legal aid, and counseling services
- **Community Platform**: Connect with other survivors and share resources
- **Educational Resources**: Safety tips, legal guidance, and support information

## 📱 App Architecture

### Main Pages
1. **Guardian Home Page** - Entry point with registration/login options
2. **Registration Page** - Secure account setup with biometric options
3. **Login Page** - PIN-based authentication with biometric support
4. **Dashboard Page** - Central hub with access to all features
5. **Emergency Page** - Emergency assistance with panic button and GPS
6. **Journal Page** - Secure documentation interface
7. **Support Services Page** - Nearby resources and emergency contacts
8. **Community & Education Page** - Community platform and resources
9. **Settings Page** - App configuration and privacy settings
10. **Profile Page** - Personal information management
11. **Emergency Contacts Page** - Detailed contact management
12. **Help Page** - Tutorials and safety guidance
13. **Privacy Policy Page** - Data protection and legal information

### Technical Features
- **React Native with Expo Router** for cross-platform compatibility
- **TypeScript** for type-safe development
- **Local-first architecture** - no external servers required
- **End-to-end encryption** for all sensitive data
- **Biometric authentication** for secure access
- **Offline functionality** for emergency situations
- **Purple theme** (#8B5CF6, #7C3AED) for consistent branding

## 🔒 Privacy & Security

### Data Protection
- All personal data stored locally on device
- Industry-standard encryption for sensitive information
- No user accounts or external data storage
- Biometric data never leaves device
- Optional data export only with user consent

### Safety Features
- Quick exit to weather app for concealment
- Silent operation mode for dangerous situations
- Encrypted journal entries
- Secure emergency contact management
- Anonymous community features

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- React Native development environment
- iOS/Android device or emulator

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/Guardian.git

# Navigate to project directory
cd Guardian

# Install dependencies
npm install

# Start the development server
expo start
```

### Build for Production
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

## 🎨 Design Principles

### User Interface
- **Purple Color Scheme**: Primary (#8B5CF6), Secondary (#7C3AED)
- **Clean, Minimal Design**: Easy to use under stress
- **Accessible Icons**: Clear MaterialIcons for all functions
- **Consistent Navigation**: Bottom navigation for main sections
- **Safe Area Design**: Proper spacing for all device types

### User Experience
- **Quick Access**: Critical features accessible within 2 taps
- **Discrete Operation**: App appears as weather app when hidden
- **Intuitive Flow**: Logical progression through safety features
- **Emergency Optimization**: Key features work without internet
- **Stress-Tested**: Usable during high-stress situations

## 🛠️ Development Structure

### File Organization
```
Guardian/
├── app/                    # Main application pages
│   ├── (tabs)/            # Tab navigation structure
│   ├── GuardianHomePage.tsx
│   ├── RegistrationPage.tsx
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── EmergencyPage.tsx
│   ├── JournalPage.tsx
│   ├── SupportServicesPage.tsx
│   ├── CommunityEducationPage.tsx
│   ├── SettingsPage.tsx
│   ├── ProfilePage.tsx
│   ├── EmergencyContactsPage.tsx
│   ├── HelpPage.tsx
│   ├── PrivacyPolicyPage.tsx
│   ├── PanicTriggerPage.tsx
│   └── _layout.tsx        # Navigation configuration
├── assets/                # Images, fonts, and static resources
├── components/            # Reusable UI components
├── constants/             # App constants and theme colors
└── hooks/                 # Custom React hooks
```

### Key Components
- **SafeAreaView**: Consistent safe area handling
- **StatusBar**: Proper status bar configuration
- **ScrollView**: Smooth scrolling for content pages
- **TouchableOpacity**: Interactive elements with feedback
- **Icon Components**: MaterialIcons for consistent iconography

## 🎯 Safety Guidelines

### For Users
1. **Test Emergency Features**: Regularly test panic button and contacts
2. **Keep Contacts Updated**: Ensure emergency contacts are current
3. **Practice Quick Exit**: Familiarize yourself with hiding the app
4. **Secure Your Device**: Use device lock screen and biometrics
5. **Plan Ahead**: Create comprehensive safety plan beyond the app

### For Developers
1. **Security First**: All new features must prioritize user safety
2. **Privacy by Design**: Minimal data collection and local storage
3. **Accessibility**: Ensure app works for users with disabilities
4. **Performance**: Emergency features must be reliable and fast
5. **Testing**: Comprehensive testing in stress scenarios

## 📞 Emergency Resources

### Immediate Danger
- **Emergency Services**: 911 (US) / Your local emergency number
- **Police**: Local emergency number
- **Fire/Medical**: Local emergency number

### Support Hotlines
- **National Domestic Violence Hotline**: 1-800-799-SAFE (7233)
- **Crisis Text Line**: Text HOME to 741741
- **RAINN National Sexual Assault Hotline**: 1-800-656-HOPE (4673)

## 🤝 Contributing

Guardian is designed to save lives. Contributions should prioritize user safety and privacy.

### Development Guidelines
1. **Safety First**: All features must enhance user safety
2. **Privacy Protection**: No data collection without explicit consent
3. **Code Quality**: TypeScript, proper error handling, comprehensive testing
4. **Documentation**: Clear documentation for all safety features
5. **Testing**: Test emergency features in various scenarios

### Reporting Issues
- **Security Issues**: Email security@guardian-app.com
- **Bugs**: Use GitHub Issues with safety impact assessment
- **Feature Requests**: Propose features that enhance safety

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Important Disclaimer

Guardian is designed to assist in dangerous situations but should not be your only safety plan. Always contact emergency services (911) if you are in immediate danger. This app is a tool to supplement, not replace, professional emergency services and safety planning.

## 📧 Contact

- **Email**: support@guardian-app.com
- **Emergency Support**: Available 24/7
- **Privacy Questions**: privacy@guardian-app.com
- **Security Issues**: security@guardian-app.com

---

**Guardian - Your Safety, Our Priority** 🛡️💜
