import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TabView = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={RedBackgroundScreen} />
      <Tab.Screen name="another oNe" component={RedBackgroundScreen} />
    </Tab.Navigator>
  );
};

const RedBackgroundScreen = (): React.JSX.Element => {
  const navigation = useNavigation();
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{backgroundColor: 'red', flex: 1}}>
      <Text>hi</Text>

      <Button title="Go to dsad" onPress={() => {}} />
    </View>
  );
};

export default TabView;
