import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Text} from 'react-native';
import TabView from './TabNavigator';

const StackNavigator = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="TabView">
      <Stack.Screen name="TabView" component={TabView} />

      <Stack.Screen name="OnBoarding" component={() => <Text>hi</Text>} />
      <Stack.Screen name="Login" component={() => <Text>hi2</Text>} />

      <Stack.Screen name="id" component={() => <Text>hi3</Text>} />
      <Stack.Screen name="OndsadBoarding" component={() => <Text>hi4</Text>} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
