import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeView from '../Views/HomeView';
import ForYouView from '../Views/ForYouView';
import ChatsView from '../Views/ChatsView';
import CalendarView from '../Views/CalendarView';
import ProfileView from '../Views/ProfileView';
import {useTheme} from 'react-native-paper';
import {Image} from 'react-native';

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
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <Image
              source={require('../Common/utils/Assets/icons/house.png')}
              width={40}
              height={40}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="For You"
        component={ForYouView}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <Image
              source={require('../Common/utils/Assets/icons/fire.png')}
              width={40}
              height={40}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsView}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <Image
              source={require('../Common/utils/Assets/icons/chatBubble.png')}
              width={40}
              height={40}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarView}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <Image
              source={require('../Common/utils/Assets/icons/cal.png')}
              width={40}
              height={40}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <Image
              source={require('../Common/utils/Assets/icons/Profile.png')}
              width={40}
              height={40}
              tintColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabView;
