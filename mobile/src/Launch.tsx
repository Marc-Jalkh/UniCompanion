import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import StackNavigator from './Navigation/StackNavigator';
import {StatusBar} from 'react-native';
import {AuthenticationProvider} from './Data/Domain/AuthenticationContext';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const Launch = (): React.JSX.Element => {
  const theme = useTheme();
  const safeAreaStyle = {
    backgroundColor: theme.colors.background,
    flex: 1,
  };
  React.useEffect(() => {
    console.log('Launch');
  }, []);

  return (
    <SafeAreaView style={safeAreaStyle} edges={['top', 'right', 'left']}>
      {/* TODO change to react native paper  */}
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <AuthenticationProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </AuthenticationProvider>
    </SafeAreaView>
  );
};

export default Launch;
