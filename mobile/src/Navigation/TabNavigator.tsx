import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeView from '../Views/HomeView';
import ForYouView from '../Views/ForYouView';
import ChatsView from '../Views/ChatsView';
import CalendarView from '../Views/CalendarView';
import ProfileView from '../Views/ProfileView';
import {useTheme} from 'react-native-paper';

const TabView = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: 'transparent',
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onPrimary,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="For You" component={ForYouView} />
      <Tab.Screen name="Chats" component={ChatsView} />
      <Tab.Screen name="Calendar" component={CalendarView} />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
};

export default TabView;
