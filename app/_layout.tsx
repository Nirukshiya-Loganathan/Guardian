import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Define the RootStackParamList type based on your screen names
export type RootStackParamList = {
  '(tabs)': undefined; // Assuming tabs screen doesn't take params
  'GuardianHomePage': undefined; // Assuming home page doesn't take params
  'RegistrationPage': undefined; // Assuming registration page doesn't take params
  'LoginPage': undefined; // Assuming login page doesn't take params
  '+not-found': undefined; // Assuming not-found page doesn't take params
  // Add other screens here as you create them
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="GuardianHomePage" options={{ headerShown: false }} />
        <Stack.Screen name="RegistrationPage" options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
