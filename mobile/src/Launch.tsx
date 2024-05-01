import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import StackNavigator from './Navigation/StackNavigator';
import {StatusBar, View} from 'react-native';
import {AuthenticationProvider} from './Data/Domain/AuthenticationContext';
import {useTheme} from 'react-native-paper';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const Launch = (): React.JSX.Element => {
  const theme = useTheme();
  const safeAreaStyle = {
    backgroundColor: theme.colors.background,
    flex: 1,
  };
  React.useEffect(() => {
    console.log('Launch');
  }, []);

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={safeAreaStyle} edges={['right', 'left']}>
      <View
        style={{
          height: insets.top,
          backgroundColor: theme.colors.tertiaryContainer,
        }}>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      </View>

      <AuthenticationProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </AuthenticationProvider>
    </SafeAreaView>
  );
};

export default Launch;
