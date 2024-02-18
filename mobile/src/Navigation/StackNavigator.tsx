import * as React from 'react';
import {Button, Text, View} from 'react-native';
import TabView from './TabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../Data/Domain/UseCases/AuthenticationContext';

type Routes = {
  Login: undefined;
  OnBoarding: undefined;
  TabView: undefined;
  id: {id: string};
  sadBoarding: undefined;
};

const StackNavigator = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator<Routes>();
  const {isAuthenticated} = useAuth();
  return (
    <Stack.Navigator
      initialRouteName="TabView"
      screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name="TabView" component={TabView} />
          <Stack.Screen name="id" component={RedBackgroundScreen} />
          <Stack.Screen name="sadBoarding" component={RedBackgroundScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="OnBoarding" component={BlueBackgroundScreen} />
          <Stack.Screen name="Login" component={BlueBackgroundScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

const RedBackgroundScreen = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{backgroundColor: 'red', flex: 1}}>
      <Text>hi</Text>
    </View>
  );
};

const BlueBackgroundScreen = () => {
  let {login, logout} = useAuth();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{backgroundColor: 'blue', flex: 1}}>
      <Text>hdsai</Text>
      <Button
        title="login"
        onPress={() => {
          login();
        }}
      />
      <Button
        title="logout"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
};

export default StackNavigator;
