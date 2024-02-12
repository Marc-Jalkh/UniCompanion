import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

const TabView = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={() => <Text>tab1</Text>} />
      <Tab.Screen name="dsad" component={() => <Text>tab2</Text>} />
    </Tab.Navigator>
  );
};

export default TabView;
