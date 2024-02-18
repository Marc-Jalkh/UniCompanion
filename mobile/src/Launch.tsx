import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import StackNavigator from './Navigation/StackNavigator';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import {useColorTheme} from './Common/utils/theme/ColorThemeContex';
import {AuthenticationProvider} from './Data/Domain/UseCases/AuthenticationContext';

const Launch = (): React.JSX.Element => {
  const {isDarkMode, colors} = useColorTheme();
  const safeAreaStyle = {
    backgroundColor: colors.background,
    flex: 1,
  };
  return (
    <SafeAreaView style={safeAreaStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <AuthenticationProvider>
        {/* <Text>hi</Text> */}
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </AuthenticationProvider>
    </SafeAreaView>
  );
};

export default Launch;
