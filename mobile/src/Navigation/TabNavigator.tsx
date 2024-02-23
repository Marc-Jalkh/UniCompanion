import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Text, View} from 'react-native';
import {useCustomApi} from '../Data/Domain/CustomUseCase';
import {useGetFromApi} from '../Data/Remote/utils/Helpers';
import {beerJsonMapper} from '../Data/Domain/models/Beer';
import PageLoader from '../Common/component/Loader/PageLoader';
// import {useNavigation} from '@react-navigation/native';

const TabView = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={() =>
          RedBackgroundScreen('https://api.punkapi.com/v2/beers')
        }
      />
      <Tab.Screen
        name="another oNe"
        component={() => RedBackgroundScreen('https://api.punkapi.com/v2/bers')}
      />
    </Tab.Navigator>
  );
};

const RedBackgroundScreen = (link: string): React.JSX.Element => {
  const {data, errorMessage, isLoading, load} = useCustomApi(() =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetFromApi(link, beerJsonMapper),
  );

  React.useEffect(() => {
    console.log('loading ' + link);
    load();
  }, [link, load]);

  // const navigation = useNavigation();
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Text>hi</Text>
      {
        // eslint-disable-next-line no-nested-ternary
        isLoading ? (
          <PageLoader />
        ) : errorMessage ? (
          <Text>{errorMessage}</Text>
        ) : null
      }
      {data?.map(beer => (
        <Text key={beer.id}>{beer.name}</Text>
      ))}
      <Button title="Go to dsad" onPress={() => {}} />
    </View>
  );
};

export default TabView;
