import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import StackNavigator from './Navigation/StackNavigator';

const Launch = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Launch;
