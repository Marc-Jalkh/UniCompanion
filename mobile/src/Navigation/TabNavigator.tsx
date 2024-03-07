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

// const RedBackgroundScreen = (link: string): React.JSX.Element => {
//   const {data, errorMessage, isLoading, load} = useCustomApi(() =>
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useGetFromApi(link, beerJsonMapper),
//   );

//   React.useEffect(() => {
//     console.log('loading ' + link);
//     load();
//   }, [link, load]);

//   // const navigation = useNavigation();
//   return (
//     // eslint-disable-next-line react-native/no-inline-styles
//     <View style={{flex: 1}}>
//       <Text>hi</Text>
//       {
//         // eslint-disable-next-line no-nested-ternary
//         isLoading ? (
//           <PageLoader />
//         ) : errorMessage ? (
//           <Text>{errorMessage}</Text>
//         ) : null
//       }
//       {data?.map(beer => (
//         <Text key={beer.id}>{beer.name}</Text>
//       ))}
//       <Button title="Go to dsad" onPress={() => {}} />
//     </View>
//   );
// };

export default TabView;
